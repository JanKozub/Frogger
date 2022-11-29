import Player from "./Player";
import PlayerHTMLData from "../structure/PlayerHTMLData";
import {DeathType} from "../structure/DeathType";
import Scoreboard from "../UI/Scoreboard";

export default class Movement {
    private readonly player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public goUp(): void {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-forward-move.png'
        data.player.style.rotate = 0 + 'deg'
        data.player.style.top = (data.player.offsetTop - 1) + 'px'

        this.animateAndMove(data, 13, 'forward')
        Scoreboard.addToScore(10)
    }

    public goDown() {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-forward-move.png'
        if (data.player.offsetTop < 689) {
            data.player.style.rotate = 180 + 'deg'
            data.player.style.top = (data.player.offsetTop + 1) + 'px'

            this.animateAndMove(data, -13, 'forward')
        } else {
            data.player.style.rotate = 0 + 'deg'
        }
    }

    public goLeft() {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-left-move.png'
        data.player.style.rotate = '0deg'
        data.player.style.width = '57px'
        data.player.style.rotate = '0deg'

        this.animateAndMove(data, -17, 'left')
    }

    public goRight() {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-right-move.png'
        data.player.style.rotate = '0deg'
        data.player.style.width = '57px'
        data.player.style.rotate = '0deg'

        this.animateAndMove(data, 17, 'right')
    }

    private animateAndMove(data: PlayerHTMLData, offset: number, type: string) {
        this.player.setLockMovement(true);
        let i = 1;

        let interval = setInterval(() => {
            if (type == 'forward') {
                if (data.player.offsetTop - offset < 106) {
                    for (let i = 0; i < 5; i++) {
                        if (!this.player.isInSpot(i, data.player)) {
                            data.player.style.top = '106px'
                            this.player.killFrog(DeathType.ROAD)
                        }
                    }
                } else{
                    data.player.style.top = (data.player.offsetTop - offset) + 'px'
                }
            } else {
                data.player.style.left = (data.player.offsetLeft + offset) + 'px'
            }

            if (i == 4) {
                data.player.style.width = '46px'
                data.player.src = '../resources/frog/default/frog-' + type + '.png'
                this.player.setLockMovement(false);

                if (this.didPlayerExitMap(data)) {
                    this.player.killFrog(DeathType.MAP_EXIT); //TODO reset time
                }

                clearInterval(interval)
            }
            i++;
        }, 40)
    }

    private didPlayerExitMap(data: PlayerHTMLData): boolean {
        return data.player.offsetLeft < -23 || data.player.offsetLeft > 920;
    }

    public resetFrog(): void {
        this.player.playerEl.style.width = '46px'
        this.player.playerEl.style.height = '33px'
        this.player.playerEl.style.left = '500px'
        this.player.playerEl.style.top = '647px'
    }

    private static getPlayersHTML(): PlayerHTMLData {
        let player = document.getElementById('player') as HTMLImageElement;
        return {
            player: player,
            style: getComputedStyle(player)
        }
    }
}