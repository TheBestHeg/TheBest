import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pp from '../images/steve-rouiller.jpg'
import logo_aire from '../images/aire_fc.png'
import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer';
import axios from "axios";


const PerformanceJoueur = () => {
  let { id } = useParams();
  const [joueur, setJoueur] = useState(null);
  const [equipe, setEquipe] = useState(null);
  const [club, setClub] = useState(null);
  const [statsJoueur, setStatsJoueur] = useState([]);
  const [statsJoueurAnneeEnCours, setStatsJoueurAnneeEnCours] = useState([]);
  const [joueurs, setJoueurs] = useState([{}]);

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
  const [text, setText] = useState('');
  const onChangeHandler = (text) => {
    setText(text);
    if (text.length > 0) {
      axios.get("/api/joueurs/search2/?search=" + text, {
        params: {
          _limit: 10
        }
      }).then((res) => {
        setJoueurs(res.data).slice(1, 10);
      })

    }
    else {
      setJoueurs([{}]);
    }
  }
  useEffect(() => {
    if (id == null) {
      id = 1;
    }




    axios.get("/api/joueurs/" + id).then((res) => {
      setJoueur(res.data);
      axios.get("/api/equipes/searchJoueur/?joueur=" + res.data.id).then((equipes) => {
        setEquipe(equipes.data);

        axios.get("/api/clubs/" + equipes.data[0].club).then((monClub) => { setClub(monClub.data) });

      });


      axios.get("/api/statistiquesjoueurs/search/?id=&joueur=" + res.data.id).then((stats) => {

        setStatsJoueur(statsJoueur => [...statsJoueur, stats.data])
      });
      let month = new Date().getMonth() + 1;

      if (month > 6) {
        let dateAnnee = new Date().getFullYear();
        let anneeSuivante = dateAnnee + 1;
        let requete = dateAnnee.toString() + "-" + anneeSuivante.toString();
        axios.get("/api/statistiquesjoueurs/search/?id=&joueur=" + res.data.id + "&annee=" + requete).then((statsAnnee) => {

          setStatsJoueurAnneeEnCours(statsAnnee.data);
        });
      }
      else {
        let dateAnnee = new Date().getFullYear();
        let anneePrecedente = dateAnnee - 1;
        let requete = anneePrecedente.toString() + "-" + dateAnnee.toString();
        axios.get("/api/statistiquesjoueurs/search/?id=&joueur=" + res.data.id + "&annee=" + requete).then((statsAnnee) => {

          setStatsJoueurAnneeEnCours(statsAnnee.data);
        });
      }

    })


  }, [])

  if (joueur === null || club === null || equipe === null ) {
    return <p>Chargement données ...</p>
  }
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-2xl font-bold mb-6 mt-28">Performance Joueur</h1>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input type="text" placeholder="Rechercher un joueur" style={{ marginTop: 10 }}
            onChange={e => onChangeHandler(e.target.value)}
            value={text}
            class="
          form-control
          block
          w-full
          px-4
          py-2
          text-xl
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          />
          {joueurs.map(info => <div key={info.nom} value={info.id} className="col-md-12 justify-content-md-center"><a href={'/performance_joueur/' + info.id}>{info.nom} {info.prenom}</a></div>)}
        </div>
      </div>
      <br />
      <br />
      <div className='flex flex-row md:gap-12 gap-6 justify-center'>

        <div className='flex flex-row gap-2'>
          <img src={joueur.image} className="h-24 w-16 object-cover rounded-md" />
          <div>
            <h2 className='font-bold'>{joueur.prenom} {joueur.nom}</h2>
            <h2>{joueur.dateNaissance} / {getAge(joueur.dateNaissance)} ans</h2>
            <div className='flex flex-row gap-2'>
              {club?<h2>{club.nom}</h2>:null}
              {club?<img src={club.logo} className="h-4 w-4" />:null}
            </div>
          </div>
        </div>
        {
          statsJoueurAnneeEnCours[0]
            ? <div>
              <h2 className='font-bold'>Note moyenne</h2>
              <h2 className='font-bold text-2xl'>{statsJoueurAnneeEnCours[0].noteMoyenne}</h2>
            </div>
            : null

        }

      </div>
      <br />
      {
        statsJoueur[0]
        ?<h1 className="text-center text-2xl font-bold my-6">Statistiques</h1>
        :null
      }
      
      {
        statsJoueur[0]
        ?<div className="flex flex-row justify-center">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Saison
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Nombre de matchs joués
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Nombre de buts
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Nombre de passes décisives
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Nombre de carton jaune
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Nombre de carton rouge
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Product 1 */}

                    {statsJoueur[0].map((mesStats) =>
                      mesStats

                        ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => console.log(mesStats.id)} style={{ cursor: 'pointer' }}>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {mesStats.annee}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.nb_matchs}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.buts}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.passeDec}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.cartonsJaune}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.cartonsRouge}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {mesStats.noteMoyenne}
                          </td>
                        </tr>
                        : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      :null
      }
      
    </div>
    {
            statsJoueur[0].length < 2
            ?<div className='fixed inset-x-0 bottom-0'>
            <Footer />
            </div>
            :<Footer />
        }
  </div>
}
export default PerformanceJoueur;