import React, { useEffect, useState } from 'react';
import axios from "axios";

import Footer from './footer';
import MonBackground from './background';
import Navbar from './navbar';

import { Link, useNavigate } from 'react-router-dom';

const HistoriqueNotesEntrainements = () => {
    const [joueursEnregistres, setJoueursEnregistres] = useState([])
    const [postesEnregistres, setPostesEnregistres] = useState([])
    const [notesEntrainements, setNotesEntrainements] = useState([]);
    const [maDate, setMaDate] =  useState(null);
    const [entraineur, setEntraineur] = useState(JSON.parse(localStorage.getItem("user")))
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    useEffect(() => {
        let url = window.location.search + "&entraineur=" + entraineur.id
        axios
            .get("/api/noterEntrainements/search/" + url)
            .then((mesNotes) => {
                setMaDate(mesNotes.data[0].date);
                mesNotes.data.map((note) => {
                    axios.get("/api/joueurs/" + note.joueur).then((joueur) => {
                        setJoueursEnregistres(joueursEnregistres => [...joueursEnregistres, joueur.data])
                        axios.get("/api/postes/" + joueur.data.poste).then((poste) => {
                            setPostesEnregistres(postesEnregistres => [...postesEnregistres, poste.data])
                        })
                    })
                })
                setNotesEntrainements(mesNotes.data);
            })

    }, []);

    if(entraineur.role !== "entraineur"){
      return <div>
          <h1 className='mb-3'>Vous n'avez pas accès à cette page.</h1>
          <Link to={'/'}>
            <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Retour</button>
          </Link>
          </div>
    }

    if(maDate === null){
        return <div>
            chargement ...
        </div>
    }
    return <div>
      
      <Navbar />
      <MonBackground />
      <div class="px-16 py-20">
        <h1 className="text-center text-2xl font-bold my-10">Noter Entrainement</h1>
        <h1 className="text-center text-xl font-bold">Entrainement du</h1>
        <h1 className="text-center text-xl">{convertDate(maDate)}</h1>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Joueur
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Poste
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {joueursEnregistres.map((joueur, index) =>
                        joueursEnregistres[index] && postesEnregistres[index]  && notesEntrainements[index]
                          ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={joueur.id}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {joueur.nom} {joueur.prenom}
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {postesEnregistres[index].nom}
                            </td>
                            <td className="py-4 px-6 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {notesEntrainements[index].note}
                            </td>
                          </tr>
                          : null
                      )}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div></div></div>
      <div className='flex flex-row justify-center'>
        <button type="button" class=" inline-block px-6 py-2.5 bg-green-400  text-white font-medium text-xs leading-tight uppercase rounded-full ">Déjà enregistré</button>
      </div>
      <div className='mt-8'>
        <Footer />
      </div>
    </div>
}
export default HistoriqueNotesEntrainements;