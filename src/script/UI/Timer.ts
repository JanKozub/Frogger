import Player from "../player/Player";
import {DeathType} from "../types/DeathType";
import Scoreboard from "./Scoreboard";

export default class Timer {
    time: number = 0;
    timeCounter: number = 0;
    barCounter: number = 0;
    timerLock: boolean = false;
    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public timeLoop(): void {
        if (this.time == 30) {
            this.player.killFrog(DeathType.ROAD)
            this.time = 0;
            this.barCounter = 0
            this.timerLock = true;
            setTimeout(() => {
                this.timerLock = false;
                Scoreboard.setTimeBarProgress(0);
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
    }

    public reset() {
        this.time = 0;
        this.timeCounter = 0;
        this.barCounter = 0;
        Scoreboard.setTimeBarProgress(0);
    }
}