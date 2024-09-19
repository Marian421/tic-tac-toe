const Gameboard = (function(){
 
    // here lays the board, a matrix of [3][3]
    let gameboard = [];

    const rows = 3;
    const columns = 3;

    // populating the board with Cell, by default they have the value of 0, closed
    // Cell has two methods:
    //      1. getMark() - to see curent value 
    //      2. addMark(mark) - change the value of the mark

    const resetBoard = () => {
        gameboard = [];
        createBoard();
    }
    
    const createBoard = () => {
        for (let i = 0; i < rows; i++)
        {
            gameboard[i] = [];
            for (let j = 0; j < columns; j++)
            {
                gameboard[i].push(Cell());
            }
        }
        
    }

    // get current state of gameboard
    const getBoard = () => gameboard ;

    const mark = (player, row, column) => {
        // if no player occupied the spot
        if (gameboard[row][column].getMark() === 0){
            // overwrite the default "0"
            gameboard[row][column].addMark(player);

        } else {
            return "false";
        }
    }
    const getBoardWithMarks = () => {
        const boardWithMarks = gameboard.map((row) => row.map((cell) => cell.getMark()));
        return boardWithMarks;
    }

    // print board on console
    const printBoard = () => {
        console.log(getBoardWithMarks());
    }
    createBoard();

    return {
        printBoard,
        mark,
        getBoard,
        getBoardWithMarks,
        resetBoard
    };
})();


function Cell() {
    // default value
    let value = 0;

    // method to overwrite the closed value
    const addMark = (player) => {
        value = player;
    }

    // see value
    const getMark = () => value;

    return {
        addMark,
        getMark
    };
}

const game = (function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {

    const players = [
        {
            name: playerOneName,
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
        }
    ];

    // X starts
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        Gameboard.printBoard();
        return `${getActivePlayer().name}'s turn`;
    }

    function checkForWinOrDraw(row, column) {
        const boardWithMarks = Gameboard.getBoardWithMarks();
        let mark = getActivePlayer().token;
        
        // check current row
        if (boardWithMarks[row][0] === mark && boardWithMarks[row][1] === mark && boardWithMarks[row][2] === mark)
        {
            if (mark === "O"){
                switchPlayerTurn();
            }
            return "win";
        }

        // check current column 
        if (boardWithMarks[0][column] === mark && boardWithMarks[1][column] === mark && boardWithMarks[2][column] === mark)
        {
            if (mark === "O"){
                switchPlayerTurn();
            }
            return "win";
        }

        // check main diagonal
        if (boardWithMarks[0][0] === mark && boardWithMarks[1][1] === mark && boardWithMarks[2][2] === mark) {
            if (mark === "O"){
                switchPlayerTurn();
            }
            return "win";
        }

        // check second diagonal
        if(boardWithMarks[2][0] === mark && boardWithMarks[1][1] === mark && boardWithMarks[0][2] === mark) {
            if (mark === "O"){
                switchPlayerTurn();
            }
            return "win";
        }

        // check to see if there are spots left on the board    
        function checkFor0(){
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                   if (boardWithMarks[i][j] == 0){
                    return true;
                   }

                }
            }
            return false;
        }
        if (!checkFor0())
        {
            if (mark === "O"){
                switchPlayerTurn();
            }
            return "draw";
        }
    }

    const playRound = (row, column) => {
        if (Gameboard.mark(getActivePlayer().token, row, column) === 'false'){
            return
        }
        let condition = checkForWinOrDraw(row,column);
        if (condition === "win")
        {
            return "win";
        } else if (condition === "draw"){
            return "draw";
        }
        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();
    return {
        playRound,      
        getActivePlayer,
        printNewRound
    }
})();

const ScreenControler = (function(){
    const playerTurn = document.querySelector('.newRound');
    const boardDiv = document.querySelector('.board');
    const resetButton = document.querySelector('.reset');

    const updateScreen = () => {
        // clear board
        boardDiv.textContent = "";
        // get board and active player
        const board = Gameboard.getBoard();
        const activePlayer = game.getActivePlayer();

        // update whichs player turn it is
        playerTurn.textContent = `${activePlayer.name}'s turn...`;

        for (let i = 0; i < 3; i++){
            for (let j = 0 ; j < 3 ; j++){
                // create a cell
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
        
                // put the mark on the cell
                if (board[i][j].getMark() !== 0){
                cellButton.textContent = board[i][j].getMark();
            } else {
                // if there isnt any mark on the cell keep the cell empty
                cellButton.textContent = "";
            }
                cellButton.addEventListener("click", () => {
                    let state = game.playRound(i,j);
                    if (state === "win") {
                        cellButton.textContent = board[i][j].getMark();
                        displayWinDraw("win", activePlayer);
                    } else if (state === "draw") {
                        cellButton.textContent = board[i][j].getMark();
                        displayWinDraw("draw", activePlayer);
                    } else {
                        updateScreen();
                    }
            })
                boardDiv.appendChild(cellButton);
            }

        }

    }

    // verifies if win or draw
    const displayWinDraw = (state, activePlayer) => {
        if (state === "win") {
            playerTurn.textContent = `${activePlayer.name} WON`;
        } else {
            playerTurn.textContent = "DRAW";
        }

        // creates a reset buton for the display
        resetButton.classList.add("toggle");
        resetButton.textContent = "Reset";

        // event listener for the reset button
        resetButton.addEventListener('click' , () => {
            // clears the current board and creates a new one
            Gameboard.resetBoard();

            // remove the button from the display
            resetButton.classList.remove("toggle");
            resetButton.textContent = "";

            updateScreen();
        })
    }

    updateScreen(); 
})();