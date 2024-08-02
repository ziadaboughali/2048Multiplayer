const socket = io();
// import * as backend from './socketFront.js'; 



// backend.setScoket(socket);



var board;
var score = 0;
var rows = 4;
var columns = 4;

var isGameOver = false; // Flag to check if the game is over
var timerInterval; // Holds the setInterval ID for clearing it later
var startTime; // When the timer is started
var elapsedTime; // Time elapsed since the start
var countdownDuration =  10* 1000; // 2 minutes in milliseconds



function pad(number) {
    return number < 10 ? `0${number}` : number;
}



function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);

    document.getElementById("timer").innerText = formatTime(countdownDuration);
    // elapsedTime = 0;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        var now = Date.now();
        var timeElapsed = now - startTime;
        var timeLeft = countdownDuration - timeElapsed;


        // console.log(timeLeft);
        if (timeLeft <= 5000){


        document.getElementById("timer").style.color = "red";

        }



        // Check if the countdown has reached zero
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            document.getElementById("timer").innerText = "00:00";
            showGameOver(); // Notify the user that the game is over
        } else {
            // Update the timer display with the formatted time left
            document.getElementById("timer").innerText = formatTime(timeLeft);
        }
    }, 1000); // Update every second
}


function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
}






function getUsername(){
    socket.emit('getPlayer');
}






/* TODO: [ ] Send the information of the player's current moves to the backend
    [ ] Fix when players are coming in and leaving, new players get the next available number (backend.js)
*/

window.onload = function(){
    setGame();
    getUsername();
}

function setGame(){
    isGameOver = false; 
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    for (let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            //<div> id="0-0"</div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }

    setTwo();
    setTwo();


    resetTimer(); // Reset and start the timer
    startTimer();
}

function hasEmptyTile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function canMove(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 0) return true; // There's an empty spot
            if (c < columns - 1 && board[r][c] == board[r][c + 1]) return true; // Can merge right
            if (r < rows - 1 && board[r][c] == board[r + 1][c]) return true; // Can merge down
        }
    }
    return false; // No moves left
}


function setTwo(){
    if (!hasEmptyTile()){
        return;
    }
    let found = false;
    while(!found){
        //random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;

        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //clear the classlist "tile x2 or x4"
    tile.classList.add("tile");
    if (num > 0){
        tile.innerText = num;
        if(num <= 4096){
            tile.classList.add("x"+num.toString())
        }
        else{
            tile.classList.add("x8192")
        }
    }
}

document.addEventListener("keyup", (e) =>{

    if(isGameOver){
        
        return; // Exit the function if the game is over

    } 

    let moved = false;
    if (e.code == "ArrowLeft"){
        slideLeft();
        //boardScrap();
        moved = true;
    }
    else if (e.code == "ArrowRight"){
        slideRight();
        //boardScrap();
        moved = true;
    }
    else if (e.code == "ArrowUp"){
        slideUp();
        //boardScrap();
        moved = true;
    }
    else if (e.code == "ArrowDown"){
        
        slideDown();
        //boardScrap();
        moved = true;
    }
   
    //boardScrap();//send the board to the backend. Everytime a key is pressed, the board is sent to the backend.

    if(moved){
       
        setTwo();
        document.getElementById("score").innerText = score;
        boardScrap();
        ScoreScrap();
        if (!canMove()){
            // document.removeEventListener("keyup", (e) => {}); // Disable keyboard input when the game is over
            boardScrap();
            showGameOver();
        }
    }
})






function showGameOver(){
    isGameOver = true; // Set the game over flag to true
    document.removeEventListener("keyup", (e) => {}); // Disable keyboard input when the game is over







    // Check if a game over message already exists to avoid duplicates
    let existingMessage = document.getElementById("game-over-message");
    if (existingMessage) {
        document.body.removeChild(existingMessage);
    }

    const gameOverMessage = document.createElement("div");
    gameOverMessage.id = "game-over-message"; // Assign an ID for easy reference
    gameOverMessage.innerHTML = `
        <p>Game Over!</p>
        <p>Your score: ${score}</p>
        <button id="restart-button">Restart</button>
    `;
    gameOverMessage.classList.add("game-over-message");
    document.body.appendChild(gameOverMessage);

    //this will prevent the buttom to start all the time on the screen.
    // Find the newly added restart button and add an event listener for the click event
    document.getElementById("restart-button").addEventListener("click", function() {
        restartGame();
        document.body.removeChild(gameOverMessage); // Remove the game over message when restarting
    });


}


function filterZero(row){
    return row.filter(num => num !=0); //create a new array without zeroes
}

function restartGame(){
    socket.emit('wipeScore');// we need to check this. 

    socket.emit('finalScore', score);

    // document.location.reload(); // Simplest way to restart the game

    // Clear the game board on the client side
    const boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.lastChild);
    }

    // Reset score and other game variables if needed
    score = 0;
    document.getElementById("score").innerText = score;

    // Re-initialize the game
    setGame();
    
}

function slide(row){
    //[0,2,2,2]
    row = filterZero(row); //get rid of zeroes -> [2,2,2]

    //slide
    for (let i = 0; i < row.length-1; i++){
        //check every 2
        if (row[i] == row[i+1]){
            row[i] *=2;
            row[i+1] = 0;
            score += row[i];
        } // [2,2,2] -> [4,0,2]
    }

    row = filterZero(row); //[4,2]
    
    //add zeroes
    while(row.length < columns){
        row.push(0);
    } // [4,2,0,0]

    return row;
}

function slideLeft(){
    
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);

        }
    }
}

function slideRight(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]]
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown(){
    for(let c = 0; c < columns; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}



function boardScrap(){  
    console.log("boardScrap");
    // console.log(stringify(board));
    socket.emit("outboundBoard", board);

    // socket.emit("outboundBoard", jsonBoard);

}

function ScoreScrap(){  
    console.log("ScoreScrap");
        // console.log(stringify(board));
    socket.emit("outboundScore", score);
    
}

socket.on('message', message => {
    console.log(message);
})



