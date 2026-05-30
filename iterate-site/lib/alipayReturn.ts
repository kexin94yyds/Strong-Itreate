export const ALIPAY_RETURN_CHANNEL = 'iterate-payment-return';
export const ALIPAY_RETURN_STORAGE_KEY = 'iterate_alipay_return_latest';

export type AlipayReturnPayload = {
  type: 'iterate-alipay-return';
  orderNo: string;
  tradeNo: string;
  amount: string;
  timestamp: number;
  rawQuery: string;
};

export function parseAlipayReturnPayload(search = typeof window !== 'undefined' ? window.location.search : ''): AlipayReturnPayload | null {
  const params = new URLSearchParams(search);
  const method = params.get('method') || '';
  const orderNo = params.get('out_trade_no') || '';

  if (!orderNo || !method.includes('alipay.trade.page.pay.return'))
    return null;

  return {
    type: 'iterate-alipay-return',
    orderNo,
    tradeNo: params.get('trade_no') || '',
    amount: params.get('total_amount') || '',
    timestamp: Date.now(),
    rawQuery: search,
  };
}

export function isAlipayReturnPayload(value: unknown): value is AlipayReturnPayload {
  if (!value || typeof value !== 'object')
    return false;

  const payload = value as Partial<AlipayReturnPayload>;
  return payload.type === 'iterate-alipay-return' && typeof payload.orderNo === 'string' && payload.orderNo.length > 0;
}

export function publishAlipayReturn(payload: AlipayReturnPayload) {
  if (typeof window === 'undefined')
    return;

  try {
    window.localStorage.setItem(ALIPAY_RETURN_STORAGE_KEY, JSON.stringify(payload));
  }
  catch {
    // localStorage can be unavailable in restricted browser modes.
  }

  if ('BroadcastChannel' in window) {
    try {
      const channel = new BroadcastChannel(ALIPAY_RETURN_CHANNEL);
      channel.postMessage(payload);
      channel.close();
    }
    catch {
      // Ignore browsers that expose but block BroadcastChannel.
    }
  }

  try {
    window.opener?.postMessage(payload, window.location.origin);
  }
  catch {
    // The cashier tab may intentionally be opened without an opener.
  }
}
