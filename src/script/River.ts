import {Direction} from "./types/Direction";

export default class River {
    public start(): void {
        this.create1stLogLine(35);
        this.create2ndLogLine(10);
        this.create3rdLogLine(25);
        this.create4turtleLine(20);
        this.create3turtleLine(40);
    }

    private create1stLogLine(speed: number): void {
        for (let i = 0; i < 3; i++) {
            let log = this.createLog('log1.png', 112)
            this.moveObject(log, Direction.RIGHT, i * 366, speed, 875)
        }
    }

    private create2ndLogLine(speed: number): void {
        for (let i = 0; i < 2; i++) {
            let log = this.createLog('log2.png', 218)
            this.moveObject(log, Direction.RIGHT, i * 525, speed, 650)
        }
    }

    private create3rdLogLine(speed: number): void {
        for (let i = 0; i < 4; i++) {
            let log = this.createLog('log3.png', 271)
            this.moveObject(log, Direction.RIGHT, i * 265, speed, 875)
        }
    }

    private create4turtleLine(speed: number): void {
        for (let i = 0; i < 3; i++) {
            let turtles = this.createTurtles(4, 162)
            this.moveObject(turtles, Direction.LEFT, i * 380, speed, 875)
        }
    }

    private create3turtleLine(speed: number): void {
        for (let i = 0; i < 3; i++) {
            let turtles = this.createTurtles(3, 321)
            this.moveObject(turtles, Direction.LEFT, i * 360, speed, 875)
        }
    }

    private moveObject(obj: HTMLImageElement, direction: Direction, offset: number, speed: number, border: number): void {
        let c = offset;

        let nObj: HTMLImageElement;
        if (direction == Direction.RIGHT) {
            nObj = this.createLog(obj.src.split('/')[6], parseInt(obj.style.top))
            nObj.style.left = '-1000px'
        } else {
            nObj = this.createTurtles(parseInt(obj.src.charAt(obj.src.length - 6)), parseInt(obj.style.top))
            nObj.style.right = '-1000px'
        }

        setInterval(() => {
            let posOfnObj = (((border - c) * -1) - obj.width);
            if (c > border) {
                if (direction == Direction.RIGHT) {
                    nObj.style.left = posOfnObj + 'px'
                } else {
                    nObj.style.right = posOfnObj + 'px'
                }
            }

            if (posOfnObj > 0) {
                c = posOfnObj;
                if (direction == Direction.RIGHT) {
                    nObj.style.left = '-1000px'
                } else {
                    nObj.style.right = '-1000px'
                }
            }

            if (direction == Direction.RIGHT) {
                obj.style.left = c + 'px'
            } else {
                obj.style.right = c + 'px'
            }

            c = c + 5;
        }, speed)
    }

    private createTurtles(type: number, top: number): HTMLImageElement {
        let turtles = document.createElement('img')
        turtles.draggable = false
        turtles.className = 'river-obj'
        turtles.id = (Math.random() * 100000) + '';
        turtles.style.top = top + 'px'
        turtles.src = '../resources/logs/turtle/turtle' + type + '1.png'

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
        log.className = 'river-obj'
        log.style.top = top + 'px'
        document.getElementById('main').append(log)
        return log
    }
}