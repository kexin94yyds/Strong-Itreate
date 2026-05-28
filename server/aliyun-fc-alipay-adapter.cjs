/**
 * Alipay adapter for the complete Aliyun FC payment package.
 *
 * Integration in the deployable FC index.js:
 *   // Install in the deployable FC package: npm install alipay-sdk --save
 *   const { AlipaySdk } = require('alipay-sdk');
 *   const { createAlipayAdapters } = require('./aliyun-fc-alipay-adapter.cjs');
 *   Object.assign(globalThis, createAlipayAdapters(AlipaySdk, process.env));
 *
 * This uses the official SDK v4 API v3 client. Do not replace it with the
 * historical /api/alipay-sandbox handwritten-signature routes.
 */

function requiredEnv(env, name) {
  const value = String(env[name] || '').trim()
  if (!value)
    throw new Error(`缺少 ${name}，无法启用支付宝支付`)
  return value
}

function createSdkConfig(env) {
  const config = {
    appId: requiredEnv(env, 'ALIPAY_APP_ID'),
    privateKey: requiredEnv(env, 'ALIPAY_PRIVATE_KEY'),
    keyType: env.ALIPAY_KEY_TYPE || 'PKCS8',
  }

  if (env.ALIPAY_PUBLIC_KEY) {
    config.alipayPublicKey = env.ALIPAY_PUBLIC_KEY
  }
  else if (env.ALIPAY_APP_CERT_PATH && env.ALIPAY_PUBLIC_CERT_PATH && env.ALIPAY_ROOT_CERT_PATH) {
    config.appCertPath = env.ALIPAY_APP_CERT_PATH
    config.alipayPublicCertPath = env.ALIPAY_PUBLIC_CERT_PATH
    config.alipayRootCertPath = env.ALIPAY_ROOT_CERT_PATH
  }
  else {
    throw new Error('缺少支付宝公钥或证书配置，无法验签')
  }

  if (env.ALIPAY_GATEWAY)
    config.gateway = env.ALIPAY_GATEWAY

  return config
}

function resultData(result) {
  return result && result.data ? result.data : result
}

function createAlipayAdapters(AlipaySdk, env = process.env) {
  if (typeof AlipaySdk !== 'function')
    throw new Error('未加载官方 alipay-sdk 的 AlipaySdk')

  const sdk = new AlipaySdk(createSdkConfig(env))

  return {
    async createAlipayPrecreatePayment({ outTradeNo, subject, totalAmount, notifyUrl }) {
      const result = await sdk.curl('POST', '/v3/alipay/trade/precreate', {
        body: {
          out_trade_no: outTradeNo,
          total_amount: totalAmount,
          subject,
          notify_url: notifyUrl,
        },
      })
      const data = resultData(result)
      const qrCode = data?.qr_code || data?.qrCode || ''
      if (!qrCode)
        throw new Error(data?.sub_msg || data?.subMsg || data?.msg || '支付宝预下单未返回二维码')
      return { qrCode }
    },

    async queryAlipayTradeStatus(orderNo) {
      const result = await sdk.curl('POST', '/v3/alipay/trade/query', {
        body: { out_trade_no: orderNo },
      })
      const data = resultData(result)
      return {
        outTradeNo: data?.out_trade_no || data?.outTradeNo || '',
        tradeStatus: data?.trade_status || data?.tradeStatus || '',
        totalAmount: data?.total_amount || data?.totalAmount || '',
        gmtPayment: data?.send_pay_date || data?.sendPayDate || data?.gmt_payment || data?.gmtPayment || '',
      }
    },

    verifyAlipayNotification(payload) {
      return sdk.checkNotifySignV2(payload)
    },
  }
}

module.exports = { createAlipayAdapters, createSdkConfig }
