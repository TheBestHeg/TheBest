import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/steve-rouiller.jpg'
import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';
import Modal_profil_joueur from './modal_profil_joueur';
import axios from "axios";

const Profil_joueur = () => {
  const reload = () => window.setTimeout(function () { window.location.reload() }, 2000)

  const [imageJoueur, setImageJoueur] = useState(null);

  const [modalModifJoueur, setModalModifJoueur] = useState(false);
  const handeOnCloseModalJoueur = () => setModalModifJoueur(false);
  const [joueur, setJoueur] = useState(null);
  const [club, setClub] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const [poste, setPoste] = useState(null);
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

    axios.get("/api/joueurs/" + user.id).then((res) => {
      setJoueur(res.data);
      axios.get("/api/postes/" + res.data.poste).then((monPoste) => { setPoste(monPoste.data) });


      axios.get("/api/equipes/searchJoueur/?joueur=" + res.data.id).then((equipes) => {
        setEquipe(equipes.data[0]);

        axios.get("/api/clubs/" + equipes.data[0].club).then((monClub) => { setClub(monClub.data) });

      });
      



      console.log(equipe);
      console.log(joueur);
      console.log(poste);



    })
  }, [])
  if (joueur === null) {
    return <p>Chargement données ...</p>
  }
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4 mt-28">
        <div><img className="mt-10 h-36 w-32 object-cover rounded-md" src={joueur.image} />
          <h2 className="text-center text-base font-bold my-6">{joueur.prenom} {joueur.nom}</h2>
          <h3 className="text-center text-ls">Joueur</h3>
        </div>
      </div>
      <div className="flex flex-row justify-center md:gap-72 gap-4 mx-4">
        <div className="flex flex-row gap-10">
          <div>
            <h2 className="text-ls font-bold my-6">Né :</h2>
            {club?<h2 className=" text-ls font-bold my-6">Club :</h2>:null}
            {equipe?<h2 className="text-ls font-bold my-6">Equipe :</h2>:null}
            {poste?<h2 className="text-ls font-bold my-6">Poste :</h2>:null}
            <h2 className="text-ls font-bold my-6">Pied :</h2>
            
          </div>
          <div>
            <h2 className="text-ls my-6">{joueur.dateNaissance} / {getAge(joueur.dateNaissance)} ans</h2>
            {club?<h2 className="text-ls my-6">{club.nom}</h2>:null}
            {equipe?<h2 className="text-ls my-6">{equipe.nom}</h2>:null}
            {poste?<h2 className="text-ls my-6">{poste.nom}</h2>:null}
            <h2 className="text-ls my-6">{joueur.pied}</h2>
            
          </div>
        </div>
        <Modal_profil_joueur visible={modalModifJoueur} onClose={handeOnCloseModalJoueur} onExit={reload} poste={poste} joueur={joueur} image={joueur.image} />
        <div>
          <button onClick={() => setModalModifJoueur(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button">Modifier</button>
        </div>
      </div>

    </div>
    <Footer />
  </div>
}
export default Profil_joueur;
