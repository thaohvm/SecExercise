from boggle import Boggle

from flask import Flask, request, render_template, redirect, flash, session, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

boggle_game = Boggle()

@app.route("/")
def index():
    """Make the board and save to session, then display on the webpage"""
    board = boggle_game.make_board()
    session['board'] = board
    if not session.get("score"):
        session['score'] = 0
    score = session['score']
    return render_template("index.html", board=board, score=score)

@app.route("/check-word")
def check():
    """Get word from user and add the result of the word to json file"""
    data = request.args.get("guess")
    result = boggle_game.check_valid_word(session["board"],data)
    return jsonify({"result" : result})

@app.route("/end", methods = ["POST"])
def update_score():
    data = request.json['score']
    if data > session['score']:
        session['score'] = data
    return session["score"]
