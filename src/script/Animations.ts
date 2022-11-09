export default class Animations {
    public static roadDeath(playerEl: HTMLElement): void {
        let img = document.getElementById('player-img') as HTMLImageElement
        playerEl.style.rotate = '0deg'
        let style = getComputedStyle(playerEl)
        let i = 0;

        let interval = setInterval(() => {
            img.src = '../resources/frog/death-road/death-road-' + i + '.png'

            if (i == 0) {
                playerEl.style.left = (parseInt(style.left) - 5) + 'px'
                playerEl.style.bottom = (parseInt(style.bottom) - 1) + 'px'
                playerEl.style.width = '56px'
                playerEl.style.height = '34px'
            } else if (i == 2) {
                playerEl.style.left = (parseInt(style.left) - 6) + 'px'
                playerEl.style.bottom = (parseInt(style.bottom) - 3) + 'px'
                playerEl.style.width = '68px'
                playerEl.style.height = '40px'
            } else if (i == 3 || i == 3) {
                playerEl.style.left = (parseInt(style.left) - 6) + 'px'
                playerEl.style.width = '80px'
            } else if (i == 4) {
                playerEl.style.left = (parseInt(style.left) - 8) + 'px'
                playerEl.style.bottom = (parseInt(style.bottom) - 16) + 'px'
                playerEl.style.width = '97px'
                playerEl.style.height = '66px'
                clearInterval(interval)

                setTimeout(() => {
                    img.src = '../resources/frog/frog1.png'
                }, 1500)
            }
            i++;
        }, 100)
    }

    public static riverDeath(playerEl: HTMLElement): void {
        let img = document.getElementById('player-img') as HTMLImageElement
        playerEl.style.rotate = '0deg'
        let style = getComputedStyle(playerEl)
        let i = 0;

        let interval = setInterval(() => {
            img.src = '../resources/frog/splash/splash-' + i + '.png'
            if (i == 0) {
                playerEl.style.left = (parseInt(style.left) - 22) + 'px'
                playerEl.style.bottom = (parseInt(style.bottom) + 18) + 'px'
            } else if (i == 4) {
                clearInterval(interval)
                setTimeout(() => {
                    img.src = '../resources/frog/frog1.png'
                }, 1500)
            }
            i++;
        }, 100)
    }

    public static animateTurtles(turtles: HTMLImageElement, type: number): void {
        let c = 1;
        setInterval(() => {
            if (c == 5) {
                c = 1;
            }

            turtles.src = '../resources/logs/turtle/turtle' + type + '' + c + '.png'
            c++;
        }, 200)
    }

    public static animateOrangeCar(car: HTMLImageElement) {
        let c = 0;
        car.src = '../resources/cars/car4/car42.png';
        setInterval(() => {
            if (c == 3) {
                c = 0;
            }
            car.src = '../resources/cars/car4/car4' + c + '.png';
            c++;
        }, 75)
    }
}