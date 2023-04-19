//Defining the variables needed

let direction = {x: 0, y:0}; //snake static initially
let lastInputDir = {x: 0, y: 0}; //previous direction 

let speed = 10; //higher the speed, faster the game.
let lastTimeStamp = 0; 

let snakeArray = [ {x:5, y:7}]; //initialing snake's head
let food = {x:15, y:12};

let score= 0; 
let highScore = 0;


//GAME FUNCTIONS

//the function calls window.requestAnimationFrame which again calls gameLoop nd so on
function gameLoop (currentTime){
    window.requestAnimationFrame(gameLoop); 
    
    //controlling the fps rate (in ms)
    if((currentTime - lastTimeStamp)/1000 < 1/speed){
        return;
    }
    lastTimeStamp = currentTime;

    gamePlay();
}


// the function lays out the working of game
// updating the snake array and food
// displaying the snake array and food
function gamePlay(){

    board.innerHTML = ""; //emptying the board

    //checking whether game is over or not
    if(gameOver(snakeArray)){
        direction = {x:0, y:0};
        alert("Game over. press any key to play again."); 
        
        /*FOR ME IMPORTANTTT
            change these alerts and promts into game buttons later.
        */

        snakeArray = [{x:5, y:7}];
        score = 0;
    }

    //displaying the snake
    snakeArray.forEach((value, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= value.y; //initializing 
        snakeElement.style.gridColumnStart = value.x; //initializing 

        //if its head, then we display head, otherwise body
        if(index===0){
            snakeElement.classList.add('snakeHead');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });

    //displaying the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart= food.y; //initializing 
        foodElement.style.gridColumnStart = food.x; //initializing 
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    
    //moving the snake
    for(let i=snakeArray.length -2; i>=0 ;i--){
        snakeArray[i+1] = {...snakeArray[i]}; //destructuring
    }

    snakeArray[0].x += direction.x;
    snakeArray[0].y += direction.y;


    //if snake has eaten the food, then inc the score and regenerate the food
    //adding the element in front of the array (unshift)
    if(snakeArray[0].x ===food.x && snakeArray[0].y === food.y){
        snakeArray.unshift ( {x:snakeArray[0].x + direction.x, y:snakeArray[0].y + direction.y});

        //updating the food
        let a=2;
        let b=15;
        let c=17;
        food  = { x: Math.round( a + (c-a)*Math.random()), y:Math.round( a + (b-a)*Math.random())}; //to generate a random co-ordinate bw a and b

        scoreCounter();
        }
    }

function gameOver(snake){
    //if snake bumps into its body
    for(let i=1; i<snakeArray.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;            
        }
    }

    //if you bump into the wall
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y<=0){
        return true;
    }
}

function scoreCounter(){
    //updating the score
    score++;
    scoreBox.innerHTML = "Score: " + score;

    //updating the highscore
    if(score>hsValue){
        hsValue = score;
        localStorage.setItem("hiscore", JSON.stringify(hsValue));
        highscoreBox.innerHTML = "High Score: " + hsValue;
    }
}

//setting highscore
let hiscore = localStorage.getItem("hiscore");
//if no highscore set earlier, then set highscore to zero
if(hiscore === null){
    hsValue = 0;
    localStorage.setItem("hiscore", JSON.stringify(hsValue));
}
else{
    hsValue = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hsValue;
}

//MAIN LOGIC
window.requestAnimationFrame(gameLoop);

//funtion to define previous direction of snake
//so that snake can not move 180 degrees
function getInputDirection(){
    lastInputDir = direction;
    return direction;
}


window.addEventListener('keydown', e=>{
    direction = getInputDirection(); //start the game

    //changing direction of snake based on key pressed
    switch(e.key){
        case "ArrowUp" :
            if(lastInputDir.y !== 0){
                break; //if prev position was down.
            }
            else{
                direction.x = 0;
                direction.y = -1;
                break;
            }

        case "ArrowDown" :
            if(lastInputDir.y !== 0){
                break; //if prev position was up.
            }
            else{
                direction.x = 0;
                direction.y = 1;
                break;
            }

        case "ArrowLeft" :
            if(lastInputDir.x !== 0){
                break; //if prev position was right.
            }
            else{
                direction.x = -1;
                direction.y = 0;
                break;
            }
        case "ArrowRight" :
            if(lastInputDir.x !== 0){
                break; //if prev position was left.
            }
            else{
                direction.x = 1;
                direction.y = 0;
                break;
            }
        default:
            break;
    }
});

