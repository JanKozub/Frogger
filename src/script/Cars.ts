import {Direction} from "./types/Direction";
import Car from "./interfaces/Car";
import Animations from "./Animations";

export default class Cars {

    private readonly pinkCar: Car = {top: 427, offset: 340, speed: 1, amount: 4, direction: Direction.LEFT}
    private readonly orangeCar: Car = {top: 480, offset: 0, speed: 3, amount: 1, direction: Direction.RIGHT}
    private readonly blueCar: Car = {top: 533, offset: 300 + (Math.random() * 40), speed: 1, amount: 4, direction: Direction.LEFT}
    private readonly yellowCar: Car = {top: 589, offset: 340, speed: 1, amount: 4, direction: Direction.RIGHT}
    private readonly cars: Car[] = [this.pinkCar, this.orangeCar, this.blueCar, this.yellowCar]

    public start(): void {
        this.cars.forEach((car, idx) => {
            for (let i = 0; i < car.amount; i++) {
                let carEl = this.createCar('car' + (idx + 1) + '.png', car.top)
                this.move(0, carEl, i * car.offset, car.speed, car.direction)

                if (idx == 3)
                    Animations.animateOrangeCar(carEl)
            }
        })
    }

    private move(a: number, car: HTMLElement, offset: number, speed: number, direction: Direction) { //move by 5 px in original
        if (a + offset < -92)
            a = 1266 - offset;

        if (direction == Direction.LEFT) {
            car.style.left = String(a + offset) + 'px'
        } else {
            car.style.right = String(a + offset) + 'px'
        }

        window.requestAnimationFrame(() => this.move(a - speed, car, offset, speed, direction))
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