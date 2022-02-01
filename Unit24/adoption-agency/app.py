from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditForm


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret-key-oihohopijopkj"
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    pets = Pet.query.all()
    return render_template("index.html", pets=pets)

@app.route('/add', methods=["GET", "POST"])
def show_add_pet_form():
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name = name, species=species, photo_url=photo_url, age=age, notes=notes)

        db.session.add(new_pet)
        db.session.commit()
        return redirect("/")
    else:
        return render_template("add_pet_form.html", form=form)

@app.route('/<int:pet_id>', methods = ["GET", "POST"])
def show_edit_form(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditForm(obj=pet)

    if form.validate_on_submit():
        pet.notes = form.notes.data
        pet.photo_url = form.photo_url.data
        pet.available = form.available.data

        db.session.commit()
        return redirect("/")
    else:
        return render_template("edit_form.html", form=form, pet=pet)
