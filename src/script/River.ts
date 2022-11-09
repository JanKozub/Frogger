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
                let log1 = this.createLog('log' + (idx + 1) + '.png', log)
                let log2 = this.createLog('log' + (idx + 1) + '.png', log)

                this.startMove(log1, log2, (i * log.offset), log, Direction.RIGHT)
            }
        })

        this.turtles.forEach(turtle => {
            for (let i = 0; i < 3; i++) {
                let turtles1 = this.createTurtles(turtle.type, turtle)
                let turtles2 = this.createTurtles(turtle.type, turtle)

                this.startMove(turtles1, turtles2, (i * turtle.offset), turtle, Direction.LEFT)
            }
        })
    }

    //TODO create interface with 4 fields {obj1: HTML.., x1:number, obj2:HTML..., x2:number} and update this method signature
    private startMove(obj1: HTMLImageElement, obj2: HTMLImageElement, offset: number, obj: Log | Turtles, direction: Direction) {
        let objWidth = obj1.naturalWidth * -1;

        window.requestAnimationFrame(() =>
            this.moveObj(objWidth + offset, obj.border + offset, obj1, obj2, objWidth, obj, direction))
    }

    private moveObj(a: number, b: number, obj1: HTMLImageElement, obj2: HTMLImageElement,
                    objWidth: number, obj: Log | Turtles, direction: Direction) {
        if (direction == Direction.RIGHT) {
            obj1.style.left = a + 'px'
            obj2.style.left = b + 'px'
        } else {
            obj1.style.right = a + 'px'
            obj2.style.right = b + 'px'
        }

        if (a == obj.border)
            b = objWidth;

        if (b == obj.border)
            a = objWidth;

        a = a + obj.speed;
        b = b + obj.speed;
        window.requestAnimationFrame(() => this.moveObj(a, b, obj1, obj2, objWidth, obj, direction))
    }

    private createTurtles(type: number, turtles: Turtles): HTMLImageElement {
        let turtlesEl = document.createElement('img')
        turtlesEl.draggable = false
        turtlesEl.className = 'river-obj left-' + turtles.speed
        turtlesEl.id = (Math.random() * 100000) + '';
        turtlesEl.style.top = turtles.top + 'px'
        turtlesEl.src = '../resources/logs/turtle/turtle' + type + '1.png'

        Animations.animateTurtles(turtlesEl, type)
        document.getElementById('main').append(turtlesEl)
        return turtlesEl
    }

    private createLog(filename: string, log: Log): HTMLImageElement {
        let logEl = document.createElement('img')
        logEl.src = '../resources/logs/' + filename;
        logEl.draggable = false
        logEl.className = 'river-obj right-' + log.speed
        logEl.style.top = log.top + 'px'
        document.getElementById('main').append(logEl)
        return logEl
    }
}