const Player = (name, symbol) => {
	const getName = () => name;
	const getSymbol = symbol || "O";
	const hasSymbol = (sym) => {
		if (this.symbol == sym) return this.getName();
	};
	return {
		getName,
		getSymbol,
		hasSymbol,
	};
};

//Gameboard Module controls the changes and state of the gameboard
const GameBoard = (() => {
	const gameBoard = Array.from(document.querySelectorAll(".cell"));
	const resetButton = document.querySelector(".reset");

	const reset = () => {
		gameBoard.forEach((cell) => (cell.innerText = ""));
		GameFlow.resetTurn();
	};
	//Event Listener for play
	gameBoard.forEach((cell) => {
		cell.addEventListener("click", () => {
			if (cell.innerText != "") return;
			else {
				//Add play to screen
				cell.innerText = GameFlow.currentPlayer().getSymbol;
				console.log(GameFlow.currentPlayer().getName());
				console.log(GameFlow.checkWin());
				// GameFlow.changeTurn();

				if (GameFlow.checkWin() === true)
					alert(GameFlow.currentPlayer().getName());
				else GameFlow.changeTurn();
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
	let player1 = Player("Will", "x");
	let computer = Player("computer", "o");
	let turn = 1;

	const resetTurn = () => (turn = 1);
	const checkWin = () => {
		//save current state of gamebBoard into array & check cells for win
		let cells = GameBoard.gameBoard;

		//BUG Always evaluates to true on game start because all cells = ''
		if (
			cells[0].innerText == cells[1].innerText &&
			cells[0].innerText == cells[2].innerText
		) {
			return true;
		} else if (
			cells[3].innerText == cells[4].innerText &&
			cells[3].innerText == cells[5].innerText
		) {
			return true;
		} else if (
			cells[6].innerText == cells[7].innerText &&
			cells[6].innerText == cells[8].innerText
		) {
			return true;
		} else if (
			cells[0].innerText == cells[3].innerText &&
			cells[0].innerText == cells[6].innerText
		) {
			return true;
		} else if (
			cells[1].innerText == cells[4].innerText &&
			cells[1].innerText == cells[7].innerText
		) {
			return true;
		} else if (
			cells[2].innerText == cells[5].innerText &&
			cells[2].innerText == cells[8].innerText
		) {
			return true;
		} else if (
			cells[0].innerText == cells[4].innerText &&
			cells[0].innerText == cells[8].innerText
		) {
			return true;
		} else if (
			cells[2].innerText == cells[8].innerText &&
			cells[2].innerText == cells[5].innerText
		) {
			return true;
		} else if (!cells.includes("")) {
			return false;
			alert("TIE");
		} else return false;

		//ways to win
		//3 adjacent indexes  0-2, 3-5, 6-8
		//3 vertical index every three index; 0,3,6. 1,4,7. or 2,5,8
		//diagonal 0,4,8 or 6, 4, 2
		//else if no patterns found tie
	};

	const changeTurn = () => {
		turn++;
	};

	let currentPlayer = () => {
		return turn % 2 == 0 ? computer : player1;
	};

	return {
		currentPlayer,
		changeTurn,
		checkWin,
		resetTurn,
	};
})();

//Player factory allows for creation of new players in the game

//Create GameBoard object
//store game board as an array inside GameBoard object

//Check array for win in GameFlow
//
