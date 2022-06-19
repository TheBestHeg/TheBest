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


const Matchs_en_cours_2 = () => {

  const navigate = useNavigate();
  const [matchsEnCours, setMatchsEnCours] = useState([]);
  const [club1, setClub1] = useState([]);
  const [club2, setClub2] = useState([]);
  const [terrain, setTerrain] = useState([]);

  useEffect(() => {
    // Ma date supp à 1h30 + inclus les mi-temps et temps adittionnelle 
    let maDatePlus = new Date(Date.now())
    maDatePlus.setTime(maDatePlus.getTime() + 1.7 * 60 * 60 * 1000);
    let convDateISOPlus = maDatePlus.toISOString();

    // Ma Date moins
    let maDateMoins = new Date(Date.now());
    maDateMoins.setTime(maDateMoins.getTime() - 1.7 * 60 * 60 * 1000);
    let convDateISOMoins = maDateMoins.toISOString();

    let dateActuelle = new Date(Date.now());

    axios.get("/api/matchs/search/?heure__gt=" + convDateISOMoins + "&heure__lt=" + convDateISOPlus).then((matchs) => {


      matchs.data.forEach(element => {
        let dateActuelle = new Date(Date.now());
        let dateMatch = new Date(element.heure);
        let matchTerminaison = dateMatch;
        dateMatch = dateMatch.getTime();
        dateActuelle = dateActuelle.getTime();
        matchTerminaison.setTime(matchTerminaison.getTime() + 1.7 * 60 * 60 * 1000)
        matchTerminaison = matchTerminaison.getTime();
        if (dateActuelle >= dateMatch && dateActuelle <= matchTerminaison) {

          setMatchsEnCours(matchsEnCours => [...matchsEnCours, element])
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
        }
      })
    });
  }, [])



  let matchs = []
  for (let i = 0; i < matchsEnCours.length; i++) {
    matchs.push([matchsEnCours[i], club1[i], club2[i], terrain[i]])
  }
  console.log(matchs);

  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <div>
        <h1 className="text-center text-2xl font-bold my-6">Matchs en cours</h1>
        <div className="flex md:flex-row md:justify-center flex-col items-center md:gap-12 gap-4 mx-4">
          <div>
            <button id="dropdownButtonChampionnat" data-dropdown-toggle="dropdownChampionnat" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> championnat <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
            {/* Dropdown menu */}
            <div id="dropdownChampionnat" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
              <ul className="py-1" aria-labelledby="dropdownButtonChampionnat">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Super League</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Challenge League</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Promotion League</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button id="dropdownButtonGroupe" data-dropdown-toggle="dropdownGroupe" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Groupe <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
            {/* Dropdown menu */}
            <div id="dropdownGroupe" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
              <ul className="py-1" aria-labelledby="dropdownButtonGroupe">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Super League</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Challenge League</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Promotion League</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Confirmer
            </button>
          </div>
        </div>
        <br />
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
    <div className='md:fixed md:inset-x-0 md:bottom-0'>
      <Footer />
    </div>
  </div>

}
export default Matchs_en_cours_2;
