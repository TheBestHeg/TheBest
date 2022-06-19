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

const AjouterCompositionListe = () => {
  const [listeChampionnats, setListeChampionnats] = useState([]);
  const [listeGroupes, setListeGroupes] = useState([])
  const [listeGroupesAJour, setListeGroupesAJour] = useState([]);
  const [groupe, setGroupe] = useState(null);
  const [matchsAVenir, setMatchsAVenir] = useState([]);
  const [club1, setClub1] = useState([]);
  const [club2, setClub2] = useState([]);
  const [terrain, setTerrain] = useState([]);
  const navigate = useNavigate();


  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  useEffect(() => {
    let dateActuelle = new Date(Date.now());
    let convDateActuIso = dateActuelle.toISOString();

    axios
      .get("/api/entraineurs/1")
      .then((entraineur) => {
        console.log("/api/matchs/search/?heure__gt=" + convDateActuIso + "&equipes=" + entraineur.data.equipe)
        axios.get("/api/matchs/search/?heure__gt=" + convDateActuIso + "&equipes=" + entraineur.data.equipe).then((matchs) => {
          setMatchsAVenir(matchs.data)
          matchs.data.forEach(element => {

            axios.get("/api/terrains/" + element.terrain).then((monTerrain) => {
              setTerrain(terrain => [...terrain, monTerrain.data])
            })

            axios.get("/api/equipes/" + element.equipes[0]).then((equipe) => {
              axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                setClub1(club1 => [...club1, club.data])
              })
            })

            axios.get("/api/equipes/" + element.equipes[1]).then((equipe) => {
              axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                setClub2(club2 => [...club2, club.data])
              })
            })
          })
        })
      })
  }, [])



  let matchs = []
  for (let i = 0; i < matchsAVenir.length; i++) {
    matchs.push([matchsAVenir[i], club1[i], club2[i], terrain[i]])
  }
  console.log(matchs);



  return <div>
    <Navbar />
    <MonBackground />
    <div class="px-16 py-20">
      <div>
        <h1 className="text-center text-2xl font-bold my-6">Ajouter la composition</h1>
        <br />
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
                          Lieu
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Product 1 */}

                      {matchs.map((monMatchs) =>
                        monMatchs[0] && monMatchs[1] && monMatchs[2] && monMatchs[3]

                          ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => navigate("/ajouter_compositions/" + monMatchs[0].id)} style={{ cursor: 'pointer' }}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {monMatchs[1].nom} - {monMatchs[2].nom}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {monMatchs[3].adresse}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {convertDate(monMatchs[0].heure)}
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
    <div className='md:fixed md:inset-x-0 md:bottom-0'>
      <Footer />
    </div>
  </div>

}
export default AjouterCompositionListe;
