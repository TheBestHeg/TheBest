import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import MonBackground from './background';
import axios from 'axios';
import hexSha1 from 'hex-sha1';


const Inscription = () => {

  const [data, setData] =useState({
    role:"",
    nom:"",
    prenom:"",
    dateNaissance:"",
    email:"",
    mdp:"",
    mdp2:"",
    taille:"",
    etatFacture:false,
    adresse:"",
    pied:"",
  });

  function submit(e){
    e.preventDefault();
    if (data.mdp != data.mdp2){
      alert("Les mots de passe ne correspondent pas")
    }
    else{
      if (data.role == "joueur"){
        axios.post("/api/joueurs/insert/",{
          nom:data.nom,
          prenom:data.prenom,
          dateNaissance:data.dateNaissance,
          email:data.email,
          mdp:hexSha1(data.mdp),
          taille:data.taille,
          etatFacture:data.etatFacture,
          pied:data.pied,
        })
        .then(res=>{
          console.log(res.data);
        })
      }
      else if (data.role == "spectateur"){
        axios.post("/api/spectateurs/insert/",{
          nom:data.nom,
          prenom:data.prenom,
          dateNaissance:data.dateNaissance,
          email:data.email,
          mdp:hexSha1(data.mdp),
        })
        .then(res=>{
          console.log(res.data);
        })
      }
      else if (data.role == "club"){
        axios.post("/api/clubs/insert/",{
          nom:data.nom,
          email:data.email,
          mdp:hexSha1(data.mdp),
          adresse:data.adresse,
        })
        .then(res=>{
          console.log(res.data);
        })
      }
      else if (data.role == "entraineur"){
        axios.post("/api/entraineurs/insert/",{
          nom:data.nom,
          prenom:data.prenom,
          dateNaissance:data.dateNaissance,
          email:data.email,
          mdp:hexSha1(data.mdp),
        })
        .then(res=>{
          console.log(res.data);
        })
      }
      
      alert("vous êtes bien inscrit");
      
    }

    
  }

  function handle(e){
      const newData={...data};
      newData[e.target.id] = e.target.value
      setData(newData);
      console.log(newData);
  };

    return <div class="px-16 py-8">
        <MonBackground/>
        <img src={logo} alt="" class="w-40"/>
    <h1 class="font-bold text-2xl text-center">Inscription</h1>
    <div class="flex justify-center my-4">
        <div class="w-full max-w-sm">
            <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="taille">
                    Choix
                </label>
                <div class="form-check form-check-inline">
                <input  onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="spectateur"/>
                <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Spectateur</label>
                </div>
                <div class="form-check form-check-inline">
                <input onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="joueur"/>
                <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Joueur</label>
                </div>
                <div class="form-check form-check-inline">
                <input onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="club"/>
                <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Club</label>
                </div>
                <div class="form-check form-check-inline">
                <input onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="entraineur"/>
                <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Entraineur</label>
                </div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nom">
                    Nom
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nom" type="text" placeholder="Nom" required/>
              </div>
              {(() =>{
                                if (data.role != "club"){
                                    return (<div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                                        Prenom
                                    </label>
                                    <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="prenom" type="text" placeholder="Prenom" required/>
                                  </div> )
                                }
                            })   ()}

              {(() =>{
                                if (data.role != "club"){
                                    return (<div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                                        Date de naissance
                                    </label>
                                    <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dateNaissance" type="date" placeholder="Date de naissance" required/>
                                  </div> )
                                }
                            })   ()}
              
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
                    Email
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="motDePasse">
                  Mot de passe
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="mdp" type="password" placeholder="******************" required/>
                <p class="text-red-500 text-xs italic">Veuillez choisir un mot de passe.</p>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="confMotDePasse">
                  Confirmer votre mot de passe
                </label>
                <input onChange={(e)=>handle(e)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="mdp2" type="password" placeholder="******************" required/>
                <p class="text-red-500 text-xs italic">Veuillez confirmer votre mot de passe.</p>
              </div>
                              {(() =>{
                                if (data.role == "joueur"){
                                    return (<div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="taille">
                                        Taille
                                    </label>
                                    <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taille" type="text" placeholder="Taille" required/>
                                  </div> )
                                }
                            })   ()}
                            {(() =>{
                                if (data.role == "joueur"){
                                    return (<div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="taille">
                                        Pied préféré
                                    </label>
                                    <select onChange={(e)=>handle(e)} id="pied" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Choisir sa préférance</option>
  <option value="Droit">Droit</option>
  <option value="Gauche">Gauche</option>
  <option value="Ambidextre">Ambidextre</option>
</select>
                                  </div> )
                                }
                            })   ()}

                              {(() =>{
                                if (data.role == "club"){
                                    return (<div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="adresse">
                                        Adresse
                                    </label>
                                    <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="adresse" type="text" placeholder="Adresse" required/>
                                  </div> )
                                }
                            })   ()}

<div class="flex items-start mb-6">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
    </div>
    <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">J'ai lu et j'accepte les <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">conditions d'utilisations</a></label>
  </div>
              
              <div class="flex items-center justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
    </div>
    </div>
}
export default Inscription;
