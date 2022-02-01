"""Blogly application."""

from flask import Flask
from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, User, Post, Tag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret-key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def index():
    return redirect("/users")

@app.route("/users")
def show_users():
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template("user_list.html", users=users)

@app.route("/users/new", methods =["GET"])
def show_user_form():
    return render_template("user_form.html")

@app.route("/users/new", methods = ["POST"])
def user_new():
    new_user = User(
       first_name = request.form["first_name"],
       last_name = request.form["last_name"],
       img_url = request.form["img_url"] or None
    )
    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>")
def show_user_detail(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id)
    return render_template("user_detail.html", user=user, posts=posts)

@app.route("/users/<int:user_id>/edit")
def show_edit_form(user_id):
    user = User.query.get_or_404(user_id)
    return render_template("edit_form.html", user=user)

@app.route("/users/<int:user_id>/edit", methods = ["POST"])
def users_update(user_id):
    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.img_url = request.form['img_url']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def users_delete(user_id):

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/posts/new')
def show_post_form(user_id):
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template("post_form.html", user=user, tags = tags)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def handle_post_form(user_id):
    user = User.query.get_or_404(user_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    new_post = Post(title = request.form["title"], content = request.form["content"], user=user, tags=tags)

    db.session.add(new_post)
    db.session.commit()

    return redirect (f"/users/{user_id}")

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    return render_template("post_detail.html", post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()

    return render_template("post_edit.html", post=post, tags = tags)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def handle_edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    post.title = request.form["title"]
    post.content = request.form["content"]

    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")

@app.route('/tags')
def list_tags():
    tags = Tag.query.all()
    return render_template("tag_list.html", tags=tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template("show_tag.html", tag=tag)

@app.route('/tags/new')
def show_tag_form():
    return render_template('add_tag.html')

@app.route('/tags/new', methods=["POST"])
def handle_add_tags():
    new_tag = Tag(name = request.form["name"])

    db.session.add(new_tag)
    db.session.commit()

    return redirect("/tags")

@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag_form():
    tag = Tag.query.all()
    return render_template("edit_tag.html", tag=tag)

@app.route("/tags/<int:tag_id>/edit", methods=["POST"])
def handle_edit_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']

    db.session.commit()

    return redirect("/tags")

@app.route('/tags/<int:tag_id>/delete')
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect("/tags")
