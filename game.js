window.onload = function () {
	console.log('Dokument geladen');
	game = new Game();
	document.addEventListener("keydown", game.snake.changeDirection, false);
}

class Game {
	constructor() {
		this.running = true;
		this.createGame();
	}

	createGame() {

		this.loadWorld();
		this.createSnake();
		this.updateSnake();

	}

	loadWorld() {
		let div = document.createElement("div");
		div.classList.add("worldDiv");
		div.style.gridTemplateColumns = `repeat(${worldSize}, auto)`;
		document.body.appendChild(div);

		for (let y = 0; y < worldSize; y++) {
			for (let x = 0; x < worldSize; x++) {

				div = document.createElement("div");
				div.classList.add("area", `x${x}`, `y${y}`);
				document.getElementsByClassName("worldDiv")[0].appendChild(div);

			}
		}
	}

	createSnake() {
		this.snake = new Snake();
	}

	updateSnake() {
		if (game == "") game = this;

		for (let y = 0; y < worldSize; y++) {
			for (let x = 0; x < worldSize; x++) {

				document.getElementsByClassName(`x${x} y${y}`)[0].classList.remove("snake");
			}
		}

		for (let i = 0; i < game.snake.parts.length; i++) {
			const element = game.snake.parts[i];
			console.log(element);
			if (game.checkIfOutside(element.x) || game.checkIfOutside(element.y)) {
				game.running = false;
			} else {
				document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("snake");
			}
		}

		if (game.updateInterval == undefined || game.movementInterval == undefined) {
			game.updateInterval = setInterval(game.updateSnake, 100)
			game.movementInterval = setInterval(game.snake.move, speed)
		} else if (game.running == false) {
			clearInterval(game.updateInterval);
			clearInterval(game.movementInterval);
		}
	}

	checkIfOutside(int) {
		if (int < 0 || int >= worldSize) return true;
		return false;
	}
}

