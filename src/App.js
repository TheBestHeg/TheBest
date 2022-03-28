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
      <Route path="/test" element={<Test/>}></Route>
    </Routes>
  </BrowserRouter>
}