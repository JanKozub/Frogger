import Cars from "./Cars";
import River from "./River";
import Player from "./player/Player";
import Timer from "./Timer";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();

        let river = new River();
        river.start();

        let player = new Player();
        player.startMovement();
        player.enableCollision();

        let timer = new Timer();
        timer.start();
    }
}

new Main();