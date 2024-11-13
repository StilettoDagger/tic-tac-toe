const GameBoard = () => {
	const gameBoard = [];
	const boardContainer = document.getElementById("board");

	// Create a 3x3 2D array initially filled with null values and add the cells to the DOM
	const createBoard = () => {
		for (let i = 0; i < 3; i++) {
			gameBoard.push([]);
			for (let j = 0; j < 3; j++) {
				gameBoard[i].push(null);
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.setAttribute("data-row", i + 1);
				cell.setAttribute("data-col", j + 1);
				boardContainer.appendChild(cell);
			}
		}
	};

	// Display the cell contents on the DOM if its data has been changed
	const updateCell = (cell, symbol) => {
        if (symbol === "X") {
			cell.classList.add("active", "red");
		} else if (symbol === "O") {
			cell.classList.add("active", "green");
		}
	};

	const fillCell = (cell, move) => {
		const rowIndex = move.row - 1;
		const colIndex = move.col - 1;

		const symbol = move.playerSymbol;

		gameBoard[rowIndex][colIndex] = move;

		updateCell(cell, symbol);
        const winner = checkWinner();
        return winner;
	};

	const checkWinner = () => {
		for (let i = 0; i < 3; i++) {
			// Check for row matches
			if (gameBoard[i][0] && gameBoard[i][1] && gameBoard[i][2]) {
				if (
					gameBoard[i][0].playerSymbol === gameBoard[i][1].playerSymbol &&
					gameBoard[i][1].playerSymbol === gameBoard[i][2].playerSymbol
				) {
                    console.log("game over");
                    
					return gameBoard[i][0].playerName;
				}
			}
			// Check for column matches

			if (gameBoard[0][i] && gameBoard[1][i] && gameBoard[2][i]) {
				if (
					gameBoard[0][i].playerSymbol === gameBoard[1][i].playerSymbol &&
					gameBoard[1][i].playerSymbol === gameBoard[2][i].playerSymbol
				) {
                    console.log("game over");
					return gameBoard[0][i].playerName;
				}
			}
		}

		// Check for diagonal matches
		if (gameBoard[0][0] && gameBoard[1][1] && gameBoard[2][2])
        {
			if (
				(gameBoard[0][0].playerSymbol === gameBoard[1][1].playerSymbol &&
					gameBoard[1][1].playerSymbol === gameBoard[2][2].playerSymbol)
			) {
                console.log("game over");
				return gameBoard[1][1].playerName;
			}
        }

        else if (gameBoard[0][2] && gameBoard[1][1] && gameBoard[2][0])
        {
			if (
				(gameBoard[0][2].playerSymbol === gameBoard[1][1].playerSymbol &&
					gameBoard[1][1].playerSymbol === gameBoard[2][0].playerSymbol)
			) {
                console.log("game over");
				return gameBoard[1][1].playerName;
			}
        }
		return;
	};

	return { createBoard, fillCell };
};

const Player = (name, symbol) => {
	const playerName = name;
	const playerSymbol = symbol;

	let playerScore = 0;

	const addScore = () => ++playerScore;
	const playMove = (row, col) => ({ playerName, playerSymbol, row, col });

	return { addScore, playMove };
};

const gameManager = (() => {
	const SYMBOLS = ["X", "O"];
	const board = GameBoard();
	const firstPlayer = Player("Player 1", "X");
	const secondPlayer = Player("Player 2", "O");
	let isPlayerTurn = true;
    let cells;

	const startGame = () => {
		board.createBoard();

        cells = document.querySelectorAll(".cell");
		bindEventsToCells(cells);
	};

	const bindEventsToCells = (cells) => {
		cells.forEach((cell) => {
			cell.addEventListener("click", checkMove);
		});
	};

    const unbindCells = (cells) => {
        cells.forEach((cell) => {
            cell.removeEventListener("click", checkMove);
        })
    }

	const checkMove = (event) => {
		const cellEl = event.target;

        if (cellEl.classList.contains("active")) return;

		const col = +cellEl.getAttribute("data-col");
		const row = +cellEl.getAttribute("data-row");

		const move = isPlayerTurn ? firstPlayer.playMove(row, col) : secondPlayer.playMove(row, col);
        isPlayerTurn = !isPlayerTurn;
		const winner = board.fillCell(cellEl, move);
        if (winner) {
            unbindCells(cells);
            console.log(winner);
        }
        
	};

	return { startGame };
})();

gameManager.startGame();
