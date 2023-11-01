export type Ticker = {
    ticker: string;
    exchange: string;
    price: number;
    change: number;
    change_percent: number;
    dividend: number;
    yield: number;
    last_trade_time: Date | null;
    price_change: 'increase' | 'decrease' | 'none';
    active: boolean;
  };
  