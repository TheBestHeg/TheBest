import { BrowserRouter, Routes, Route } from "react-router-dom";
import Acceuil from './components/acceuil'
import Connection from './components/se_connecter'
import Inscription from './components/inscription'
import Classement from "./components/classement";
import Feuille_match from "./components/feuille_match";
import Club from "./components/club";
import Score_live from "./components/score_live";
import Entrainement from "./components/entrainement";
import Meilleure_composition from "./components/meilleur_composition";
import Test from "./components/test";
import Mon_calendrier from "./components/mon_calendrier";
import Matchs_a_venir from "./components/matchs_a_venir";
import Paiement_facture from "./components/paiement_facture";
import Profil_entraineur from "./components/profil_entraineur";
import Profil_joueur from "./components/profil_joueur_photos";
import Matchs_en_cours from "./components/matchs_en_cours";
import Details_match from "./components/matchs_details";
export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Acceuil/>}></Route>
      <Route path="/login" element={<Connection/>}></Route>
      <Route path="/inscription" element={<Inscription/>}></Route>
      <Route path="/classement" element={<Classement/>}></Route>
      <Route path="/feuille" element={<Feuille_match/>}></Route>
      <Route path="/club" element={<Club/>}></Route>
      <Route path="/score_live" element={<Score_live/>}></Route>
      <Route path="/entrainement" element={<Entrainement/>}></Route>
      <Route path="/meilleure_composition" element={<Meilleure_composition/>}></Route>
      <Route path="/mon_calendrier" element={<Mon_calendrier/>}></Route>
      <Route path="/matchs_a_venir" element={<Matchs_a_venir/>}></Route>
      <Route path="/paiement_facture" element={<Paiement_facture/>}></Route>
      <Route path="/profil_entraineur" element={<Profil_entraineur/>}></Route>
      <Route path="/profil_joueur" element={<Profil_joueur/>}></Route>
      <Route path="/matchs_en_cours" element={<Matchs_en_cours/>}></Route>
      <Route path="/matchs_details" element={<Details_match/>}></Route>

      <Route path="/test" element={<Test/>}></Route>
    </Routes>
  </BrowserRouter>
}