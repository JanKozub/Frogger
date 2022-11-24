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

    public static setTimeBarProgress(timeLeft: number) { //progress => 0-30s time left
        let blocker = document.getElementById('time-blocker');
        blocker.style.width = (timeLeft * 6) + 'px'
    }

    public static addToScore(amountToAdd: number) {
        let score = document.getElementById('score');
        score.innerText = String(parseInt(score.innerText) + amountToAdd);
    }

    public static resetScore() {
        document.getElementById('score').innerText = '0';
    }
}