const assert = require('node:assert/strict')
const test = require('node:test')
const { createAlipayAdapters, createSdkConfig } = require('./aliyun-fc-alipay-adapter.cjs')

const environment = {
  ALIPAY_APP_ID: 'test-app',
  ALIPAY_PRIVATE_KEY: 'private-key',
  ALIPAY_PUBLIC_KEY: 'public-key',
  ALIPAY_NOTIFY_URL: 'https://example.com/notify',
}

test('SDK config requires verification material and supports public-key mode', () => {
  assert.deepEqual(createSdkConfig(environment), {
    appId: 'test-app',
    privateKey: 'private-key',
    keyType: 'PKCS8',
    alipayPublicKey: 'public-key',
  })
  assert.throws(
    () => createSdkConfig({ ALIPAY_APP_ID: 'test-app', ALIPAY_PRIVATE_KEY: 'private-key' }),
    /公钥或证书/,
  )
})

test('page pay uses the official desktop cashier contract', async () => {
  const calls = []
  class FakeAlipaySdk {
    async pageExecute(method, httpMethod, options) {
      calls.push({ method, httpMethod, options })
      return 'https://openapi.alipay.com/gateway.do?method=alipay.trade.page.pay'
    }
  }
  const adapter = createAlipayAdapters(FakeAlipaySdk, environment)

  const result = await adapter.createAlipayPagePayment({
    outTradeNo: 'ITERATE-order',
    subject: 'Iterate - 7 天版',
    totalAmount: '10.00',
    notifyUrl: environment.ALIPAY_NOTIFY_URL,
    returnUrl: 'https://iterate.xin/iterate/buy.html',
  })

  assert.equal(result.payUrl, 'https://openapi.alipay.com/gateway.do?method=alipay.trade.page.pay')
  assert.deepEqual(calls[0], {
    method: 'alipay.trade.page.pay',
    httpMethod: 'GET',
    options: {
      bizContent: {
        out_trade_no: 'ITERATE-order',
        product_code: 'FAST_INSTANT_TRADE_PAY',
        total_amount: '10.00',
        subject: 'Iterate - 7 天版',
      },
      notifyUrl: environment.ALIPAY_NOTIFY_URL,
      returnUrl: 'https://iterate.xin/iterate/buy.html',
    },
  })
})

test('precreate remains available for QR fallback tooling', async () => {
  const calls = []
  class FakeAlipaySdk {
    async pageExecute() {
      return 'https://openapi.alipay.com/gateway.do?method=alipay.trade.page.pay'
    }

    async curl(method, path, options) {
      calls.push({ method, path, options })
      return { data: { qr_code: 'https://qr.alipay.com/iterate' } }
    }
  }
  const adapter = createAlipayAdapters(FakeAlipaySdk, environment)

  const result = await adapter.createAlipayPrecreatePayment({
    outTradeNo: 'ITERATE-order',
    subject: 'Iterate - 7 天版',
    totalAmount: '10.00',
    notifyUrl: environment.ALIPAY_NOTIFY_URL,
  })

  assert.equal(result.qrCode, 'https://qr.alipay.com/iterate')
  assert.deepEqual(calls[0], {
    method: 'POST',
    path: '/v3/alipay/trade/precreate',
    options: {
      body: {
        out_trade_no: 'ITERATE-order',
        total_amount: '10.00',
        subject: 'Iterate - 7 天版',
        notify_url: environment.ALIPAY_NOTIFY_URL,
      },
    },
  })
})

test('query and notification verification are exposed to the shared payment route', async () => {
  class FakeAlipaySdk {
    async curl() {
      return {
        data: {
          out_trade_no: 'ITERATE-order',
          trade_status: 'TRADE_SUCCESS',
          total_amount: '10.00',
          send_pay_date: '2026-05-27 20:00:00',
        },
      }
    }

    checkNotifySignV2(payload) {
      return payload.sign === 'valid-signature'
    }
  }
  const adapter = createAlipayAdapters(FakeAlipaySdk, environment)

  assert.deepEqual(await adapter.queryAlipayTradeStatus('ITERATE-order'), {
    outTradeNo: 'ITERATE-order',
    tradeStatus: 'TRADE_SUCCESS',
    totalAmount: '10.00',
    gmtPayment: '2026-05-27 20:00:00',
  })
  assert.equal(adapter.verifyAlipayNotification({ sign: 'valid-signature' }), true)
})

test('query treats a not-yet-created page pay trade as waiting for buyer payment', async () => {
  class FakeAlipaySdk {
    async curl() {
      const error = new Error('交易不存在 (traceId: test-trace)')
      error.code = 'ACQ.TRADE_NOT_EXIST'
      throw error
    }

    checkNotifySignV2() {
      return false
    }
  }
  const adapter = createAlipayAdapters(FakeAlipaySdk, environment)

  assert.deepEqual(await adapter.queryAlipayTradeStatus('ITERATE-page-pay-new'), {
    outTradeNo: 'ITERATE-page-pay-new',
    tradeStatus: 'WAIT_BUYER_PAY',
    totalAmount: '',
    gmtPayment: '',
  })
})
