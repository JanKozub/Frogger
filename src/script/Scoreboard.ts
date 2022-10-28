export default class Scoreboard {
    constructor() {
    }

    setLifeAmount(number: number) {
        document.getElementById('life-blocker')
            .style.width = ((4 - number) * 60) + 'px'
    }
}