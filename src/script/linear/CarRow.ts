import {Direction} from "../structure/Direction";
import Animations from "../UI/Animations";

export default class CarRow {
    private readonly speed: number
    private readonly amount: number
    private readonly direction: Direction
    private positions: number[] = [0,0,0,0,0];
    private carsEl: HTMLImageElement[] = [];
    private offsets: number[] = [];

    constructor(top: number, offset: number, speed: number, amount: number, direction: Direction, imgUrl: string) {
        this.speed = speed;
        this.amount = amount;
        this.direction = direction;

        for (let i = 0; i < amount; i++) {
            this.carsEl.push(this.createCar(imgUrl, top))
            this.offsets.push(i * offset)

            if (imgUrl == '')
                Animations.animateOrangeCar(this.carsEl[i])
        }
    }

    public move() { //move by 5 px in original
        for (let i = 0; i < this.amount; i++) {
            let car = this.carsEl[i]
            let offset = this.offsets[i]
            let pos = this.positions[i]
            if (pos + offset < -92)
                pos = 1266 - offset;


            if (this.direction == Direction.LEFT) {
                car.style.left = String(pos + offset) + 'px'
            } else {
                car.style.right = String(pos + offset) + 'px'
            }


            this.positions[i] = pos - this.speed
        }
    }

    private createCar(filename: string, top: number): HTMLImageElement {
        let car = document.createElement('img')
        car.src = '../resources/cars/' + filename;
        car.draggable = false
        car.className = 'car'
        car.style.top = top + 'px'
        document.getElementById('main').append(car)
        return car
    }
}