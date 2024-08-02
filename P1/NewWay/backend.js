const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Keep track of players in the systems
var userCount = 1;

var users = new Array();
var usersFinalScore = new Array(); // Error handling to not retransmit the scores

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/2048.html');
});

io.on('connection', (socket) => {

  // Creates the current user
  currentUser="Player"+userCount.toString(10);
  users.push(currentUser);
  userCount++;
  socket.user = currentUser;
  socket.emit('getPlayer', socket.user);

  //current user has connected text
  console.log(`${socket.user} has connected`);
  socket.emit('message', 'You have entered the 2048 board!');
  socket.broadcast.emit('message', `${socket.user} has joined the 2048 board!`);

  socket.on('disconnect', () => {
    // removes current player from array of players and does a subtracts the userCount
    userIndex = users.indexOf(socket.user);
    users.splice(userIndex, 1);
    userCount--;

    // current user has disconnected
    console.log(`${socket.user} has disconnected`);
    socket.broadcast.emit('message', `${socket.user} has disconnected the 2048 board!`);
  });

  // Receiving the finalScores of other players
  socket.on('finalScore', score => {
    // Gets the final score and doesn't emit once all the scores are accepted 
    if (!(usersFinalScore.includes(socket.user))){
      usersFinalScore.push(socket.user);
      console.log(`${socket.user} got a final score of ${score}`);
      socket.emit('message', 'final score received');
      socket.broadcast.emit('finalScore',`{"Player":"${socket.user}", "finalScore":${score}}`) // Sends a request over to the frontend of the current player's board 
    }
  })

  socket.on('wipeScore',  () => {
    //Wipes all the scores stored in the finalScore section
    while(usersFinalScore.length > 0){
      usersFinalScore.pop();
    }
  })


  socket.on('outboundBoard', board => {
    // Sends the current status of the board to the backend
    // console.log(`${socket.user} sent a board`);
    socket.broadcast.emit('incomingBoard', { user: socket.user, userBoard: board});
    // the board is interrupted as so and the index of the board information is from 0 to 15
  })


  socket.on('outboundScore', score => {
    // Sends the current status of the board to the backend
    // console.log(`${socket.user} sent a score`);
    socket.broadcast.emit('incomingScore', { user: socket.user, userscore: score});
    // the board is interrupted as so and the index of the board information is from 0 to 15
  })

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

function displayScore(player, score){
  // Inputs new players and their scores
  const scoreBoard = document.getElementById('scoreBoard');
  const scoreElement = document.getElementById('div');
  scoreElement.classList.add('score-info');
  scoreElement.innerHTML = 'Player: ${player}, Score: ${score}';
  scoreBoard.appendChild(scoreElement);
}