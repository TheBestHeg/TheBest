import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import {
    Link,
    Navigate,
    useNavigate,
} from "react-router-dom";
import axios from 'axios';


const Classement = () => {
    const [listeChampionnats, setListeChampionnats] = useState([]);
    const [listeGroupes, setListeGroupes] = useState([]);
    const [groupe, setGroupe] = useState(null);
    const [listeGroupesAJour, setListeGroupesAJour] = useState([]);
    const [affichageGroupe, setAffichageGroupe] = useState([]);
    const [ListeEquipeStat, setListeEquipeStat] = useState([]);
    const navigate = useNavigate();


    

    const goSearch = (groupe) => {
        navigate('/classement/?groupe=' + groupe)
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
        if(window.location.search !== ""){
            monGroupe = parseInt(window.location.search.split("=")[1])
            axios.get("/api/groupes/" + monGroupe.toString()).then((groupe) => {
                axios.get("/api/championnats/" + groupe.data.championnat).then((championnat) => {
                    let dictGroup = groupe.data;
                    dictGroup["championnatDict"] = championnat.data;
                    setAffichageGroupe(dictGroup);
                })
            })

        }
        else{
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
                console.log(statEquipe)
                axios.get("/api/equipes/" + statEquipe.equipe).then((equipe) => {
                    axios.get("/api/clubs/" + equipe.data.club).then((club) => {
                        let monDict = statEquipe;
                        monDict["club"] = club.data;
                        monDict["equipe"] = equipe.data;
                        if(monDict["equipe"].groupe === monGroupe || monGroupe === ""){
                            setListeEquipeStat(ListeEquipeStat => [...ListeEquipeStat, monDict])
                        }
                    }
                    )
                }
                )

            })
        })
    }, [])
    console.log(ListeEquipeStat);
    console.log(affichageGroupe)

    ListeEquipeStat
        .sort((a, b) => (a.points || a.buts_marqués) - (b.points || b.buts_marqués));
    ListeEquipeStat.reverse()



    return <div>
        <Navbar />
        <MonBackground />
        <div class="px-16 py-20">
            {/* Navbar */}
            <h1 class="text-center text-2xl font-bold my-6">Classement </h1>
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
        </div>
        {affichageGroupe.length !== 0
        ?<h1 class="text-center text-2xl my-6">Championnat  {affichageGroupe.championnatDict.nom} | {affichageGroupe.nom} </h1>
        :null}
        <div className="flex flex-row justify-center">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-md sm:rounded-lg  mb-16">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Classement
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Points
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Matchs joués
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Matchs gagnés
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Matchs neutres
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Matchs perdus
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Buts marqués
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Buts encaissés
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListeEquipeStat.map((equipe, index) =>
                                        ListeEquipeStat[index]
                                            ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1} - {ListeEquipeStat[index].club.nom}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].points}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].nb_matchs}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].nb_victoires}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].nb_matchs - ListeEquipeStat[index].nb_victoires}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].nb_defaites}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].buts_marqués}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    {ListeEquipeStat[index].buts_encaissés}
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



        {
            ListeEquipeStat < 6
            ?<div className='fixed inset-x-0 bottom-0'>
            <Footer />
            </div>
            :<Footer />
        }
    </div>

}
export default Classement;
