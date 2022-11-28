import Player from "./player/Player";
import Timer from "./UI/Timer";
import CarRow from "./linear/CarRow";
import {Direction} from "./structure/Direction";
import LogRow from "./linear/LogRow";
import TurtleRow from "./linear/TurtleRow";
import RandomEvents from "./player/RandomEvents";

export class Main {
    private readonly player: Player;

    private readonly timer: Timer;
    private start: number = 0;
    private previousTimeStamp: number;

    private readonly pinkCar: CarRow;
    private readonly orangeCar: CarRow;
    private readonly blueCar: CarRow;
    private readonly yellowCar: CarRow;

    private readonly log1: LogRow;
    private readonly log2: LogRow;
    private readonly log3: LogRow;

    private readonly turtles1: TurtleRow;
    private readonly turtles2: TurtleRow;

    private readonly randomEvents:RandomEvents = new RandomEvents();

    constructor() {
        this.player = new Player();

        this.timer = new Timer(this.player);
        this.player.setTimer(this.timer)

        this.pinkCar = new CarRow(427, 340, 1, 4, Direction.LEFT, 'car1.png')
        this.orangeCar = new CarRow(480, 0, 3, 1, Direction.RIGHT, 'car2.png')
        this.blueCar = new CarRow(533, 300 + (Math.random() * 40), 1, 4, Direction.LEFT, 'car3.png')
        this.yellowCar = new CarRow(589, 340, 1, 4, Direction.RIGHT, '')

        this.log1 = new LogRow(112, 360, 850, 1, 3, 'log1.png')
        this.log2 = new LogRow(218, 524, 650, 2, 2, 'log2.png')
        this.log3 = new LogRow(271, 265, 875, 1, 4, 'log3.png')

        this.turtles1 = new TurtleRow(162, 380, 875, 1, 4)
        this.turtles2 = new TurtleRow(321, 360, 875, 1, 3)

        window.requestAnimationFrame((t) => this.mainLoop(t))
    }

    private mainLoop(timestamp: number) {
        if (this.start === 0) {
            this.start = timestamp;
        }

        if (this.previousTimeStamp !== timestamp) {
            this.player.checkCollision();

            this.pinkCar.move();
            this.orangeCar.move();
            this.blueCar.move();
            this.yellowCar.move();

            this.log1.moveLog();
            this.log2.moveLog();
            this.log3.moveLog();

            this.turtles1.moveTurtles();
            this.turtles2.moveTurtles();

            if (!this.timer.timerLock) this.timer.timeLoop();

            this.randomEvents.drawChanceForBonusFly();
        }

        window.requestAnimationFrame((t) => this.mainLoop(t));
    }
}

new Main();