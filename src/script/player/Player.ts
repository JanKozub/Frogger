import Movement from "./Movement";
import Animations from "../Animations";
import Scoreboard from "../Scoreboard";

export default class Player {
    private readonly COLLISION_CLASSES = ['car', 'river-obj'];
    private readonly player: HTMLElement;
    private movementLock = false;
    private movement: Movement;
    private life = 4

    constructor() {
        this.movement = new Movement(this);
        this.player = document.getElementById('player')
    }

    public startMovement(): void {
        window.onkeydown = (k) => {
            if (!this.movementLock) {
                if (k.key === 'ArrowUp') this.movement.goUp();
                else if (k.key === 'ArrowDown') this.movement.goDown();
                else if (k.key === 'ArrowLeft') {
                    if (parseInt(getComputedStyle(this.player).left) < -50) {
                        this.killFrog();
                    } else {
                        this.movement.goLeft()
                    }
                } else if (k.key === 'ArrowRight') {
                    if (parseInt(getComputedStyle(this.player).left) > 954) {
                        this.killFrog();
                    } else {
                        this.movement.goRight()
                    }
                }
            }
        }
    }

    public enableCollision(): void {
        window.requestAnimationFrame(() => {
            let objects = this.getCollisionObject();
            objects.forEach((object) => {
                if (this.doesObjectsCollide(this.player, object)) {
                    if (object.className == 'car') {
                        if (!this.movementLock) {
                            this.killFrog()
                        }
                    } else {
                        if (!this.movementLock) { //TODO move this code to another method and move if with movement lock before checking the class
                            let data = object.className.split(' ')[1].split('-');
                            let speed = parseFloat(data[1])
                            if (data[0] == 'left') {
                                this.player.style.left = (this.player.offsetLeft - (speed * 2)) + 'px'
                            } else {
                                this.player.style.left = (this.player.offsetLeft + (speed * 2)) + 'px'
                            }
                        }
                    }
                } else {
                    if (this.player.offsetTop < 330) {
                        // this.killFrog(); //TODO frog unda wata
                    }
                }
            })
            window.requestAnimationFrame(() => this.enableCollision());
        })
    }

    private killFrog(): void {
        this.movementLock = true;
        Animations.roadDeath(this.player)
        setTimeout(() => {
            this.movementLock = false;
            this.movement.resetFrog(this.player);

            this.life = this.life - 1
            Scoreboard.setLifeAmount(this.life)
        }, 2000)
    }

    private getCollisionObject(): HTMLImageElement[] {
        let objects = [];
        for (let i = 0; i < this.COLLISION_CLASSES.length; i++) {
            objects = Array.prototype.concat
                .apply(objects, document.getElementsByClassName(this.COLLISION_CLASSES[i]));
        }
        return objects;
    }

    private doesObjectsCollide(o1: HTMLElement, o2: HTMLElement): boolean {
        let o1B = o1.getBoundingClientRect();
        let o2B = o2.getBoundingClientRect();
        return !(o1B.top > o2B.bottom || o1B.right < o2B.left || o1B.bottom < o2B.top || o1B.left > o2B.right)
    }

    public setLockMovement(state: boolean): void {
        this.movementLock = state; //TODO fix spam left button bug
    }
}