
socket.on("incomingScore", function(incoming) {

    // Log the incoming board data
    console.log("incomingScore");
    // console.log(incoming.user);
    // console.log(incoming.userscore);

    let otherScoresDiv = document.getElementById("other-scores");
    // Check if the player's score is already displayed
    if (!document.getElementById(incoming.user + "-score")) {
        let playerScore = document.createElement("p");
        playerScore.id = incoming.user + "-score";
        playerScore.innerHTML = `${incoming.user}: ${incoming.userscore}`;
        otherScoresDiv.appendChild(playerScore);
    } else {
        // Update the score if it already exists
        let playerScore = document.getElementById(incoming.user + "-score");
        playerScore.innerHTML = `${incoming.user}: ${incoming.userscore}`;
    }
});





socket.on("incomingBoard", function(incoming) {
    // Log the incoming board data
    console.log("incomingBoard");
    console.log(incoming.user);
    console.log(incoming.userBoard);
    // num = 0
    // Reference to the container where the boards will be displayed
    const otherBoardsContainer = document.getElementById("other-players-boards"); // Change this to match your HTML

    // Check if a board for this user already exists
    let boardDisplay = document.getElementById(`board-${incoming.user}`);
    if (!boardDisplay) {
        // If it doesn't exist, create a new one
        boardDisplay = document.createElement("div");
        boardDisplay.id = `board-${incoming.user}`;
        boardDisplay.classList.add("other-board");
        const userName = document.createElement("div");
        userName.textContent = incoming.user;
        userName.classList.add("user-name");
        boardDisplay.appendChild(userName);
        otherBoardsContainer.appendChild(boardDisplay);
    }

    // Clear the existing tiles
    boardDisplay.innerHTML = `<div class="user-name">${incoming.user}</div>`;

    // Generate the tiles based on incoming.board
    incoming.userBoard.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("board-row");
        
        row.forEach((tileValue) => {


            //Apply the base class to the tile, this will allow to display the color based on the value

            const tile = document.createElement("div");

            const valueDiv = document.createElement("div");

            num = tileValue > 0 ? tileValue : '';
            valueDiv.innerText = "";
            
            valueDiv.classList.add("tile");
            
            if (num > 0){
                valueDiv.innerText = num;
                if(num <= 4096){
                    valueDiv.classList.add("x"+num.toString())
                }
                else{
                    valueDiv.classList.add("x8192")
                }
            }



            tile.appendChild(valueDiv);
            tile.classList.add("tile");
            rowDiv.appendChild(tile);
        });
        boardDisplay.appendChild(rowDiv);
    });
});





socket.on('getPlayer', message => {
    console.log("Player Name: " + message);
})




