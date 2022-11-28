import Scoreboard from "../UI/Scoreboard";

export default class RandomEvents {
    isFlyDrawn: boolean = false;

    public drawChanceForBonusFly():void {
        if (Math.random() < 0.0025  && !this.isFlyDrawn) {
            Scoreboard.toggleFly(Math.round(Math.random() * 4), true)
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