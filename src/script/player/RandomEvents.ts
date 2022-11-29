import Scoreboard from "../UI/Scoreboard";
import Player from "./Player";

export default class RandomEvents {
    isFlyDrawn: boolean = false;
    player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public drawChanceForBonusFly():void {
        if (Math.random() < 0.0025  && !this.isFlyDrawn ) {
            let pos = 0;
            while (true) {
                pos = Math.round(Math.random() * 4);

                if (!this.player.finishFrogs[pos])
                    break;
            }
            Scoreboard.toggleFly(pos, true)
            this.isFlyDrawn = true;
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    Scoreboard.toggleFly(i, false);
                }
                this.isFlyDrawn = false;
            }, 5000)
        }
    }
}