export default class Movement {
    static goUp(): void {
        let data = this.getPlayersHTML();
        data.img.src = '../resources/frog/frog1.png'
        data.player.style.rotate = 0 + 'deg'
        data.player.style.bottom = (parseInt(data.style.bottom) + 53) + 'px'
    }

    static goDown() {
        let data = this.getPlayersHTML();
        data.img.src = '../resources/frog/frog1.png'
        data.player.style.rotate = 180 + 'deg'
        data.player.style.bottom = (parseInt(data.style.bottom) - 53) + 'px'
    }

    static goLeft() {
        let data = this.getPlayersHTML();
        data.img.src = '../resources/frog/frog2.png'
        data.player.style.left = (parseInt(data.style.left) - 68) + 'px'
    }

    static goRight() {
        let data = this.getPlayersHTML();
        data.img.src = '../resources/frog/frog3.png'
        data.player.style.left = (parseInt(data.style.left) + 68) + 'px'
    }

    private static getPlayersHTML() {
        let player = document.getElementById('player');
        return {
            player: player,
            img: document.getElementById('player-img') as HTMLImageElement,
            style: getComputedStyle(player)
        }
    }
}