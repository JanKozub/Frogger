import {Direction} from "./types/Direction";

export default class Cars {
    constructor() {}

    public start(): void {
        this.createPinkCarLine();
        this.createOrangeCarLine();
        this.createBlueCarLine();
        this.createYellowCarLine();
    }

    private createPinkCarLine(): void {
        for (let i = 0; i < 4; i++) {
            let car = this.createCar('car1.png', 570)
            this.moveCar(car, i * 340, Direction.LEFT, 6)
        }
    }

    private createOrangeCarLine(): void {
        let car = this.createCar('car2.png', 638)
        this.moveCar(car, 0, Direction.RIGHT, -1)

    }

    private createBlueCarLine():void {
        for (let i = 0; i < 4; i++) {
            let car = this.createCar('car3.png', 710)
            this.moveCar(car, i * (300 + (Math.random() * 40)), Direction.LEFT, 4)
        }
    }

    private createYellowCarLine():void {
        for (let i = 0; i < 4; i++) {
            let car = this.createCar('car4/car40.png', 785)
            this.moveCar(car, i * 340, Direction.RIGHT, 6)

            let c = 0;
            setInterval(() => {
                if (c == 3) {
                    c = 0;
                }
                car.src = '../resources/cars/car4/car4' + c + '.png';
                c++;
            }, 75)
        }
    }

    private moveCar(car: HTMLElement, offset: number, direction: Direction, speed: number):void {
        let c = 0;
        setInterval(() => {
            if (c + offset < -92) {
                c = 1266 - offset;
            }
            if (direction == Direction.LEFT) {
                car.style.left = String(c + offset) + 'px'
            } else {
                car.style.right = String(c + offset) + 'px'
            }

            if (speed < 0) {
                c = c - 4
            } else {
                c = c - 1;
            }
        }, Math.abs(speed))
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

