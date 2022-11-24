import {Direction} from "../types/Direction";
import Animations from "../UI/Animations";
import Log from "../interfaces/Log";
import MovingObject from "../interfaces/MovingObject";

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
                let movingObject = {
                    obj1: this.createLog('log' + (idx + 1) + '.png', log), x1: 0,
                    obj2: this.createLog('log' + (idx + 1) + '.png', log), x2: 0
                }
                this.startMove(movingObject, (i * log.offset), log, Direction.RIGHT)
            }
        })

        this.turtles.forEach(turtle => {
            for (let i = 0; i < 3; i++) {
                let movingObject = {
                    obj1: this.createTurtles(turtle.type, turtle), x1: 0,
                    obj2: this.createTurtles(turtle.type, turtle), x2: 0
                }
                this.startMove(movingObject, (i * turtle.offset), turtle, Direction.LEFT)
            }
        })
    }

    private startMove(movingObject: MovingObject, offset: number, obj: Log | Turtles, direction: Direction) {
        let objWidth = movingObject.obj1.naturalWidth * -1;
        movingObject.x1 = objWidth + offset;
        movingObject.x2 = obj.border + offset;
        window.requestAnimationFrame(() =>
            this.moveObj(movingObject, objWidth, obj, direction))
    }

    private moveObj(movingObject: MovingObject, objWidth: number, obj: Log | Turtles, direction: Direction) {
        if (direction == Direction.RIGHT) {
            movingObject.obj1.style.left = movingObject.x1 + 'px'
            movingObject.obj2.style.left = movingObject.x2 + 'px'
        } else {
            movingObject.obj1.style.right = movingObject.x1 + 'px'
            movingObject.obj2.style.right = movingObject.x2 + 'px'
        }

        if (movingObject.x1 == obj.border)
            movingObject.x2 = objWidth;

        if (movingObject.x2 == obj.border)
            movingObject.x1 = objWidth;

        movingObject.x1 = movingObject.x1 + obj.speed;
        movingObject.x2 = movingObject.x2 + obj.speed;
        window.requestAnimationFrame(() => this.moveObj(movingObject, objWidth, obj, direction))
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