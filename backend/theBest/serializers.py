from rest_framework import serializers
from .models import *
import pytz

class TerrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terrain
        fields = '__all__'

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class EquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe
        fields = '__all__'

class JoueurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joueur
        fields = '__all__'

class PosteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poste
        fields = '__all__'

class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields = '__all__'

class EntraineurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entraineur
        fields = '__all__'

class ArbitreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arbitre
        fields = '__all__'

class SpectateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spectateur
        fields = '__all__'



class StatistiquesJoueurSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatistiquesJoueur
        fields = '__all__'

class StatistiquesArbitreSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatistiquesArbitre
        fields = '__all__'
        
class TransfertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfert
        fields = '__all__'

class ChampionnatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Championnat
        fields = '__all__'



class TerrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Terrain
        fields = '__all__'

class GroupeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groupe
        fields = '__all__'

class PalmaresClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = PalmaresClub
        fields = '__all__'



class NoteArbitreSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteArbitre
        fields = '__all__'

class NoteJoueurSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteJoueur
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class StatistiquesEquipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatistiquesEquipe
        fields = '__all__'

class ButSerializer(serializers.ModelSerializer):
    class Meta:
        model = But
        fields = '__all__'

class PasseDSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasseD
        fields = '__all__'

class CartonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carton
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'




class CompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composition
        fields = '__all__'


class NoterEntrainementSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoterEntrainement
        fields = '__all__'