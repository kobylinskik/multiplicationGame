const socket=io();

var points = 0;

socket.on('message', (text) => {
    writeMessage(text);
});

socket.on('scoreMsg', (score) => {
    document.getElementById('scoreHolder').innerHTML="Player1: " + score[0] + ", player2: " + score[1];
});

const answerForm=document.getElementById('answer-form');
answerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    var input=document.getElementById('answer');
    var answer=input.value;
    input.value=0; 
    socket.emit('playerAnswer', answer); 
});

const writeMessage = (text)=>{
    const list=document.getElementById('questions');
    const question=document.createElement('li');
    question.innerHTML=text;
    list.appendChild(question);
};

const onAnswerSubitted = (evt) => {
    evt.preventDefault();
    var input=document.getElementById('answer');
    var answer=input.value;
    input.value=0; 
    socket.emit('playerAnswer', answer);   
};