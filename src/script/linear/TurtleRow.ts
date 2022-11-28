import Animations from "../UI/Animations";
import MovingObject from "../interfaces/MovingObject";

export default class TurtleRow {
    private readonly top: number
    private readonly offset: number
    private readonly border: number
    private readonly speed: number
    private readonly objWidth: number
    private movingObjects: MovingObject[] = []

    constructor(top: number, offset: number, border: number, speed: number, type: number) {
        this.top = top;
        this.offset = offset;
        this.border = border;
        this.speed = speed;

        for (let i = 0; i < 3; i++) {
            let movingObject = {
                obj1: this.createTurtles(type), x1: 0,
                obj2: this.createTurtles(type), x2: 0
            }

            this.objWidth = movingObject.obj1.naturalWidth * -1;
            movingObject.x1 = this.objWidth + (i * offset);
            movingObject.x2 = this.border + (i * offset);

            this.movingObjects.push(movingObject)
        }
    }

    public moveTurtles(): void {
        for (let i = 0; i < 3; i++) {
            let movingObject = this.movingObjects[i];

            movingObject.obj1.style.right = movingObject.x1 + 'px'
            movingObject.obj2.style.right = movingObject.x2 + 'px'

            if (movingObject.x1 == this.border)
                movingObject.x2 = this.objWidth;

            if (movingObject.x2 == this.border)
                movingObject.x1 = this.objWidth;

            movingObject.x1 = movingObject.x1 + this.speed;
            movingObject.x2 = movingObject.x2 + this.speed;

            this.movingObjects[i] = movingObject;
        }
    }

    private createTurtles(type: number): HTMLImageElement {
        let turtlesEl = document.createElement('img')
        turtlesEl.draggable = false
        turtlesEl.className = 'river-obj left-' + this.speed
        turtlesEl.id = (Math.random() * 100000) + '';
        turtlesEl.style.top = this.top + 'px'
        turtlesEl.src = '../resources/logs/turtle/turtle' + type + '1.png'

        Animations.animateTurtles(turtlesEl, type)
        document.getElementById('main').append(turtlesEl)
        return turtlesEl
    }
}