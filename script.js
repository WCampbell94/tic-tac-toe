//Player factory function handles creation of player objects
const Player = (name, symbol) => {
	const getName = () => name;
	const getSymbol = symbol || "O";
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

	const reset = () => {
		gameBoard.forEach((cell) => (cell.innerText = ""));
		GameFlow.players.forEach((player) => player.clearMoves());
		GameFlow.resetTurn();
	};
	//Event Listener for play
	gameBoard.forEach((cell, index) => {
		cell.addEventListener("click", () => {
			if (cell.innerText != "") return;
			else {
				//Add play to screen
				cell.innerText = GameFlow.currentPlayer().getSymbol;
				//Add move to players array
				GameFlow.currentPlayer().addMoves(index);
				//change current turn
				GameFlow.changeTurn();

				//TODO display on screen instad of console
				if (GameFlow.checkWin() != undefined) {
					console.log(GameFlow.checkWin());
				}
			}
		});
	});

	//Event listener for reset button
	resetButton.addEventListener("click", reset);

	return {
		gameBoard,
	};
})();

//GameFlow module controls the turns
//checksfor wins and ties
//Resets game
const GameFlow = (() => {
	//TODO create these players from a form on the page instead of hard coding them in
	const players = [
		(player1 = Player("Will", "x")),
		(computer = Player("computer", "o")),
	];

	let turn = 1;

	const resetTurn = () => (turn = 1);
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

		//Player moves array can be larger than 3
		//players moves must include the three values

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
	};
})();
