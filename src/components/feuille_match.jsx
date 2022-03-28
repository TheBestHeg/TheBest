import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import footbal_stadium from '../scripts/football_script.js'


const Feuille_match = () => {
    return <div class="bg-[#c1f7a6] px-16 py-8">
        <nav class="bg-white border-gray-200 px-2 lg:px-4 py-4 rounded dark:bg-gray-800">
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" class="flex items-center">
                    <img src={logo} class="mr-3 h-6 lg:h-10" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">The Best</span>
                </a>
                <div class="flex items-center md:order-2">
                    <button type="button" class="flex mr-3 text-lg bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                        <span class="sr-only">Open user menu</span>
                        <img class="w-8 h-8 rounded-full" src={pp} alt="user photo" />
                    </button>
                    <div class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                        <div class="py-3 px-4">
                            <span class="block text-lg text-gray-900 dark:text-white">Bonnie Green</span>
                            <span class="block text-lg font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-1" aria-labelledby="dropdown">
                            <li>
                                <a href="#" class="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-lg text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium">
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Matchs en cours</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Match terminées</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meilleur composition</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Meilleur joueur</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Joueur</a>
                        </li>

                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Club</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mon calendrier</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div>
        <h1 className="text-center text-2xl font-bold my-6">Feuille de match</h1>
        <div className="flex flex-row gap-6 justify-center">
          <img src={logo_aire} className="h-24 w-24" />
          <h1 className="text-7xl font-bold">VS</h1>
          <img src={logo_aire} className="h-24 w-24" />
        </div>
        <div className="flex flex-row justify-center my-2">
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
        </div>
        <div className="flex justify-center">
          <section className="pitch">
            <div className="field left">
              <div className="penalty-area">
              </div>
            </div>
            <div className="field right">
              <div className="penalty-area">
              </div>
            </div>
            <div className="center-circle" />
            <div className="home-team">
              <div className="player one" />
              <div className="player two" />
              <div className="player three" />
              <div className="player four" />
              <div className="player five" />
              <div className="player six" />
              <div className="player seven" />
              <div className="player eight" />
              <div className="player nine" />
              <div className="player ten" />
              <div className="player eleven" />
            </div>
            <div className="visitor-team">
              <div className="player one" />
              <div className="player two" />
              <div className="player three" />
              <div className="player four" />
              <div className="player five" />
              <div className="player six" />
              <div className="player seven" />
              <div className="player eight" />
              <div className="player nine" />
              <div className="player ten" />
              <div className="player eleven" />
            </div>
          </section>
        </div>
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Arbitre</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-96">
            <div className="container">
              <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start" style={{cursor: 'auto'}}>
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                    <img alt="Placeholder Photo" src={pp} className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm line-clamp-1">Désirée Grundbacher</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">38ans / 10.07.1983</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">Suisse</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Remplacant */}
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Remplaçant</h2>
        </div>
        <div className="flex justify-center my-2">
          <div className="flex flex- row gap-12">
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Maillot
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Joueur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Luca Apothéloz
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Pierrick Anthenen
                            </td>
                          </tr>
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Chloe Lafavre
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Maillot
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Joueur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Luca Apothéloz
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Pierrick Anthenen
                            </td>
                          </tr>
                          <tr className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Chloe Lafavre
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Absent */}
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Absent</h2>
        </div>
        <div className="flex justify-center my-2">
          <div className="flex flex- row gap-12">
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Joueur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Luca Apothéloz
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Pierrick Anthenen
                            </td>
                          </tr>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Chloe Lafavre
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Joueur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Luca Apothéloz
                            </td>
                          </tr>
                          <tr className="bg-white border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Pierrick Anthenen
                            </td>
                          </tr>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Chloe Lafavre
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Entraineur */}
        <div className="flex justify-center mt-6 mb-3">
          <h2 className="text-2xl font-bold">Entraineur</h2>
        </div>
        <div className="flex justify-center my-2">
          <div className="flex flex- row gap-12">
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Entraineur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Anushan Boss
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-64">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-white border-b">
                          <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                              Entraineur
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 border-b">
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              Anushan King
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}
export default Feuille_match;
