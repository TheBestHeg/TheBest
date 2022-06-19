import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Admin_ajouter_passed({visible, onClose}) {
    const [joueurs, setJoueurs] = useState([{}]);
    const [matchs, setMatchs] = useState([{}]);
    const [buts, setButs] = useState([{}]);

    const [data, setData] =useState({
        minute:null,
        joueur:null,
        match:null,
        but:null,
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

    function searchMatch(e){
        axios.get("/api/matchs/search2/?search=" + e.target.value, {
          params: {
            _limit: 10
           }
        }).then((res) => {
          setMatchs(res.data);
        })
    }

      function submit(e){
        e.preventDefault();
        if (data.minute != null && data.joueur!= null && data.match != null){
          axios.post("/api/passeds/insert/",{
            minute:data.minute,
            joueur:data.joueur,
            match:data.match,
            but:data.but,
          })
          .then(res=>{
            console.log(res.data);
          })
          setData({
            minute:null,
          joueur:null,
          match:null,
          but:null,
          })
          onClose();
        }
        else{
          alert("Toutes les informations ne sont pas remplis");
        }

    }

    function addBut(){
      
      axios.get("/api/buts/search/?match=" + data.match, {
        params: {
          _limit: 10
         }
      }).then((res) => {
        console.log(res.data);
        setButs(res.data);
      })
    }

    if(!visible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-2 rounded w-72">
          <h1 className="font-semibold text-center text-xl text-gray-700">
            Ajouter une passe décisive
          </h1>
  
          <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
  
          <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                      Minute
                  </label>
                  <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="minute" type="numer"/>
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
                      Match
                  </label>
                  <input onChange={(e)=>searchMatch(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="match" type="text" placeholder="Rechercher match"/>
                  <select onChange={(e)=>handle(e)} id="match" class="form-select appearance-none
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
                    <option>Choisir match</option>
                    {matchs.map(info => <option key={info.nom} value={info.id}>{info.id} {info.score} {info.heure}</option>)}
                  </select>
                </div>

                <div class="">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                      But
                  </label>
                  <select onClick={() => addBut()} onChange={(e)=>handle(e)} id="but" class="form-select appearance-none
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
                    <option>Choisir But</option>
                    {buts.map(info => <option key={info.nom} value={info.id}>{info.id} minute : {info.minute} joueur :{info.joueur}</option>)}
                  </select>
                </div>
              
                
              <div class="flex items-center justify-end">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Ajouter
                  </button>
                </div>
                
              </form>
  
              <button onClick={() => {onClose(); setData({
                minute:null,
                joueur:null,
                match:null,
                but:null,
              })}} className="px-5 py-2 bg-gray-700 text-white rounded">
              Annuler
            </button>
          </div>
        </div>
    )}