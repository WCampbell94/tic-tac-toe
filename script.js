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

const Cpu = Player("cpu");
const Player1 = Player("player1", "x");

//Gameboard Module controls the changes and state of the gameboard
const GameBoard = (() => {
	let gameBoard = [];
	gameBoard = Array.from(document.querySelectorAll(".cell"));

	const reset = () => {
		gameBoard.forEach((cell) => (cell.innerText = ""));
		gameBoard = [];
		GameFlow.resetTurn();
	};
	//Event Listener for play
	gameBoard.forEach((cell) => {
		cell.addEventListener("click", () => {
			//Add play to screen
			if (cell.innerText != "") return;
			else {
				cell.innerText = GameFlow.currentPlayer().getSymbol;
				GameFlow.changeTurn();
				GameFlow.checkWin();
			}
		});
	});

	return {
		gameBoard,
	};
})();

//GameFlow module controls the turns
//checksfor wins and ties
//Resets game
const GameFlow = (() => {
	let player1 = Player("Will", "x");
	let computer = Player("computer", "o");
	let turn = 1;

	const resetTurn = () => (turn = 1);
	const checkWin = () => {
		let cells = GameBoard.gameBoard;
		if (this.turns > 6) {
			if (
				cells[0].innerText == cells[1].innerText &&
				cells[0].innerText == cells[2].innerText
			) {
				return cells[0].innerText;
			} else if (
				cells[3].innerText == cells[4].innerText &&
				cells[3].innerText == cells[5].innerText
			) {
				return cells[3].innerText;
			} else if (
				cells[6].innerText == cells[7].innerText &&
				cells[6].innerText == cells[8].innerText
			) {
				return cells[6].innerText;
			} else if (
				cells[0].innerText == cells[3].innerText &&
				cells[0].innerText == cells[6].innerText
			) {
				return cells[0].innerText;
			} else if (
				cells[1].innerText == cells[4].innerText &&
				cells[1].innerText == cells[7].innerText
			) {
				return cells[1].innerText;
			} else if (
				cells[2].innerText == cells[5].innerText &&
				cells[2].innerText == cells[8].innerText
			) {
				return cells[2].innerText;
			} else if (
				cells[0].innerText == cells[4].innerText &&
				cells[0].innerText == cells[8].innerText
			) {
				return cells[0].innerText;
			} else if (
				cells[2].innerText == cells[8].innerText &&
				cells[2].innerText == cells[5].innerText
			) {
				return cells[2].innerText;
			}
		} else return;
		//ways to win
		//3 adjacent indexes  0-2, 3-5, 6-8
		//3 vertical index every three index; 0,3,6. 1,4,7. or 2,5,8
		//diagonal 0,4,8 or 6, 4, 2
		//if no patterns found tie
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
