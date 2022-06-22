let game = "";
window.onload = function () {
	game = new Game();
	document.addEventListener("keydown", game.snake.changeDirection, false);
}

class Game {
	constructor() {
		this.worldSize = 20;
		this.speed = 200;
		this.running = true;
		this.isPaused = false;
		this.score = 0;
		this.items = [];
		this.createGame();
		this.collapsible();
	}

	createGame() {
		if (document.getElementsByClassName("worldDiv")[0] == undefined) this.loadWorld();
		this.createSnake();
		this.updateSnake();
		this.startAudio();
	}

	loadWorld() {
		let div = document.createElement("div");
		div.classList.add("worldDiv");
		div.style.gridTemplateColumns = `repeat(${this.worldSize}, auto)`;
		document.body.appendChild(div);

		for (let y = 0; y < this.worldSize; y++) {
			for (let x = 0; x < this.worldSize; x++) {
				div = document.createElement("div");
				div.classList.add("area", `x${x}`, `y${y}`);
				document.getElementsByClassName("worldDiv")[0].appendChild(div);
			}
		}
	}

	restartGame() {
		game.running = true;
		clearInterval(game.updateInterval);
		clearInterval(game.movementInterval);
		game.updateInterval = ""; game.movementInterval = "", document.getElementById("gamestatus").innerHTML = "";
		this.score = 0, this.items = [], document.getElementById("highscore").innerHTML = "Punkte: 0";
		if (game.isPaused) game.pauseGame();
		game.createSnake();
		game.updateSnake();
	}

	createSnake() {
		this.snake = new Snake(this.worldSize);
	}

	createItem() {
		let newItem = new Part(this.getRandomInt(0, game.worldSize - 1), this.getRandomInt(0, game.worldSize - 1), "item");
		this.items[0] = newItem;
	}

	updateSnake() {
		if (game == "") game = this;
		if (game.items.length == 0) game.createItem();

		game.clearWorld();
		game.loadItem();
		game.loadSnake();

		if (game.updateInterval == undefined || game.updateInterval == "") game.updateInterval = setInterval(game.updateSnake, 15);
		if (game.movementInterval == undefined || game.movementInterval == "") game.movementInterval = setInterval(game.snake.move, game.speed);
		if (game.running == false) {
			clearInterval(game.updateInterval);
			clearInterval(game.movementInterval);
		}
		if (!(game.running)) game.gameOver();
	}

	clearWorld() {
		for (let y = 0; y < game.worldSize; y++) {
			for (let x = 0; x < game.worldSize; x++) {
				document.getElementsByClassName(`x${x} y${y}`)[0].classList.remove("snake", "normal", "start", "item");
			}
		}
	}

	loadItem() {
		for (let i = 0; i < game.items.length; i++) {
			const element = game.items[i];
			document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("item");
		}
	}

	loadSnake() {
		for (let i = 0; i < game.snake.parts.length; i++) {
			const element = game.snake.parts[i];

			for (let v = 0; v < game.snake.parts.length; v++) {

				const element2 = game.snake.parts[v];
				if (element.x == element2.x && element.y == element2.y && i != v) {
					game.running = false;
				}
			}

			if (game.checkIfOutside(element.x) || game.checkIfOutside(element.y)) {
				game.running = false;
			} else {
				document.getElementsByClassName(`x${element.x} y${element.y}`)[0].classList.add("snake", element.pos);
			}

			if (element.x == game.items[0].x && element.y == game.items[0].y) {
				game.score++;
				document.getElementById("highscore").innerHTML = "Punkte: " + game.score;
				game.snake.extendSnake();
				game.createItem();
			}
		}
	}

	checkIfOutside(int) {
		if (int < 0 || int >= game.worldSize) {
			return true;
		} else {
			return false;
		}
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	gameOver() {
		document.getElementById("gamestatus").innerHTML = "Game over";
		clearInterval(game.updateInterval);
		clearInterval(game.movementInterval);
		if (this.score > 0) {
			let data = { "highscore": this.score };
			this.sendData(data);
		}
	}

	pauseGame() {
		if (!game.running) return;
		this.isPaused = !this.isPaused;
		if (this.isPaused) {
			document.getElementById("gamestatus").innerHTML = "Paused";
			clearInterval(game.updateInterval);
			clearInterval(game.movementInterval);
		} else {
			document.getElementById("gamestatus").innerHTML = "";
			game.updateInterval = setInterval(game.updateSnake, 15)
			game.movementInterval = setInterval(game.snake.move, game.speed)
		}
	}

	startAudio() {
		this.audio = new Audio('./other/song.mp3');
		this.audio.loop = true;
		this.audio.play();
	}

	pauseAudio() {
		this.audio.pause();
	}

	sendData(dataToBeSent) {
		$("#result").innerHTML = "";
		$.post("db.php", dataToBeSent, function (data) {
			// Display the returned data in browser

			$("#result").html(data);
		});
	}

	collapsible() {
		let coll = document.getElementsByClassName("collapsible");
		let i;

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener("click", function () {
				console.log(this.nextElementSibling);
				this.classList.toggle("active");
				var content = this.nextElementSibling.nextElementSibling;

				if (content.style.maxHeight) {
					content.style.maxHeight = null;
				} else {
					content.style.maxHeight = content.scrollHeight + "px";
				}
			});
		}
	}
}