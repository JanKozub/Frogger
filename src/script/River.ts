import {Direction} from "./types/Direction";
import Animations from "./Animations";
import Log from "./interfaces/Log";

export default class River {
    private readonly log1: Log = {index: 1, top: 112, offset: 366, border: 875, speed: 35, amount: 3}
    private readonly log2: Log = {index: 2, top: 218, offset: 525, border: 650, speed: 10, amount: 2}
    private readonly log3: Log = {index: 3, top: 271, offset: 265, border: 875, speed: 25, amount: 4}
    private readonly logs: Log[] = [this.log1]

    private readonly turtles1: Turtles = {top: 162, offset: 380, border: 875, speed: 20, type: 4}
    private readonly turtles2: Turtles = {top: 321, offset: 360, border: 875, speed: 40, type: 3}
    private readonly turtles: Turtles[] = [this.turtles1, this.turtles2]

    public start(): void {
        this.createObjects();
    }

    private createObjects(): void {
        let logs: Object[] = []
        this.logs.forEach((log, idx) => {
            for (let i = 0; i < log.amount; i++) {
                console.log(i)
                let logEl = this.createLog('log' + log.index + '.png', log.top)
                logs.push({logEl: logEl, log: log})
            }
        })

        window.requestAnimationFrame(() => this.startClock(0, logs))

        //
        // this.turtles.forEach(turtle => {
        //     for (let i = 0; i < 3; i++) {
        //         let turtles = this.createTurtles(turtle.type, turtle.top)
        //         this.moveObject(turtles, Direction.LEFT, i * turtle.offset, turtle.speed, turtle.border)
        //     }
        // })

    }

    private startClock(a: number, logs: Object[]) {


        window.requestAnimationFrame(() => this.startClock(a + 1, logs))
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

        Animations.animateTurtles(turtles, type)
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