from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import or_

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
    nom = db.Column(db.String(50), nullable=False)
    prenom = db.Column(db.String(50), nullable=False)
    adresse = db.Column(db.String(100), nullable=False)
    voitures = db.relationship('Voiture', back_populates='locataire')

@app.route('/api/resource')
def get_resource():
    # Your API logic here
    return jsonify({'data': 'Hello, World!'})

@app.route('/api/voitures', methods=['GET'])
def get_all_voitures():
    voitures = Voiture.query.all()

    voiture_list = []
    for voiture in voitures:
        voiture_data = {
            'id': voiture.id,
            'num_imma': voiture.num_imma,
            'marque': voiture.marque,
            'modele': voiture.modele,
            'kilometrage': voiture.kilometrage,
            'etat': voiture.etat,
            'prix_location': voiture.prix_location,
            'id_locataire': voiture.id_locataire
        }
        voiture_list.append(voiture_data)

    return jsonify({'voitures': voiture_list})

@app.route('/api/voiture', methods=['POST'])
def add_voiture():
    data = request.get_json()

    new_voiture = Voiture(
        num_imma=data['num_imma'],
        marque=data['marque'],
        modele=data['modele'],
        kilometrage=data['kilometrage'],
        etat=data['etat'],
        prix_location=data['prix_location'],
        id_locataire=data['id_locataire'] if 'id_locataire' in data else None
    )

    db.session.add(new_voiture)
    db.session.commit()

    return jsonify({'message': 'Voiture added successfully'}), 201

@app.route('/api/voiture/<int:voiture_id>', methods=['PUT'])
def update_voiture(voiture_id):
    voiture = Voiture.query.get(voiture_id)

    if voiture is None:
        return jsonify({'error': 'Voiture not found'}), 404

    data = request.get_json()

    voiture.num_imma = data.get('num_imma', voiture.num_imma)
    voiture.marque = data.get('marque', voiture.marque)
    voiture.modele = data.get('modele', voiture.modele)
    voiture.kilometrage = data.get('kilometrage', voiture.kilometrage)
    voiture.etat = data.get('etat', voiture.etat)
    voiture.prix_location = data.get('prix_location', voiture.prix_location)
    voiture.id_locataire = data.get('id_locataire', voiture.id_locataire)

    db.session.commit()

    return jsonify({'message': 'Voiture updated successfully'}), 200

@app.route('/api/voiture/<int:voiture_id>', methods=['DELETE'])
def delete_voiture(voiture_id):
    voiture = Voiture.query.get(voiture_id)

    if voiture is None:
        return jsonify({'error': 'Voiture not found'}), 404

    db.session.delete(voiture)
    db.session.commit()

    return jsonify({'message': 'Voiture deleted successfully'}), 200

@app.route('/api/locataires', methods=['GET'])
def get_all_locataires():
    locataires = Locataire.query.all()

    locataire_list = []
    for locataire in locataires:
        locataire_data = {
            'id_loc': locataire.id_loc,
            'nom': locataire.nom,
            'prenom': locataire.prenom,
            'adresse': locataire.adresse
        }
        locataire_list.append(locataire_data)

    return jsonify({'locataires': locataire_list})

@app.route('/api/locataire', methods=['POST'])
def add_locataire():
    data = request.get_json()

    new_locataire = Locataire(
        nom=data['nom'],
        prenom=data['prenom'],
        adresse=data['adresse']
    )

    db.session.add(new_locataire)
    db.session.commit()

    return jsonify({'message': 'Locataire added successfully'}), 201

@app.route('/api/locataire/<int:locataire_id>', methods=['PUT'])
def update_locataire(locataire_id):
    locataire = Locataire.query.get(locataire_id)

    if locataire is None:
        return jsonify({'error': 'Locataire not found'}), 404

    data = request.get_json()

    locataire.nom = data.get('nom', locataire.nom)
    locataire.prenom = data.get('prenom', locataire.prenom)
    locataire.adresse = data.get('adresse', locataire.adresse)

    db.session.commit()

    return jsonify({'message': 'Locataire updated successfully'}), 200

@app.route('/api/locataire/<int:locataire_id>', methods=['DELETE'])
def delete_locataire(locataire_id):
    locataire = Locataire.query.get(locataire_id)

    if locataire is None:
        return jsonify({'error': 'Locataire not found'}), 404

    db.session.delete(locataire)
    db.session.commit()

    return jsonify({'message': 'Locataire deleted successfully'}), 200

@app.route('/api/locataire-search', methods=['GET'])
# q is a query parameter that will searched in the ID, nom and prenom fields
def search_locataires():
    search_text = request.args.get('q', '')

    locataires = Locataire.query.filter(
        or_(
            Locataire.id_loc.like(f"%{search_text}%"),
            Locataire.nom.like(f"%{search_text}%"),
            Locataire.prenom.like(f"%{search_text}%")
        )
    ).all()

    locataire_list = []
    for locataire in locataires:
        locataire_data = {
            'id_loc': locataire.id_loc,
            'nom': locataire.nom,
            'prenom': locataire.prenom,
            'adresse': locataire.adresse
        }
        locataire_list.append(locataire_data)

    return jsonify({'locataires': locataire_list})

if __name__ == '__main__':
    app.run(debug=True)