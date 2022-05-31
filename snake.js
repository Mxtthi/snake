class Snake {
    constructor() {

        this.length = 1;
        this.direction = "unset";
        this.parts = [];

        let pos = Math.floor(worldSize / 2)
        this.addPart(pos, pos, "start");
        this.addPart(pos + 1, pos, "start");
        this.addPart(pos + 2, pos, "start");
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
            game.snake.parts.unshift(part);
            game.snake.parts.pop();
        }
    }

    changeDirection(e) {
        switch (e.key.toLowerCase()) {
            case "w":
                game.snake.direction = "up";
                break;
            case "s":
                game.snake.direction = "down";
                break;
            case "a":
                game.snake.direction = "left";
                break;
            case "d":
                game.snake.direction = "right";
                break;
            default:
                console.log("unknown input");
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