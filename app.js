const GameBoard = () => {
	const gameBoard = [];
	const boardContainer = document.getElementById("board");

	// Create a 3x3 2D array initially filled with null values and add the cells to the DOM
	const createBoard = () => {
		for (let i = 0; i < 3; i++) {
			gameBoard.push([]);
			const newRow = document.createElement("div");
			newRow.classList.add("row");
			boardContainer.appendChild(newRow);
			for (let j = 0; j < 3; j++) {
				gameBoard[i].push(null);
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.setAttribute("data-row", i + 1);
				cell.setAttribute("data-col", j + 1);
				newRow.appendChild(cell);
			}
		}
	};

	// Display the cell contents on the DOM if its data has been changed
	const updateCell = (cell, symbol) => {
        if (symbol === "X") {
			cell.classList.add("active", "red");
		} else if (symbol === "O") {
			cell.classList.add("active", "blue");
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

	const checkFilledBoard = () => {
		for (let i = 0; i < 3; i++)
		{
			for (let j = 0; j < 3; j++)
			{
				if (gameBoard[i][j] === null)
				{
					return false;
				}
			}
		}
		return true;
	}

	const checkWinner = () => {
		const isFilled = checkFilledBoard();
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
		// If the game board is filled out but there are no winners, return a tie
		if (isFilled)
		{
			return "tie";
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
	let firstPlayer;
	let secondPlayer;
	let firstPlayerSymbol;
	let secondPlayerSymbol;
	const turnInfo = document.querySelector(".turn-info");
	const currentTurnInfo = document.querySelector(".current-turn");
	const resultInfo = document.querySelector(".result");
	const playerInfo = document.querySelector(".player-info");
	let isPlayerTurn = Math.random() > 0.5 ? true: false;
    let cells;

	const startGame = () => {
		board.createBoard();

		pickRandomSymbols();

		firstPlayer = Player("Player 1", firstPlayerSymbol);
		secondPlayer = Player("Player 2", secondPlayerSymbol);

		turnInfo.classList.remove("hidden");
		playerInfo.classList.remove("hidden");
		resultInfo.classList.add("hidden");

		showCurrentTurn();

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
		showCurrentTurn();
		const winner = board.fillCell(cellEl, move);
		checkGameOver(winner);
	};

	const checkGameOver = (winner) => {
		if (winner)
		{
			console.log(winner);
			
			unbindCells(cells);
			turnInfo.classList.add("hidden");
			playerInfo.classList.add("hidden");
			resultInfo.classList.remove("hidden");

			if (winner === "Player 1")
			{
				resultInfo.classList.add("win");
				resultInfo.textContent = "You have won!";
			}
			else if (winner === "Player 2")
			{
				resultInfo.classList.add("loss");
				resultInfo.textContent = "You have lost!"
			}
			else if (winner === "tie")
			{
				resultInfo.classList.add("tie");
				resultInfo.textContent = "It's a tie!"
			}
		}
	}

	const pickRandomSymbols = () => {
		if (Math.random() > 0.5)
		{
			firstPlayerSymbol = SYMBOLS[0];
			secondPlayerSymbol = SYMBOLS[1];
		}
		else {
			firstPlayerSymbol = SYMBOLS[1];
			secondPlayerSymbol = SYMBOLS[0];
		}

		const symbolInfo = playerInfo.querySelector(".symbol");
		const symbolClass = firstPlayerSymbol === "X" ? "red" : "blue";
		symbolInfo.classList.add(symbolClass);
		symbolInfo.textContent = firstPlayerSymbol;
	};

	const showCurrentTurn = () => {
		if (isPlayerTurn)
		{
			currentTurnInfo.textContent = "your turn";
		}
		else {
			currentTurnInfo.textContent = "your opponent's turn";
		}
	};

	return { startGame };
})();

gameManager.startGame();
