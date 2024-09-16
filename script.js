const Gameboard = (function(){
 
    // here lays the board, a matrix of [3][3]
    const gameboard = [];

    const rows = 3;
    const columns = 3;

    // populating the board with Cell, by default they have the value of 0, closed
    // Cell has two methods:
    //      1. getMark() - to see curent value 
    //      2. addMark(mark) - change the value of the mark
    for (let i = 0; i < rows; i++)
    {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++)
        {
            gameboard[i].push(Cell());
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

    return {
        printBoard,
        mark,
        getBoard,
        getBoardWithMarks
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
            return "win";
        }

        // check current column 
        if (boardWithMarks[0][column] === mark && boardWithMarks[1][column] === mark && boardWithMarks[2][column] === mark)
        {
            return "win";
        }

        // check main diagonal
        if (boardWithMarks[0][0] === mark && boardWithMarks[1][1] === mark && boardWithMarks[2][2] === mark) {
            return "win";
        }

        // check second diagonal
        if(boardWithMarks[2][0] === mark && boardWithMarks[1][1] === mark && boardWithMarks[0][2] === mark) {
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
        }
        if (!checkFor0())
        {
            return "draw";
        }
    }

    const playRound = (row, column) => {
        console.log(`Putting ${getActivePlayer().name}'s mark on spot ${row} ${column}`);
        if (Gameboard.mark(getActivePlayer().token, row, column) === 'false'){
            console.log("Failed");
            return
        }
        let condition = checkForWinOrDraw(row,column);
        if (condition === "win")
        {
            console.log("win");
        } else if (condition === "draw"){
            console.log("draw");
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

    const updateScreen = () => {
        // clear board
        boardDiv.textContent = "";
        console.log("I'm getting called");
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
                cellButton.textContent = "";
            }
                cellButton.addEventListener("click", () => {
                    game.playRound(i,j);
                    updateScreen();
            })
                boardDiv.appendChild(cellButton);
        }

    }

}
    updateScreen(); 
})();