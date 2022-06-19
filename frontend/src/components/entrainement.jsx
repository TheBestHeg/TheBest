import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';


import {
    Link,
    Navigate,
    useNavigate,
  } from "react-router-dom";

const Entrainement = () => {
    return <div>
        
        <Navbar />
        <MonBackground/>
        <div class="px-16 py-20">
            <div>
                {/* Navbar */}
                <div className="flex justify-center my-12">
                    <h1 className="font-bold text-2xl">Clubs</h1>
                </div>
                <div className="flex flex-row gap-8 justify-center mt-6">
                    <img className="h-24 w-24" src={logo_aire} alt="" />
                    <div>
                        <h2 className="font-bold">FC. Aïre le lignon</h2>
                        <h2>Equipe : 3ème ligue</h2>
                    </div>
                </div>
                <div className="flex flex-row justify-center gap-2 my-12">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Planification
                    </button>
                    <Link to={"/noter_entrainement"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Noter joueur
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow-md sm:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Lundi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Mardi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Mercredi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Jeudi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Vendredi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Samedi
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Dimanche
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Product 1 */}
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Entrainement Général
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Buteur : Tir
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Buteur : Physique
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Buteur : Centre
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Buteur : Accélérations
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Match day
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Repos
                                                </td>
                                            </tr>
                                            {/* Product 2 */}
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Entrainement Gardiens
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Millieu : Tir
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Millieu : Physique
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Millieu : Centre
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Millieu : Accélérations
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                </td>
                                            </tr>
                                            {/* Product 1 */}
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Défenseur : Tir
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Défenseur : Physique
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Défenseur : Centre
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                    Défenseur : Accélérations
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
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
        
        <div className='lg:fixed lg:inset-x-0 lg:bottom-0 mt-12'>
        <Footer />
        </div>
    </div>
}
export default Entrainement;