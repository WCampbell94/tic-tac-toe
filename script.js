//Player factory function handles creation of player objects
const Player = (name, symbol) => {
	const getName = () => name;
	const getSymbol = symbol;
	let moves = [];

	const addMoves = (index) => {
		moves.push(index);
	};

	const getMoves = () => moves.sort();

	const clearMoves = () => (moves = []);

	const hasSymbol = (sym) => {
		if (this.symbol == sym) return this.getName();
	};
	return {
		getMoves,
		getName,
		getSymbol,
		hasSymbol,
		addMoves,
		clearMoves,
	};
};

//Gameboard Module controls the changes and state of the gameboard
const GameBoard = (() => {
	const gameBoard = Array.from(document.querySelectorAll(".cell"));
	const resetButton = document.querySelector(".reset");
	const winBox = document.createElement("div");
	winBox.classList.add("win-box");

	const message = document.createElement("h1");
	message.style.color = "white";
	resetButton.style.visibility = "hidden";

	const reset = () => {
		gameBoard.forEach((cell) => (cell.innerText = ""));
		GameFlow.resetPlayers();
		GameFlow.resetTurn();
		if (document.querySelector(".win-box") != undefined) {
			document.body.removeChild(document.querySelector(".win-box"));
		}
	};
	//Event Listener for play
	gameBoard.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			//cannot play a played ce;;
			if (cell.innerText != "") return;
			else {
				//displays Win message and prevents additional plays after a win
				if (GameFlow.checkWin() != undefined) {
					message.innerText = `${GameFlow.checkWin()} wins`;

					document.body.appendChild(winBox);
					winBox.appendChild(message);
				} else {
					//Add play to screen
					cell.innerText = GameFlow.currentPlayer().getSymbol;
					if (cell.innerText == "x") {
						cell.style.color = "#2399c4";
					} else cell.style.color = "#eb532d";

					//Add move to players array
					GameFlow.currentPlayer().addMoves(index);
					//change current turn
					GameFlow.changeTurn();

					//Additional win check so the event listener
					//does not have to be ran again to see the game has been won
					if (GameFlow.checkWin() != undefined) {
						//Displays Tie if its a tie otherwise the winner
						if (GameFlow.checkWin() != "Tie") {
							message.innerText = `${GameFlow.checkWin()} wins`;
						} else message.innerText = GameFlow.checkWin();

						document.body.appendChild(winBox);
						winBox.appendChild(message);
					}
				}
			}
		});
	});

	//Event listener for reset button
	resetButton.addEventListener("click", reset);

	return {
		reset,
		gameBoard,
		resetButton,
	};
})();

//GameFlow module controls the turns
//checksfor wins and ties & Resets game
const GameFlow = (() => {
	const boardDisplay = document.querySelector(".game-board");
	boardDisplay.style.visibility = "hidden";

	const formX = document.querySelector('[name="player-x"]');
	const formO = document.querySelector('[name="player-o"]');

	const setupContainer = document.getElementById("setup-container");
	const start = document.getElementById("start-btn");

	const failedForm = document.createElement("p");
	failedForm.classList.add("failed-form");

	var playerX;
	var playerO;
	var players;

	start.addEventListener("click", () => {
		//form validation
		if (formX.value == "" || formO.value == "") {
			failedForm.innerText = "Please enter a value for both X and O";
			setupContainer.insertBefore(failedForm, start);
		} else {
			//save value into variable to create objects with in GameFlow
			playerX = Player(formX.value, "x");
			playerO = Player(formO.value, "o");
			players = [playerX, playerO];

			//Hide start display and button, reveal gameboard
			setupContainer.style.visibility = "hidden";
			boardDisplay.style.visibility = "visible";
			GameBoard.resetButton.style.visibility = "visible";
		}
	});

	let turn = 1;

	const resetTurn = () => (turn = 1);
	const resetPlayers = () => players.forEach((player) => player.clearMoves());
	const checkWin = () => {
		//save current state of gamebBoard into array & check cells for win
		let player1Moves = players[0].getMoves();
		let player2Moves = players[1].getMoves();

		const winPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		const matchCheck = (player) => {
			return winPatterns.some((pattern) => {
				return pattern.every((position) => player.includes(position));
			});
		};

		if (matchCheck(player1Moves)) {
			return players[0].getName();
		} else if (matchCheck(player2Moves)) {
			return players[1].getName();
		} else if (!GameBoard.gameBoard.some((cell) => cell.textContent == "")) {
			return "Tie";
		} else return;
	};

	const changeTurn = () => {
		turn++;
	};

	let currentPlayer = () => {
		return turn % 2 == 0 ? players[1] : players[0];
	};

	return {
		players,
		currentPlayer,
		changeTurn,
		checkWin,
		resetTurn,
		resetPlayers,
	};
})();
