import React from 'react';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo_servette from '../images/basel.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/referee_esther_staubli_switzerland_.jpeg'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import axios from "axios";

import {
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";

const Feuille_match = () => {

  let { id } = useParams();
  const [match, setMatch] = useState(null);
  const [terrain, setTerrain] = useState(null);
  const [equipeUne, setEquipeUne] = useState(null);
  const [equipeDeux, setEquipeDeux] = useState(null);
  const [clubUn, setClubUn] = useState(null);
  const [clubDeux, setClubDeux] = useState(null);
  const [arbitre, setArbitre] = useState(null);
  const navigate = useNavigate();

  const [entraineur1, setEntraineur1] = useState([]);
  const [entraineur2, setEntraineur2] = useState([]);

  const [titu, setTitu] = useState([]);
  const [remp, setRemp] = useState([]);
  const [abs, setAbs] = useState([]);
  const [titu2, setTitu2] = useState([]);
  const [remp2, setRemp2] = useState([]);
  const [abs2, setAbs2] = useState([]);

  const [maillotTitu, setMaillotTitu] = useState([]);
  const [maillotTitu2, setMaillotTitu2] = useState([]);
  const [maillotRemp, setMaillotRemp] = useState([]);
  const [maillotRemp2, setMaillotRemp2] = useState([]);

  const ageCalcul = (age) => {
    var today = new Date();
    var birthDate = new Date(age);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const calculateHeureLive = (heure) => {
    let diff = Math.abs(new Date() - new Date(heure));
    let minutes = Math.floor((diff / 1000) / 60);
    console.log(minutes)
    return minutes;

  }

  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  function getHourOfDate(requestedDate){
    let maDate = new Date(requestedDate);
    return maDate.getHours().toString() + ":" + maDate.getMinutes().toString()
  }


  useEffect(() => {
    axios.get("/api/matchs/" + id).then((res) => {
      setMatch(res.data);
      axios.get("/api/terrains/" + res.data.terrain).then((monTerrain) => { setTerrain(monTerrain.data) });
      axios.get("/api/equipes/" + res.data.equipes[0]).then((equipe) => {
        setEquipeUne(equipe.data);
        axios.get("/api/entraineurs/search/?equipe=" + equipe.data.id).then((monEntraineur) => { setEntraineur1(monEntraineur.data); });
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubUn(monClub.data) });
        axios.get("/api/compositions/search/?match=" + id + "&equipe=" + res.data.equipes[0]).then((composition) => {
          console.log(composition.data)
          composition.data.map(element => {
            if (element.etat === "remplaçant") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setRemp(remp => [...remp, jou.data]);
                setMaillotRemp(maillotRemp => [...maillotRemp, element]);
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
                setMaillotTitu(maillotTitu => [...maillotTitu, element]);
              })
            }

          });
        })
      });
      axios.get("/api/equipes/" + res.data.equipes[1]).then((equipe) => {
        setEquipeDeux(equipe.data)
        axios.get("/api/entraineurs/search/?equipe=" + equipe.data.id).then((monEntraineur) => { setEntraineur2(monEntraineur.data); });
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClubDeux(monClub.data) });

        axios.get("/api/compositions/search/?match=" + id + "&equipe=" + res.data.equipes[1]).then((composition) => {

          console.log(composition.data)
          composition.data.map(element => {
            if (element.etat === "remplaçant") {
              axios.get('/api/joueurs/' + element.joueur).then((jou) => {
                setRemp2(remp2 => [...remp2, jou.data]);
                setMaillotRemp2(maillotRemp2 => [...maillotRemp2, element]);
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
                setMaillotTitu2(maillotTitu2 => [...maillotTitu2, element]);
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
        <h1 className="text-center text-2xl font-bold my-6">Feuille de match</h1>
        <div className="flex flex-row gap-6 justify-center">
          <img src={clubUn.logo} className="h-36 w-24 object-cover" />
          <h1 className="text-7xl font-bold my-12">VS</h1>
          <img src={clubDeux.logo} className="h-36 w-24 object-cover" />
        </div>
        <div className="flex flex-row justify-center my-2">
          <div className="flex flex-col gap-2 my-6">
            <div className="flex felx-row gap-2">
              <a className="font-bold">Lieu : </a>
              <a>{terrain.adresse}</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Date : </a>
              <a>{convertDate(match.heure)}</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Heure : </a>
              <a>{getHourOfDate(match.heure)}</a>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Arbitre</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-96">
            <div className="container">
              <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start" style={{ cursor: 'pointer' }} onClick={() => navigate("/arbitre/" + arbitre.id)}>
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <img alt="Placeholder Photo" src={arbitre.image} className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm line-clamp-1">{arbitre.nom} {arbitre.prenom}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{ageCalcul(arbitre.dateNaissance)} ans / {arbitre.dateNaissance}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{arbitre.niveau}</p>
                </div>
              </div>
            </div>
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

                          {titu.map((joueur, index) =>
                            titu[index] && maillotTitu[index]
                              ? <tr className="bg-gray-100 border-b" onClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maillotTitu[index].maillot}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {joueur.nom} {joueur.prenom}
                                </td>
                              </tr>
                              : null)}
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
                          {titu2.map((joueur, index) =>
                            titu2[index] && maillotTitu2[index]
                              ? <tr className="bg-gray-100 border-b" onClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maillotTitu2[index].maillot}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {joueur.nom} {joueur.prenom}
                                </td>
                              </tr>
                              : null)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {titulaires.titul[3].map(joueur => 
                            <div><a>{joueur.id}</a></div>
        )} */}


        {/* Remplacant */}
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Remplaçant</h2>
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
                          {remp.map((joueur, index) =>
                            remp[index] && maillotRemp[index]
                              ? <tr className="bg-gray-100 border-b" oonClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maillotRemp[index].maillot}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {joueur.nom} {joueur.prenom}
                                </td>
                              </tr>
                              : null)}
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
                          {remp2.map((joueur, index) =>
                            remp2[index] && maillotRemp2[index]
                              ? <tr className="bg-gray-100 border-b" onClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{maillotRemp2[index].maillot}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {joueur.nom} {joueur.prenom}
                                </td>
                              </tr>
                              : null)}
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
          <h2 className="text-2xl font-bold">Absent</h2>
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
                            <tr className="bg-gray-100 border-b" onClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
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
                            <tr className="bg-gray-100 border-b" onClick={() => navigate("/performance_joueur/" + joueur.id)} style={{ cursor: 'pointer' }}>
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
          <h2 className="text-2xl font-bold">Entraineur</h2>
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
    <Footer />
  </div>
}
export default Feuille_match;
