import {Direction} from "./types/Direction";

export default class River {
    private disappearBorder = 1425;

    constructor() {
    }

    public start(): void {
        this.create1stLogLine();
        this.create2ndLogLine();
        this.create3rdLogLine();
        this.create4turtleLine();
        this.create3turtleLine();
    }

    private create1stLogLine() {
        for (let i = 0; i < 3; i++) {
            let log = this.createLog('log1.png', 112)
            this.moveLog(log, Direction.RIGHT, i * 475, 20)
        }
    }

    private create2ndLogLine() {
        for (let i = 0; i < 2; i++) {
            let log = this.createLog('log2.png', 218)
            this.moveLog(log, Direction.RIGHT, i * 715, 5)
        }
    }

    private create3rdLogLine() {
        for (let i = 0; i < 4; i++) {
            let log = this.createLog('log3.png', 271)
            this.moveLog(log, Direction.RIGHT, i * 360, 25)
        }
    }

    private create3turtleLine() {
        for (let i = 0; i < 4; i++) {
            let log = this.createTurtles(3, 321)
            this.moveLog(log, Direction.LEFT, i * 360, 15)
        }
    }

    private create4turtleLine() {
        for (let i = 0; i < 3; i++) {
            let log = this.createTurtles(4, 162)
            this.moveLog(log, Direction.LEFT, i * 400, 25)
        }
    }

    private moveLog(log: HTMLImageElement, direction: Direction, offset: number, speed: number) {
        let nlog = this.createLog(log.src.split('/')[6], parseInt(log.style.top))
        nlog.style.left = '-1000px'
        let c = offset;

        setInterval(() => {
            if (c > (this.disappearBorder - log.width)) {
                nlog.style.left = ((this.disappearBorder - c) * -1) + 'px'
            }

            if (c > this.disappearBorder) {
                c = 0;
                nlog.style.left = '-1000px'
            }
            log.style.left = c + 'px'

            if (direction == Direction.RIGHT) {
                c = c + 4;
            } else {
                c = c - 4;
            }
        }, speed)
    }

    private createTurtles(type: number, top: number): HTMLImageElement {
        let turtles = document.createElement('img')
        turtles.draggable = false
        turtles.className = 'log'
        turtles.style.top = top + 'px'

        let c = 1;
        setInterval(() => {
            if (c == 5) {
                c = 1;
            }

            turtles.src = '../resources/logs/turtle/turtle' + type + '' + c + '.png'
            c++;
        }, 200)

        document.getElementById('main').append(turtles)
        return turtles
    }

    private createLog(filename: string, top: number): HTMLImageElement {
        let log = document.createElement('img')
        log.src = '../resources/logs/' + filename;
        log.draggable = false
        log.className = 'log'
        log.style.top = top + 'px'
        document.getElementById('main').append(log)
        return log
    }
}