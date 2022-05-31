window.onload = function () {
	console.log('Dokument geladen');
	game = new Game();
	document.addEventListener("keydown", game.snake.changeDirection, false);
}

class Game {
	constructor() {
		this.running = true;
		this.items = [];
		this.createGame();
	}

	createGame() {
		if (document.getElementsByClassName("worldDiv")[0] == undefined) this.loadWorld();
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

	createItem() {
		let newItem = new Part(this.getRandomInt(0, worldSize - 1), this.getRandomInt(0, worldSize - 1), "item");
		this.items[0] = newItem;
		console.log(game.items)
	}

	updateSnake() {
		if (game == "") game = this;
		if (game.items.length == 0) game.createItem();

		for (let y = 0; y < worldSize; y++) {
			for (let x = 0; x < worldSize; x++) {

				document.getElementsByClassName(`x${x} y${y}`)[0].classList.remove("snake", "normal", "start", "item");
			}
		}

		for (let i = 0; i < game.items.length; i++) {
			const element = game.items[i];
			document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("item");
		}

		for (let i = 0; i < game.snake.parts.length; i++) {
			const element = game.snake.parts[i];

			for (let v = 0; v < game.snake.parts.length; v++) {
				const element2 = game.snake.parts[v];

				if (element.x == element2.x && element.y == element2.y && i != v) {
					console.log(game.snake.parts, i, v);
					game.running = false;
				}
			}

			if (game.checkIfOutside(element.x) || game.checkIfOutside(element.y)) {
				game.running = false;
			} else {
				document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("snake", element.pos);
			}

			if (element.x == game.items[0].x && element.y == game.items[0].y) {
				game.snake.extendSnake();
				game.createItem();
			}
		}

		if (game.updateInterval == undefined || game.movementInterval == undefined) {
			game.updateInterval = setInterval(game.updateSnake, 10)
			game.movementInterval = setInterval(game.snake.move, speed)
		} else if (game.running == false) {
			clearInterval(game.updateInterval);
			clearInterval(game.movementInterval);
		}

		if (!(game.running)) game.gameOver();
	}

	checkIfOutside(int) {
		if (int < 0 || int >= worldSize) return true;
		return false;
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	gameOver() {
		alert("Game over");
	}
}