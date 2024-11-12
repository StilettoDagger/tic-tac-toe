const GameBoard = () => {
    const gameBoard = [];
    const boardContainer = document.getElementById("board");

    // Create a 3x3 2D array initially filled with null values
    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            gameBoard.push([]);
            for (let j = 0; j < 3 ; j++) {
                gameBoard[i].push(null);
            }
            
        }
        renderBoard();
    }

    const getBoard = () => console.log(gameBoard);

    // Draw the board and display it on the DOM
    const renderBoard = () => {
        // TODO: implement the renderBoard function
    }

    const fillCell = (cellData) => {
        // TODO: implement the fillCell function
    }

    return {createBoard, getBoard, fillCell};
};

const Player = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;

    let playerScore = 0;

    const addScore = () => ++playerScore;
    const playMove = (row, col) => ({playerName, playerSymbol, row, col});

    return {addScore, playMove};
}

