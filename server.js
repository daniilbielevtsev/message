const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const FILE_PATH = path.join(__dirname, 'messages.json');

app.use(express.static(__dirname));
app.use(express.json());

app.get('/messages', (req, res) => {
  const data = fs.readFileSync(FILE_PATH);
  res.json(JSON.parse(data));
});

app.post('/messages', (req, res) => {
  const messages = JSON.parse(fs.readFileSync(FILE_PATH));
  messages.push(req.body);
  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));
  res.sendStatus(200);
});

app.delete('/messages/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const messages = JSON.parse(fs.readFileSync(FILE_PATH));
  if (index >= 0 && index < messages.length) {
    messages.splice(index, 1);
    fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));
  }
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
