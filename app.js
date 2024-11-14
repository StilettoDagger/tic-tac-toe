/**
 * Creates a GameBoard object that has methods to create a Tic Tac Toe game board 
 * and can store, update, render, and reset cell data.
 * @returns A GameBoard object with the methods createBoard, fillCell, and resetBoard.
 */
const GameBoard = () => {
	const gameBoard = [];
	const boardContainer = document.getElementById("board");

	/**
	 * Create a 3x3 2D array initially filled with null values 
	 * and add the cells to the DOM.
	 */
	const createBoard = () => {
		boardContainer.classList.remove("hidden");
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

	/**
	 * Display the cell contents on the DOM if its data has been changed
	 * given the passed symbol value.
	 * @param {Node} cell - The target cell element to be filled.
	 * @param {string} symbol - The type of symbol that will fill the target cell ("either 'X' or 'O").
	 */
	const updateCell = (cell, symbol) => {
        if (symbol === "X") {
			cell.classList.add("active", "red");
		} else if (symbol === "O") {
			cell.classList.add("active", "blue");
		}
	};

	/**
	 * Fills a specific cell in the gameBoard array with a move object 
	 * given the row and column properties of the passed move object.
	 * @param {Node} cell - The target cell element to be filled.
	 * @param {Object} move - The move object that will be filled in the gameBoard array.
	 * @returns The winner if a match has been found on the board.
	 */
	const fillCell = (cell, move) => {
		const rowIndex = move.row - 1;
		const colIndex = move.col - 1;

		const symbol = move.playerSymbol;

		gameBoard[rowIndex][colIndex] = move;

		updateCell(cell, symbol);
        const winner = checkWinner();
        return winner;
	};

	/**
	 * Check if all the board cells are completely filled out.
	 * @returns true if the board is full and false if not.
	 */
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

	/**
	 * Looks for any valid matches (row, column, or diagonal), 
	 * and returns a winner if a match has been found.
	 * @returns The winner's player name if a match has been found,
	 * a "tie" if the board is filled out with no matches,
	 * and "undefined" otherwise.
	 */
	const checkWinner = () => {
		const isFilled = checkFilledBoard();
		for (let i = 0; i < 3; i++) {
			// Check for row matches
			if (gameBoard[i][0] && gameBoard[i][1] && gameBoard[i][2]) {
				if (
					gameBoard[i][0].playerSymbol === gameBoard[i][1].playerSymbol &&
					gameBoard[i][1].playerSymbol === gameBoard[i][2].playerSymbol
				) {
                    
					return gameBoard[i][0].playerName;
				}
			}
			// Check for column matches

			if (gameBoard[0][i] && gameBoard[1][i] && gameBoard[2][i]) {
				if (
					gameBoard[0][i].playerSymbol === gameBoard[1][i].playerSymbol &&
					gameBoard[1][i].playerSymbol === gameBoard[2][i].playerSymbol
				) {
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
				return gameBoard[1][1].playerName;
			}
        }

        else if (gameBoard[0][2] && gameBoard[1][1] && gameBoard[2][0])
        {
			if (
				(gameBoard[0][2].playerSymbol === gameBoard[1][1].playerSymbol &&
					gameBoard[1][1].playerSymbol === gameBoard[2][0].playerSymbol)
			) {
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

	/**
	 * Clears all cell data on the DOM by removing any active classes 
	 * that are associated with the cell elements.
	 */
	const clearDOMCells = () => {
		const cells = document.querySelectorAll(".cell");

		cells.forEach(cell => {
			cell.classList.remove("red", "blue", "active");
		})
	};

	/**
	 * Clear the gameBoard array by setting the value of all elements 
	 * in the gameBoard element to null.
	 */
	const clearBoardData = () => {
		for (let i = 0; i < 3; i++)
		{
			for (let j = 0; j < 3; j++)
			{
				gameBoard[i][j] = null;
			}
		}
	}

	const resetBoard = () => {
		clearDOMCells();
		clearBoardData();
	}

	return { createBoard, fillCell, resetBoard };
};

/**
 * 
 * @param {string} name - The name of the player to be added.
 * @param {string} symbol - The symbol type that the player will play with (either 'X' or 'O').
 * @returns a Player object with addScore and playMove methods.
 */
const Player = (name, symbol) => {
	const playerName = name;
	const playerSymbol = symbol;

	let playerScore = 0;

	const addScore = () => ++playerScore;
	const playMove = (row, col) => ({ playerName, playerSymbol, row, col });

	return { addScore, playMove };
};

/**
 * Create an Immediately Invoked Function Expression (IIFE) object 
 * that is responsible for starting the game and keeping track of turns, 
 * and whether or not the game is over.
 */
const gameManager = (() => {
	const SYMBOLS = ["X", "O"];
	const board = GameBoard();
	let firstPlayer;
	let secondPlayer;
	let firstPlayerData = {};
	let secondPlayerData = {};
	const turnInfo = document.querySelector(".turn-info");
	const currentTurnInfo = document.querySelector(".current-turn");
	const resultInfo = document.querySelector(".result");
	const playerInfo = document.querySelector(".player-info");
	let isPlayerTurn;
    let cells;
	let isGameOver = false;
	let isRendered = false;
	
	/**
	 * Logic for initializing the game.
	 */
	const initGame = () => {
		pickRandomSymbols();

		
		firstPlayer = Player(firstPlayerData.name, firstPlayerData.symbol);
		secondPlayer = Player(secondPlayerData.name, secondPlayerData.symbol);
		
		isPlayerTurn = Math.random() > 0.5;
		
		turnInfo.classList.remove("hidden");
		playerInfo.classList.remove("hidden");
		resultInfo.classList.add("hidden");
		
		showCurrentTurn();
	}
	
	/**
	 * Event handler function for starting and initializing the game. 
	*/
	const startGame = (e) => {
		e.target.textContent = "Reset Game";
		e.target.classList.replace("start", "reset");
		e.target.addEventListener("click", resetGame);
		board.createBoard();
        cells = document.querySelectorAll(".cell");
		
		getPlayersNames();
		initGame();

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

	/**
	 * Event handler function for making a move by clicking on a cell, 
	 * and checking for a win condition.
	 */
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

	/**
	 * Checks if a winner has been declared and update the display to show the winner.
	 * @param {string} winner 
	 */
	const checkGameOver = (winner) => {
		if (winner)
		{
			isGameOver = true;
			unbindCells(cells);
			turnInfo.classList.add("hidden");
			playerInfo.classList.add("hidden");
			resultInfo.classList.remove("hidden", "win", "loss", "tie");

			if (winner === firstPlayerData.name)
			{
				resultInfo.classList.add("win");
				resultInfo.textContent = "You have won!";
			}
			else if (winner === secondPlayerData.name)
			{
				resultInfo.classList.add("loss");
				resultInfo.textContent = "You have lost!";
			}
			else if (winner === "tie")
			{
				resultInfo.classList.add("tie");
				resultInfo.textContent = "It's a tie!";
			}
		}
	}

	const pickRandomSymbols = () => {
		if (Math.random() > 0.5)
		{
			firstPlayerData.symbol = SYMBOLS[0];
			secondPlayerData.symbol = SYMBOLS[1];
		}
		else {
			firstPlayerData.symbol = SYMBOLS[1];
			secondPlayerData.symbol = SYMBOLS[0];
		}

		const symbolInfo = playerInfo.querySelector(".symbol");
		const symbolClass = firstPlayerData.symbol === "X" ? "red" : "blue";
		symbolInfo.classList.remove("red", "blue");
		symbolInfo.classList.add(symbolClass);
		symbolInfo.textContent = firstPlayerData.symbol;
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

	/**
	 * Get the custom names of players from the input fields, 
	 * then remove the inputs from the DOM.
	 */
	const getPlayersNames = () => {
		const userName = document.getElementById("user-name").value.trim();
		const otherName = document.getElementById("other-name").value.trim();

		firstPlayerData.name = userName || "Player 1";
		secondPlayerData.name = otherName || "Player 2";

		// Remove player inputs
		document.getElementById("name-inputs").remove();
	}

	/**
	 * Event handler function for resetting the game.
	 */
	const resetGame = (e) => {
		
		if (isGameOver)
		{
			bindEventsToCells(cells);
			isGameOver = false;
		}
		board.resetBoard();
		initGame();
	}

	/**
	 * Render the start button that will start the game on the screen.
	 */
	const renderStart = () => {
		if (isRendered) return;
		const startButton = document.createElement("button");
		startButton.classList.add("start-reset", "start");
		startButton.textContent = "Start Game"
		startButton.addEventListener("click", startGame, {once: true});
		document.body.appendChild(startButton);
		isRendered = true;
	}

	return { renderStart };
})();

gameManager.renderStart();
