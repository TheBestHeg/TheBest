import React from 'react';
import { useParams } from 'react-router-dom';
import MonBackground from './background';
import Navbar from './navbar';
import pp from '../images/steve-rouiller.jpg'
import axios from "axios";
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


const MeilleurJoueur = () => {
  const [club, setClub] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const [listeChampionnats, setListeChampionnats] = useState([]);
  const [listeGroupes, setListeGroupes] = useState([]);
  const [listePostes, setListePostes] = useState([]);
  const [statsJoueurs, setStatsJoueurs] = useState([]);

  const [listeGroupesAJour, setListeGroupesAJour] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [groupe, setGroupe] = useState(null);
  const [poste, setPoste] = useState(null);
  const [joueurs, setJoueurs] = useState([]);
  const [joueursComplet, setJoueursComplet] = useState([]);
  const [statsMj, setStatsMj] = useState(null);
  const [joueur, setJoueur] = useState(null);
  const navigate = useNavigate();

  const changeGroupe = (id) => {
    let maList = [];
    listeGroupes.map(groupe => {
      if (groupe.championnat === parseInt(id)) {
        maList.push(groupe);
      }
    })
    setListeGroupesAJour(maList);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  const goSearch = (groupe, poste) => {

    navigate('/meilleur_joueur/?groupe=' + groupe + '?poste=' + poste)
    window.location.reload();
  };

  useEffect(() => {
    axios.get("/api/championnats/search/").then((championnats) => {
      axios.get("/api/groupes/search/").then((groupes) => {
        axios.get("/api/postes/search/").then((postes) => {
          let a = test.split('?');
          console.log(a[2])
          axios.get("/api/equipes/search/?" + a[1]).then((res) => {
            setListeChampionnats(championnats.data);
            
            setListeGroupes(groupes.data);
            setListePostes(postes.data);
            setEquipes(res.data)
            console.log(res.data);



            res.data.map(element => {

              element['joueur'].forEach(elementJoueurs => {

                setJoueurs(joueurs => [...joueurs, elementJoueurs])
                console.log(elementJoueurs);
                axios.get("/api/joueurs/search/?id=" + elementJoueurs + "&" + a[2]).then((resJEquipes) => {
                  if (resJEquipes.data.length !== 0) {
                    console.log(resJEquipes.data);
                    setJoueursComplet(joueursComplet => [...joueursComplet, resJEquipes.data])
                    resJEquipes.data.map(element => {
                      if (element.poste !== null) {
                        axios.get("/api/postes/" + element.poste).then((resPoste) => {
                          setPoste(resPoste.data);
                          console.log(resPoste.data)
                          let month = new Date().getMonth() + 1;
                          if (month > 6) {
                            let dateAnnee = new Date().getFullYear();
                            let anneeSuivante = dateAnnee + 1;
                            let requete = dateAnnee.toString() + "-" + anneeSuivante.toString();
                            axios.get("/api/statistiquesjoueurs/search/?joueur=" + element.id + "&annee=" + requete).then((resStats) => {
                              if (res.data.length !== 0) {
                                console.log(resStats.data);
                                setStatsJoueurs(statsJoueurs => [...statsJoueurs, [resStats.data, resJEquipes.data]]);
                              }

                            })
                          }
                          else {
                            let dateAnnee = new Date().getFullYear();
                            let anneePrecedente = dateAnnee - 1;
                            let requete = anneePrecedente.toString() + "-" + dateAnnee.toString();
                            axios.get("/api/statistiquesjoueurs/search/?joueur=" + element.id + "&annee=" + requete).then((res) => {
                              if (res.data.length !== 0) {
                                console.log(res.data);
                                setStatsJoueurs(statsJoueurs => [...statsJoueurs, [res.data, resJEquipes.data]]);
                              }

                            })
                          }
                        })
                      }


                    })
                  }

                })
              })
            });





          })
        })
      })
    })




    let test = window.location.search;
    console.log(test);
    if (test === "") {
      test = "?groupe=1?poste=1";
    }



  }, [])

  if (listeChampionnats === null || poste === null) {
    return <p>Chargement données ...</p>
  }


  statsJoueurs.sort((a, b) => b[0][0].noteMoyenne - a[0][0].noteMoyenne);

  console.log(statsJoueurs);
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-2xl font-bold mt-28">Meilleur Joueur</h1>
      <div className='flex md:flex-row flex-col items-center justify-center md:gap-6 gap-2'>
        <div>
          <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { changeGroupe(e.target.value) }}>
            <option value="">--Choisir son championnat--</option>
            {listeChampionnats.map(championnat =>
              <option value={championnat.id}>{championnat.nom}</option>
            )}
          </select>
        </div>
        <div>
          <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { console.log(e.target.value); setGroupe(e.target.value) }}>
            <option value="">--Choisir son groupe--</option>
            {listeGroupesAJour.map(groupe =>
              <option value={groupe.id}>{groupe.nom}</option>
            )}
          </select>
        </div>
        <div>
          <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { console.log(e.target.value); setPoste(e.target.value) }} >
            <option value="">--Choisir son poste--</option>
            {listePostes.map(poste =>
              <option value={poste.id}>{poste.nom}</option>
            )}
          </select>
        </div>
        <div>
          <button className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => { if (groupe !== null && poste !== null) { goSearch(groupe, poste) } else { alert("Seléctionner un groupe et un poste") } }}>
            Confirmer
          </button>
        </div>
      </div>
      {statsJoueurs[0]?<div className='flex flex-row justify-center my-12'>
        <div className='h-auto w-auto bg-[#ff9497] rounded-lg'>
          <div className='flex flex-col items-center gap-4 py-5 px-20'>
            <div className='flex flex-col items-center gap-0.5'>
              {poste ? <h2 className='font-bold'>Meilleur {poste.nom}</h2> : null}
              {statsJoueurs[0] ? <h2 className='font-bold'>Saison {statsJoueurs[0][0][0].annee} </h2> : null}

            </div>
            <div>
              {statsJoueurs[0] ? <img className='h-28 w-28 object-cover rounded-md' src={statsJoueurs[0][1][0].image} /> : null}
            </div>
            <div className='flex flex-col items-center gap-0.5'>
              {statsJoueurs[0] ? <h2 className='font-bold'>{statsJoueurs[0][1][0].nom + " " + statsJoueurs[0][1][0].prenom} </h2> : null}
              {statsJoueurs[0] ? <h2>{statsJoueurs[0][1][0].dateNaissance}</h2> : null}
            </div>

            <div className='flex flex-col items-center gap-0.5'>
              {statsJoueurs[0] ? <h2>Nb buts : {statsJoueurs[0][0][0].buts}</h2> : null}
              {statsJoueurs[0] ? <h2>Nb matchs joués :{statsJoueurs[0][0][0].nb_matchs}</h2> : null}
            </div>
            <div>
              {statsJoueurs[0] ? <h2 className='font-bold text-xl'>Note moyenne : {statsJoueurs[0][0][0].noteMoyenne}</h2> : null}
            </div>
          </div>
        </div>
      </div>:null}

      <br />
      <br />
    </div>
  </div>
}
export default MeilleurJoueur;