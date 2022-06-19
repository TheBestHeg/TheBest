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

const AjouterComposition = () => {

  const [joueurs, setJoueurs] = useState([]);
  const [postes, setPostes] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [date, setDate] = useState(convertDate(new Date()));
  const [switchEnregistre, setSwitchEnregistre] = useState(false);
  let { id } = useParams();

  const verification_maillot = () => {
    let mon_arr = []
    let mon_bool = true;
    joueurs.map((joueur) => {
      if (localStorage.getItem("etat_" + joueur.id) !== "Abs") {
        let maillot = localStorage.getItem("maillot_" + joueur.id)
        if (maillot <= 99 && maillot > 0) {
          if (!mon_arr.includes(maillot)) {
            mon_arr.push(maillot);
          }
          else {
            mon_bool = false;
          }
        }
        else {
          mon_bool = false;
        }
      }
    })
    if (mon_bool) {
      alert("La vérification s'est bien passé")
      joueurs.map((joueur) => {
        axios.post("/api/compositions/insert/", {
          etat: localStorage.getItem("etat_" + joueur.id),
          maillot: localStorage.getItem("maillot_" + joueur.id),
          joueur: joueur.id,
          match: id,
          equipe: equipe.id,
        })
      })
      setSwitchEnregistre(true);
    }
    else {
      alert("Les maillots doivent être inférieur à 100 et supérieur à 1 et ne doivent pas avoir de doublons, veuillez faire le nécesaire pour corriger ça")
    }

  }

  const verificationAbsent = (id) => {
    if (localStorage.getItem("etat_" + id) === "absent") {
      document.getElementById("maillot_" + id).value = 0;
      localStorage.setItem("maillot_" + id, 0)
      console.log(document.getElementById("maillot_" + id).value)
    }


  }

  useEffect(() => {
    let cpt = 0;
    axios
      .get("/api/entraineurs/1")
      .then((res) => {
        axios.get("/api/equipes/" + res.data.equipe).then((equipe) => {
          axios.get("/api/compositions/search/?match=" + id + "&equipe=" + equipe.data.id).then((compo) => {
            cpt = compo.data.length;
            if (cpt > 0) {
              setSwitchEnregistre(true);
            }
          })
          if (!switchEnregistre) {
            console.log(cpt);
            setEquipe(equipe.data);
            equipe.data.joueur.map((joueur) => {
              localStorage.setItem("etat_" + joueur, "titulaire")
              localStorage.setItem("maillot_" + joueur, 0)
              axios.get("/api/joueurs/" + joueur).then((joueur) => {
                setJoueurs(joueurs => [...joueurs, joueur.data])
                axios.get("/api/postes/" + joueur.data.poste).then((poste) => {
                  setPostes(postes => [...postes, poste.data])
                })
              })
            })
          }


        })
      })
  }, []);

  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  if (switchEnregistre) {
    return <div>
      <Navbar />
      <MonBackground />
      <div class="px-16 py-20">
        <h1 className="text-center text-2xl font-bold mt-10">Composition enregistrée</h1>
        <div className='flex flex-row justify-center my-12'>
          <Link to={"/ajouter_composition_liste"}>
            <button class=" inline-block px-6 py-2.5 bg-gray-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Retour au menu</button>
          </Link>
        </div>

      </div>
      <div className='mt-8'>
        <Footer />
      </div>
    </div>
  }

  return <div>
    <Navbar />
    <MonBackground />
    <div class="px-16 py-20">
      <h1 className="text-center text-2xl font-bold mt-10">Ajouter la composition pour le match :</h1>
      <h1 className="text-center text-xl">{date}</h1>


      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Joueur
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Poste
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Etat
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Maillot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {joueurs.map((joueur, index) =>
                      joueurs[index] && postes[index]
                        ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={joueur.id}>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {joueur.nom} {joueur.prenom}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {postes[index].nom}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <select name="etat" id="etat" onChange={(e) => { localStorage.setItem("etat_" + joueur.id, e.target.value); verificationAbsent(joueur.id) }}>
                              <option value={"titulaire"}>Titulaire</option>
                              <option value={"remplaçant"}>Remplaçant</option>
                              <option value={"absent"}>Absent</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <input type="number" id={"maillot_" + joueur.id} name={"maillot_" + joueur.id} min="1" max="99" onChange={(e) => { localStorage.setItem("maillot_" + joueur.id, e.target.value); console.log(document.getElementById("maillot_" + joueur.id).value); verificationAbsent(joueur.id) }} />
                          </td>
                        </tr>
                        : null
                    )}


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div></div></div>
    <div className='flex flex-row justify-center'>
      <button type="submit" onClick={verification_maillot} class=" inline-block px-6 py-2.5 bg-gray-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Enregistrer</button>
    </div>
    <div className='mt-8'>
      <Footer />
    </div>
  </div>



}
export default AjouterComposition;