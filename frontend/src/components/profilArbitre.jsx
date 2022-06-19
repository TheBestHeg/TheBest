import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import pp from '../images/referee_esther_staubli_switzerland_.jpeg';
import MonBackground from './background';
import Navbar from './navbar';
import Footer from './footer'
import axios from "axios";


const ProfilArbitre = () => {
  let { id } = useParams();

  const [arbitre, setArbitre] = useState(null);
  const [statsArbitre, setStatsArbitre] = useState([]);
  const [matchsAVenir, setMatchsAVenir] = useState([]);
  const [club1, setClub1] = useState([]);
  const [club2, setClub2] = useState([]);
  const [statsAnneEnCours, setStatsAnneEnCours] = useState([]);
  const [arbitres, setArbitres] = useState([{}]);

  const [text, setText] = useState('');
  const onChangeHandler = (text) => {
    setText(text);
    if (text.length > 0) {
      axios.get("/api/arbitres/search2/?search=" + text, {
        params: {
          _limit: 10
        }
      }).then((res) => {
        setArbitres(res.data).slice(1, 10);
      })

    }
    else {
      setArbitres([{}]);
    }
  }
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


  useEffect(() => {

    if (id == null) {
      id = 1;
    }

    axios.get("/api/arbitres/" + id).then((res) => {
      setArbitre(res.data);
      axios.get("/api/statistiquesarbitres/search/?id=&annee=&arbitre=" + res.data.id).then((stats) => {
        setStatsArbitre(statsArbitre => [...statsArbitre, stats.data])
      });

      let dateActuelle = new Date(Date.now());
      let convDateActuIso = dateActuelle.toISOString();

      axios.get("/api/matchs/search/?id=&arbitre=" + res.data.id + "&heure__gte=&heure__lte=&heure=&heure__gt=&heure__lt=&groupe=&heure__gt=" + convDateActuIso).then((matchs) => {
        setMatchsAVenir(matchs.data)
        matchs.data.forEach(element => {

          axios.get("/api/equipes/" + element.equipes[0]).then((equipe) => {
            axios.get("/api/clubs/" + equipe.data.club).then((club) => {
              setClub1(club1 => [...club1, club.data])
            })
          })

          axios.get("/api/equipes/" + element.equipes[1]).then((equipe) => {
            axios.get("/api/clubs/" + equipe.data.club).then((club) => {
              setClub2(club2 => [...club2, club.data])
            })
          })
        })
      })
      let month = new Date().getMonth() + 1;
      if (month > 6) {
        let dateAnnee = new Date().getFullYear();
        let anneeSuivante = dateAnnee + 1;
        let requete = dateAnnee.toString() + "-" + anneeSuivante.toString();
        axios.get("/api/statistiquesarbitres/search/?id=&annee=" + requete + "&arbitre=" + res.data.id).then((statsAnnee) => {

          setStatsAnneEnCours(statsAnnee.data);
        });
      }
      else {
        let dateAnnee = new Date().getFullYear();
        let anneePrecedente = dateAnnee - 1;
        let requete = anneePrecedente.toString() + "-" + dateAnnee.toString();

        axios.get("/api/statistiquesarbitres/search/?id=&annee=" + requete + "&arbitre=" + res.data.id).then((statsAnnee) => {

          setStatsAnneEnCours(statsAnnee.data);
        });
      }
    })

  }, [])

  if (arbitre === null ) {
    return <p>Chargement données ...</p>
  }

  let matchs = []
  for (let i = 0; i < matchsAVenir.length; i++) {

    matchs.push([matchsAVenir[i], club1[i], club2[i]])
  }
  console.log(matchs);
let minDate = [];
let minMatch = [];
 if(matchs.length!==0){
  minDate = matchs[0][0].heure
  minMatch = matchs[0][0]

  matchs.forEach(element => {

    if (minDate > element[0].heure) {
      minDate = element[0].heure;
      minMatch = element
    }
  })}
  console.log(minMatch);
  return <div>
    <MonBackground />
    <div class="px-16 py-8">
      <Navbar />
      <h1 className="text-center text-2xl font-bold my-6">Profil arbitre</h1>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input type="text" placeholder="Rechercher un arbitre" style={{ marginTop: 10 }}
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
          {arbitres.map(info => <div key={info.nom} value={info.id} className="col-md-12 justify-content-md-center"><a href={'/arbitre/' + info.id}>{info.nom} {info.prenom}</a></div>)}
        </div>
      </div>
      <br />
      <br />
      <div className='flex flex-row md:gap-12 gap-6 justify-center'>

        <div className='flex flex-row gap-2'>
          <img src={arbitre.image} className="h-24 w-16 object-cover rounded-md" />
          <div>
            <h2 className='font-bold'>{arbitre.prenom} {arbitre.nom}</h2>
            <h2>{arbitre.dateNaissance} / {getAge(arbitre.dateNaissance)} ans</h2>
            
          </div>
        </div>
        {statsAnneEnCours[0]
          ? <div>
            <h2 className='font-bold'>Note moyenne</h2>
            <h2 className='font-bold text-2xl'>{statsAnneEnCours[0].noteMoyenne}</h2>
          </div>
          : null}



      </div>
      <br />
      {statsArbitre[0]
        ? <h1 className="text-center text-2xl font-bold my-6">Détails de la carrière</h1>

        : null}
      {statsArbitre[0]
        ? <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Année
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Nombre de matchs
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Jaunes
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Rouges
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Product 1 */}

                  {statsArbitre[0].map((mesStats) =>
                    mesStats

                      ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => console.log(mesStats.id)} style={{ cursor: 'pointer' }}>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {mesStats.annee}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {mesStats.nb_matchs}
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
        : null}
      <div className="flex flex-row justify-center">
        <div className="flex flex-col">
          {matchsAVenir[0]
            ? <h1 className="text-center text-2xl font-bold my-6">Calendrier</h1>
            : null}

          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  {matchsAVenir[0]
                    ? <div className="overflow-hidden shadow-md sm:rounded-lg">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="py-3 px-4 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Matchs
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Product 1 */}

                          {matchs.map((monMatchs) =>
                            monMatchs[0] && monMatchs[1] && monMatchs[2]

                              ? <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => console.log(monMatchs[0].id)} style={{ cursor: 'pointer' }}>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {monMatchs[1].nom} - {monMatchs[2].nom}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  {monMatchs[0].heure}
                                </td>
                              </tr>
                              : null
                          )}


                        </tbody>
                      </table>
                    </div>
                    : null}

                </div>
              </div>
            </div>
          </div>
          {/* Prochain matchs */}
          <div className="flex flex-col items-center mt-8">
            {matchsAVenir[0]
              ? <h1 className="text-center text-2xl font-bold my-6font-bold">Prochain match</h1>

              : null}
            {matchsAVenir[0]
              ? <div className="flex flex-row gap-8 justify-center  mt-4">

                {minMatch[1]
                  ? <div>

                    <div className="flex justify-center">
                      <img src={minMatch[1].logo} className="h-24 w-24 mb-4" />
                    </div>
                    <div className="flex justify-center">
                      <h1>{minMatch[1].nom}</h1>
                    </div>


                  </div>
                  : null}
                <h1 className="text-7xl font-bold">VS</h1>
                {minMatch[2]
                  ? <div>
                    <div className="flex justify-center">
                      <img src={minMatch[2].logo} className="h-24 w-24 mb-4" />
                    </div>
                    <div className="flex justify-center">
                      <h1>{minMatch[2].nom}</h1>
                    </div>
                  </div>
                  : null}

              </div>
              : null}

          </div>
          {/* Date lieu heure */}
          {matchsAVenir[0]
            ? <div className="flex flex-row justify-center my-4">
              <div className="flex flex-col gap-2 my-6">
                {minMatch[1]
                  ? <div className="flex felx-row gap-2">
                    <a className="font-bold">Lieu : </a>
                    <a>{minMatch[1].adresse}</a>
                  </div> : null}
                {minMatch[0]
                  ?
                  <div className="flex felx-row gap-2">
                    <a className="font-bold">Date : </a>
                    <a>{minMatch[0].heure}</a>
                  </div> : null}

              </div>
            </div>
            : null}

        </div>
      </div>
    </div>

    <Footer />
  </div>
}
export default ProfilArbitre;