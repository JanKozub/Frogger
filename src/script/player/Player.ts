import Movement from "./Movement";
import Animations from "../UI/Animations";
import Scoreboard from "../UI/Scoreboard";
import {DeathType} from "../structure/DeathType";
import Timer from "../UI/Timer";

export default class Player {
    private readonly COLLISION_CLASSES = ['car', 'river-obj'];
    public readonly playerEl: HTMLImageElement;
    private movementLock = false;
    private movement: Movement;
    private life = 4;
    private timer: Timer;
    private offset: number[] = [80, 262, 443, 625, 807]
    public finishFrogs: boolean[] = [false, false, false, false, false]

    constructor() {
        this.movement = new Movement(this);
        this.playerEl = document.getElementById('player') as HTMLImageElement

        window.onkeydown = (k) => {
            if (!this.movementLock) {
                if (k.key === 'ArrowUp') this.movement.goUp();
                else if (k.key === 'ArrowDown') this.movement.goDown();
                else if (k.key === 'ArrowLeft') this.movement.goLeft()
                else if (k.key === 'ArrowRight') this.movement.goRight()
            }
        }
    }

    public checkCollision(): void {
        window.requestAnimationFrame(() => {
            let objects = this.getCollisionObject();
            let isFrogMoving = false;
            let isFrogOnRiver = false;
            objects.forEach((object) => {
                if (!this.movementLock) {
                    if (this.doesObjectsCollide(this.playerEl, object)) {
                        if (this.isObjectACar(object)) {
                            this.killFrog(DeathType.ROAD)
                        } else {
                            this.moveFrogOnRiver(object); //TODO fix wall kill move
                            isFrogMoving = true;
                        }
                    } else {
                        if (this.isFrogOnRiver()) {
                            isFrogOnRiver = true; //TODO fix timing of death animation
                        }
                    }
                }
            })
            if (isFrogOnRiver && !isFrogMoving)
                this.killFrog(DeathType.RIVER);
        })
    }

    public checkForFinish() {
        if (this.playerEl.offsetTop <= 106 && this.movementLock == false) {
            for (let i = 0; i < 5; i++) {
                if (this.isInSpot(i, this.playerEl)) {
                    Scoreboard.toggleFinishFrog(i, true);
                    this.finishFrogs[i] = true;
                    this.movement.resetFrog();
                    this.timer.reset();
                }
            }
        }
    }

    public isInSpot(index: number, playerEl: HTMLImageElement) {
        return playerEl.offsetLeft >= this.offset[index] - 5 && playerEl.offsetLeft <= this.offset[index] + 25;
    }

    public killFrog(type: DeathType): void {
        this.movementLock = true;

        if (type == DeathType.ROAD) {
            Animations.roadDeath(this.playerEl)
        } else if (type == DeathType.RIVER) {
            Animations.riverDeath(this.playerEl)
        } else if (type == DeathType.MAP_EXIT) {
            this.playerEl.style.left = '-1000px'
        }

        setTimeout(() => {
            this.movementLock = false;
            this.movement.resetFrog();

            this.life = this.life - 1
            if (this.life < 1) {
                this.life = 4;
                Scoreboard.resetScore();
                this.timer.reset();
            }
            Scoreboard.setLifeAmount(this.life)
        }, 3000)
    }

    private getCollisionObject(): HTMLImageElement[] {
        let objects = [];
        for (let i = 0; i < this.COLLISION_CLASSES.length; i++) {
            objects = Array.prototype.concat
                .apply(objects, document.getElementsByClassName(this.COLLISION_CLASSES[i]));
        }
        return objects;
    }

    private moveFrogOnRiver(object: HTMLImageElement): void {
        let data = object.className.split(' ')[1].split('-');
        let speed = parseFloat(data[1])
        if (data[0] == 'left') {
            this.playerEl.style.left = (this.playerEl.offsetLeft - speed) + 'px'
        } else {
            this.playerEl.style.left = (this.playerEl.offsetLeft + speed) + 'px'
        }
    }

    private doesObjectsCollide(o1: HTMLElement, o2: HTMLElement): boolean {
        let o1B = o1.getBoundingClientRect();
        let o2B = o2.getBoundingClientRect();
        return !(o1B.top > o2B.bottom || o1B.right < o2B.left || o1B.bottom < o2B.top || o1B.left > o2B.right)
    }

    private isObjectACar(obj: HTMLImageElement): boolean {
        return obj.className == 'car';
    }

    private isFrogOnRiver(): boolean {
        return this.playerEl.offsetTop < 330 && this.playerEl.offsetTop >= 106;
    }

    public setLockMovement(state: boolean): void {
        this.movementLock = state;
    }

    public setTimer(timer: Timer) {
        this.timer = timer;
    }
}