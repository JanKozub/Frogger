import Player from "../player/Player";
import {DeathType} from "../types/DeathType";
import Scoreboard from "./Scoreboard";

export default class Timer {
    time: number;
    timeCounter: number = 0;
    barCounter: number = 0;
    timerLock:boolean = false;

    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public start() {
        this.time = 0;
        this.timeLoop();
    }

    private timeLoop(): void {
        if (!this.timerLock) {
            if (this.time == 30) {
                this.player.killFrog(DeathType.ROAD)
                this.time = 0;
                this.barCounter = 0
                this.timerLock = true;
                setTimeout(() => {
                    this.timerLock = false;
                    Scoreboard.setTimeBarProgress(0);
                    window.requestAnimationFrame(() => this.timeLoop());
                }, 2000)
            }

            this.barCounter++;
            if (this.barCounter % 15 == 0) {
                Scoreboard.setTimeBarProgress(this.barCounter / 15);
            }

            this.timeCounter++;
            if (this.timeCounter == 60) {
                this.timeCounter = 0;
                this.time++;
            }
            window.requestAnimationFrame(() => this.timeLoop());
        }
    }

    public reset() {
        this.time = 0;
        this.timeCounter = 0;
        this.barCounter = 0;
        Scoreboard.setTimeBarProgress(0);
    }
}