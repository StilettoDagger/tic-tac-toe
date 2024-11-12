const GameBoard = () => {
    const gameBoard = [];
    const boardContainer = document.getElementById("board");

    let cells;

    // Create a 3x3 2D array initially filled with null values and add the cells to the DOM
    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            gameBoard.push([]);
            for (let j = 0; j < 3 ; j++) {
                gameBoard[i].push(null);
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("data-row", i + 1);
                cell.setAttribute("data-col", j + 1);
                boardContainer.appendChild(cell);
            }
        }
        cells = document.querySelectorAll(".cell");
    }

    const getBoard = () => console.log(gameBoard);

    // Display the 
    const updateCells = () => {
        // TODO: implement the updateCells function
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

const board = GameBoard();

board.createBoard();
