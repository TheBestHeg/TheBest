from enum import Enum
from django.contrib.postgres.fields import ArrayField
from django.db import models
from PIL import Image
from polymorphic.models import PolymorphicModel
from sqlalchemy import null, true


def auto_str(cls):
    def __str__(self):
        return '%s(%s)' % (
            type(self).__name__,
            ', '.join('%s=%s' % item for item in vars(self).items())
        )
    cls.__str__ = __str__
    return cls


def upload_path(instance, filename):
    return '/'.join(['logo', str(instance.nom), filename])
# Create your models here.



@auto_str
class Championnat(models.Model):
    nom = models.CharField(max_length=30)


    

@auto_str
class Groupe(models.Model):
    nom = models.CharField(max_length=30)
    championnat = models.ForeignKey(Championnat, on_delete=models.CASCADE, null=True)


@auto_str
class Terrain(models.Model):
    nom = models.CharField(max_length=30)
    capacite = models.PositiveBigIntegerField()
    adresse = models.CharField(max_length=30)


@auto_str
class Admin(models.Model):
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    mdp = models.CharField(max_length=50)
    email = models.CharField(max_length=30)


@auto_str
class Club(models.Model):
    nom = models.CharField(max_length=30)
    mdp = models.CharField(max_length=50)
    email = models.CharField(max_length=30)
    adresse = models.CharField(max_length=30)
    terrain = models.ManyToManyField(Terrain, null=True)
    logo = models.ImageField(upload_to=upload_path, default=None)


    
@auto_str
class Poste(models.Model):
    nom = models.CharField(max_length=30)


@auto_str
class Utilisateur(models.Model):
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    dateNaissance = models.DateField()
    email = models.CharField(max_length=40)
    mdp = models.CharField(max_length=50)
    image = models.ImageField(upload_to='upload/', default=None, null=true)
    
    class Meta:
        abstract = True

@auto_str
class Joueur(Utilisateur):
    class PiedPref(models.TextChoices):
        D = "Droit"
        G = "Gauche"
        A = "Ambidextre"
    pied = models.CharField(max_length=30, choices=PiedPref.choices, blank=True, null=True)
    taille = models.PositiveBigIntegerField(blank=True, null=True)
    etatFacture = models.BooleanField(default=False)
    poste = models.ForeignKey(Poste, on_delete=models.CASCADE, null=True)


@auto_str
class Equipe(models.Model):
    nom = models.CharField(max_length=30)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, null=True)
    joueur = models.ManyToManyField(Joueur, null=True)
    groupe = models.ForeignKey(Groupe, on_delete=models.CASCADE, null=True)

@auto_str
class EquipeImage(models.Model):
    photo = models.ImageField(upload_to='upload/', default=None, null=true)
    equipe = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True)

@auto_str 
class Entraineur(Utilisateur):
    diplome = models.CharField(max_length=30, blank=True, null=True)
    equipe = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True)


@auto_str
class Arbitre(Utilisateur):
    class Niveau(models.TextChoices):
        A = "A"
        B = "B"
        C = "C"
    niveau = models.CharField(max_length=30, choices=Niveau.choices, blank=True, null=True)

@auto_str
class Spectateur(Utilisateur):
    noteMoyenneAttribue = models.PositiveBigIntegerField(blank=True, null=True)
    




@auto_str
class Match(models.Model):
    score = models.CharField(max_length=30)
    heure = models.DateTimeField()
    terrain = models.ForeignKey(Terrain, on_delete=models.CASCADE, null=True)
    arbitre = models.ForeignKey(Arbitre, on_delete=models.CASCADE, null=True)
    equipes = models.ManyToManyField(Equipe)
    groupe = models.ForeignKey(Groupe, on_delete=models.CASCADE, null=True)


@auto_str
class StatistiquesEquipe(models.Model):
    nb_matchs = models.PositiveBigIntegerField()
    nb_victoires = models.PositiveBigIntegerField()
    nb_defaites = models.PositiveBigIntegerField()
    buts_marqués = models.PositiveBigIntegerField()
    buts_encaissés = models.PositiveBigIntegerField()
    points = models.PositiveBigIntegerField()
    saison = models.CharField(max_length=30)
    equipe = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True)

@auto_str
class StatistiquesJoueur(models.Model):
    buts = models.PositiveBigIntegerField()
    passeDec = models.PositiveBigIntegerField()
    cartonsRouge = models.PositiveBigIntegerField()
    cartonsJaune = models.PositiveBigIntegerField()
    noteMoyenne = models.PositiveBigIntegerField()
    annee = models.CharField(max_length=30)
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)

@auto_str
class StatistiquesArbitre(models.Model):
    cartonsRouge = models.PositiveBigIntegerField()
    cartonsJaune = models.PositiveBigIntegerField()
    noteMoyenne = models.PositiveBigIntegerField()
    annee = models.CharField(max_length=30)
    arbitre = models.ForeignKey(Arbitre, on_delete=models.CASCADE, null=True)
    nb_matchs = models.PositiveBigIntegerField(default=0)

@auto_str
class Transfert(models.Model):
    montant = models.PositiveBigIntegerField(blank=True, null=True)
    date = models.DateField()
    acheteur = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True, related_name="acheteur")
    vendeur = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True, related_name="vendeur")
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)


@auto_str
class PalmaresClub(models.Model):
    titre = models.CharField(max_length=30, blank=True, null=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, null=True)


@auto_str
class NoteJoueur(models.Model):
    spectateur = models.ForeignKey(Spectateur, on_delete=models.CASCADE, null=True)
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    note = models.PositiveBigIntegerField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True)

@auto_str
class NoteArbitre(models.Model):
    spectateur = models.ForeignKey(Spectateur, on_delete=models.CASCADE, null=True)
    arbitre = models.ForeignKey(Arbitre, on_delete=models.CASCADE, null=True)
    note = models.PositiveBigIntegerField()
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True)
    
    

@auto_str
class But(models.Model):
    minute = models.PositiveBigIntegerField()
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True) 

@auto_str
class PasseD(models.Model):
    minute = models.PositiveBigIntegerField()
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True)
    but = models.ForeignKey(But, on_delete=models.CASCADE, null=True)

@auto_str
class Carton(models.Model):
    class CouleurCarton(models.TextChoices):
        J = "Jaune"
        R = "Rouge"
    minute = models.PositiveBigIntegerField()
    couleur = models.CharField(max_length=30, choices=CouleurCarton.choices, blank=True, null=True)
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True)
    arbitre = models.ForeignKey(Arbitre, on_delete=models.CASCADE, null=True)


@auto_str
class Composition(models.Model):
    class Etat(models.TextChoices):
        Tit = "titulaire"
        Rem = "remplaçant"
        Abs = "absent"
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, null=True)
    etat = models.CharField(max_length=30, choices=Etat.choices, blank=True, null=True)
    equipe = models.ForeignKey(Equipe, on_delete=models.CASCADE, null=True)
    maillot = models.PositiveBigIntegerField(blank=True, null=True)

@auto_str
class Article(models.Model):
    titre = models.CharField(max_length=100)
    contenu = models.TextField()
    photo = models.ImageField(upload_to='upload/', default=None, null=true)
    auteur = models.CharField(max_length=100)
    date = models.DateField()

@auto_str
class NoterEntrainement(models.Model):
    note = models.PositiveBigIntegerField(blank=True, null=True)
    date = models.DateField()
    joueur = models.ForeignKey(Joueur, on_delete=models.CASCADE, null=True)
    entraineur = models.ForeignKey(Entraineur, on_delete=models.CASCADE, null=True)
