import React from 'react';
import { renderMatches, useParams } from 'react-router-dom';

import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import logo_aire from '../images/aire_fc.png';

import logo_carouge from '../images/logo_carouge.png';
import logo from '../images/logo_465x320.png';
import pp from '../images/referee_esther_staubli_switzerland_.jpeg';
import axios from "axios";
import { useState, useEffect } from 'react';


const NoterArbitre = () => {
  let{arbitreId, matchId} = useParams();

  const [spectateur, setSpectateur] = useState(null);
  const [arbitre, setArbitre] = useState(null);
  const [equipeUne, setEquipeUne] = useState(null);
  const [equipeDeux, setEquipeDeux] = useState(null);
  const [clubUn, setClubUn] = useState(null);
  const [clubDeux, setClubDeux] = useState(null);
  const [match, setMatch] = useState(null);
  const [cartonsJ, setCartonsJ] = useState(0);
  const [cartonsR, setCartonsR] = useState(0);
  const [cpt, setCpt] = useState(0);
  const [total, setTotal] = useState(0);

  
 
  function submit(e){

    
    
    axios.get("/api/noteArbitres/search/?match="+ match.id + "&arbitre=" + arbitre.id + "&spectateur="+ spectateur.id).then((res) =>{
      console.log(Object.keys(res.data).length)

      
      if(Object.keys(res.data).length == 0){
        var noteDonnee = +document.getElementById("notationArbitre").value;
        console.log(typeof noteDonnee);
        
        
        
          e.preventDefault();
        axios.post("/api/noteArbitres/insert/",{
          note:+document.getElementById("notationArbitre").value,
          spectateur:spectateur.id,
          arbitre:arbitre.id,
          match:match.id,
        })
        window.location.reload(false);
        
        
        
      }
      else{
        alert("Vous avez déjà noté l'arbitre sur ce match!");
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
    axios.get("/api/spectateurs/" + user.id).then((res) => { 
        setSpectateur(res.data);
        
      });
      axios.get("/api/arbitres/" + arbitreId).then((res) => { 
        setArbitre(res.data);
        
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
        let monCpt = 0;
        let monTotal = 0;
        let cartonsJTotal = 0;
        let cartonsRTotal = 0;
       
        axios.get("/api/cartons/search/?id=&match=" + res.data.id + "&arbitre=&couleur=Jaune").then((carJ) => {
          carJ.data.forEach(element =>{
            cartonsJTotal+=1;
          })
          setCartonsJ(cartonsJTotal);
        })
        axios.get("/api/cartons/search/?id=&match=" + res.data.id + "&arbitre=&couleur=Rouge").then((carR) => {
          carR.data.forEach(element =>{
            cartonsRTotal+=1;
          })
          setCartonsR(cartonsRTotal);
        })
        axios.get("/api/noteArbitres/search/?match=" + res.data.id).then((noteMatch) => {

          noteMatch.data.forEach(element =>{
          
          console.log(element.note)
          monCpt += 1;
          monTotal += element.note;
        });
        
      setCpt(monCpt);
      setTotal(monTotal);
      }

      );
    });



     
     
        
        
     }, [])


if (arbitre === null || spectateur === null || match ===null || cpt === null || total === null || clubUn===null|| clubDeux===null) {
  return <p>Chargement données ...</p>
}

  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-2xl font-bold mt-28">Noter arbitre</h1>
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
                    <img alt="Placeholder Photo" src={arbitre.image} className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm line-clamp-1">{arbitre.prenom} {arbitre.nom}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{arbitre.dateNaissance} / {getAge(arbitre.dateNaissance)} ans</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">Suisse</p>
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
        <div><h3 className="text-base font-semibold">Nombre de cartons jaunes :</h3>
          <br /><h3 className="text-base font-semibold">Nombre de cartons rouges :</h3>
        </div>
        <div><h3 className="text-base font-semibold">{cartonsJ}</h3>
          <br /><h3 className="text-base font-semibold">{cartonsR}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold my-6 font-bold">Note</h1>
      </div>
      <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <select name="notationArbitre" id="notationArbitre">
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
export default NoterArbitre;