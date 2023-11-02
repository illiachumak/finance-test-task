import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleTicker } from "../../redux/Slices/contentSlice";
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { Ticker } from "../../utils/types/tickerType";


const TickerTable = () => {
  
  const dispatch = useAppDispatch()
  const { tickerList } = useAppSelector(state => state.cont)

  const handleToggleTicker = (ticker: Ticker) => {
    dispatch(toggleTicker({ ticker: ticker.ticker }))
  }

  return (
    <>
    <div className="w-full mt-6 pl-4 pr-4">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-100">
            <th></th>
            <th className="py-2 px-3 text-left">Ticker</th>
            <th className="py-2 px-3 text-left">Exchange</th>
            <th className="py-2 px-3 text-left">Price</th>
            <th className="py-2 px-3 text-left">Change</th>
            <th className="py-2 px-3 text-left">Change Percent</th>
            <th className="py-2 px-3 text-left">Dividend</th>
            <th className="py-2 px-3 text-left">Yield</th>
            <th className="py-2 px-3 text-left">Last Trade Time</th>
          </tr>
        </thead>
        <tbody>
          {tickerList.map((ticker, index) => (
            <tr key={index} className="border-b">
              <td><input type="checkbox" className="toggle" checked={ticker.active} onChange={() => handleToggleTicker(ticker)}/></td>
              <td className="py-2 px-3">{ticker.ticker}</td>
              <td className="py-2 px-3">{ticker.exchange}</td>
              <td className="py-2 px-3">{ticker.price}</td>
              <td className="py-2 px-3">{ticker.change}</td>
              <td className="py-2 px-3 flex flex-row items-center mt-2">
              {ticker.change_percent &&`${(parseFloat(`${ticker.change_percent}`) * 100).toFixed(0)}%`}
                {ticker.price_change === "increase" ? (
                  <FaArrowTrendUp className="text-green-500 ml-1" />
                ) : ticker.price_change === "decrease" ? (
                  <FaArrowTrendDown className="text-red-500 ml-1" />
                ) : null}
              </td>
              <td className="py-2 px-3">{ticker.dividend}</td>
              <td className="py-2 px-3">{ticker.yield}</td>
              <td className="py-2 px-3">
                {ticker.last_trade_time && new Date(ticker.last_trade_time).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default TickerTable;
