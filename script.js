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

    const playRound = (row, column) => {
        console.log(`Putting ${getActivePlayer().name}'s mark on spot ${row} ${column}`);
        if (Gameboard.mark(getActivePlayer().token, row, column) === 'false'){
            console.log("Failed");
            return
        }

        const boardWithMarks = Gameboard.getBoardWithMarks();
        let win = 0;
        let spaceForMarks = 1;
        for (let i = 0; i < 2; i++)
        {
            
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
    const newRound = document.querySelector('.newRound');
    newRound.innerHTML = game.printNewRound();

})();