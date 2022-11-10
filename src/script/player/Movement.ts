import Player from "./Player";
import PlayerHTMLData from "../interfaces/PlayerHTMLData";

export default class Movement {
    private readonly player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    public goUp(): void {
        let data = Movement.getPlayersHTML();
        data.img.src = '../resources/frog/frog1-move.png'
        data.player.style.rotate = 0 + 'deg'
        data.player.style.bottom = (parseInt(data.style.bottom) + 1) + 'px'

        this.animateAndMove(data, 13, 1)
    }

    public goDown() {
        let data = Movement.getPlayersHTML();
        data.img.src = '../resources/frog/frog1-move.png'
        if (parseInt(data.style.bottom) > 20) {
            data.player.style.rotate = 180 + 'deg'
            data.player.style.bottom = (parseInt(data.style.bottom) - 1) + 'px'

            this.animateAndMove(data, -13, 1)
        } else {
            data.player.style.rotate = 0 + 'deg'
        }
    }

    public goLeft() {
        let data = Movement.getPlayersHTML();
        data.img.src = '../resources/frog/frog2-move.png'
        data.player.style.rotate = '0deg'
        data.player.style.width = '57px'

        this.animateAndMove(data, -17, 2)
    }

    public goRight() {
        let data = Movement.getPlayersHTML();
        data.img.src = '../resources/frog/frog3-move.png'
        data.player.style.rotate = '0deg'
        data.player.style.width = '57px'

        this.animateAndMove(data, 17, 3)
    }

    private animateAndMove(data: PlayerHTMLData, offset:number, imgNum: number) {
        this.player.setLockMovement(true);
        let i = 1;

        let interval = setInterval(() => {
            if (imgNum == 1) {
                data.player.style.bottom = (parseInt(data.style.bottom) + offset) + 'px'
            } else {
                data.player.style.left = (parseInt(data.style.left) + offset) + 'px'
            }
            if (i == 3)
                this.player.setLockMovement(false);

            if (i == 4) {
                data.player.style.width = '46px'
                data.img.src = '../resources/frog/frog' + imgNum + '.png'
                clearInterval(interval)
            }
            i++;
        }, 50)
    }

    public resetFrog(player:HTMLElement): void {
        player.style.width = '46px'
        player.style.height = '33px'
        player.style.left = '500px'
        player.style.bottom = '66px'
    }

    private static getPlayersHTML(): PlayerHTMLData {
        let player = document.getElementById('player');
        return {
            player: player,
            img: document.getElementById('player-img') as HTMLImageElement,
            style: getComputedStyle(player)
        }
    }
}