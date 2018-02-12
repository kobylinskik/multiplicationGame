function play(player1, player2){
    var players = [];
    players.push(player1);
    players.push(player2);
    player1.score=0;
    player2.score=0;
    players.forEach((player) => player.emit('message', 'The game has begun!'));
    var a, b;
    beginRound(players);
    players.forEach((player) => {
        player.on('playerAnswer', answer => {
            evaluateAnswer(players, player, answer);
        });
    });   
};

module.exports = play;

function beginRound(players){
    a=Math.ceil(Math.random()*10);
    b=Math.ceil(Math.random()*10);
    players.forEach((player) => player.emit('message', 'How much is: ' + a + " * " + b + '?'));
}

function evaluateAnswer(players, player, answer){
    if(answer==a * b){
        player.emit('message', 'You answered correctly');
        player.score++;
        players.forEach((player) => player.emit('scoreMsg', ([players[0].score, players[1].score])));
        beginRound(players);
    }
    else
        player.emit('message', 'You answered incorrectly');
};