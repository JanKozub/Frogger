import {Direction} from "./types/Direction";
import Animations from "./Animations";
import Log from "./interfaces/Log";

export default class River {
    private readonly log1: Log = {top: 112, offset: 360, border: 850, speed: 1, amount: 3}
    private readonly log2: Log = {top: 218, offset: 524, border: 650, speed: 2, amount: 2}
    private readonly log3: Log = {top: 271, offset: 265, border: 875, speed: 1, amount: 4}
    private readonly logs: Log[] = [this.log1, this.log2, this.log3]

    private readonly turtles1: Turtles = {top: 162, offset: 380, border: 875, speed: 1, type: 4}
    private readonly turtles2: Turtles = {top: 321, offset: 360, border: 875, speed: 1, type: 3}
    private readonly turtles: Turtles[] = [this.turtles1, this.turtles2]

    public start(): void {
        this.logs.forEach((log, idx) => {
            for (let i = 0; i < log.amount; i++) {
                let log1 = this.createLog('log' + (idx + 1) + '.png', log.top)
                let log2 = this.createLog('log' + (idx + 1) + '.png', log.top)

                this.startMove(log1, log2, (i * log.offset), log.border, log.speed, Direction.RIGHT)
            }
        })

        this.turtles.forEach(turtle => {
            for (let i = 0; i < 3; i++) {
                let turtles1 = this.createTurtles(turtle.type, turtle.top)
                let turtles2 = this.createTurtles(turtle.type, turtle.top)

                this.startMove(turtles1, turtles2, (i * turtle.offset), turtle.border, turtle.speed, Direction.LEFT)
            }
        })
    }

    private startMove(obj1: HTMLImageElement, obj2: HTMLImageElement, offset:number, border: number, speed: number, direction: Direction) {
        let objWidth = obj1.naturalWidth * -1;

        window.requestAnimationFrame(() =>
            this.moveObj(objWidth + offset,border + offset, obj1, obj2, objWidth, border, speed, direction))
    }

    private moveObj(a: number, b: number, obj1: HTMLImageElement, obj2: HTMLImageElement,
                    objWidth: number, border: number, speed: number, direction: Direction) {
        if (direction == Direction.RIGHT) {
            obj1.style.left = a + 'px'
            obj2.style.left = b + 'px'
        } else {
            obj1.style.right = a + 'px'
            obj2.style.right = b + 'px'
        }

        if (a == border)
            b = objWidth;

        if (b == border)
            a = objWidth;

        a = a + speed;
        b = b + speed;
        window.requestAnimationFrame(() => this.moveObj(a, b, obj1, obj2, objWidth, border, speed, direction))
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