import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png';

import logo_basel from '../images/basel.png';
import logo_carouge from '../images/logo_carouge.png';
import logo from '../images/logo_465x320.png';
import pp from '../images/IMG_0528.JPG';
import Navbar from './navbar';
import Footer from './footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Navigate,
    useNavigate,
    useLocation
} from "react-router-dom";
import MonBackground from './background';

import axios from 'axios';


const Meilleure_composition = () => {
    const [listeChampionnats, setListeChampionnats] = useState([]);
    const [listeGroupes, setListeGroupes] = useState([]);
    const [groupe, setGroupe] = useState(null);
    const [listeGroupesAJour, setListeGroupesAJour] = useState([]);
    const [affichageGroupe, setAffichageGroupe] = useState([]);
    const [ListeEquipeStat, setListeEquipeStat] = useState([]);
    const [statJoueurs, setStatJoueurs] = useState([])
    const navigate = useNavigate();

    const getMeilleurMillieu = ((maListeStats) => {
        let butsMarquésEquipe = maListeStats[0].buts_marqués
        let butsEncaissésEquipe = maListeStats[0].buts_encaissés
        let equipeMax = maListeStats[0]
        if (butsEncaissésEquipe === 0) {
            butsEncaissésEquipe = 1;
        }
        if (butsMarquésEquipe === 0) {
            butsMarquésEquipe = 1;
        }
        let ratioMax = butsMarquésEquipe / butsEncaissésEquipe;

        maListeStats.map((classementEquipe) => {
            butsEncaissésEquipe = classementEquipe.buts_encaissés
            butsMarquésEquipe = classementEquipe.buts_marqués
            if (butsEncaissésEquipe === 0) {
                butsEncaissésEquipe = 1;
            }
            if (butsMarquésEquipe === 0) {
                butsMarquésEquipe = 1;
            }

            if ((butsMarquésEquipe / butsEncaissésEquipe) > ratioMax) {
                ratioMax = butsMarquésEquipe / butsEncaissésEquipe;
                equipeMax = classementEquipe;
            }
        })
        return equipeMax;
    })
    const getMeilleurAttaquant = ((maListeStats) => {

        let butsMarquésEquipe = maListeStats[0].buts_marqués
        let equipeMax = maListeStats[0]
        maListeStats.map((classementEquipe) => {
            if (classementEquipe.buts_marqués > butsMarquésEquipe) {
                butsMarquésEquipe = classementEquipe.buts_marqués;
                equipeMax = classementEquipe;
            }
        })
        return equipeMax;
    })
    const getMeilleurDefenseur = ((maListeStats) => {
        let butsEncaissésEquipe = maListeStats[0].buts_encaissés
        let equipeMin = maListeStats[0]
        maListeStats.map((classementEquipe) => {
            if (classementEquipe.buts_encaissés < butsEncaissésEquipe) {
                butsEncaissésEquipe = classementEquipe.buts_encaissés;
                equipeMin = classementEquipe;
            }
        })
        return equipeMin;
    })

    const getRatioMillieu = ((equipe) => {
        let butsMarquésEquipe = equipe.buts_marqués
        let butsEncaissésEquipe = equipe.buts_encaissés
        if (butsEncaissésEquipe === 0) {
            butsEncaissésEquipe = 1;
        }
        if (butsMarquésEquipe === 0) {
            butsMarquésEquipe = 1;
        }
        return Number((butsMarquésEquipe / butsEncaissésEquipe).toFixed(2))

    })

    const getNoteMeanTeam = ((equipe) => {
        let tot = 0;
        console.log(equipe.liste_joueur_stats);

        if (equipe.liste_joueur_stats[0] === undefined) {
            return "N/A";
        }

        if (equipe.liste_joueur_stats[0].length === 0) {
            return "N/A"
        }
        else {

            equipe.liste_joueur_stats.map((note, index) => {
                console.log(index)
                console.log(note[0])
                tot += note[0].noteMoyenne;
            })

            return tot / equipe.liste_joueur_stats.length;
        }

    })

    const goSearch = (groupe) => {
        navigate('/meilleure_composition/?groupe=' + groupe)
        window.location.reload();
    };

    const changeGroupe = (id) => {
        let maList = [];
        listeGroupes.map(groupe => {
            if (groupe.championnat === parseInt(id)) {
                maList.push(groupe);
            }
        })
        setListeGroupesAJour(maList);
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
        axios.get("/api/championnats/search/").then((championnats) => {
            setListeChampionnats(championnats.data);
        })
        axios.get("/api/groupes/search/").then((groupes) => {
            setListeGroupes(groupes.data);
        })
        axios.get("/api/statistiquesEquipes/search/").then((statEquipes) => {
            statEquipes.data.map((statEquipe) => {
                axios.get("/api/equipes/" + statEquipe.equipe).then((equipe) => {
                    axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                        let listeJoueurStats = []
                        equipe.data["joueur"].map((joueur) => {
                            axios.get("/api/statistiquesjoueurs/search/?joueur=" + joueur).then((statJoueur) => {
                                if (statJoueur.data.length !== 0) {
                                    setStatJoueurs(statJoueurs => [...statJoueurs, statJoueur.data])
                                    listeJoueurStats.push(statJoueur.data)
                                }

                            })
                        })
                        let monDict = statEquipe;
                        monDict["club"] = club.data;
                        monDict["equipe"] = equipe.data;
                        monDict["liste_joueur_stats"] = listeJoueurStats;
                        if (monDict["equipe"].groupe === monGroupe || monGroupe === "") {
                            setListeEquipeStat(ListeEquipeStat => [...ListeEquipeStat, monDict])
                        }
                    })
                })

            })
        })
    }, [])

    let meilleurEquipeAttaque = []
    let meilleurEquipeDefense = []
    let meilleurEquipeMillieu = []
    if (ListeEquipeStat.length !== 0) {
        meilleurEquipeAttaque = getMeilleurAttaquant(ListeEquipeStat);
        meilleurEquipeDefense = getMeilleurDefenseur(ListeEquipeStat);
        meilleurEquipeMillieu = getMeilleurMillieu(ListeEquipeStat);
        console.log(getNoteMeanTeam(meilleurEquipeAttaque))
    }

    return <div>

        <Navbar />
        <MonBackground />
        <div class="px-16 py-20">
            <div>
                {/* Navbar */}
                <div className="flex justify-center my-12">
                    <h1 className="font-bold text-2xl">Meilleures compositions</h1>

                </div>
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
                        <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { console.log(e.target.value); setGroupe(e.target.value) }}>
                            <option value="">--Choisir son groupe--</option>
                            {listeGroupesAJour.map(groupe =>
                                <option value={groupe.id}>{groupe.nom}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <button className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => { if (groupe !== null && groupe !== "") { goSearch(groupe) } else { alert("séléctionner un groupe") } }}>
                            Confirmer
                        </button>
                    </div>
                </div>
                {affichageGroupe.length !== 0
                    ? <h1 class="text-center text-2xl my-6">Championnat  {affichageGroupe.championnatDict.nom} | {affichageGroupe.nom} </h1>
                    : null}
                {/* Cartes des meilleurs compositions */}
                <div className="flex lg:flex-row flex-col lg:justify-center items-center mb-32">
                    {
                        meilleurEquipeAttaque.length !== 0
                            ? <div className="m-6">
                                <div className="h-14 w-60 bg-[#ff3737]">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>
                                            <h1 className="pt-4 font-bold text-lg ">Meilleur Attaque</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 w-60 bg-red-400 rounded-b-lg">
                                    <div className="flex justify-center pt-4">
                                        <img src={meilleurEquipeAttaque.club.logo} className="h-24 w-24" />
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="mb-12 mt-2">
                                            <h1 className="text-center">{meilleurEquipeAttaque.club.nom}</h1>
                                            <h1 className="text-center">Nb buts : {meilleurEquipeAttaque.buts_marqués}</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <h2 className="font-bold">Notes Moyennes : {getNoteMeanTeam(meilleurEquipeAttaque)}</h2>
                                        {/* {
                                            meilleurEquipeAttaque.liste_joueur_stats[0].length !== 0
                                            ?<h2 className="font-bold">Notes Moyennes : {getNoteMeanTeam(meilleurEquipeAttaque)}</h2>
                                            :null
                                        } */}

                                    </div>
                                </div>

                            </div>

                            : null
                    }
                    {
                        meilleurEquipeMillieu.length !== 0
                            ? <div className="m-6">
                                <div className="h-14 w-60 bg-[#e2ff2d]">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>
                                            <h1 className="pt-4 font-bold text-lg ">Meilleur Millieu</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 w-60 bg-[#edf0a1] rounded-b-lg">
                                    <div className="flex justify-center pt-4">
                                        <img src={meilleurEquipeMillieu.club.logo} className="h-24 w-24" />
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="mb-12 mt-2">
                                            <h1 className="text-center">{meilleurEquipeMillieu.club.nom}</h1>
                                            <h1 className="text-center">Ratio nb buts M/E. : {getRatioMillieu(meilleurEquipeMillieu)}</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <h2 className="font-bold">Notes Moyennes : {getNoteMeanTeam(meilleurEquipeMillieu)}</h2>
                                    </div>
                                </div>
                            </div>
                            : null
                    }

                    {
                        meilleurEquipeDefense.length !== 0
                            ? <div className="m-6">
                                <div className="h-14 w-60 bg-[#54ffd6]">
                                    <div className="flex flex-col items-center justify-center">
                                        <div>
                                            <h1 className="pt-4 font-bold text-lg ">Meilleur Défense</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-64 w-60 bg-[#9ddae4] rounded-b-lg">
                                    <div className="flex justify-center pt-4 ">
                                        <img src={meilleurEquipeDefense.club.logo} className="h-24 w-24" />
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="mb-12 mt-2">
                                            <h1 className="text-center">{meilleurEquipeDefense.club.nom}</h1>
                                            <h1 className="text-center">Buts encaissé : {meilleurEquipeDefense.buts_encaissés}</h1>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <h2 className="font-bold">Notes Moyennes : {getNoteMeanTeam(meilleurEquipeDefense)}</h2>
                                    </div>
                                </div>
                            </div>
                            : null
                    }


                </div>
            </div>
        </div>
        <div className='fixed inset-x-0 bottom-0'>
            <Footer />
        </div>
    </div>
}

export default Meilleure_composition;