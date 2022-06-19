import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/pep_guaridola.jpg'

import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";
import Modal_profil_entraineur from './modal_profil_entraineur';

const Profil_entraineur = () => {
  const reload = () => window.setTimeout(function () { window.location.reload() }, 2000)

  const [entraineur, setEntraineur] = useState(null);
  const [club, setClub] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const [joueurs, setJoueur] = useState([]);

  const [modalModifEntraineur, setModalModifEntraineur] = useState(false);
  const handeOnCloseModalEntraineur = () => setModalModifEntraineur(false);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  var user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get("/api/entraineurs/" + user.id).then((res) => {
      axios.get("/api/equipes/" + res.data.equipe).then((equipe) => {
        axios.get("/api/clubs/" + equipe.data.club).then((monClub) => {
         
            setEntraineur(res.data); setEquipe(equipe.data); setClub(monClub.data) });
        
      });

      console.log(club);
      console.log(equipe);
      console.log(entraineur);


    })
  }, [])

  if (entraineur === null) {
    return <p>Chargement données ...</p>
  }
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4 mt-28">
        <div><img className="mt-10 h-36 w-32 object-cover rounded-md" src={entraineur.image} />
          <h2 className="text-center text-base font-bold my-6">{entraineur.prenom} {entraineur.nom}</h2>
          <h3 className="text-center text-ls my-6">Entraineur</h3>
        </div>
      </div>
      <div className="flex flex-row justify-center md:gap-72 gap-4 ">
        <div className="flex flex-row gap-10">
          <div>
            <h2 className="text-ls font-bold my-6">Né :</h2>
            <h2 className=" text-ls font-bold my-6">Club :</h2>
            <h2 className="text-ls font-bold my-6">Equipe :</h2>
            
            <h2 className=" text-ls font-bold my-6">Diplôme :</h2>
          </div>
          <Modal_profil_entraineur visible={modalModifEntraineur} onClose={handeOnCloseModalEntraineur} onExit={reload} diplome={entraineur.diplome} entraineur={entraineur} image={entraineur.image} />

          <div>
            <h2 className="text-ls my-6">{entraineur.dateNaissance} / {getAge(entraineur.dateNaissance)} ans</h2>
            {club ?<h2 className="text-ls my-6">{club.nom}</h2>:null}
            {equipe ?<h2 className="text-ls my-6">{equipe.nom}</h2>:null}
            {entraineur.diplome ?<h2 className="text-ls my-6">{entraineur.diplome}</h2>:null}
          </div>
        </div>
        <div>
          <button onClick={() => setModalModifEntraineur(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button">Modifier</button>
        </div>
      </div>
    </div>
    <div className='fixed inset-x-0 bottom-0'>
            <Footer />
            </div>
  </div>
}
export default Profil_entraineur;
