class Snake {
    constructor() {

        this.length = 1;
        this.direction = "unset";
        this.parts = [];
        console.log(this.direction);

        this.addPart(worldSize / 2, worldSize / 2, "start");
    }

    addPart(x, y, pos) {

        let part = new Part(x, y, pos);
        this.parts.push(part);

    }

    move() {
        if (this.direction !== undefined && this.snake.direction !== "unset") {
            let part;

            switch (this.snake.direction) {
                case "up":
                    part = new Part(this.parts[0].x, this.parts[0].y - 1, "start")
                    break;
                case "down":
                    part = new Part(this.parts[0].x, this.parts[0].y + 1, "start")
                    break;
                case "left":
                    part = new Part(this.parts[0].x - 1, this.parts[0].y, "start")
                    break;
                case "right":
                    part = new Part(this.parts[0].x + 1, this.parts[0].y, "start")
                    break;
                default:
                    console.log("direction not found");
                    break;
            }
            this.parts.unshift(part);
            this.parts.pop();
        }
        console.log(game.snake);
    }

    changeDirection(e) {
        console.log(e.key);

        switch (e.key.toLowerCase()) {
            case "w":
                this.direction = "up";
                break;
            case "s":
                this.direction = "down";
                break;
            case "a":
                this.direction = "left";
                break;
            case "d":
                this.direction = "right";
                break;
            default:
                console.log("unknown input");
                break;
        }

        console.log(this.direction);

    }

}

class Part {
    constructor(x, y, pos) {
        this.x = x;
        this.y = y;
        this.pos = pos;
    }
}