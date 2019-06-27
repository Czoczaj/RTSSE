const exampleScore = {
  nick: 'jakiś menel',
  points: 1,
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
  if(score.points === NaN){
    log ('big czangas nie lubi');
    return;}
    if(scores.length >= limit){
      if(scores[scores.length -1].points >= score.points){
        log('soczyste bekniecie');
        return;
        
      }
    }
  if(!score.nick){score.nick = 'big chungus'}
  scores.push(score);
  scores.sort((a,b) => b.points - a.points)

  // zagwarantuj że ustawiono nick
  // zaktualizuj tablicę
  // powiedz wszystkim że zmieniły się wyniki
  // log
  log(JSON.stringify(score));
  scores = scores.slice(0,limit);
  io.emit('update',scores);
  log(`chungus zjadl ${score.nick}`)
} 

scores = [exampleScore];
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json())

app.get('/ugaBuga', (req, res) => {
  // send scores
  res.text('lol');
})
function abc(req,res){
  res.send('owca,owca');
}
app.get('/highscores', (req, res) => {
  log('uganda eeee');
  res.json(scores);
})
app.post('/highscores', (req, res) => {
  var newScore = req.body;
  newScore.points = Number(newScore.points);
  addScore(newScore);
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