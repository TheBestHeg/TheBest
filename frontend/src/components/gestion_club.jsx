import React from 'react';
import { useParams} from 'react-router-dom';
import MonBackground from './background';
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import axios from "axios";
import Club_ajouter_equipe from "./club_ajouter_equipe";

const GestionClub = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    const [equipes, setEquipes] = useState([{}]);

    const [openAddEquipe, setOpenAddEquipe] = useState(false);
    const handleOnCloseAddEquipe = () => setOpenAddEquipe(false);




    useEffect(() => {
        axios.get("/api/equipes/search/?club=" + user.id).then((res) => { 
            setEquipes(res.data);
        })
    }, [])
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <div>
        <h1 className="text-center text-2xl font-bold mb-10 mt-28">Gestion club</h1>

        <div className="flex md:flex-row md:justify-center flex-col items-center md:gap-12 gap-4 mx-4">
        <button onClick={() => setOpenAddEquipe(true)} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Ajouter des équipes</button>

        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Ajouter des joueurs</button>

        <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Ajouter des entraineurs</button>
        </div>

        <Club_ajouter_equipe visible={openAddEquipe} onClose={handleOnCloseAddEquipe} />

        <h1 className="text-center text-2xl font-bold my-6">Mes équipes</h1>

        

        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Equipe
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Product 1 */}
                      {equipes.map(info =>
                         <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                        <td key={info.id} className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {info.nom}
                        </td>
                      </tr>
                         )}
                      
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
}
export default GestionClub;
