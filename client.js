const socket=io();

var points = 0;

socket.on('message', (text) => {
    writeMessage(text);
});

//Changes the text in HTML file whenever the 'scoreMsg' event is received
socket.on('scoreMsg', (score) => {
    document.getElementById('scoreHolder').innerHTML='Score: ' + score;
});

//Shows the game window
socket.on('showGame', () => {
    const messageWindow=document.getElementById('message-window');
    messageWindow.textContent='The game has begun!';
    messageWindow.classList.remove('waitingForPlayer');
    messageWindow.classList.add('gameStarted');
    document.getElementById('game-window').style.display='block';
});

//Lets a player enter a nickname
const nicknameForm=document.getElementById('nickname-form');
nicknameForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    var input=document.getElementById('nickname');
    var nickname=input.value;
    socket.emit('nicknameSelected', nickname);
    var nicknameWindow=document.getElementById('nickname-window');
    nicknameWindow.style.display='none';
});

//Allows players to submit their answers
const answerForm=document.getElementById('answer-form');
answerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    var input=document.getElementById('answer');
    var answer=input.value;
    input.value=0; 
    socket.emit('playerAnswer', answer); 
});

const writeMessage = (text)=>{
    const question=document.getElementById('question');    
    question.innerHTML=text;
};

//Handles the answer submission
const onAnswerSubitted = (evt) => {
    evt.preventDefault();
    var input=document.getElementById('answer');
    var answer=input.value;
    input.value=0; 
    socket.emit('playerAnswer', answer);   
};