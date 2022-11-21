export default class Scoreboard {
    public static setLifeAmount(number: number) {
        document.getElementById('life-blocker')
            .style.width = ((4 - number) * 50) + 'px'
    }

    public static toggleFinishFrog(position: number, state: boolean) {
        document.getElementById('finish-frog-' + position)
            .style.visibility = state ? 'visible' : 'hidden'
    }

    public static toggleFly(position: number, state: boolean) {
        document.getElementById('fly-' + position)
            .style.visibility = state ? 'visible' : 'hidden'
    }
}