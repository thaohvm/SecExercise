from flask import Flask, request, jsonify
from flask.templating import render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)

@app.route('/')
def homepage():
    """Render homepage template"""
    cupcakes = Cupcake.query.all()
    return render_template('index.html', cupcakes=cupcakes)

@app.route('/api/cupcakes')
def list_cupcakes():
    """List all cupcakes"""
    cupcakes = Cupcake.query.all()
    all_cupcakes = [cupcake.serialize_cupcake() for cupcake in cupcakes]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:id>')
def cupcake_detail(id):
    """Detail of a single cupcake"""
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """Create new cupcake"""
    new_cupcake = Cupcake(flavor=request.json["flavor"],image=request.json["image"], rating=request.json["rating"], size=request.json["size"])
    db.session.add(new_cupcake)
    db.session.commit()
    response_json=jsonify(cupcake=new_cupcake.serialize_cupcake())
    return (response_json, 201)

@app.route('/api/cupcakes/<int:id>', methods=["PATCH"])
def update_cupcake(id):
    """Update cupcake info"""
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.image = request.json.get('flavor', cupcake.image)
    cupcake.rating = request.json.get('flavor', cupcake.rating)
    cupcake.size = request.json.get('flavor', cupcake.size)
    db.commit()
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes/<int:id>', methods=["DELETE"])
def delete_cupcake(id):
    """Delete a single cupcake"""
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.commit()
    return jsonify(messenge="deleted")
