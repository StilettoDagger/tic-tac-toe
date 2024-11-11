const board = (() => {
    const gameBoard = [];

    // Create a 3x3 2D array initially filled with null values
    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            gameBoard.push([]);
            for (let j = 0; j < 3 ; j++) {
                gameBoard[i].push(null);
            }
            
        }
    }

    const getBoard = () => console.log(gameBoard);

    // Draw the board and display it on the DOM
    const renderBoard = () => {
        // TODO: implement the drawBoard function
    }

    return {createBoard, getBoard, renderBoard};
})();

board.createBoard();