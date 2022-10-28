import Cars from "./Cars";

export class Main {
    constructor() {
        let cars = new Cars();
        cars.start();
    }
}

new Main();