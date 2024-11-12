const GameBoard = () => {
    const gameBoard = [];
    const boardContainer = document.getElementById("board");

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
    }

    // Display the cell contents on the DOM if its data has been changed
    const updateCell = (row, col) => {
        // TODO: implement the updateCell function
    }

    const fillCell = (move) => {
        // TODO: implement the fillCell function
    }

    return {createBoard, fillCell};
};

const Player = (name, symbol) => {
    const playerName = name;
    const playerSymbol = symbol;

    let playerScore = 0;

    const addScore = () => ++playerScore;
    const playMove = (row, col) => ({playerName, playerSymbol, row, col});

    return {addScore, playMove};
}

const gameManager = (() => {
    
    const SYMBOLS = ["X", "O"];
    const board = GameBoard();
    const firstPlayer = Player("Player 1", "X");
    const secondPlayer = Player("Player 2", "O");

    const startGame = () => {
        board.createBoard();

        bindEventsToCells(document.querySelectorAll(".cell"));
    }

    const bindEventsToCells = (cells) => {
        cells.forEach(cell => {
            cell.addEventListener("click", checkMove);
        });
    }

    const checkMove = (event) => {
        const cellEl = event.target;

        const col = +cellEl.getAttribute("data-col");
        const row = +cellEl.getAttribute("data-row");

        const move = firstPlayer.playMove(row, col);
        console.log(move);
        
    }

    return {startGame};
})();

gameManager.startGame();