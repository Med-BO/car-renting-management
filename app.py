from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# App configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/car_renting_db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Defining models
class Voiture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num_imma = db.Column(db.Integer, nullable=False)
    marque = db.Column(db.String(50), nullable=False)
    modele = db.Column(db.String(50), nullable=False)
    kilometrage = db.Column(db.Integer, nullable=False)
    etat = db.Column(db.Integer, nullable=False)
    prix_location = db.Column(db.Float, nullable=False)
    id_locataire = db.Column(db.Integer, db.ForeignKey('locataire.id_loc'), nullable=True)
    locataire = db.relationship('Locataire', back_populates='voitures')

class Locataire(db.Model):
    id_loc = db.Column(db.Integer, primary_key=True)
    Nom = db.Column(db.String(50), nullable=False)
    Prenom = db.Column(db.String(50), nullable=False)
    Adresse = db.Column(db.String(100), nullable=False)
    voitures = db.relationship('Voiture', back_populates='locataire')

@app.route('/api/resource')
def get_resource():
    # Your API logic here
    return jsonify({'data': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)