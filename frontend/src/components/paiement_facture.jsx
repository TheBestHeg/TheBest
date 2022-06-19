import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'

import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";


const Paiement_facture = () => {
  const [entraineur, setEntraineur] = useState(null);
  const [club, setClub] = useState(null);
  const [equipes, setEquipe] = useState([]);
  const [joueurs,setJoueurs] = useState([]);
  const [joueur, setJoueur] = useState(null);
  function submit(id){

  
    axios.get("/api/joueurs/" + id).then((res) =>{
        setJoueur(res.data);
        axios.put("/api/joueurs/update/" + id + "/", {
            nom: res.data.nom,
            prenom: res.data.prenom,
            dateNaissance: res.data.dateNaissance,
            email: res.data.email,
            mdp: res.data.mdp,
            image: res.data.image,
            pied: res.data.pied,
            taille: res.data.taille,
            etatFacture: true,
            poste: res.data.poste
        })
        window.location.reload(false);
    })
    
    

  }

  
  function getAge(dateString) 
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
  }
  var user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get("/api/entraineurs/" + user.id).then((res) => { 
        setEntraineur(res.data);
        axios.get("/api/equipes/" + res.data.equipe).then((equipe) => { 
          
          setEquipe(equipes => [...equipes,equipe.data]);
          axios.get("/api/clubs/" + equipe.data.club).then((monClub) => { setClub(monClub.data) });
          equipe.data.joueur.forEach(element => {
              axios.get("/api/joueurs/"+ element).then((joueurTrouve) =>{ setJoueurs(joueurs => [...joueurs, joueurTrouve.data])});
          });
        });
        
        console.log(club);
        console.log(equipes);
        console.log(entraineur);
        
        
     })
}, [])

if (entraineur === null || club === null || joueurs===null) {
  return <p>Chargement donnÃ©es ...</p>
}
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-3xl font-bold mb-10 mt-28">Paiement facture</h1>
      <div className="flex flex-row justify-center">
      <div className="mb-3 xl:w-96">
            <select id="selectJoueur" className="form-select appearance-none
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
              {equipes.map(info => <option key={info.nom} value={info.id}>{info.nom} </option>)}
            </select>
          </div>
      </div>
      <div className="flex flex-row justify-center my-10">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Joueur
                      </th>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Etat facture
                      </th>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400">
                        Paiement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {joueurs.map((mesJoueurs) =>
                        
                        

                          mesJoueurs.etatFacture === false ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => console.log(mesJoueurs.id)} style={{ cursor: 'pointer' }}>
                            <td className="bg-red-500 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {mesJoueurs.nom} {mesJoueurs.prenom}
                            </td>
                            <td className="bg-red-500 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {mesJoueurs.etatFacture.toString()}
                            </td>
                            <td><button onClick={(id) => submit(mesJoueurs.id)} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                  Payer
                                </button>
                            
                          </td>
                          </tr>
                          : null
                      )}
                      {joueurs.map((mesJoueurs) =>
                        
                        

                        mesJoueurs.etatFacture === true ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => console.log(mesJoueurs.id)} style={{ cursor: 'pointer' }}>
                          <td className="bg-green-500 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {mesJoueurs.nom} {mesJoueurs.prenom}
                          </td>
                          <td className="bg-green-500 py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {mesJoueurs.etatFacture.toString()}
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
    <div>
      <Footer />
    </div>
  </div>
}
export default Paiement_facture;