const http=require('http');
const express=require('express');
const app=express();
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);
const game=require('./game.js');

var waitingPlayer=null;

io.on('connection', (socket) => {
    console.log('Player connected.');
    socket.emit('message', 'Welcome to the game!');
    if(waitingPlayer){             
        game(waitingPlayer, socket);
        waitingPlayer=null;         
    }
    else{
        socket.emit('message', 'Waiting for another player.');
        waitingPlayer=socket;        
    }    
    socket.on('playerAnswer', (answer) => {
        console.log('Player answered: ' + answer);
    });
    socket.on('disconnect', () => {
        console.log('Player disconnected.');
    });
});

app.use(express.static(__dirname));
server.listen(8080, () => {
    console.log('Listening on port 8080');    
});