'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const FETCH_INTERVAL = 2000;
const PORT = 4000;
let fetchInterval = FETCH_INTERVAL;

const tickers = [
  { ticker: 'AAPL', active: true }, // Apple
  { ticker: 'GOOGL', active: true }, // Alphabet
  { ticker: 'MSFT', active: true }, // Microsoft
  { ticker: 'AMZN', active: true }, // Amazon
  { ticker: 'FB', active: true }, // Facebook
  { ticker: 'TSLA', active: true }, // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {
  const quotes = tickers.map(ticker => {
    if(ticker.active)
      return ({
        ticker: ticker.ticker,
        exchange: 'NASDAQ',
        price: randomValue(100, 300, 2),
        change: randomValue(0, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
        price_change: 'none',
        active: true,
      })
    else{
      return ({
        ticker: ticker.ticker,
        exchange: 'NASDAQ',
        price: ticker.price,
        change: ticker.change,
        change_percent: ticker.change_percent,
        dividend: ticker.dividend,
        yield: ticker.yield,
        last_trade_time: '',
        price_change: 'none',
        active: false
      })
    }
}
  ) 
  

  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  getQuotes(socket);

  let timer = setInterval(function() {
    getQuotes(socket);
  }, fetchInterval); 

  socket.on('disconnect', function() {
    clearInterval(timer);
  });


  socket.on('setInterval', (interval) => {
    if (interval > 0) {
      fetchInterval = interval;
      clearInterval(timer);

      timer = setInterval(function() {
        getQuotes(socket);
      }, fetchInterval);
    }
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  console.log("Connected");

  socket.on('start', () => {
    trackTickers(socket);
  });


  socket.on('toggleTicker', (ticker) => {
    const foundTicker = tickers.find(t => t.ticker === ticker);
    if (foundTicker) {
      foundTicker.active = !foundTicker.active;
    }
  });


  socket.on('setInterval', (interval) => {

    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
