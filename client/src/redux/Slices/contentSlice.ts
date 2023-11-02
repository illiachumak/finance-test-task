import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../webSockets";
import { Ticker } from "../../utils/types/tickerType";

export interface contState {
  tickerList: Ticker[];
}

const initialState: contState = {
  tickerList: [],
};


export const contSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setTickerList: (state, action) => {
      state.tickerList = action.payload.map((newTicker: Ticker) => {
        const prevTicker = state.tickerList.find((t) => t.ticker === newTicker.ticker);
        if (prevTicker) {
          if (newTicker.price > prevTicker.price) {
            return { ...newTicker, price_change: "increase" };
          } else if (newTicker.price < prevTicker.price) {
            return { ...newTicker, price_change: "decrease" };
          } else {
            return { ...newTicker, price_change: "none" };
          }
        }
        return newTicker;
      });
    },
    toggleTicker: (state, action) => {
      const tickerToToggle = state.tickerList.find((t) => t.ticker === action.payload.ticker);
      if (tickerToToggle !== undefined) {
        tickerToToggle.active = !tickerToToggle.active;
        socket.emit("toggleTicker", action.payload.ticker)
      }
    },
    setSettings: (_, action) => {
      socket.emit("setInterval", action.payload)
    },
  },
});


export const {setTickerList, toggleTicker, setSettings} = contSlice.actions;

export default contSlice.reducer;
