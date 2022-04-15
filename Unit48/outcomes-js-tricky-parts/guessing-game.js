function guessingGame() {
    const num = Math.floor(Math.random() * 100);
    let counter = 0;
    let isOver = false;

    return function guessNum(guess) {
        if (isOver) return "The game is over, you already won!"
        if (guess === num) {
            counter++;
            isOver = true;
            return `You win! You found ${num} in ${counter} guesses.`
        } else if (guess < num) {
            counter++;
            return `${guess} is too low!`
        } else {
            counter++;
            return `${guess} is too high!`
        }
    }
}

module.exports = { guessingGame };
