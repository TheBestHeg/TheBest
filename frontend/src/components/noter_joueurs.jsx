import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import logo_aire from '../images/aire_fc.png';
import axios from "axios";
import logo_carouge from '../images/logo_carouge.png';
import logo from '../images/logo_465x320.png';
import pp from '../images/steve-rouiller.jpg';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";

const Noter_Joueur = () => {
  let{joueurId, matchId} = useParams();
  console.log(joueurId);
  console.log(matchId);

  
    const [joueur,setJoueur] = useState(null);
    const [spectateur,setSpectateur] = useState(null);
    
    const [equipeUne, setEquipeUne] = useState(null);
  const [equipeDeux, setEquipeDeux] = useState(null);
  const [clubUn, setClubUn] = useState(null);
  const [clubDeux, setClubDeux] = useState(null);
  const [match, setMatch] = useState(null);
  const [buts, setButs] = useState(0);
  const [passeDec, setPasseDec] = useState(0);
  const [cpt, setCpt] = useState(0);
  const [total, setTotal] = useState(0);
  function submit(e){

   
    
    axios.get("/api/noteJoueurs/search/?match="+ match.id + "&joueur=" + joueur.id + "&spectateur="+ spectateur.id).then((res) =>{
      console.log(Object.keys(res.data).length)

      
      if(Object.keys(res.data).length == 0){
        var noteDonnee = +document.getElementById("notationJoueur").value;
        console.log(typeof noteDonnee);
        
        
        
          e.preventDefault();
        axios.post("/api/noteJoueurs/insert/",{
          note:+document.getElementById("notationJoueur").value,
          spectateur:spectateur.id,
          joueur:joueur.id,
          match:match.id,
        })
        window.location.reload(false);
        
        
        
      }
      else{
        alert("Vous avez déjà noté le joueur sur ce match!");
      }
    })
    

  }
    function getAge(dateString) 
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
  }
  var user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get("/api/spectateurs/"+user.id).then((res) => { 
      setSpectateur(res.data);
      
    });
    
     axios.get("/api/matchs/" + matchId).then((res) => { 
      setMatch(res.data);
      axios.get("/api/equipes/" + res.data.equipes[0]).then((equipe) => { 
        setEquipeUne(equipe.data);
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubUn(monClub.data) });
      
      });
      axios.get("/api/equipes/" + res.data.equipes[1]).then((equipe) => { 
        setEquipeDeux(equipe.data) 
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubDeux(monClub.data) });
      
      });
      axios.get("/api/joueurs/" + joueurId).then((resJoueur) => { 
        setJoueur(resJoueur.data);
        let monCpt = 0;
      let monTotal = 0;
      let butsTotal = 0;
      let passeDecTotal = 0;
      
        axios.get("/api/buts/search/?id=&joueur=" + resJoueur.data.id +"&match=" + res.data.id).then((carJ) => {
          carJ.data.forEach(element =>{
            butsTotal+=1;
          })
          setButs(butsTotal);
        })
        
        axios.get("/api/passeds/search/?id=&joueur="+ resJoueur.data.id + "&match=" + res.data.id + "&but=").then((carR) => {
          carR.data.forEach(element =>{
            passeDecTotal+=1;
          })
          setPasseDec(passeDecTotal);
        })
      axios.get("/api/noteJoueurs/search/?match=" + matchId + "&joueur=" + joueurId).then((noteMatch) => {

        noteMatch.data.forEach(element =>{
        
        console.log(element.note)
        monCpt += 1;
        monTotal += element.note;
      });
      
    setCpt(monCpt);
    setTotal(monTotal);
    })          
          
       })
      
    });

    
    
}, [])
if (joueur === null || equipeUne === null || equipeDeux===null || clubUn ===null || clubDeux===null) {
  return <p>Chargement données ...</p>
}
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-2xl font-bold mb-6 mt-28">Noter Joueur</h1>
      <br />
      <br />
      <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4 mb-6">
        <div>
          {/* arbitre */}
          <div className="w-96">
            <div className="container">
              <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start" style={{ cursor: 'auto' }}>
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <img alt="Placeholder Photo" src={joueur.image} className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm line-clamp-1">{joueur.prenom} {joueur.nom}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{joueur.dateNaissance} / {getAge(joueur.dateNaissance)} ans</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{joueur.pied}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div><h2 className="text-center text-xl font-bold my-6">Note moyenne du match</h2>
          <h2 className="text-center text-4xl font-bold my-6">{(total/cpt).toFixed(2)}</h2>
        </div>
      </div>
      <br />
      {/* Prochain matchs */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-center text-2xl font-bold my-6font-bold">Match terminé</h1>
        <div className="flex flex-row gap-8 justify-center  mt-4">
          <div>
            <div className="flex justify-center">
              <img src={clubUn.logo} className="h-24 w-24 mb-4" />
            </div>
            <div className="flex justify-center">
              <h1>{clubUn.nom}</h1>
            </div>
          </div>
          <h1 className="text-7xl font-bold">{match.score}</h1>
          <div>
            <div className="flex justify-center">
              <img src={clubDeux.logo} className="h-24 w-24 mb-4" />
            </div>
            <div className="flex justify-center">
              <h1>{clubDeux.nom}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold my-6 font-bold">Incidents</h1>
      </div>
      <div className="flex flex-row justify-center md:gap-24 gap-2 mx-4 mb-6">
        <div><h3 className="text-base font-semibold">Nombre de buts :</h3>
          <br /><h3 className="text-base font-semibold">Nombre de passe décisives :</h3>
        </div>
        <div><h3 className="text-base font-semibold">{buts}</h3>
          <br /><h3 className="text-base font-semibold">{passeDec}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold my-6 font-bold">Note</h1>
      </div>
      <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <select name="notationJoueur" id="notationJoueur">
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </select>
                        <button onClick={(e) => submit(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Noter</button>
      </div>
    </div>
    <div className='mt-6'>
      <Footer/>
    </div>
  </div>
}
export default Noter_Joueur;