from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.wrappers import response
from surveys import satisfaction_survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)
responses = []

@app.route("/")
def show_survey_intro():
    return render_template("intro.html", satisfaction_survey=satisfaction_survey)

@app.route("/begin", methods=["POST"])
def start_survey():
    responses = []
    return redirect("questions/0")

@app.route("/questions/<int:qid>")
def show_question(qid):
    question = satisfaction_survey.questions[qid]
    return render_template("question.html", question=question)

@app.route("/answer", methods=["POST"])
def save_answer():
    data = request.form["answer"]
    responses.append(data)
    print(responses)
    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect("/complete")
    else:
        return redirect(f"questions/{len(responses)}")

@app.route("/complete")
def complete():
    return render_template("complete.html")
