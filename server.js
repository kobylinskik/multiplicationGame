//Set up the necessary constants
const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);
const game=require('./game.js');

//Waiting player will be the first socket that connects
var waitingPlayer=null;

//Method on connection. The first connected player will become the 'waitingPlayer', the other one will make the game start.
io.on('connection', (socket) => {
    console.log('Player connected.');
    socket.emit('message', 'Welcome to the game!');
    if(waitingPlayer)
        socket.nickname='player2';
    else
        socket.nickname='player1';
    socket.on('nicknameSelected', (nickname) => {
        socket.nickname=nickname;
    });
    if(waitingPlayer){             
        game(waitingPlayer, socket);
        waitingPlayer=null;         
    }
    else{
        socket.emit('message', 'Waiting for another player.');
        waitingPlayer=socket;        
    }    
    socket.on('playerAnswer', (answer) => { //Logs the player's answer
        console.log('Player answered: ' + answer);
    });
    socket.on('disconnect', () => {
        waitingPlayer=null;
        console.log('Player disconnected.');
    });
});

app.use(express.static(__dirname));
server.listen(8080, () => {
    console.log('Listening on port 8080');    
});