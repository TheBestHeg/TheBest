import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import React from 'react';
import Acceuil from './components/acceuil';
import Accueil_admin from './components/accueil_admin';
import Connection from './components/se_connecter';
import Inscription from './components/inscription';
import Classement from "./components/classement";
import Feuille_match from "./components/feuille_match";
import Club from "./components/club";
import Score_live from "./components/score_live";
import Entrainement from "./components/entrainement";
import Meilleure_composition from "./components/meilleur_composition";
import Test from "./components/test";
import Matchs_a_venir from "./components/matchs_a_venir";
import Details_match from "./components/matchs_details";
import Matchs_en_cours from "./components/matchs_en_cours";
import MeilleurJoueur from "./components/meilleurJoueur";
import Mon_calendrier from "./components/mon_calendrier";
import NoterArbitre from "./components/noterArbitre";
import NoterEntrainement from "./components/noterEntrainement";
import Paiement_facture from "./components/paiement_facture";
import PerformanceJoueur from "./components/performance-joueur";
import Profil_entraineur from "./components/profil_entraineur";
import Profil_joueur from "./components/profil_joueur_photos";
import ProfilArbitre from "./components/profilArbitre";
import Acceuil_connection from "./components/acceuil_connection";
import Navbar_Test from "./components/navbar_test";
import Match_termine from "./components/match_termine";
import Noter_Joueur from "./components/noter_joueurs";
import Terrain from "./components/terrain"
import AjouterCompositionListe from "./components/ajouter_composition_liste";
import AjouterComposition from "./components/ajouter_composition";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedRoutesAdmin from "./ProtectedRoutesAdmin";
import ProtectedRoutesClub from "./ProtectedRoutesClub";
import ProtectedRoutesEntraineur from "./ProtectedRoutesEntraineur";
import ProtectedRoutesJoueur from "./ProtectedRoutesJoueur";
import ProtectedRoutesSpectateur from "./ProtectedRoutesSpectateur";
import Gestion_club from "./components/gestion_club";

import PublicRoutes from "./PublicRoutes";
import ListeHistoriqueNotesEntrainements from "./components/voirHistoriqueNoteEntrainement";
import HistoriqueNotesEntrainements from "./components/historiqueNotesEntrainements";
export default function App() {
  return <BrowserRouter>
    <Routes>
    <Route element={<PublicRoutes/>}>
      <Route path="/" element={<Acceuil/>}></Route>
      <Route path="/login" element={<Connection/>}></Route>
      <Route path="/inscription" element={<Inscription/>}></Route>
      </Route>

      <Route element={<ProtectedRoutesAdmin/>}>
      <Route path="/accueil_admin" element={<Accueil_admin/>}></Route>
      <Route path="/accueil_admin/:table" element={<Accueil_admin/>}></Route>
      </Route>

      <Route element={<ProtectedRoutesClub/>}>
      <Route path="/gestion_club" element={<Gestion_club/>}></Route>
      </Route>

      <Route element={<ProtectedRoutes/>}>
      <Route path="/accueil_connection" element={<Acceuil_connection/>}></Route>
      <Route path="/classement" element={<Classement/>}></Route>
      <Route path="/feuille/:id" element={<Feuille_match/>}></Route>
      <Route path="/club" element={<Club/>}></Route>
      <Route path='/club/:id' element={<Club/>}/>
      <Route path="/score_live" element={<Score_live/>}></Route>
      <Route path="/entrainement" element={<Entrainement/>}></Route>
      <Route path="/meilleure_composition" element={<Meilleure_composition/>}></Route>
      <Route path="/test" element={<Test/>}></Route>
      <Route path="/match_a_venir" element={<Matchs_a_venir/>}></Route>
      <Route path="/details_match/:id" element={<Details_match/>}></Route>
      <Route path="/matchs_en_cours" element={<Matchs_en_cours/>}></Route>
      <Route path="/match_termine" element={<Match_termine/>}></Route>
      <Route path="/meilleur_joueur" element={<MeilleurJoueur/>}></Route>
      <Route path="/performance_joueur" element={<PerformanceJoueur/>}></Route>
      <Route path="/performance_joueur/:id" element={<PerformanceJoueur/>}></Route>
      <Route path="/arbitre" element={<ProfilArbitre/>}></Route>
      <Route path="/arbitre/:id" element={<ProfilArbitre/>}></Route>
      </Route>

      <Route element={<ProtectedRoutesEntraineur/>}>
      <Route path="/noter_entrainement" element={<NoterEntrainement/>}></Route>
      <Route path="/paiement_facture" element={<Paiement_facture/>}></Route>
      <Route path="/profil_entraineur" element={<Profil_entraineur/>}></Route>
      <Route path="/liste_historique_notes_entrainments" element={<ListeHistoriqueNotesEntrainements/>}></Route>
      <Route path="/historique_notes_entrainments" element={<HistoriqueNotesEntrainements/>}></Route>
      <Route path="/ajouter_composition_liste" element={<AjouterCompositionListe/>}></Route>
      <Route path="/ajouter_compositions/:id" element={<AjouterComposition/>}></Route>
      </Route>
      <Route element={<ProtectedRoutesJoueur/>}>
      <Route path="/mon_calendrier" element={<Mon_calendrier/>}></Route>
      <Route path="/profil_joueur" element={<Profil_joueur/>}></Route>
      </Route>
      <Route element={<ProtectedRoutesSpectateur/>}>
      <Route path="/noter_joueur/:joueurId/:matchId" element={<Noter_Joueur/>}></Route>
      <Route path="/noter_arbitre" element={<NoterArbitre/>}></Route>
      </Route>

    </Routes>
  </BrowserRouter>
}
