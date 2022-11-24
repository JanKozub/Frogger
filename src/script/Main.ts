import Cars from "./linear/Cars";
import River from "./linear/River";
import Player from "./player/Player";
import Timer from "./UI/Timer";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();

        let river = new River();
        river.start();

        let player = new Player();
        player.startMovement();
        player.enableCollision();

        let timer = new Timer(player);
        timer.start();

        player.setTimer(timer)
    }
}

new Main();