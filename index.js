const exampleScore = {
  nick: "Ojej",
  points: 100,
  lastest:true
}

const path = require("path");
const bodyParser = require('body-parser')
const app = require('express')()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5555

const stf = path.join(__dirname, 'index.html');
app.get('/', (req, res) => res.sendFile(stf))


let scores = [];
let limit = 10;
const password = "q";

function log(txt){
  io.emit("log",txt);
}

function addScore(score){
  // sprawdź czy podano liczbę pkt.
  // sprawdź czy wynik kwalifikuje się do tabeli
  // zagwarantuj że ustawiono nick
  // zaktualizuj tablicę
  // powiedz wszystkim że zmieniły się wyniki
  // log
} 


app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json())

app.get('/highscores', (req, res) => {
  // send scores
  res.json({})
})
app.post('/highscores', (req, res) => {
  // add score
  res.json({});
})
app.post('/limit', (req, res) => {
  //
})
app.delete('/highscores', (req, res) => {
  //
})

io.on('connection', function (socket) {
  socket.on('update', function (data) {
    // add score
  });
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`))