const assert = require('node:assert/strict')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')

const routeSource = fs.readFileSync(path.join(__dirname, 'aliyun-fc-iterate-routes.js'), 'utf8')

class MemoryTableQuery {
  constructor(table, tables) {
    this.table = table
    this.rows = tables[table]
    this.operation = null
    this.values = null
    this.filters = []
    this.sort = null
    this.maximum = null
    this.returnUpdatedRows = false
  }

  select() {
    if (this.operation === 'update' || this.operation === 'insert')
      this.returnUpdatedRows = true
    else
      this.operation = 'select'
    return this
  }

  insert(values) {
    this.operation = 'insert'
    this.values = values
    return this
  }

  update(values) {
    this.operation = 'update'
    this.values = values
    return this
  }

  eq(column, value) {
    this.filters.push(row => row[column] === value)
    return this
  }

  is(column, value) {
    this.filters.push(row => value === null ? row[column] == null : row[column] === value)
    return this
  }

  not(column, operator, value) {
    assert.equal(operator, 'is')
    assert.equal(value, null)
    this.filters.push(row => row[column] != null)
    return this
  }

  gt(column, value) {
    this.filters.push(row => row[column] > value)
    return this
  }

  lte(column, value) {
    this.filters.push(row => row[column] <= value)
    return this
  }

  order(column, { ascending }) {
    this.sort = { column, ascending }
    return this
  }

  limit(maximum) {
    this.maximum = maximum
    return this
  }

  single() {
    return this.execute().then(({ data, error }) => ({
      data: Array.isArray(data) ? data[0] || null : data,
      error,
    }))
  }

  then(resolve, reject) {
    return this.execute().then(resolve, reject)
  }

  async execute() {
    if (this.operation === 'insert') {
      const inserted = []
      for (const value of this.values) {
        if (this.table === 'iterate_claim_tokens') {
          const hasActiveRow = this.rows.some(row =>
            row.order_no === value.order_no && row.used_at == null && row.revoked_at == null,
          )
          if (hasActiveRow) {
            return { data: null, error: { code: '23505', message: 'active token already exists' } }
          }
        }
        if (this.table === 'iterate_payment_access') {
          const hasExistingOrder = this.rows.some(row => row.order_no === value.order_no)
          if (hasExistingOrder) {
            return { data: null, error: { code: '23505', message: 'payment access already exists' } }
          }
        }
        const row = {
          id: `row-${this.rows.length + 1}`,
          created_at: new Date().toISOString(),
          used_at: null,
          revoked_at: null,
          ...value,
        }
        this.rows.push(row)
        inserted.push(row)
      }
      return { data: this.returnUpdatedRows ? inserted : null, error: null }
    }

    let matching = this.rows.filter(row => this.filters.every(filter => filter(row)))
    if (this.sort) {
      const { column, ascending } = this.sort
      matching = matching.toSorted((left, right) => {
        const comparison = String(left[column]).localeCompare(String(right[column]))
        return ascending ? comparison : -comparison
      })
    }
    if (this.maximum != null)
      matching = matching.slice(0, this.maximum)

    if (this.operation === 'update') {
      for (const row of matching)
        Object.assign(row, this.values)
      return { data: this.returnUpdatedRows ? matching : null, error: null }
    }
    return { data: matching, error: null }
  }
}

function loadClaimHelpers(environment = {}, overrides = {}) {
  const tables = {
    iterate_claim_tokens: [],
    iterate_email_verifications: [],
    iterate_payment_access: [],
    iterate_licenses: [],
    iterate_orders: [],
  }
  const routes = new Map()
  const context = {
    Buffer,
    crypto,
    process: { env: environment },
    console: { log() {}, warn() {}, error() {} },
    WECHAT_CONFIG: {
      appid: 'wechat-app',
      mchid: 'wechat-merchant',
      description: 'Iterate',
    },
    generateOrderNo: overrides.generateOrderNo || (() => 'ITERATE-test-order'),
    generateTimeExpire: () => '2026-05-27T13:00:00+08:00',
    isValidEmail: email => typeof email === 'string' && email.includes('@'),
    callWechatAPI: overrides.callWechatAPI || (async () => ({ code_url: 'weixin://test-qr' })),
    queryWechatOrderStatus: overrides.queryWechatOrderStatus || (async () => ({ trade_state: 'NOTPAY' })),
    createAlipayPrecreatePayment: overrides.createAlipayPrecreatePayment,
    queryAlipayTradeStatus: overrides.queryAlipayTradeStatus,
    supabaseRI: {
      from(table) {
        assert.ok(table in tables, `unexpected table: ${table}`)
        return new MemoryTableQuery(table, tables)
      },
    },
    app: {
      get(path, handler) {
        routes.set(`GET ${path}`, handler)
      },
      post(path, handler) {
        routes.set(`POST ${path}`, handler)
      },
    },
  }
  vm.runInNewContext(
    `${routeSource}\nglobalThis.__claimHelpers = { createIterateClaimToken, generateIterateLicenseKey, redeemIterateClaimToken, consumeIterateEmailVerification, hashIterateEmailCredential, issueIteratePaymentAccessToken };`,
    context,
  )
  return { ...context.__claimHelpers, rows: tables.iterate_claim_tokens, tables, routes }
}

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(body) {
      this.body = body
      return this
    },
  }
}

test('issued licenses use the signed ITL1 contract and are stable per order input', () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519')
  const privateKeyB64 = privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64')
  const { generateIterateLicenseKey } = loadClaimHelpers({ ITERATE_LICENSE_PRIVATE_KEY_B64: privateKeyB64 })
  const options = {
    issuedAt: '2026-05-27T11:30:00.000Z',
    nonce: 'order-signed',
    orderId: 'order-signed',
  }

  const first = generateIterateLicenseKey('permanent', options)
  const second = generateIterateLicenseKey('permanent', options)
  const [prefix, payloadB64, signatureB64] = first.split('.')
  const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))

  assert.equal(first, second)
  assert.equal(prefix, 'ITL1')
  assert.equal(payload.license_type, 'permanent')
  assert.equal(payload.order_id, 'order-signed')
  assert.equal(
    crypto.verify(null, Buffer.from(payloadB64, 'base64url'), publicKey, Buffer.from(signatureB64, 'base64url')),
    true,
  )
})

test('repeated payment status issuance reuses one active token', async () => {
  const { createIterateClaimToken, rows } = loadClaimHelpers()

  const first = await createIterateClaimToken('order-1', 'ITL1.payload.signature')
  const second = await createIterateClaimToken('order-1', 'ITL1.payload.signature')

  assert.equal(first.claimed, false)
  assert.equal(second.claimed, false)
  assert.equal(second.token, first.token)
  assert.equal(rows.length, 1)
})

test('a claim token can be redeemed only once', async () => {
  const { createIterateClaimToken, redeemIterateClaimToken } = loadClaimHelpers()
  const issued = await createIterateClaimToken('order-2', 'ITL1.payload.signature')

  const first = await redeemIterateClaimToken(issued.token)
  const second = await redeemIterateClaimToken(issued.token)

  assert.equal(first.success, true)
  assert.equal(first.licenseKey, 'ITL1.payload.signature')
  assert.equal(second.success, false)
  assert.equal(second.error, 'Token 已使用')
})

test('a claimed order revokes any remaining unconsumed token', async () => {
  const { createIterateClaimToken, redeemIterateClaimToken, rows } = loadClaimHelpers()
  const issued = await createIterateClaimToken('order-3', 'ITL1.payload.signature')
  const redeemed = await redeemIterateClaimToken(issued.token)
  assert.equal(redeemed.success, true)

  rows.push({
    id: 'legacy-residual',
    token_hash: 'legacy',
    token_nonce: 'legacy',
    order_no: 'order-3',
    license_key: 'ITL1.payload.signature',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 60000).toISOString(),
    used_at: null,
    revoked_at: null,
  })

  const afterClaim = await createIterateClaimToken('order-3', 'ITL1.payload.signature')

  assert.equal(afterClaim.claimed, true)
  assert.ok(rows.find(row => row.id === 'legacy-residual').revoked_at)
})

test('an email verification token can be consumed only once', async () => {
  const email = 'buyer@example.com'
  const verificationToken = 'verified-session'
  const { consumeIterateEmailVerification, hashIterateEmailCredential, tables } = loadClaimHelpers({
    ITERATE_EMAIL_VERIFICATION_SECRET: 'test-email-secret',
  })
  tables.iterate_email_verifications.push({
    id: 'verification-1',
    email,
    verification_token_hash: hashIterateEmailCredential('verification', email, verificationToken),
    verified_at: new Date().toISOString(),
    consumed_at: null,
    token_expires_at: new Date(Date.now() + 60000).toISOString(),
  })

  assert.equal(await consumeIterateEmailVerification(email, verificationToken), true)
  assert.equal(await consumeIterateEmailVerification(email, verificationToken), false)
})

test('payment status rejects an invalid payment access token', async () => {
  const { issueIteratePaymentAccessToken, routes } = loadClaimHelpers()
  const issuedToken = await issueIteratePaymentAccessToken('order-protected', 'buyer@example.com')
  assert.equal(typeof issuedToken, 'string')

  const response = createResponse()
  await routes.get('GET /api/iterate/payment-status/:orderNo')({
    params: { orderNo: 'order-protected' },
    headers: { authorization: 'Bearer wrong-token' },
  }, response)

  assert.equal(response.statusCode, 403)
  assert.equal(response.body.success, false)
  assert.equal(response.body.status, 'forbidden')
})

test('payment status rejects a missing payment access token', async () => {
  const { issueIteratePaymentAccessToken, routes } = loadClaimHelpers()
  const issuedToken = await issueIteratePaymentAccessToken('order-protected', 'buyer@example.com')
  assert.equal(typeof issuedToken, 'string')

  const response = createResponse()
  await routes.get('GET /api/iterate/payment-status/:orderNo')({
    params: { orderNo: 'order-protected' },
    headers: {},
  }, response)

  assert.equal(response.statusCode, 403)
  assert.equal(response.body.success, false)
  assert.equal(response.body.status, 'forbidden')
})

test('verified email recovery reissues a claim token for a previously claimed order', async () => {
  const orderNo = 'order-recovery'
  const email = 'buyer@example.com'
  const licenseKey = 'ITL1.payload.signature'
  const verificationToken = 'recovery-session'
  const {
    createIterateClaimToken,
    redeemIterateClaimToken,
    hashIterateEmailCredential,
    routes,
    tables,
  } = loadClaimHelpers({ ITERATE_EMAIL_VERIFICATION_SECRET: 'test-email-secret' })
  tables.iterate_email_verifications.push({
    id: 'verification-recovery',
    email,
    verification_token_hash: hashIterateEmailCredential('verification', email, verificationToken),
    verified_at: new Date().toISOString(),
    consumed_at: null,
    token_expires_at: new Date(Date.now() + 60000).toISOString(),
  })
  tables.iterate_orders.push({ order_id: orderNo, email, license_key: licenseKey })

  const original = await createIterateClaimToken(orderNo, licenseKey)
  assert.equal((await redeemIterateClaimToken(original.token)).success, true)

  const response = createResponse()
  await routes.get('POST /api/iterate/recover-order-access')({
    body: { orderNo, email, emailVerificationToken: verificationToken },
  }, response)

  assert.equal(response.statusCode, 200)
  assert.equal(response.body.paymentMethod, 'wechat')
  assert.equal(typeof response.body.paymentAccessToken, 'string')
  assert.equal(typeof response.body.claimToken, 'string')
  const recovered = await redeemIterateClaimToken(response.body.claimToken)
  assert.equal(recovered.success, true)
  assert.equal(recovered.licenseKey, licenseKey)
  assert.ok(tables.iterate_email_verifications[0].consumed_at)
})

test('alipay payment access can be recovered after the checkout page is lost', async () => {
  const { privateKey } = crypto.generateKeyPairSync('ed25519')
  const privateKeyB64 = privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64')
  const email = 'buyer@example.com'
  const orderNo = 'ITERATE-alipay-recovered'
  const verificationToken = 'verified-alipay-recovery'
  let wechatQueries = 0
  const {
    hashIterateEmailCredential,
    issueIteratePaymentAccessToken,
    routes,
    tables,
  } = loadClaimHelpers({
    ITERATE_EMAIL_VERIFICATION_SECRET: 'test-email-secret',
    ITERATE_LICENSE_PRIVATE_KEY_B64: privateKeyB64,
  }, {
    queryWechatOrderStatus: async () => {
      wechatQueries += 1
      return { trade_state: 'NOTPAY' }
    },
    queryAlipayTradeStatus: async requestedOrderNo => ({
      outTradeNo: requestedOrderNo,
      tradeStatus: 'TRADE_SUCCESS',
      totalAmount: '10.00',
      gmtPayment: '2026-05-27T12:30:00.000Z',
    }),
  })
  const initialToken = await issueIteratePaymentAccessToken(orderNo, email, {
    paymentMethod: 'alipay',
    planId: 'iterate_day7',
    amountCents: 1000,
    couponCode: '',
  })
  assert.equal(typeof initialToken, 'string')
  tables.iterate_email_verifications.push({
    id: 'verification-alipay-recovery',
    email,
    verification_token_hash: hashIterateEmailCredential('verification', email, verificationToken),
    verified_at: new Date().toISOString(),
    consumed_at: null,
    token_expires_at: new Date(Date.now() + 60000).toISOString(),
  })

  const recoveryResponse = createResponse()
  await routes.get('POST /api/iterate/recover-order-access')({
    body: { orderNo, email, emailVerificationToken: verificationToken },
  }, recoveryResponse)

  assert.equal(recoveryResponse.statusCode, 200)
  assert.equal(recoveryResponse.body.paymentMethod, 'alipay')
  assert.equal(typeof recoveryResponse.body.paymentAccessToken, 'string')
  assert.equal(recoveryResponse.body.claimToken, null)
  assert.equal(wechatQueries, 0)
  assert.equal(tables.iterate_payment_access[0].payment_method, 'alipay')
  assert.equal(tables.iterate_payment_access[0].plan_id, 'iterate_day7')
  assert.equal(tables.iterate_payment_access[0].amount_cents, 1000)
  assert.equal(tables.iterate_payment_access[0].coupon_code, '')

  const statusResponse = createResponse()
  await routes.get('GET /api/iterate/payment-status/:orderNo')({
    params: { orderNo },
    headers: { authorization: `Bearer ${recoveryResponse.body.paymentAccessToken}` },
  }, statusResponse)

  assert.equal(statusResponse.statusCode, 200)
  assert.equal(statusResponse.body.paymentMethod, 'alipay')
  assert.equal(statusResponse.body.status, 'success')
  assert.equal(typeof statusResponse.body.claimToken, 'string')
  assert.equal(wechatQueries, 0)
})

test('wechat create-payment accepts checkout without email verification', async () => {
  let providerPayload = null
  const { routes, tables } = loadClaimHelpers({}, {
    generateOrderNo: () => 'ITERATE-wechat-create',
    callWechatAPI: async (_method, _path, body) => {
      providerPayload = JSON.parse(body)
      return { code_url: 'weixin://iterate-no-email' }
    },
  })

  const response = createResponse()
  await routes.get('POST /api/iterate/create-payment')({
    body: {
      videoId: 'iterate_day7',
      videoTitle: 'Iterate 7天体验',
      paymentMethod: 'wechat',
    },
  }, response)

  assert.equal(response.statusCode, 200)
  assert.equal(response.body.paymentMethod, 'wechat')
  assert.equal(response.body.codeUrl, 'weixin://iterate-no-email')
  assert.equal(providerPayload.attach.includes('email:'), true)
  assert.equal(tables.iterate_payment_access[0].payment_method, 'wechat')
  assert.equal(tables.iterate_payment_access[0].email, '')
  assert.equal(tables.iterate_email_verifications.length, 0)
})

test('alipay precreate returns a QR code and persists provider checkout metadata', async () => {
  let adapterInput = null
  const { routes, tables } = loadClaimHelpers({}, {
    generateOrderNo: () => 'ITERATE-alipay-create',
    createAlipayPrecreatePayment: async (input) => {
      adapterInput = input
      return { qrCode: 'https://qr.alipay.com/iterate-test' }
    },
  })

  const response = createResponse()
  await routes.get('POST /api/iterate/create-payment')({
    body: {
      videoId: 'iterate_day7',
      videoTitle: 'Iterate 7天体验',
      paymentMethod: 'alipay',
    },
  }, response)

  assert.equal(response.statusCode, 200)
  assert.equal(response.body.paymentMethod, 'alipay')
  assert.equal(response.body.codeUrl, 'https://qr.alipay.com/iterate-test')
  assert.equal(response.body.amountCents, 1000)
  assert.equal(adapterInput.totalAmount, '10.00')
  assert.equal(adapterInput.metadata.email, '')
  assert.equal(tables.iterate_payment_access[0].payment_method, 'alipay')
  assert.equal(tables.iterate_payment_access[0].plan_id, 'iterate_day7')
  assert.equal(tables.iterate_payment_access[0].amount_cents, 1000)
  assert.equal(tables.iterate_payment_access[0].email, '')
})

test('an unavailable alipay adapter fails without requiring email verification', async () => {
  const { routes, tables } = loadClaimHelpers()

  const response = createResponse()
  await routes.get('POST /api/iterate/create-payment')({
    body: {
      videoId: 'iterate_day7',
      videoTitle: 'Iterate 7天体验',
      paymentMethod: 'alipay',
    },
  }, response)

  assert.equal(response.statusCode, 503)
  assert.equal(tables.iterate_email_verifications.length, 0)
})

test('alipay paid status issues a claim token through the shared fulfillment flow', async () => {
  const { privateKey } = crypto.generateKeyPairSync('ed25519')
  const privateKeyB64 = privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64')
  const { issueIteratePaymentAccessToken, routes, tables } = loadClaimHelpers({
    ITERATE_LICENSE_PRIVATE_KEY_B64: privateKeyB64,
  }, {
    queryAlipayTradeStatus: async orderNo => ({
      outTradeNo: orderNo,
      tradeStatus: 'TRADE_SUCCESS',
      totalAmount: '10.00',
      gmtPayment: '2026-05-27T12:30:00.000Z',
    }),
  })
  const token = await issueIteratePaymentAccessToken('ITERATE-alipay-paid', 'buyer@example.com', {
    paymentMethod: 'alipay',
    planId: 'iterate_day7',
    amountCents: 1000,
    couponCode: '',
  })

  const response = createResponse()
  await routes.get('GET /api/iterate/payment-status/:orderNo')({
    params: { orderNo: 'ITERATE-alipay-paid' },
    headers: { authorization: `Bearer ${token}` },
  }, response)

  assert.equal(response.statusCode, 200)
  assert.equal(response.body.paymentMethod, 'alipay')
  assert.equal(response.body.status, 'success')
  assert.equal(typeof response.body.claimToken, 'string')
  assert.equal(tables.iterate_orders[0].payment_method, 'alipay')
  assert.equal(tables.iterate_licenses.length, 1)
})
