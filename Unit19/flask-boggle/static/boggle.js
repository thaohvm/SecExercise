class BoggleGame {
    constructor(boardId, secs = 60) {
        this.secs = secs;
        this.score = 0;
        this.showTimer()
        this.words = new Set;
        this.board = $("#" + boardId);

        this.timer = setInterval(this.tick.bind(this), 1000);
        $("#add-word", this.board).on("submit", this.handleSubmit.bind(this));
    }

    showWords(word) {
        $(".words", this.board).append($("<li>", { text: word }));
    }
    showMessage(msg, cls) {
        $(".msg", this.board).text(msg).addClass(`msg${cls}`);
    }
    showScore() {
        $("#score", this.board).text(this.score)
    }
    async handleSubmit(evt) {
        evt.preventDefault();
        const $word = $("#word-guess", this.board);

        let word = $word.val();
        if (!word) return;

        if (this.words.has(word)) {
            this.showMessage("Already found")
            return;
        }
        const res = await axios.get("/check-word", { params: { word: word } });
        if (res.data.result === "not-word") {
            this.showMessage("This is not a valid English word")
        } else if (res.data.result === "not-on-board") {
            this.showMessage("This word is not on the board")
        } else {
            this.showWords(word);
            this.score += word.length;
            this.showScore()
            this.words.add(word);
            this.showMessage("Correct!")
        }
        $word.val("").focus()
    }

    showTimer() {
        $("#timer", this.board).text(this.secs);
    }
    async tick() {
        this.secs -= 1;
        this.showTimer();

        if (this.secs === 0) {
            clearInterval(this.timer);
            await this.scoreGame();
        }
    }

    async scoreGame() {
        $("#add-word", this.board).hide();
        const res = await axios.post("/post-score", { score: this.score });
        if (res.data.brokenRecord) {
            this.showMessage(`New score: ${this.score}`);
        } else {
            this.showMessage(`Final score: ${this.score}`);
        }
    }
}
