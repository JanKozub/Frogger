export default class Timer {
    time:number;
    loopCounter:number = 0;

    constructor() {
    }

    public start() {
        this.time = 0;
        this.timeLoop();
    }

    private timeLoop(): void {
        // console.log(this.time)

        this.loopCounter++;
        if (this.loopCounter == 60) {
            this.loopCounter = 0;
            this.time++;
        }
        window.requestAnimationFrame(() => this.timeLoop());
    }
}