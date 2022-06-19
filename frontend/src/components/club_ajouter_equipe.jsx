import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Club_ajouter_equipe({visible, onClose}) {
    var user = JSON.parse(localStorage.getItem('user'));
    const [listeChampionnats, setListeChampionnats] = useState([]);
    const [listeGroupes, setListeGroupes] = useState([]);
    const [listeGroupesAJour, setListeGroupesAJour] = useState([]);

    const [data, setData] =useState({
        nom:"",
        club:"",
        groupe:"",
      });

      function handle(e){
        const newData={...data};
        newData[e.target.id] = e.target.value
        setData(newData);
        console.log(data);
      };

      function submit(e){
        e.preventDefault();
        if (data.nom !=null){
          axios.post("/api/equipes/insert/",{
            nom:data.nom,
            club:user.id,
            groupe:data.groupe,
          })
          .then(res=>{
            console.log(res.data);
          })
          setData({
            nom:"",
            club:"",
            groupe:"",
          })
          onClose();
        }
        else{
          alert("Toutes les informations ne sont pas remplis");
        }
  
    }

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
    axios.get("/api/championnats/search/").then((championnats) => {
      setListeChampionnats(championnats.data);
    })
    axios.get("/api/groupes/search/").then((groupes) => {
      setListeGroupes(groupes.data);
    })
}, [])

    if(!visible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-2 rounded w-72">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Ajouter une equipe
          </h1>

          <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
  
  <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
              Nom
          </label>
          <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nom" type="text" required/>
          </div>

      <div>
      <select className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { changeGroupe(e.target.value) }}>
            <option value="">--Choisir son championnat--</option>
            {listeChampionnats.map(championnat =>
              <option value={championnat.id}>{championnat.nom}</option>
            )}
          </select>
      </div>
      <div>
      <select id="groupe" className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e)=>handle(e)}>
            <option value="">--Choisir son groupe--</option>
            {listeGroupesAJour.map(groupe =>
              <option value={groupe.id}>{groupe.nom}</option>
            )}
          </select>
      </div>


      
        
      <div class="flex items-center justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ajouter
          </button>
        </div>
        
      </form>


          <button onClick={() => {onClose(); setData({
                montant:null,
                date:null,
                acheteur:null,
                vendeur:null,
                joueur:null,
              })}} className="px-5 py-2 bg-gray-700 text-white rounded">
              Annuler
            </button>
          </div>
        </div>
    )}