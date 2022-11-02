import CollisionObject from "./interfaces/CollisionObject";
import Movement from "./Movement";

export default class Player {
    private readonly COLLISION_CLASSES = ['car', 'river-obj'];
    private readonly player: HTMLElement;
    private movementLock = false;
    private lastObj: CollisionObject;
    private frogLock = false;

    constructor() {
        this.player = document.getElementById('player')
    }

    public startMovement(): void {
        window.onkeydown = (k) => {
            if (!this.movementLock) {
                if (k.key === 'ArrowUp') Movement.goUp();
                else if (k.key === 'ArrowDown') Movement.goDown();
                else if (k.key === 'ArrowLeft') Movement.goLeft()
                else if (k.key === 'ArrowRight') Movement.goRight()
            }
        }
    }

    public enableCollision(): void {
        setInterval(() => {
            let objects = this.getCollisionObject();
            for (let i = 0; i < objects.length; i++) {
                if (this.doesObjectsCollide(this.player, objects[i])) {
                    if (objects[i].className == 'car') {
                        if (!this.movementLock) {
                            this.movementLock = true;
                            this.killFrog()
                        }
                    } else {
                        if (!this.frogLock) {
                            let offset = this.player.offsetLeft - objects[i].offsetLeft
                            this.lastObj = {element: objects[i], index: i, offset: offset}
                            this.frogLock = true
                        }
                        this.followLog(objects[i]);
                    }
                } else {
                    if (this.frogLock && this.lastObj.index == i) {
                        this.frogLock = false;
                        this.lastObj = undefined;
                    }
                }
            }
        }, 10)
    }

    private killFrog(): void {
        let img = document.getElementById('player-img') as HTMLImageElement
        this.player.style.rotate = '0deg'
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
        this.player.style.left = (parseInt(getComputedStyle(log).left) + this.lastObj.offset) + 'px'
    }

    private getCollisionObject() {
        let objects = [];
        for (let i = 0; i < this.COLLISION_CLASSES.length; i++) {
            objects = Array.prototype.concat
                .apply(objects, document.getElementsByClassName(this.COLLISION_CLASSES[i]));
        }
        return objects;
    }

    private doesObjectsCollide(o1: HTMLElement, o2: HTMLElement) {
        let o1B = o1.getBoundingClientRect();
        let o2B = o2.getBoundingClientRect();
        return !(o1B.top > o2B.bottom || o1B.right < o2B.left || o1B.bottom < o2B.top || o1B.left > o2B.right)
    }

    private resetFrog(): void {
        this.player.style.width = '46px'
        this.player.style.height = '33px'
        this.player.style.left = '500px'
        this.player.style.bottom = '66px'
    }
}