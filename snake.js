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
        let parts = this.parts, pos = {}, count = 0,
            yDiff = parts[parts.length - 1].y - parts[parts.length - 2].y,
            xDiff = parts[parts.length - 1].x - parts[parts.length - 2].x;

        pos.x = parts[parts.length - 1].x + xDiff;
        pos.y = parts[parts.length - 1].y + yDiff;



        console.log(pos.x, pos.y)

        do {
            if (count > 1) {
                pos.x = parts[parts.length - 1].x;
                pos.y = parts[parts.length - 1].y;
                switch (count) {
                    case 1:
                        pos.x--;
                        break;
                    case 2:
                        pos.x++;
                        break;
                    case 3:
                        pos.y--;
                        break;
                    case 4:
                        pos.y++;
                        break;
                }
            }

            if (pos.x < 0) pos.x++;
            if (pos.y < 0) pos.x++;
            if (pos.x >= worldSize) pos.x--;
            if (pos.y >= worldSize) pos.y--;

            count++;
            if (count > 5) return;
        }
        while (game.checkIfOutside(pos.x) || game.checkIfOutside(pos.y) || game.snake.checkIfUsed(pos.x, pos.y))

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
                if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y - 1)) return;
                game.snake.direction = "up";
                break;
            case "arrowup":
                if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y - 1)) return;
                game.snake.direction = "up";
                break;
            case "s":
                if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y + 1)) return;
                game.snake.direction = "down";
                break;
            case "arrowdown":
                if (game.snake.checkIfUsed(game.snake.parts[0].x, game.snake.parts[0].y + 1)) return;
                game.snake.direction = "down";
                break;
            case "a":
                if (game.snake.checkIfUsed(game.snake.parts[0].x - 1, game.snake.parts[0].y)) return;
                game.snake.direction = "left";
                break;
            case "arrowleft":
                if (game.snake.checkIfUsed(game.snake.parts[0].x - 1, game.snake.parts[0].y)) return;
                game.snake.direction = "left";
                break;
            case "d":
                if (game.snake.checkIfUsed(game.snake.parts[0].x + 1, game.snake.parts[0].y)) return;
                game.snake.direction = "right";
                break;
            case "arrowright":
                if (game.snake.checkIfUsed(game.snake.parts[0].x + 1, game.snake.parts[0].y)) return;
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