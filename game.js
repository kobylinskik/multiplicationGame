var players = [];
var score=[];

function play(player1, player2){
    players.push(player1);
    players.push(player2);
    player1.score=0;
    player2.score=0;
    players.forEach((player) => player.emit('message', 'The game has begun!'));
    var a, b;
    beginRound(players);
    players.forEach((player) => {
        player.on('playerAnswer', answer => {
            evaluateAnswer(player, answer);
        });
    });   
};

module.exports = play;

function beginRound(players){
    a=Math.ceil(Math.random()*10);
    b=Math.ceil(Math.random()*10);
    players.forEach((player) => player.emit('message', 'How much is: ' + a + " * " + b + '?'));
}

function evaluateAnswer(player, answer){
    if(answer==a * b){
        player.emit('message', 'You answered correctly');
        player.score++;
        console.log(player + ' score = ' + player.score);
        beginRound(players);
    }
    else
        player.emit('message', 'You answered incorrectly');
};