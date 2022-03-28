import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'


const Inscription = () => {
    return <div class="bg-[#c1f7a6] px-16 py-8">
        <img src={logo} alt="" class="w-40"/>
    <h1 class="font-bold text-2xl text-center">Inscription</h1>
    <div class="flex justify-center my-4">
        <div class="w-full max-w-sm">
            <form class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nomUtilisateur">
                    Nom d'utilisataeur
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nomUtilisateur" type="text" placeholder="Nom d'utilisataeur"/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="Email">
                    Email
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Emil" type="text" placeholder="Email"/>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="motDePasse">
                  Mot de passe
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="motDePasse" type="password" placeholder="******************"/>
                <p class="text-red-500 text-xs italic">Veuillez choisir un mot de passe.</p>
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="confMotDePasse">
                  Confirmer votre mot de passe
                </label>
                <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confMotDePasse" type="password" placeholder="******************"/>
                <p class="text-red-500 text-xs italic">Veuillez confirmer votre mot de passe.</p>
              </div>
              <div class="flex items-center justify-end">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
    </div>
    </div>
}
export default Inscription;
