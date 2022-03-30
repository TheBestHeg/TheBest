import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'


const Profil_entraineur = () => {
    return <div>
    <nav className="bg-gray-100 border-gray-200 px-2 lg:px-4 py-4 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex items-center">
          <img src="./images/logo_465x320.png" className="mr-3 h-6 lg:h-10" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The Best</span>
        </a>
        <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-lg bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="./images/IMG_0528.JPG" alt="user photo" />
          </button>
          {/* Dropdown menu */}
          <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
            <div className="py-3 px-4">
              <span className="block text-lg text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-lg font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <a href="#" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                  out</a>
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium">
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Matchs en cours</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Match
                terminées</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meilleur
                composition</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meilleur
                joueur</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Joueur</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Club</a>
            </li>
            <li>
              <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mon
                calendrier</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <div><img className="my-10" src="images/pep.webp" />
        <br />
        <h2 className="text-center text-base font-bold my-6">Pep Guardiola</h2>
        <h3 className="text-center text-ls my-6">Entraineur</h3>
      </div>
    </div>
    <div className="flex flex-row justify-center md:gap-72 gap-4 mx-4">
      <div className="flex flex-row gap-10">
        <div>
          <h2 className="text-ls font-bold my-6">Né :</h2>
          <h2 className=" text-ls font-bold my-6">Club :</h2>
          <h2 className="text-ls font-bold my-6">Equipe :</h2>
          <h2 className="text-ls font-bold my-6">Gestion transferts :</h2>
          <h2 className=" text-ls font-bold my-6">Mode :</h2>
        </div>
        <div>
          <h2 className="text-ls my-6">10.07.1991 / 31 ans</h2>
          <h2 className="text-ls my-6">Servette FC</h2>
          <h2 className="text-ls my-6">Super League</h2>
          <button id="dropdownListe" data-dropdown-toggle="dropdownListeJoueurs" className="h-2.5 text-white bg-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Liste des joueurs <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
          {/* Dropdown menu */}
          <div id="dropdownListeJoueurs" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
            <ul className="py-1" aria-labelledby="dropdownListe">
              <li>
                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Steve Rouiller</a>
              </li>
            </ul>
          </div>
          <h2 className="text-ls my-6">Disponible</h2>
        </div>
      </div>
      <div>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button">Modifier</button>
      </div>
    </div>
    <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <div>
        <h2 className="text-center text-xl font-bold my-6">Ajouter des photos</h2>
        <div>
          <div className="max-w-xl">
            <label className="flex justify-center w-96 h-40 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </span>
              <input type="file" name="file_upload" className="hidden" />
            </label>
          </div>
        </div>
        <br />
        <div className="flex justify-center m-10">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button">Enregistrer</button>
        </div>
      </div>
    </div>
  </div>
}
export default Profil_entraineur;
