import React, {Component} from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/steve-rouiller.jpg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Navigate,
    useNavigate,
    useLocation
  } from "react-router-dom";


const AncienneNavbar = () => {

    function handleClick(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        window.location.reload(false);
      }

    var user = JSON.parse(localStorage.getItem('user'));
    console.log(user.role);
  return <div>
    {/* Navbar */}
    <nav className="bg-white border-gray-200 px-2 lg:px-4 py-4 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="/accueil_connection" className="flex items-center">
                        <img src={logo} className="mr-3 h-6 lg:h-10" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The Best</span>
                    </a>
                    <div className="flex items-center xl:order-2">
                        <button type="button" className="flex mr-3 text-lg bg-gray-800 rounded-full xl:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full object-cover" src={pp} alt="user photo" />
                        </button>
                        {/* Dropdown menu */}
                        <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                            <div className="py-3 px-4">
                                <span className="block text-lg text-gray-900 dark:text-white">Stever Rouiller</span>
                                <span className="block text-lg font-medium text-gray-500 truncate dark:text-gray-400">stevero@servette.com</span>
                            </div>
                            <ul className="py-1" aria-labelledby="dropdown">
                                <li>
                                    <a href="/profil_joueur" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Mon Profil</a>
                                </li>
                                <li>
                                    <a href="/" onClick={handleClick} className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Déconnecter</a>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-lg text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full xl:flex xl:w-auto xl:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 xl:flex-row xl:space-x-8 xl:mt-0 xl:text-lg xl:font-medium">
                            <li>
                                <a href="/matchs_en_cours" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded xl:bg-transparent xl:text-blue-700 xl:p-0 dark:text-white" aria-current="page">Matchs en cours</a>
                            </li>
                            <li>
                                <a href="/match_termine" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Match
                                    terminées</a>
                            </li>
                            <li>
                                <a href="/meilleure_composition" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Meilleure
                                    composition</a>
                            </li>
                            <li>
                                <a href="/meilleur_joueur" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Meilleur
                                    joueur</a>
                            </li>
                            <li>
                                <a href="/performance_joueur" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Joueur</a>
                            </li>
                            <li>
                                
                                <a href='/club' className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Club</a>
                                
                            </li>
                            {(() =>{
                                if (user.role == "joueur"){
                                    return ( <li>
                                        <a href="/mon_calendrier" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-blue-700 xl:p-0 dark:text-gray-400 xl:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700">Mon
                                            calendrier</a>
                                    </li>)
                                }
                            })   ()}
                            
                        </ul>
                    </div>
                </div>
            </nav>
  </div>
}
export default AncienneNavbar;