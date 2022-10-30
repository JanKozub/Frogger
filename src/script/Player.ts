export default class Player {
    constructor() {
    }

    public start() {

        window.onkeydown = (k) => {
            let player = document.getElementById('player')
            let img = document.getElementById('player-img') as HTMLImageElement
            let style = getComputedStyle(player)
            if (k.key === 'ArrowUp') {
                img.src = '../resources/frog/frog1.png'
                player.style.rotate = 0 + 'deg'
                player.style.bottom = (parseInt(style.bottom) + 53) + 'px'
            } else if (k.key === 'ArrowDown') {
                img.src = '../resources/frog/frog1.png'
                player.style.rotate = 180 + 'deg'
                player.style.bottom = (parseInt(style.bottom) - 53) + 'px'
            } else if (k.key === 'ArrowLeft') {
                img.src = '../resources/frog/frog2.png'
                player.style.left = (parseInt(style.left) - 68) + 'px'
            } else if (k.key === 'ArrowRight') {
                img.src = '../resources/frog/frog3.png'
                player.style.left = (parseInt(style.left) + 68) + 'px'
            }
        }
    }
}