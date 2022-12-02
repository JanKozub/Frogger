import Player from "./Player";
import PlayerHTMLData from "../structure/PlayerHTMLData";
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
        this.player.setMovementLock(true);
        let i = 1;

        let interval = setInterval(() => {
            if (this.player.isFrogDead) {
                clearInterval(interval)
            } else {
                if (type == 'forward') {
                    data.player.style.top = (data.player.offsetTop - offset) + 'px'
                } else {
                    data.player.style.left = (data.player.offsetLeft + offset) + 'px'
                }

                if (i == 4) {
                    data.player.style.width = '46px'
                    data.player.src = '../resources/frog/default/frog-' + type + '.png'
                    this.player.setMovementLock(false);
                    clearInterval(interval)
                }
                i++;
            }
        }, 40)
    }

    public resetFrog(): void {
        this.player.playerEl.style.width = '46px'
        this.player.playerEl.style.height = '33px'
        this.player.playerEl.style.left = '500px'
        this.player.playerEl.style.top = '647px'
        this.player.playerEl.src = '../resources/frog/default/frog-forward.png'
    }

    private static getPlayersHTML(): PlayerHTMLData {
        let player = document.getElementById('player') as HTMLImageElement;
        return {
            player: player,
            style: getComputedStyle(player)
        }
    }
}