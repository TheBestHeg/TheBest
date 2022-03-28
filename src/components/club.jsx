import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'


const Club = () => {
    return <div class="bg-[#c1f7a6] px-16 py-8">
        <div>
        {/* Navbar */}
        <nav className="bg-white border-gray-200 px-2 lg:px-4 py-4 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="#" className="flex items-center">
                        <img src={logo} className="mr-3 h-6 lg:h-10" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The Best</span>
                    </a>
                    <div className="flex items-center md:order-2">
                        <button type="button" className="flex mr-3 text-lg bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={pp} alt="user photo" />
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
                                <a href="/meilleure_composition" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meilleur
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
                                
                                <a href='/club' className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Club</a>
                                
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mon
                                    calendrier</a>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav>
        <div className="flex justify-center my-12">
          <h1 className="font-bold text-2xl">Clubs</h1>
        </div>
        {/* select  */}
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select className="form-select appearance-none
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Rechercher Clubs</option>
              <option value={1}>FC. Aïre le lignon</option>
              <option value={2}>FC. City</option>
              <option value={3}>FC. Vernier</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-8 justify-center mt-6">
          <img className="h-24 w-24" src={logo_aire} alt="" />
          <div>
            <h2 className="font-bold mb-2">FC. Aïre le lignon</h2>
            <h2>Annèe de création : 1999</h2>
            <h2>Division la plus haute : 3ème ligue</h2>
            <h2>Nombre de joueurs : 672</h2>
          </div>
        </div>
        {/* select  */}
        <div className="flex justify-center mt-10">
          <div className="mb-3 xl:w-96">
            <select className="form-select appearance-none
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Séléctionner un championnat</option>
              <option value={1}>1ère ligue</option>
              <option value={2}>2ème ligue</option>
              <option value={3}>3ème ligue</option>
              <option value={4}>4ème ligue</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <h1 className="font-bold text-lg">Championnat 3ème ligue</h1>
        </div>
        <div className="flex justify-center my-8">
          <h1 className="font-bold">Dernier transferts</h1>
        </div>
        <div className="flex flex-row justify-center gap-40">
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Arrivés</h4>
            <h4>Denis Javier</h4>
            <h4>Pierre Jean</h4>
            <h4>Michael Juan</h4>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Départs</h4>
            <h4>Denis Javier</h4>
            <h4>Pierre Jean</h4>
            <h4>Michael Juan</h4>
          </div>
        </div>
        <div className="flex flex-col items-center my-12">
          <h1 className="font-bold mb-4">Palmares</h1>
          <h4>Vaiqueur de leur championnat 2020</h4>
          <h4>Vaiqueur de leur championnat 2018</h4>
          <h4>Meilleur buteur 2020 : Alexis Boilat</h4>
        </div>
        {/* Prochain matchs */}
        <div className="flex flex-col items-center">
          <h1 className="font-bold">Prochain match</h1>
          <div className="flex flex-row gap-8 justify-center  mt-4">
            <div>
              <div className="flex justify-center">
                <img src={logo_aire} className="h-24 w-24 mb-4" /> 
              </div>
              <div className="flex justify-center">
                <h1>FC. Aire le lignon</h1>
              </div>
            </div>
            <h1 className="text-7xl font-bold">VS</h1>
            <div>
              <div className="flex justify-center">
                <img src={logo_aire} className="h-24 w-24 mb-4" /> 
              </div>
              <div className="flex justify-center">
                <h1>FC. Aire le lignon</h1>
              </div>
            </div>
          </div>
        </div>
        {/* Date lieu heure */}
        <div className="flex flex-row justify-center my-4">
          <div className="flex flex-col gap-2 my-6">
            <div className="flex felx-row gap-2">
              <a className="font-bold">Lieu : </a>
              <a>Chemin de Fossée 8, 1219 aïre</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Date : </a>
              <a>Samedi 08 janvier 2022</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Heure : </a>
              <a>14:15</a>
            </div>
          </div>
        </div></div>
    </div>
}

export default Club;