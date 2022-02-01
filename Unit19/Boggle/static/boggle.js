const form = document.getElementById('word-add');
form.addEventListener('submit', userSubmitForm);

const wordsFound = [];
let score = 0;
timer();

function timer() {
    let time = 6
    let timer = setInterval(function() {
        document.getElementById("timer").innerHTML = time
        time -= 1;
        if (time <= 0) {
            document.getElementById('timer').innerHTML = "Time Up!";
            clearInterval(timer);
            disableMe = document.getElementById("guess");
            disableMe.disabled = true;
            endGame(score);
        }
    }, 1000)
}

async function userSubmitForm(evt) {
    evt.preventDefault();
    console.log("submit")
    const guess = document.getElementById("guess").value;
    const res = await axios.get(`http://127.0.0.1:5000/check-word?guess=${guess}`);
    console.log(res)
    const result = res.data['result'];
    form.reset();
    handleResponse(guess, result);
}

function handleResponse(guess, result) {
    if (result == 'ok' && !wordsFound.includes(guess)) {
        wordsFound.push(guess);
        const li = document.createElement('li');
        li.innerText = guess;
        const ol = document.getElementById('words-found');
        ol.appendChild(li);
        handleScore(guess);
    }
}

function handleScore(guess) {
    const scoreResult = document.getElementById("score-result");
    score = guess.length + score;
    scoreResult.innerText = "Score: " + score;
}

async function endGame(score) {
    await axios.post(`http://127.0.0.1:5000/end`, { score });
}
