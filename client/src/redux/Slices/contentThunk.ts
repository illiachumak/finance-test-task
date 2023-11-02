import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../../webSockets';
import { setTickerList } from './contentSlice';

export const startSocketListening = createAsyncThunk('content/startSocketListening', async (_, { dispatch }) => {
  socket.emit('start');

  socket.on('ticker', (data) => {
    dispatch(setTickerList(data));
  });
});

export const stopSocketListening = createAsyncThunk('content/stopSocketListening', (_, { dispatch }) => {
  socket.off('ticker');
});

