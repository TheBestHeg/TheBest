import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png';
import logo from '../images/logo_465x320.png';
import MonBackground from './background';
import axios from 'axios';
import hexSha1 from 'hex-sha1';


import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";



const Connection = () => {
  localStorage.removeItem("user");
  const naviguate=useNavigate();

  const [data, setData] =useState({
    role:"",
    email:"",
    mdp:""
  });

  function submit(e){
    e.preventDefault();
    let newEmail = data.email.replace("@", "%40");
    axios.get("/api/"+ data.role +"s/searchEmail/?email="+ newEmail).then((res) => { 
      if (data.email == res.data[0].email && hexSha1(data.mdp) == res.data[0].mdp){
        alert("Connexion réussi");
        var objet = {'id' : res.data[0].id, 'role' : data.role};
        localStorage.setItem('user', JSON.stringify(objet));
        if (data.role == "admin"){
          naviguate('/accueil_admin');
        }else{
        naviguate('/accueil_connection');
        }
      }else{
        alert("mot de passe incorect");
      }
      })  
  }

  function handle(e){
    const newData={...data};
    newData[e.target.id] = e.target.value
    setData(newData);
    console.log(data);

};

  return <div>
    <div class="px-16 py-8">
      <MonBackground />
      <img src={logo} alt="" class="w-40" />
      <h1 class="font-bold text-2xl text-center">Se connecter</h1>
      <div class="flex justify-center my-4">
        <div class="w-full max-w-sm">
          <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="taille">
                    Choix
                </label>
                <div class="form-check form-check-inline">
                <input   onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="spectateur"/>
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
                <div class="form-check form-check-inline">
                <input onChange={(e)=>handle(e)} class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="role" value="admin"/>
                <label class="form-check-label inline-block text-gray-800" for="inlineRadio10">Admin</label>
                </div>
              </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input onChange={(e)=>handle(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="mdp">
                Mot de passe
              </label>
              <input onChange={(e)=>handle(e)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="mdp" type="password" placeholder="******************" />
              <p class="text-red-500 text-xs italic">Veuillez choisir un mot de passe.</p>
            </div>
            
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Se connecter
                </button>
              

              <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
}
export default Connection;
