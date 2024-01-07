"""empty message

Revision ID: b445d73b400d
Revises: 
Create Date: 2024-01-07 21:46:18.178863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b445d73b400d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locataire',
    sa.Column('id_loc', sa.Integer(), nullable=False),
    sa.Column('nom', sa.String(length=50), nullable=False),
    sa.Column('prenom', sa.String(length=50), nullable=False),
    sa.Column('adresse', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id_loc')
    )
    op.create_table('voiture',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('num_imma', sa.Integer(), nullable=False),
    sa.Column('marque', sa.String(length=50), nullable=False),
    sa.Column('modele', sa.String(length=50), nullable=False),
    sa.Column('kilometrage', sa.Integer(), nullable=False),
    sa.Column('etat', sa.Integer(), nullable=False),
    sa.Column('prix_location', sa.Float(), nullable=False),
    sa.Column('id_locataire', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_locataire'], ['locataire.id_loc'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('voiture')
    op.drop_table('locataire')
    # ### end Alembic commands ###