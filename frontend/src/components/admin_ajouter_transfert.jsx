import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Admin_ajouter_transfer({visible, onClose}) {
    const [acheteurs, setAcheteurs] = useState([{}]);
    const [vendeurs, setvendeurs] = useState([{}]);
    const [joueurs, setJoueurs] = useState([{}]);

    const [data, setData] =useState({
        montant:null,
        date:null,
        acheteur:null,
        vendeur:null,
        joueur:null,
      });

      function handle(e){
        const newData={...data};
        newData[e.target.id] = e.target.value
        setData(newData);
        console.log(data);
      };

      function searchJoueur(e){
        axios.get("/api/joueurs/search2/?search=" + e.target.value, {
          params: {
            _limit: 10
           }
        }).then((res) => {
          setJoueurs(res.data);
        })
    }

    function searchAcheteur(e){
      axios.get("/api/equipes/search2/?search=" + e.target.value, {
        params: {
          _limit: 10
         }
      }).then((res) => {
        setAcheteurs(res.data);
      })
  }

  function searchVendeur(e){
    axios.get("/api/equipes/search2/?search=" + e.target.value, {
      params: {
        _limit: 10
       }
    }).then((res) => {
      setvendeurs(res.data);
    })
}

    function submit(e){
      e.preventDefault();
      if (data.montant != null && data.joueur!= null && data.acheteur != null && data.vendeur != null){
        axios.post("/api/transferts/insert/",{
          montant:data.montant,
          date:data.date,
          acheteur:data.acheteur,
          vendeur:data.vendeur,
          joueur:data.joueur,
        })
        .then(res=>{
          console.log(res.data);
        })
        setData({
          montant:null,
          date:null,
          acheteur:null,
          vendeur:null,
          joueur:null,
        })
        onClose();
      }
      else{
        alert("Toutes les informations ne sont pas remplis");
      }

  }

    if(!visible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-2 rounded w-72">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Ajouter un transfert
          </h1>
  
          <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
  
          <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                      Montant
                  </label>
                  <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="montant" type="numer"/>
                </div>
                <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Date
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"/>
              </div>
                <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                      Joueur
                  </label>
                  <input onChange={(e)=>searchJoueur(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="joueur" type="text" placeholder="Rechercher joueur"/>
                  <select onChange={(e)=>handle(e)} id="joueur" class="form-select appearance-none
        block
        w-full
        px-8
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" for="date">
                    <option>Choisir joueur</option>
                    {joueurs.map(info => <option key={info.nom} value={info.id}>{info.nom} {info.prenom}</option>)}
                  </select>
                </div>

                <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                      Acheteur
                  </label>
                  <input onChange={(e)=>searchAcheteur(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="acheteur" type="text" placeholder="Rechercher joueur"/>
                  <select onChange={(e)=>handle(e)} id="acheteur" class="form-select appearance-none
        block
        w-full
        px-8
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" for="date">
                    <option>Choisir acheteurr</option>
                    {acheteurs.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
                  </select>
                </div>

                <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                      Vendeur
                  </label>
                  <input onChange={(e)=>searchVendeur(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vendeur" type="text" placeholder="Rechercher joueur"/>
                  <select onChange={(e)=>handle(e)} id="vendeur" class="form-select appearance-none
        block
        w-full
        px-8
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" for="date">
                    <option>Choisir acheteurr</option>
                    {vendeurs.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
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