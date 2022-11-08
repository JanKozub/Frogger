import Cars from "./Cars";
import River from "./River";
import Player from "./player/Player";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();

        let river = new River();
        river.start();

        let player = new Player();
        player.startMovement();
        player.enableCollision();
    }
}

new Main();