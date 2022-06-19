from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, filters
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from rest_framework.decorators import action

from rest_framework.response import Response

# Create your views here.


class TerrainView(generics.RetrieveAPIView):
    serializer_class = TerrainSerializer
    queryset = Terrain.objects.all()
    permission_classes = [permissions.AllowAny]

class TerrainViewRM(generics.DestroyAPIView):
    serializer_class = TerrainSerializer
    queryset = Terrain.objects.all()
    permission_classes = [permissions.AllowAny]

class TerrainViewUpdate(generics.UpdateAPIView):
    serializer_class = TerrainSerializer
    queryset = Terrain.objects.all()
    permission_classes = [permissions.AllowAny]

class TerrainViewInsert(generics.CreateAPIView):
    serializer_class = TerrainSerializer
    queryset = Terrain.objects.all()
    permission_classes = [permissions.AllowAny]

class TerrainViewSearch(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Terrain.objects.all()
    serializer_class = TerrainSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class TerrainViewSearchV2(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Terrain.objects.all()
    serializer_class = TerrainSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom', '$adresse']


class AdminView(generics.RetrieveAPIView):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()
    permission_classes = [permissions.AllowAny]

class AdminViewUpdate(generics.UpdateAPIView):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()
    permission_classes = [permissions.AllowAny]

class AdminViewInsert(generics.CreateAPIView):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()
    permission_classes = [permissions.AllowAny]

class AdminViewSearch(generics.ListAPIView):
    serializer_class = AdminSerializer
    queryset = Admin.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'email']

class ClubView(generics.RetrieveAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]

class ClubViewRM(generics.DestroyAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]

class ClubViewUpdate(generics.UpdateAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]

class ClubViewInsert(generics.CreateAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]

class ClubViewSearch(generics.ListAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class ClubViewSearchV2(generics.ListAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class ClubViewSearchEmail(generics.ListAPIView):
    serializer_class = ClubSerializer
    queryset = Club.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email']

class EquipeView(generics.RetrieveAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]

class EquipeViewRM(generics.DestroyAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]

class EquipeViewUpdate(generics.UpdateAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]

class EquipeViewInsert(generics.CreateAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]

class EquipeViewSearch(generics.ListAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom' , 'joueur', 'groupe', 'club'] #modifier

class EquipeViewSearchV2(generics.ListAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class EquipeViewSearchJoueur(generics.ListAPIView):
    serializer_class = EquipeSerializer
    queryset = Equipe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['nom','club','joueur','id']

class JoueurView(generics.RetrieveAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]

class JoueurViewRM(generics.DestroyAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]

class JoueurViewUpdate(generics.UpdateAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]

class JoueurViewInsert(generics.CreateAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]

class JoueurViewSearch(generics.ListAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom', 'poste']

class JoueurViewSearchV2(generics.ListAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom','$prenom']


class PosteView(generics.RetrieveAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]

class PosteViewRM(generics.DestroyAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]

class PosteViewUpdate(generics.UpdateAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]

class PosteViewInsert(generics.CreateAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]

class PosteViewSearch(generics.ListAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class PosteViewSearchV2(generics.ListAPIView):
    serializer_class = PosteSerializer
    queryset = Poste.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class EntraineurView(generics.RetrieveAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]

class EntraineurViewRM(generics.DestroyAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]

class EntraineurViewUpdate(generics.UpdateAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]

class EntraineurViewInsert(generics.CreateAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]


class EntraineurViewSearchEmail(generics.ListAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email']

class EntraineurViewSearchV2(generics.ListAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class ArbitreView(generics.RetrieveAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class ArbitreViewRM(generics.DestroyAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class ArbitreViewUpdate(generics.UpdateAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class ArbitreViewInsert(generics.CreateAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class ArbitreViewSearch(generics.ListAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class ArbitreViewSearchV2(generics.ListAPIView):
    serializer_class = ArbitreSerializer
    queryset = Arbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom', '$prenom']

class SpectateurView(generics.RetrieveAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]

class SpectateurViewRM(generics.DestroyAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]

class SpectateurViewUpdate(generics.UpdateAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]

class SpectateurViewInsert(generics.CreateAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]

class SpectateurViewSearch(generics.ListAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class SpectateurViewSearchV2(generics.ListAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class SpectateurViewSearchEmail(generics.ListAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email']

class StatistiquesJoueurView(generics.RetrieveAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesJoueurViewRM(generics.DestroyAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesJoueurViewUpdate(generics.UpdateAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesJoueurViewInsert(generics.CreateAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesJoueurViewSearch(generics.ListAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'joueur', 'annee']

class StatistiquesJoueurViewSearchV2(generics.ListAPIView):
    serializer_class = StatistiquesJoueurSerializer
    queryset = StatistiquesJoueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$joueur']

class StatistiquesArbitreView(generics.RetrieveAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesArbitreViewRM(generics.DestroyAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesArbitreViewUpdate(generics.UpdateAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesArbitreViewInsert(generics.CreateAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesArbitreViewSearch(generics.ListAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'annee', 'arbitre']

class StatistiquesArbitreViewSearchArbitre(generics.ListAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['arbitre']

class StatistiquesArbitreViewSearchV2(generics.ListAPIView):
    serializer_class = StatistiquesArbitreSerializer
    queryset = StatistiquesArbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$annee', '$arbitre']
 

class StatistiquesEquipeView(generics.RetrieveAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesEquipeViewRM(generics.DestroyAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesEquipeViewUpdate(generics.UpdateAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesEquipeViewInsert(generics.CreateAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]

class StatistiquesEquipeViewSearch(generics.ListAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'saison', 'equipe']


class StatistiquesEquipeViewSearchV2(generics.ListAPIView):
    serializer_class = StatistiquesEquipeSerializer
    queryset = StatistiquesEquipe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$saison']

class TransfertView(generics.RetrieveAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]

class TransfertViewRM(generics.DestroyAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]

class TransfertViewUpdate(generics.UpdateAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]

class TransfertViewInsert(generics.CreateAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]

class TransfertViewSearch(generics.ListAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

class TransfertViewSearchV2(generics.ListAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']

class ChampionnatView(generics.RetrieveAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]

class ChampionnatViewRM(generics.DestroyAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]

class ChampionnatViewUpdate(generics.UpdateAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]

class ChampionnatViewInsert(generics.CreateAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]

class ChampionnatViewSearch(generics.ListAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class ChampionnatViewSearchV2(generics.ListAPIView):
    serializer_class = ChampionnatSerializer
    queryset = Championnat.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']



class GroupeView(generics.RetrieveAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]

class GroupeViewRM(generics.DestroyAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]

class GroupeViewUpdate(generics.UpdateAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]

class GroupeViewInsert(generics.CreateAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]

class GroupeViewSearch(generics.ListAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class GroupeViewSearchV2(generics.ListAPIView):
    serializer_class = GroupeSerializer
    queryset = Groupe.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class PalmaresClubView(generics.RetrieveAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]

class PalmaresClubViewRM(generics.DestroyAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]

class PalmaresClubViewUpdate(generics.UpdateAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]

class PalmaresClubViewInsert(generics.CreateAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]

class PalmaresClubViewSearch(generics.ListAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom']

class PalmaresClubViewSearchV2(generics.ListAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']

class NoteArbitreView(generics.RetrieveAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteArbitreViewRM(generics.DestroyAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteArbitreViewUpdate(generics.UpdateAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteArbitreViewInsert(generics.CreateAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteArbitreViewSearch(generics.ListAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['match', 'arbitre', 'spectateur']

class NoteArbitreViewSearchV2(generics.ListAPIView):
    serializer_class = NoteArbitreSerializer
    queryset = NoteArbitre.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']

class NoteJoueurView(generics.RetrieveAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteJoueurViewRM(generics.DestroyAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteJoueurViewUpdate(generics.UpdateAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteJoueurViewInsert(generics.CreateAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]

class NoteJoueurViewSearch(generics.ListAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['match', 'joueur', 'spectateur']

class NoteJoueurViewSearchV2(generics.ListAPIView):
    serializer_class = NoteJoueurSerializer
    queryset = NoteJoueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']

class ButView(generics.RetrieveAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]

class ButViewRM(generics.DestroyAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]

class ButViewUpdate(generics.UpdateAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]

class ButViewInsert(generics.CreateAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]


class ButViewSearchV2(generics.ListAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']

class PasseDView(generics.RetrieveAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]

class PasseDViewRM(generics.DestroyAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]

class PasseDViewUpdate(generics.UpdateAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]

class PasseDViewInsert(generics.CreateAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]

class PasseDViewSearch(generics.ListAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'joueur', 'match', 'but']

class PasseDViewSearchV2(generics.ListAPIView):
    serializer_class = PasseDSerializer
    queryset = PasseD.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']

class CartonView(generics.RetrieveAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]

class CartonViewRM(generics.DestroyAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]

class CartonViewUpdate(generics.UpdateAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]

class CartonViewInsert(generics.CreateAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]

class CartonViewSearch(generics.ListAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'match', 'arbitre', 'couleur']

class CartonViewSearchV2(generics.ListAPIView):
    serializer_class = CartonSerializer
    queryset = Carton.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']


class MatchView(generics.RetrieveAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]

class MatchViewRM(generics.DestroyAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]

class MatchViewUpdate(generics.UpdateAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]

class MatchViewInsert(generics.CreateAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]



class MatchViewSearchV2(generics.ListAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']
    

class CompositionView(generics.RetrieveAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]

class CompositionViewRM(generics.DestroyAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]

class CompositionViewUpdate(generics.UpdateAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]

class CompositionViewInsert(generics.CreateAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]


class CompositionViewSearchV2(generics.ListAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id', '$nom']



class TransfertViewSearchEquipe(generics.ListAPIView):
    serializer_class = TransfertSerializer
    queryset = Transfert.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['acheteur', 'vendeur']

class PalmaresClubViewSearchClub(generics.ListAPIView):
    serializer_class = PalmaresClubSerializer
    queryset = PalmaresClub.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['club']

class MatchViewSearchEquipe(generics.ListAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['equipes']

class JoueurViewSearchEmail(generics.ListAPIView):
    serializer_class = JoueurSerializer
    queryset = Joueur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ 'email']


class EntraineurViewSearch(generics.ListAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'nom','equipe'] 

class ButViewSearch(generics.ListAPIView):
    serializer_class = ButSerializer
    queryset = But.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'joueur', 'match']

class MatchViewSearch(generics.ListAPIView):
    serializer_class = MatchSerializer
    queryset = Match.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {

        'id' :['exact'], 
        'equipes':['exact'],
        'arbitre':['exact'],
        'heure': ['gte', 'lte', 'exact', 'gt', 'lt'],
        'groupe': ['exact']
    }

class CompositionViewSearch(generics.ListAPIView):
    serializer_class = CompositionSerializer
    queryset = Composition.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'match', 'etat', 'equipe']


class NoterEntrainementView(generics.RetrieveAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]

    

class NoterEntrainementViewRM(generics.DestroyAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]

class NoterEntrainementViewUpdate(generics.UpdateAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]

class NoterEntrainementViewInsert(generics.CreateAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]

class NoterEntrainementViewSearch(generics.ListAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'id' :['exact'],
        'date': ['gte', 'lte', 'exact', 'gt', 'lt'],
        'joueur': ['exact'],
        'entraineur': ['exact']
    }

class NoterEntrainementViewSearchV2(generics.ListAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['$id']


class NoterEntrainementViewSearchDateDistinct(generics.ListAPIView):
    serializer_class = NoterEntrainementSerializer
    queryset = NoterEntrainement.objects.values('date').distinct()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'entraineur': ['exact']
    }

class SpectateurViewSearchEmail(generics.ListAPIView):
    serializer_class = SpectateurSerializer
    queryset = Spectateur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ 'email']

class EntraineurViewSearchEmail(generics.ListAPIView):
    serializer_class = EntraineurSerializer
    queryset = Entraineur.objects.all()
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ 'email']


