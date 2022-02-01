from os import supports_effective_ids
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import InputRequired, Email, Optional, NumberRange, URL, Length

class AddPetForm(FlaskForm):
    name = StringField("Pet Name")
    species = SelectField("Species", choices=[("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")])
    photo_url = StringField("Photo URL", validators = [Optional(), URL()])
    age = IntegerField("Age", validators = [Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Comments", validators=[Optional(), Length(min=10)])

class EditForm(FlaskForm):
    photo_url = StringField("Photo URL", validators = [Optional(), URL()])
    notes = TextAreaField("Comments", validators=[Optional(), Length(min=10)])
    available = BooleanField("Available")
