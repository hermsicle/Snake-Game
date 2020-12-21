const score = document.querySelector('#score');
const startButton = document.querySelector('#start');
const grid = document.querySelector('.grid');

const easyModeButton = document.querySelector('#easyButton');
const mediumModeButton = document.querySelector('#mediumButton');
const hardModeButton = document.querySelector('#hardButton');
const btns = document.getElementsByClassName('btn');

for(let i = 0; i < btns.length; i++){
    btns[i].addEventListener('click' , () => {
        if(btns[i].classList.contains('active')){
            btns[i].classList.remove('active');
            btns[i].classList.add('btn')
            console.log(btns[i])
        } else {
            btns[i].classList.add('active')
            console.log(btns[i])
        }
    })
}

let squares = [];

let currentSnake = [2, 1, 0];

//Create a direction variable and initialize it as 1
let direction = 1;  //We will use this direction to move our snake

//Create a width = 10 because that is the length of our grid
const width = 20;

//Create a appleIndex variable and declare it as 0
let appleIndex = 0;
let userScore = 0;
let intervalTime = 500;
let speed = 0.9;

let timerId;

const createGrid = () => {
    for(let i = 0; i < 200; i++) {
        const square = document.createElement('div');
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}   
createGrid();

currentSnake.forEach(index => {
    squares[index].classList.add('snake');
})

//Create a move function that moves the snake 
const move = () => {
    //Create our conditional statement that checks whether or not our snakehead Hits a wall
    if(
        //Check if the snake has hit the bottom wall
        (currentSnake[0] + width >= width*width && direction === width) ||

        //Check if the snake has hit the top wall
        (currentSnake[0] - width < 0 && direction === -width) ||

        //Check if the snake has hit the right wall
        (currentSnake[0] % width === width-1 && direction === 1) ||

        //Check if the snake has hit the left wall
        (currentSnake[0] % width === 0 && direction === -1) ||

        //Check if the snake has run into itself
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');

    //We want to unshift currentSnake[0] + direction because that will be our new snake head
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add('snake');

    //Pseudo Code Logic of snake eating the apple
    //If it hits apple 
    if(squares[currentSnake[0]].classList.contains('apple')) {
        //Remove class apple    
        squares[currentSnake[0]].classList.remove('apple')

        //Grow our snake 
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple();
        userScore++;
        score.textContent = userScore;
        clearInterval(timerId)
        //Increase the time
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }
}
move();

const control = event => {
    if(event.keyCode === 39) {
        console.log('right pressed')
        direction = 1;

    } else if (event.keyCode === 38){
        console.log('up pressed')
        direction = -width; //Direction = -10

    } else if (event.keyCode === 37){
        console.log('left pressed')
        direction = -1;

    } else if (event.keyCode === 40){
        console.log('down pressed')
        direction = +width; //Direction = 10
    }
}

document.addEventListener('keyup', control);

//Create a function that generates a apple 
const generateApple = () => {
    do {
        //It will do this condition first, and then run the while loop as long as the condition is true
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //If our appleIndex contains 'snake' loop will break

    //We then target our squares[appleIndex] and give it a class of apple.
    squares[appleIndex].classList.add('apple')
}
generateApple();

const easyMode = () => {
        currentSnake.forEach(index => {
            squares[index].classList.remove('snake')
        })
        squares[appleIndex].classList.remove('apple')
        clearInterval(timerId)
        currentSnake = [2, 1, 0]
        currentSnake.forEach(index => {
            squares[index].classList.add('snake')
        })
        userScore = 0;
        score.textContent = userScore;
    
        direction = 1;
        intervalTime = 500;
        generateApple();
    
        timerId = setInterval(move, intervalTime)
}

const mediumMode = () => {
    currentSnake.forEach(index => {
        squares[index].classList.remove('snake')
    })
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => {
        squares[index].classList.add('snake')
    })
    userScore = 0;
    score.textContent = userScore;

    direction = 1;
    intervalTime = 300;
    generateApple();

    timerId = setInterval(move, intervalTime)
}

const hardMode = () => {
    currentSnake.forEach(index => {
        squares[index].classList.remove('snake')
    })
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => {
        squares[index].classList.add('snake')
    })
    userScore = 0;
    score.textContent = userScore;

    direction = 1;
    intervalTime = 100;
    generateApple();

    timerId = setInterval(move, intervalTime)
}

startButton.addEventListener('click' , () => {
    if(easyModeButton.classList.contains('active')){
        console.log('easy mode selected')
        easyMode();
    } else if(mediumModeButton.classList.contains('active')) {
        console.log('Medium Mode selcted')
        mediumMode();
    } else if(hardModeButton.classList.contains('active')) {
        console.log('Hard Mode Selected')
        hardMode();
    }
})
