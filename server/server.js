const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const favicon = require('serve-favicon');
const PORT = 3000;

const app = express();

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

//PROXY
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});

app.use('/api', (req, res) => {
  apiProxy.web(req, res);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, (err) => {
  if(err) return console.log(err);

  console.log(`Server running at http://localhost:${PORT}`);
});