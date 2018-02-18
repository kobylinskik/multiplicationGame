//A function that's initiated when the second player connects
function play(player1, player2){    
    var players = []; //Will contain two players as objects
    players.push(player1);
    players.push(player2);    
    player1.score=0; //Set up variables for players' scores
    player2.score=0;
    players.forEach((player) => player.emit('showGame'));
    players.forEach((player) => player.emit('message', 'The game has begun!')); //Message the two players that the game has started
    var a, b; //Sets up variables that will be used as factors in the equation to solve
    beginRound(players); //The first round begins
    players.forEach((player) => { 
        player.on('playerAnswer', answer => { //Whenever one of the players submits an answer, the function to evaluate the answer is called
            evaluateAnswer(players, player, answer);
        });
    });   
};

//Generates two random numbers from 1 to 10 and emits the question to the players
function beginRound(players){ 
    a=Math.ceil(Math.random()*10);
    b=Math.ceil(Math.random()*10);
    players.forEach((player) => player.emit('message', 'How much is: ' + a + " * " + b + '?'));
}

//Checks if the answer given by the player is correct and if it is, it awards a point and starts the new round
function evaluateAnswer(players, player, answer){ 
    if(answer==a * b){
        player.emit('message', 'You answered correctly');
        player.score++;
        players.forEach((player) => player.emit('scoreMsg', players[0].nickname + ': ' + players[0].score + ', ' + players[1].nickname + ': ' + players[1].score));
        beginRound(players);
    }
    else
        player.emit('message', 'You answered incorrectly');
};

//Export the method 'play' so that it can be called in the server.js program
module.exports = play; 