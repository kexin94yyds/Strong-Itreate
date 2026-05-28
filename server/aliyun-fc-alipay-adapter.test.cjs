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

test('precreate uses the official SDK v3 QR endpoint contract', async () => {
  const calls = []
  class FakeAlipaySdk {
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
