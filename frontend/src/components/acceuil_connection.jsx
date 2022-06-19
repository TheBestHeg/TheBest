import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Footer from './footer';
import MonBackground from './background';
import Navbar from './navbar';

const Acceuil_connection = () => {
  return <div>
    <MonBackground />
      <Navbar/>
    <div class="px-16 py-20">
      <div class="grid grid-cols-1 gap-4 pb-10 mt-10">
        <h1 class="font-bold text-2xl text-center">Bienvenue sur the Best</h1>
        <p class="text-center mx-8 xl:mx-96"> classThe Best est une plateforme web d’information et de communication destinée aux clubs amateurs de football et leurs joueurs ainsi que les arbitres. Elle a pour but d’offrir une meilleure visibilité aux clubs et aux joueurs. Elle soulage aussi les clubs des tâches administratives et marketing. </p>

        <h2 class="font-semibold text-xl text-center mt-9">Ils parlent de nous : </h2>
      </div>


      <div class="flex justify-center items-center gap-8 flex-col lg:flex-row">
        <div>
          <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
              <p class="text-gray-700 text-base mb-4">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </p>
              <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
          </div>
        </div>

        <div>
          <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
              <p class="text-gray-700 text-base mb-4">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </p>
              <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
          </div>
        </div>

        <div>
          <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img class="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/184.jpg" alt="" />
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
              <p class="text-gray-700 text-base mb-4">
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
              </p>
              <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-12'>
      <Footer />
    </div>
  </div>

}
export default Acceuil_connection;