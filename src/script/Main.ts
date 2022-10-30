import Cars from "./Cars";
import Scoreboard from "./Scoreboard";
import River from "./River";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();

        let scoreboard = new Scoreboard();
        scoreboard.setLifeAmount(4);

        let river = new River();
        river.start();
    }
}

new Main();