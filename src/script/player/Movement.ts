import Player from "./Player";
import PlayerHTMLData from "../interfaces/PlayerHTMLData";

export default class Movement {
    private readonly player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public goUp(): void {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-forward-move.png'
        data.player.style.rotate = 0 + 'deg'
        data.player.style.bottom = (parseInt(data.style.bottom) + 1) + 'px'

        this.animateAndMove(data, 13, 'forward')
    }

    public goDown() {
        let data = Movement.getPlayersHTML();
        data.player.src = '../resources/frog/default/frog-forward-move.png'
        if (parseInt(data.style.bottom) > 20) {
            data.player.style.rotate = 180 + 'deg'
            data.player.style.bottom = (parseInt(data.style.bottom) - 1) + 'px'

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

    private animateAndMove(data: PlayerHTMLData, offset:number, type: string) {
        this.player.setLockMovement(true);
        let i = 1;

        let interval = setInterval(() => {
            if (type == 'forward') {
                data.player.style.bottom = (parseInt(data.style.bottom) + offset) + 'px'
            } else {
                data.player.style.left = (parseInt(data.style.left) + offset) + 'px'
            }

            if (i == 4) {
                data.player.style.width = '46px'
                data.player.src = '../resources/frog/default/frog-' + type + '.png'
                this.player.setLockMovement(false);
                clearInterval(interval)
            }
            i++;
        }, 40)
    }

    public resetFrog(player:HTMLElement): void {
        player.style.width = '46px'
        player.style.height = '33px'
        player.style.left = '500px'
        player.style.bottom = '66px'
    }

    private static getPlayersHTML(): PlayerHTMLData {
        let player = document.getElementById('player') as HTMLImageElement;
        return {
            player: player,
            style: getComputedStyle(player)
        }
    }
}