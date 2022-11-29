export default class Animations {
    public static roadDeath(playerEl: HTMLImageElement): void {
        playerEl.style.rotate = '0deg'
        let style = getComputedStyle(playerEl)
        let i = 0;
        let left = parseInt(style.left);
        let top = parseInt(style.top);

        let interval = setInterval(() => {
            playerEl.src = '../resources/frog/death-road/death-road-' + i + '.png'

            if (i == 0) {
                left = left - 5
                top = top + 1
                playerEl.style.width = '56px'
                playerEl.style.height = '34px'
            } else if (i == 2) {
                left = left - 6
                top = top + 3
                playerEl.style.width = '68px'
                playerEl.style.height = '40px'
            } else if (i == 3) {
                left = left - 6
                playerEl.style.width = '80px'
            } else if (i == 4) {
                left = left - 8
                top = top - 16
                playerEl.style.width = '97px'
                playerEl.style.height = '66px'
                clearInterval(interval)

                setTimeout(() => {
                    playerEl.src = '../resources/frog/default/frog-forward.png'
                }, 1500)
            }

            playerEl.style.left = left + 'px'
            playerEl.style.top = top + 'px'

            i++;
        }, 100)
    }

    public static riverDeath(playerEl: HTMLImageElement): void {
        playerEl.src = ''
        playerEl.style.rotate = '0deg'
        playerEl.style.width = '90px'
        playerEl.style.height = '69px'
        let style = getComputedStyle(playerEl)
        playerEl.style.left = (parseInt(style.left) - 22) + 'px'
        playerEl.style.bottom = (parseInt(style.bottom) - 18) + 'px'
        playerEl.src = '../resources/frog/splash/splash-' + 0 + '.png'

        let i = 0;
        let interval = setInterval(() => {
            playerEl.src = '../resources/frog/splash/splash-' + i + '.png'
            if (i == 4) {
                clearInterval(interval)
                setTimeout(() => {
                    playerEl.src = '../resources/frog/default/frog-forward.png'
                }, 1500)
            }
            i++;
        }, 100)
    }

    public static animateTurtles(turtles: HTMLImageElement, type: number): void {
        let c = 1;
        setInterval(() => {
            if (c == 5) c = 1;
            turtles.src = '../resources/logs/turtle/turtle' + type + '' + c + '.png'
            c++;
        }, 200)
    }

    public static animateOrangeCar(car: HTMLImageElement) {
        let c = 0;
        car.src = '../resources/cars/car4/car42.png';
        setInterval(() => {
            if (c == 3) c = 0;
            car.src = '../resources/cars/car4/car4' + c + '.png';
            c++;
        }, 75)
    }
}