import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import logo_aire from '../images/aire_fc.png'
import logo_carouge from '../images/logo_carouge.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/referee_esther_staubli_switzerland_.jpeg'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';

import axios from "axios";


const Match_fini = () => {

  const [match, setMatch] = useState(null);
  const [terrain, setTerrain] = useState(null);
  const [equipeUne, setEquipeUne] = useState(null);
  const [equipeDeux, setEquipeDeux] = useState(null);
  const [clubUn, setClubUn] = useState(null);
  const [clubDeux, setClubDeux] = useState(null);
  const [arbitre, setArbitre] = useState(null);

  const [entraineur1, setEntraineur1] = useState([]);
  const [entraineur2, setEntraineur2] = useState([]);

  const [titu, setTitu] = useState([]);
  const [remp, setRemp] = useState([]);
  const [abs, setAbs] = useState([]);
  const [titu2, setTitu2] = useState([]);
  const [remp2, setRemp2] = useState([]);
  const [abs2, setAbs2] = useState([]);



  useEffect(() => {
    axios.get("/api/matchs/1").then((res) => {
      setMatch(res.data);
      axios.get("/api/terrains/" + res.data.terrain).then((monTerrain) => { setTerrain(monTerrain.data) });
      axios.get("/api/equipes/" + res.data.equipes[0]).then((equipe) => {
        setEquipeUne(equipe.data);
        axios.get("/api/entraineurs/search/?equipe=" + equipe.data.id).then((monEntraineur) => { setEntraineur1(monEntraineur.data); });
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubUn(monClub.data) });
        axios.get("/api/compositions/search/?match=1&equipe=" + res.data.equipes[0]).then((composition) => {
          console.log(composition.data)
          composition.data.map(element => {
            if (element.etat === "remplaçant") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setRemp(remp => [...remp, jou.data]);
              })
            }
            else if (element.etat === "absent") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setAbs(abs => [...abs, jou.data]);
              })
            }
            else {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                console.log(element)
                setTitu(titu => [...titu, jou.data]);
              })
            }

          });
        })
      });
      axios.get("/api/equipes/" + res.data.equipes[1]).then((equipe) => {
        setEquipeDeux(equipe.data)
        axios.get("/api/entraineurs/search/?equipe=" + equipe.data.id).then((monEntraineur) => { setEntraineur2(monEntraineur.data); });
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubDeux(monClub.data) });

        axios.get("/api/compositions/search/?match=1&equipe=" + res.data.equipes[1]).then((composition) => {

          console.log(composition.data)
          composition.data.map(element => {
            if (element.etat === "remplaçant") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setRemp2(remp2 => [...remp2, jou.data]);
              })
            }
            else if (element.etat === "absent") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setAbs2(abs2 => [...abs2, jou.data]);
              })
            }
            else {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                console.log(element)
                setTitu2(titu2 => [...titu2, jou.data]);
              })
            }

          });
        })
      });
      axios.get("/api/arbitres/" + res.data.arbitre).then((monArbitre) => { setArbitre(monArbitre.data) });
    })

  }, [])





  if (match === null || terrain === null || equipeUne === null || equipeDeux === null || arbitre === null || clubUn === null || clubDeux === null) {
    return <p>Chargement données ...</p>
  }
  return <div>
    
    <Navbar />
    <MonBackground />
    <div class="px-16 py-20">
      <div>
        {/* Navbar */}
        <h1 className="text-center text-2xl font-bold mb-6 mt-12">Match terminé</h1>
        <div className="flex lg:flex-row flex-col lg:justify-center lg:gap-72 mb-12">
          <div className="lg:mt-12">
            <div className='flex flex-row justify-center'><h3 className='text-2xl font-bold'>Score</h3></div>
            <div className="flex flex-row gap-6 justify-center">
              <img src={clubUn.logo} className="h-24 w-24" />
              <h1 className="text-7xl font-bold">{match.score}</h1>
              <img src={clubDeux.logo} className="h-24 w-24" />
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex felx-row gap-2">
                  <a className="font-bold">Lieu : </a>
                  <a>{terrain.adresse}</a>
                </div>
              </div>
            </div>
            {/* buteur */}

            <div className="slidecontainer flex flex-col items-center mb-10">
              <div className="flex felx-row gap-2">
                <a className="font-bold">Match joué : </a>
                <a>Il y a 45min</a>
              </div>
            </div>
            <div className="flex flex-row justify-center lg:gap-80 gap-12 mb-4">
              <div className="flex flex-col gap-2">
                <h1>28 : R.Mahrez * </h1>
                <h1>28 : A.Alvarez * *</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1>28 : P.Ducroux * </h1>
                <h1>28 : R.Shala * * *</h1>
              </div>
            </div>
            {/* Remplacant */}
            <div className="flex justify-center mt-6 mb-3">
              <h2 className="text-2xl font-bold">Titulaires</h2>
            </div>
            <div className="flex justify-center my-2 mx-2">
              <div className="flex flex-row gap-12">
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Maillot
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {titu.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Maillot
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {titu2.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-6 mb-3">
              <h2 className="text-2xl font-bold">Arbitre</h2>
            </div>


            <div className="flex justify-center">
              <div className="w-96">
                <div className="container">
                  <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start" style={{ cursor: 'auto' }}>
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                        <img alt="Placeholder Photo" src={arbitre.image} className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm line-clamp-1">{arbitre.nom} {arbitre.prenom}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">38ans / {arbitre.dateNaissance}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{arbitre.niveau}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Remplacant */}
            <div className="flex justify-center mt-6 mb-3">
              <h2 className="text-2xl font-bold">Remplaçants</h2>
            </div>
            <div className="flex justify-center my-2 mx-2">
              <div className="flex flex-row gap-12">
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Maillot
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {remp.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Maillot
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {remp2.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Absent */}
            <div className="flex justify-center mt-6 mb-3">
              <h2 className="text-2xl font-bold">Absents</h2>
            </div>
            <div className="flex justify-center my-2">
              <div className="flex flex- row gap-12">
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {abs.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Joueur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {abs2.map(joueur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(joueur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {joueur.nom} {joueur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Entraineur */}
            <div className="flex justify-center mt-6 mb-3">
              <h2 className="text-2xl font-bold">Entraineurs</h2>
            </div>
            <div className="flex justify-center my-2">
              <div className="flex flex- row gap-12">
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Entraineur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {entraineur1.map(entraineur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(entraineur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {entraineur.nom} {entraineur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-64 w-auto">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-white border-b">
                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Entraineur
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {entraineur2.map(entraineur =>
                                <tr className="bg-gray-100 border-b" onClick={() => console.log(entraineur.id)} style={{ cursor: 'pointer' }}>
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {entraineur.nom} {entraineur.prenom}
                                  </td>
                                </tr>)}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>

}
export default Match_fini;