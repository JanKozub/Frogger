import CollisionObject from "../interfaces/CollisionObject";
import Movement from "./Movement";
import Animations from "../Animations";
import Scoreboard from "../Scoreboard";

export default class Player {
    private readonly COLLISION_CLASSES = ['car', 'river-obj'];
    private readonly player: HTMLElement;
    private movementLock = false;
    private lastObj: CollisionObject;
    private frogLock = false;
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
                    if (parseInt(getComputedStyle(this.player).left) < 0) {
                        this.killFrog();
                    }
                    this.movement.goLeft()
                } else if (k.key === 'ArrowRight') {
                    if (parseInt(getComputedStyle(this.player).left) > 954) {
                        this.killFrog();
                    }
                    this.movement.goRight()
                }
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
        this.movementLock = true;
        Animations.roadDeath(this.player)
        setTimeout(() => {
            this.movementLock = false;
            this.movement.resetFrog(this.player);

            this.life = this.life - 1
            Scoreboard.setLifeAmount(this.life)
        }, 2000)
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

    public setLockMovement(state: boolean) {
        this.movementLock = state; //TODO fix spam left button bug
    }
}