import React, { useEffect, useState } from "react";
import { socket } from "./webSockets";
import './index.css'
const TickerTable: React.FC = () => {
  const [tickers, setTickers] = useState<any[]>([]);

  useEffect(() => {
    socket.emit("start")
    socket.on("ticker", (data) => {
      console.log(data)
      setTickers(data);
    });

    return () => {
      socket.off("ticker");
    };
  }, []);

  return (<>
    <div className="w-full mt-6 ml-4">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-100">
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
          {tickers.map((ticker, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-3">{ticker.ticker}</td>
              <td className="py-2 px-3">{ticker.exchange}</td>
              <td className="py-2 px-3">{ticker.price}</td>
              <td className="py-2 px-3">{ticker.change}</td>
              <td className="py-2 px-3">{ticker.change_percent}</td>
              <td className="py-2 px-3">{ticker.dividend}</td>
              <td className="py-2 px-3">{ticker.yield}</td>
              <td className="py-2 px-3">{new Date(ticker.last_trade_time).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TickerTable;
