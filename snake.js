class Snake {
    constructor() {

        this.length = 1;
        this.direction = "unset";
        this.parts = [];

        let pos = Math.floor(worldSize / 2)
        this.addPart(pos, pos, "start");
        this.addPart(pos + 1, pos, "normal");
        this.addPart(pos + 2, pos, "normal");
    }

    addPart(x, y, pos) {
        let part = new Part(x, y, pos);
        this.parts.push(part);
    }

    move() {
        if (game.snake.direction !== undefined && game.snake.direction !== "unset") {
            let part;
            switch (game.snake.direction) {
                case "up":
                    part = new Part(game.snake.parts[0].x, game.snake.parts[0].y - 1, "start")
                    break;
                case "down":
                    part = new Part(game.snake.parts[0].x, game.snake.parts[0].y + 1, "start")
                    break;
                case "left":
                    part = new Part(game.snake.parts[0].x - 1, game.snake.parts[0].y, "start")
                    break;
                case "right":
                    part = new Part(game.snake.parts[0].x + 1, game.snake.parts[0].y, "start")
                    break;
            }
            game.snake.parts[0].pos = "normal";
            game.snake.parts.unshift(part);
            game.snake.parts.pop();
        }
    }
	
	checkIfUsed(x, y) {
		for (let i = 0; i < game.snake.parts.length; i++) {
			const element = game.snake.parts[i];
			if (element.x == x && element.y == y) {
				console.log("already used")
				console.log(game.snake.parts[i])
				return true;
			}
		}
		return false;
	}

    extendSnake() {
        let parts = this.parts,
            yDiff = parts[parts.length - 1].y - parts[parts.length - 2].y,
            xDiff = parts[parts.length - 1].x - parts[parts.length - 2].x,
            pos = {};
        pos.x = parts[parts.length - 1].x + xDiff;
        pos.y = parts[parts.length - 1].y + yDiff;

        if (game.checkIfOutside(pos.x) || game.checkIfOutside(pos.y)) {
            if (yDiff != 0) {
                pos.x += 1;
            } else {
                pos.y += 1
            }
            console.log(pos.x, pos.y)
            if (game.checkIfOutside(pos.x) || game.checkIfOutside(pos.y)) {
                if (yDiff != 0) {
                    pos.x -= 2;
                } else {
                    pos.y -= 2;
                }
                console.log(pos.x, pos.y)
            }
        }
        this.addPart(pos.x, pos.y, "normal");
    }

    changeDirection(e) {
        switch (e.key.toLowerCase()) {
            case "tab":
                e.preventDefault();
                clearInterval(game.updateInterval);
                clearInterval(game.movementInterval);
                game = new Game();
                break;
            case "w":
				if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y - 1))return;
                game.snake.direction = "up";
                break;
            case "arrowup":
				if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y - 1))return;
                game.snake.direction = "up";
                break;
            case "s":
				if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y + 1))return;
                game.snake.direction = "down";
                break;
            case "arrowdown":
				if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y + 1))return;
                game.snake.direction = "down";
                break;
            case "a":
				if (game.snake.checkIfUsed(game.snake.parts[0].x - 1, game.snake.parts[0].y))return;
                game.snake.direction = "left";
                break;
            case "arrowleft":
				if (game.snake.checkIfUsed(game.snake.parts[0].x - 1, game.snake.parts[0].y))return;
                game.snake.direction = "left";
                break;
            case "d":
				if (game.snake.checkIfUsed(game.snake.parts[0].x + 1, game.snake.parts[0].y))return;
                game.snake.direction = "right";
                break;
            case "arrowright":
				if (game.snake.checkIfUsed(game.snake.parts[0].x + 1, game.snake.parts[0].y))return;
                game.snake.direction = "right";
                break;
        }
    }
}

class Part {
    constructor(x, y, pos) {
        this.x = x;
        this.y = y;
        this.pos = pos;
    }
}