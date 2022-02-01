from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_index(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('nplays'))
            self.assertIn('<h1>Boggle Board</h1>', html)
            self.assertIn(b'<p>Highscore:', res.data)
            self.assertIn(b'Score:', res.data)
            self.assertIn(b'Second Left:', res.data)

    def test_check_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] =  [["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"]]
            res = client.get("/check-word?word=cat")
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['result'], 'ok')

    def test_invalid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] =  [["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"]]
            res = client.get("/check-word?word=dog")
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['result'], 'not-on-board')

    def test_not_english_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] =  [["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"],
                                            ["C", "A", "T", "T", "T"]]
            res = client.get("/check-word?word=dsad")
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['result'], 'not-word')
