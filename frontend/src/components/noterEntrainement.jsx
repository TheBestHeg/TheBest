
import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const NoterEntrainement = () => {


  const navigate = useNavigate();
  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }
  function redemarer() {
    window.location.reload();
  }


  function enregistreNotes() {


    joueurs.map((joueur) => {
      axios.post("/api/noterEntrainements/insert/", {
        note: localStorage.getItem("salut" + joueur.id),
        date: new Date().toISOString().split('T')[0],
        joueur: joueur.id,
        entraineur: entraineur.id,
      })
    })
    // redemarer();
  };


  const [joueurs, setJoueurs] = useState([])
  const [postes, setPostes] = useState([])
  const [date, setDate] = useState(convertDate(new Date()));
  const [notesEntrainements, setNotesEntrainements] = useState([]);
  const [joueursEnregistres, setJoueursEnregistres] = useState([])
  const [postesEnregistres, setPostesEnregistres] = useState([])
  const [buttonEnregistre, setButtonEnregistre] = useState(false)
  const [entraineur, setEntraineur] = useState(JSON.parse(localStorage.getItem("user")))


  useEffect(() => {
    let ma_date = new Date().toISOString().split('T')[0];
    axios.get("/api/noterEntrainements/search/?date=" + ma_date + "&entraineur=" + entraineur.id).then((mesNotes) => {
      mesNotes.data.map((note) => {
        axios.get("/api/joueurs/" + note.joueur).then((joueur) => {
          axios.get("/api/postes/" + joueur.data.poste).then((poste) => {
            setNotesEntrainements(notesEntrainements => [...notesEntrainements, note]);
            setJoueursEnregistres(joueursEnregistres => [...joueursEnregistres, joueur.data])
            setPostesEnregistres(postesEnregistres => [...postesEnregistres, poste.data])
          })
        })
      })

    })
    
    axios
      .get("/api/entraineurs/" + entraineur.id)
      .then((res) => {
        axios.get("/api/equipes/" + res.data.equipe).then((equipe) => {
          equipe.data.joueur.map((joueur) => {
            localStorage.setItem("salut" + joueur, 1)
            axios.get("/api/joueurs/" + joueur).then((joueur) => {
              axios.get("/api/postes/" + joueur.data.poste).then((poste) => {
                setJoueurs(joueurs => [...joueurs, joueur.data])
                setPostes(postes => [...postes, poste.data])
              })
            })
          })
        })
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


  if (notesEntrainements.length > 0) {
    return <div>
      <Navbar />
      <MonBackground />
      <div class="px-16 py-20">
        <h1 className="text-center text-2xl font-bold my-10">Noter Entrainement</h1>
        <div className='flex justify-center pb-6'>
          <Link to={'/liste_historique_notes_entrainments'}>
            <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Voir historique</button>
          </Link>
        </div>
        <h1 className="text-center text-xl font-bold">Entrainement du</h1>
        <h1 className="text-center text-xl">{date}</h1>
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
                        joueursEnregistres[index] && postesEnregistres[index] && notesEntrainements[index]
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
  return <div>
    {!buttonEnregistre
      ?
      <div>
        <Navbar />
        <MonBackground />
        <div class="px-16 py-20">
          <h1 className="text-center text-2xl font-bold my-10">Noter Entrainement</h1>
          <div className='flex justify-center pb-6'>
            <Link to={'/liste_historique_notes_entrainments'}>
              <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Voir historique</button>
            </Link>
          </div>
          <h1 className="text-center text-xl font-bold">Entrainement du</h1>
          <h1 className="text-center text-xl">{date}</h1>


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
                            Ajouter Note
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {joueurs.map((joueur, index) =>
                          joueurs[index] && postes[index]
                            ? <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={joueur.id}>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {joueur.nom} {joueur.prenom}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {postes[index].nom}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                <select name="note" id="note" onChange={(e) => { localStorage.setItem("salut" + joueur.id, e.target.value) }}>
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                  <option value={6}>6</option>
                                  <option value={7}>7</option>
                                  <option value={8}>8</option>
                                  <option value={9}>9</option>
                                  <option value={10}>10</option>
                                </select>
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
          <button type="button" onClick={() => { enregistreNotes(); setButtonEnregistre(true); }} class=" inline-block px-6 py-2.5 bg-gray-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Enregistrer</button>
        </div>
        <div className='mt-8'>
          <Footer />
        </div>
      </div>
      : <div>
        <Navbar />
        <MonBackground />
        <div class="px-16 py-20">
          <h1 className="text-center text-2xl font-bold my-10">Entrainements Enregistrés</h1>
          <div className='flex justify-center pb-6'>
            <Link to={'/liste_historique_notes_entrainments'}>
              <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 hover:bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Voir historique</button>
            </Link>
          </div>
        </div>
      </div>}
  </div>
}
export default NoterEntrainement;
