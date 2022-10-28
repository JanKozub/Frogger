import Cars from "./Cars";
import Scoreboard from "./Scoreboard";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();

        let scoreboard = new Scoreboard();
        scoreboard.setLifeAmount(4);
    }
}

new Main();