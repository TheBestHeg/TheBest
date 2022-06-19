import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';

import axios from 'axios';


import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";


const Matchs_en_cours = () => {

  const navigate = useNavigate();
  const [listeChampionnats, setListeChampionnats] = useState([]);
  const [listeGroupes, setListeGroupes] = useState([])
  const [listeGroupesAJour, setListeGroupesAJour] = useState([]);
  const [groupe, setGroupe] = useState(null);
  const [matchsEnCours, setMatchsEnCours] = useState([]);
  const [club1, setClub1] = useState([]);
  const [club2, setClub2] = useState([]);
  const [terrain, setTerrain] = useState([]);
  const [affichageGroupe, setAffichageGroupe] = useState([]);
  
  const changeGroupe = (id) => {
    let maList = [];
    listeGroupes.map(groupe => {
      if (groupe.championnat === parseInt(id)) {
        maList.push(groupe);
      }
    })
    setListeGroupesAJour(maList);
  };

  const goSearch = (groupe) => {
    navigate('/matchs_en_cours/?groupe=' + groupe)
    window.location.reload();
  };
  useEffect(() => {
    let monGroupe = "";
    if (window.location.search !== "") {
      monGroupe = parseInt(window.location.search.split("=")[1])
      axios.get("/api/groupes/" + monGroupe.toString()).then((groupe) => {
        axios.get("/api/championnats/" + groupe.data.championnat).then((championnat) => {
          let dictGroup = groupe.data;
          dictGroup["championnatDict"] = championnat.data;
          setAffichageGroupe(dictGroup);
        })
      })
    }
    else {
      monGroupe = 1
      axios.get("/api/groupes/" + monGroupe.toString()).then((groupe) => {
        axios.get("/api/championnats/" + groupe.data.championnat).then((championnat) => {
          let dictGroup = groupe.data;
          dictGroup["championnatDict"] = championnat.data;
          setAffichageGroupe(dictGroup);
        })
      })
    }
    // Ma date supp à 1h30 + inclus les mi-temps et temps adittionnelle 
    let maDatePlus = new Date(Date.now())
    maDatePlus.setTime(maDatePlus.getTime() + 1.7 * 60 * 60 * 1000);
    let convDateISOPlus = maDatePlus.toISOString();

    // Ma Date moins
    let maDateMoins = new Date(Date.now());
    maDateMoins.setTime(maDateMoins.getTime() - 1.7 * 60 * 60 * 1000);
    let convDateISOMoins = maDateMoins.toISOString();

    let dateActuelle = new Date(Date.now());

    axios.get("/api/championnats/search/").then((championnats) => {
      setListeChampionnats(championnats.data);
    })
    axios.get("/api/groupes/search/").then((groupes) => {
      setListeGroupes(groupes.data);
    })
    console.log(window.location.search);
    let bonurl = "";
    if (window.location.search === ''){
      bonurl = "?groupe=1&heure__gt=";
    }
    else{
      bonurl = window.location.search + "&heure__gt=";
    }
    axios.get("/api/matchs/search/"+  bonurl + convDateISOMoins + "&heure__lt=" + convDateISOPlus).then((matchs) => {
      matchs.data.forEach(element => {
        let dateActuelle = new Date(Date.now());
        let dateMatch = new Date(element.heure);
        let matchTerminaison = dateMatch;
        dateMatch = dateMatch.getTime();
        dateActuelle = dateActuelle.getTime();
        matchTerminaison.setTime(matchTerminaison.getTime() + 1.7 * 60 * 60 * 1000)
        matchTerminaison = matchTerminaison.getTime();
        if (dateActuelle >= dateMatch && dateActuelle <= matchTerminaison) {

          
          axios.get("/api/terrains/" + element.terrain).then((monTerrain) => {
            axios.get("/api/equipes/" + element.equipes[0]).then((equipe) => {
              axios.get("/api/clubs/" + equipe.data.club).then((club_1) => {
                axios.get("/api/equipes/" + element.equipes[1]).then((equipe) => {
                  axios.get("/api/clubs/" + equipe.data.club).then((club_2) => {
                    setMatchsEnCours(matchsEnCours => [...matchsEnCours, element])
                    setTerrain(terrain => [...terrain, monTerrain.data])
                    setClub2(club2 => [...club2, club_2.data])
                    setClub1(club1 => [...club1, club_1.data])
                  })
                })
              })
            })

          })

        }
      })
    });
  }, [])



  let matchs = []
  for (let i = 0; i < matchsEnCours.length; i++) {
    matchs.push([matchsEnCours[i], club1[i], club2[i], terrain[i]])
  }
  return <div>
    
    <Navbar />
    <MonBackground />
    <div class="px-16 py-20">
      <div>
        <h1 className="text-center text-2xl font-bold my-6">Matchs en cours</h1>
        <div className="flex md:flex-row md:justify-center flex-col items-center md:gap-12 gap-4 mx-4">
          <div>
            <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { changeGroupe(e.target.value) }}>
              <option value="">--Choisir son championnat--</option>
              {listeChampionnats.map(championnat =>
                <option value={championnat.id}>{championnat.nom}</option>
              )}
            </select>
          </div>
          <div>
            <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { console.log(e.target.value); setGroupe(e.target.value)}}>
              <option value="">--Choisir son groupe--</option>
              {listeGroupesAJour.map(groupe =>
                <option value={groupe.id}>{groupe.nom}</option>
              )}
            </select>
          </div>
          <div>
            <button className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => {if (groupe !== null) {goSearch(groupe)} else{alert("séléctionner un groupe")}}}>
              Confirmer
            </button>
          </div>
        </div>
        <br />
        <br />
        {affichageGroupe.length !== 0
          ? <h1 class="text-center text-2xl my-6">Championnat  {affichageGroupe.championnatDict.nom} | {affichageGroupe.nom} </h1>
          : null}
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
                          Score
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Lieu
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {/* Product 1 */}

                      {matchs.map((monMatchs) =>
                        monMatchs[0] && monMatchs[1] && monMatchs[2] && monMatchs[3]

                          ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate("/score_live/" + monMatchs[0].id)} style={{ cursor: 'pointer' }}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {monMatchs[1].nom} - {monMatchs[2].nom}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {monMatchs[0].score}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {monMatchs[3].adresse}
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
    </div>
    {
            matchsEnCours.length < 6
            ?<div className='fixed inset-x-0 bottom-0'>
            <Footer />
            </div>
            :<Footer />
        }
  </div>

}
export default Matchs_en_cours;
