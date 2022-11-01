export default class Player {
    private readonly player: HTMLElement;
    private movementLock = false;
    private collisionStartPointLeft = -1;

    constructor() {
        this.player = document.getElementById('player')
    }

    public startMovement(): void {
        window.onkeydown = (k) => {
            if (!this.movementLock) {
                let img = document.getElementById('player-img') as HTMLImageElement
                let style = getComputedStyle(this.player)
                if (k.key === 'ArrowUp') {
                    img.src = '../resources/frog/frog1.png'
                    this.player.style.rotate = 0 + 'deg'
                    this.player.style.bottom = (parseInt(style.bottom) + 53) + 'px'
                } else if (k.key === 'ArrowDown') {
                    img.src = '../resources/frog/frog1.png'
                    this.player.style.rotate = 180 + 'deg'
                    this.player.style.bottom = (parseInt(style.bottom) - 53) + 'px'
                } else if (k.key === 'ArrowLeft') {
                    img.src = '../resources/frog/frog2.png'
                    this.player.style.left = (parseInt(style.left) - 68) + 'px'
                } else if (k.key === 'ArrowRight') {
                    img.src = '../resources/frog/frog3.png'
                    this.player.style.left = (parseInt(style.left) + 68) + 'px'
                }
            }
        }
    }

    public enableDeath(): void {
        setInterval(() => {
            if (!this.movementLock) {
                let objects:any = [];
                objects = Array.prototype.concat.apply(objects, document.getElementsByClassName("car"));
                objects = Array.prototype.concat.apply(objects, document.getElementsByClassName("river-obj"));
                let ps = this.player.getBoundingClientRect();
                for (let i = 0; i < objects.length; i++) {
                    let cs = objects[i].getBoundingClientRect();
                    if (!(ps.top > cs.bottom || ps.right < cs.left || ps.bottom < cs.top || ps.left > cs.right)) {
                        if (this.collisionStartPointLeft == -1)
                            this.collisionStartPointLeft = ps.left

                        if (objects[i].className == 'car') {
                            this.movementLock = true;
                            this.killFrog()
                        } else {
                            this.followLog(objects[i]);
                        }
                    } else {
                        this.collisionStartPointLeft = -1;
                    }
                }
            }
        }, 10)
    }

    private killFrog(): void {
        let img = document.getElementById('player-img') as HTMLImageElement
        let style = getComputedStyle(this.player)
        let i = 0;
        let interval = setInterval(() => {
            img.src = '../resources/frog/death-road/death-road-' + i + '.png'

            if (i == 0) {
                this.player.style.left = (parseInt(style.left) - 5) + 'px'
                this.player.style.bottom = (parseInt(style.bottom) - 1) + 'px'
                this.player.style.width = '56px'
                this.player.style.height = '34px'
            } else if (i == 2) {
                this.player.style.left = (parseInt(style.left) - 6) + 'px'
                this.player.style.bottom = (parseInt(style.bottom) - 3) + 'px'
                this.player.style.width = '68px'
                this.player.style.height = '40px'
            } else if (i == 3 || i == 3) {
                this.player.style.left = (parseInt(style.left) - 6) + 'px'
                this.player.style.width = '80px'
            } else if (i == 4) {
                this.player.style.left = (parseInt(style.left) - 8) + 'px'
                this.player.style.bottom = (parseInt(style.bottom) - 16) + 'px'
                this.player.style.width = '97px'
                this.player.style.height = '66px'
                clearInterval(interval)

                setTimeout(() => {
                    img.src = '../resources/frog/frog1.png'
                    this.resetFrog();
                    this.movementLock = false;
                }, 1500)
            }

            i++;
        }, 100)
    }

    private followLog(log: HTMLImageElement) {
        console.log(this.collisionStartPointLeft)
        this.player.style.left = (parseInt(getComputedStyle(log).left)) + 'px'
    }

    private resetFrog(): void {
        this.player.style.width = '46px'
        this.player.style.height = '33px'
        this.player.style.left = '500px'
        this.player.style.bottom = '66px'
    }
}