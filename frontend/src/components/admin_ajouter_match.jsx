import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Admin_ajouter_match({visible, onClose}) {
  const [data, setData] =useState({
    score:"",
    heure:"",
    terrain:null,
    arbitre:null,
    equipes:[],
    groupe:null,
  });

  const [terrains, setTerrains] = useState([{}]);
  const [arbitres, setArbitres] = useState([{}]);
  const [groupes, setGroupes] = useState([{}]);
  const [equipess, setEquipess] = useState([]);
  const [equipe, setEquipe] = useState([]);

        function submit(e){
            e.preventDefault();
            if (data.score != "" && data.heure!= ""){
              axios.post("/api/matchs/insert/",{
                score:data.score,
                heure:data.heure,
                terrain:data.terrain,
                arbitre:data.arbitre,
                equipes:data.equipes,
                groupe:data.groupe,
              })
              .then(res=>{
                console.log(res.data);
              })
              setData({
              score:"",
              heure:"",
              terrain:null,
              arbitre:null,
              equipes:[],
              groupe:null,
              })
              onClose();
            }
            else{
              alert("Toutes les informations ne sont pas remplis");
            }

        }
        

        function handle(e){
          const newData={...data};
          newData[e.target.id] = e.target.value
          setData(newData);
          console.log(data);
        };

        function addEquipe(e){
          if(data.equipes.length < 2){
            const newData={...data};
            equipe.push(parseInt(e.target.value));
            newData[e.target.id] = equipe;
            setData(newData);
            console.log(data);
            alert("Equipe ajoutée")
          }
          else{
            alert("deja deux équipes ajoutées");
          }
            
        };

        function searchTerrain(e){
            axios.get("/api/terrains/search2/?search=" + e.target.value, {
              params: {
                _limit: 10
               }
            }).then((res) => {
              setTerrains(res.data);
            })
        }

        function searchArbitre(e){
          axios.get("/api/arbitres/search2/?search=" + e.target.value, {
            params: {
              _limit: 10
             }
          }).then((res) => {
            setArbitres(res.data);
          })
      }

      function searchGroupe(e){
        axios.get("/api/groupes/search2/?search=" + e.target.value, {
          params: {
            _limit: 10
           }
        }).then((res) => {
          setGroupes(res.data);
        })
      }

      function searchEquipe1(e){
        axios.get("/api/equipes/search2/?search=" + e.target.value, {
          params: {
            _limit: 10
           }
        }).then((res) => {
          setEquipess(res.data);
        })
      }


    if(!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Ajouter un match
        </h1>

        <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">

        <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                    Score
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="score" type="text" placeholder="Score"/>
              </div>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Horraire
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="heure" type="datetime-local"/>
              </div>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Terrain
                </label>
                <input onChange={(e)=>searchTerrain(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="terrain" type="text" placeholder="Rechercher terrain"/>
                <select onChange={(e)=>handle(e)} id="terrain" class="form-select appearance-none
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
                  <option>Choisir Terrain</option>
                  {terrains.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
                </select>
              </div>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Arbitre
                </label>
                <input onChange={(e)=>searchArbitre(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="arbitre" type="text" placeholder="Rechercher arbitre"/>
                <select onChange={(e)=>handle(e)} id="arbitre" class="form-select appearance-none
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
                  <option>Choisir arbitre</option>
                  {arbitres.map(info => <option key={info.nom} value={info.id}>{info.nom} {info.prenom}</option>)}
                </select>
              </div>
              <div class="">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Equipes
                </label>
                <input onChange={(e)=>searchEquipe1(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="equipes" type="text"/>
                <select onChange={(e)=>addEquipe(e)} id="equipes" class="form-select appearance-none
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
                  <option>Choisir Equipe</option>
                  {equipess.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
                </select>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                    Groupe
                </label>
                <input onChange={(e)=>searchGroupe(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="groupe" type="groupe"/>
                <select onChange={(e)=>handle(e)} id="groupe" class="form-select appearance-none
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
                  <option>Choisir groupe</option>
                  {groupes.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
                </select>
              </div>
            
              
            <div class="flex items-center justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Ajouter
                </button>
              </div>
              
            </form>

            <button onClick={() => {onClose(); setData({
              score:"",
              heure:"",
              terrain:null,
              arbitre:null,
              equipes:[],
              groupe:null,
            })}} className="px-5 py-2 bg-gray-700 text-white rounded">
            Annuler
          </button>
        </div>
      </div>
  );
}