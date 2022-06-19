import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import axios from "axios";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

const Mon_calendrier = () => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [terrain, setTerrain] = useState([]);
  const [equipeJoueur, setEquipeJoueur] = useState(null);
  const [clubUn, setClubUn] = useState([]);
  const [clubDeux, setClubDeux] = useState([]);
  const navigate = useNavigate();
  
  const [matchsAVenir, setMatchsAVenir] = useState([]);

  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }
  var user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get("/api/joueurs/" + user.id).then((res) => { 
      setUtilisateur(res.data);
      
      let dateActuelle = new Date(Date.now());
      let convDateActuIso = dateActuelle.toISOString();
      axios.get("/api/equipes/search/?id=&nom=&joueur=" + res.data.id).then((utilisateurT) => {
        
        setEquipeJoueur(utilisateurT.data);
        
        axios.get("/api/matchs/search/?id=&equipes=" + utilisateurT.data[0].id + "&heure__gte=&heure__lte=&heure=&heure__gt=&heure__lt=&groupe=&heure__gt=" + convDateActuIso).then((matchs) => {
          setMatchsAVenir(matchs.data)
          matchs.data.forEach(element => {
            
            axios.get("/api/equipes/" + element.equipes[0]).then((equipe) => {
              axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                setClubUn(clubUn => [...clubUn, club.data])
              })
            })
    
            axios.get("/api/equipes/" + element.equipes[1]).then((equipe) => {
              axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                setClubDeux(clubDeux => [...clubDeux, club.data])
              })
            })
            axios.get("/api/terrains/" + element.terrain).then((terrainT) => {
              setTerrain(terrain => [...terrain, terrainT.data])
            })
          })
        })
      })
      
      
      
    })
}, [])

if (terrain === null  || matchsAVenir===null || utilisateur === null) {
  return <p>Chargement données ...</p>
}

let matchs = []
      for (let i = 0; i < matchsAVenir.length; i++) {
        matchs.push([matchsAVenir[i], clubUn[i], clubDeux[i], terrain[i]])
      }
      console.log(matchs); 
  return <div>
    <MonBackground/>
     <div class="px-16 py-8">
       <Navbar/>
       <h1 className="text-center text-3xl font-bold mb-6 mt-28">Mon calendrier</h1>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Equipes
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Date, heure
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Lieu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {matchs.map((monMatchs) =>
                        monMatchs[0] && monMatchs[1] && monMatchs[2] && monMatchs[3]

                          ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate("/feuille/" + monMatchs[0].id)} style={{ cursor: 'pointer' }}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {monMatchs[1].nom} - {monMatchs[2].nom}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {convertDate(monMatchs[0].heure)}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {monMatchs[3].adresse}, {monMatchs[3].nom}
                            </td>
                          </tr>
                          : null
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
            matchs.length < 6
            ?<div className='fixed inset-x-0 bottom-0'>
            <Footer />
            </div>
            :<Footer />
        }
  </div>

}
export default Mon_calendrier;
