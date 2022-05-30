window.onload = function () {
	console.log('Dokument geladen');
	game = new Game();
	document.addEventListener("keydown", game.snake.changeDirection, false);
}

class Game {
	constructor() {

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

		for (let y = 0; y < worldSize; y++) {
			for (let x = 0; x < worldSize; x++) {

				document.getElementsByClassName(`x${x} y${y}`)[0].classList.remove("snake");
			}
		}

		for (let i = 0; i < this.snake.parts.length; i++) {
			const element = this.snake.parts[i];

			console.log(element);
			document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("snake");


		}

		this.movementInterval = setInterval(this.snake.move, speed)

	}

}

