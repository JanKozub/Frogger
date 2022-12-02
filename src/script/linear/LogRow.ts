import MovingObject from "../structure/MovingObject";

export default class LogRow {
    private readonly top: number
    private readonly border: number
    private readonly speed: number
    private readonly movingObjects: MovingObject[] = [];
    private readonly objWidth: number;

    constructor(top: number, offset: number, border: number, speed: number, amount: number, imgUrl: string) {
        this.top = top;
        this.border = border;
        this.speed = speed;

        for (let i = 0; i < amount; i++) {
            let movingObject = {
                obj1: this.createLog(imgUrl), x1: 0,
                obj2: this.createLog(imgUrl), x2: 0
            }

            this.objWidth = movingObject.obj1.naturalWidth * -1;
            movingObject.x1 = this.objWidth + (i * offset);
            movingObject.x2 = this.border + (i * offset);

            this.movingObjects.push(movingObject)
        }
    }

    public move(): void {
        for (let i = 0; i < this.movingObjects.length; i++) {
            let movingObject = this.movingObjects[i];

            movingObject.obj1.style.left = movingObject.x1 + 'px'
            movingObject.obj2.style.left = movingObject.x2 + 'px'

            if (movingObject.x1 == this.border)
                movingObject.x2 = this.objWidth;

            if (movingObject.x2 == this.border)
                movingObject.x1 = this.objWidth;

            movingObject.x1 = movingObject.x1 + this.speed;
            movingObject.x2 = movingObject.x2 + this.speed;

            this.movingObjects[i] = movingObject;
        }
    }

    private createLog(filename: string): HTMLImageElement {
        let logEl = document.createElement('img')
        logEl.src = '../resources/logs/' + filename;
        logEl.draggable = false
        logEl.className = 'river-obj right-' + this.speed
        logEl.style.top = this.top + 'px'
        document.getElementById('main').append(logEl)
        return logEl
    }
}