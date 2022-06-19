import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import axios from "axios";
import logo from '../images/logo_465x320.png'
import pp from '../images/IMG_0528.JPG'
import Navbar from './navbar';
import Footer from './footer';
import MonBackground from './background';
import { ReactSession } from 'react-client-session';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";

const Club = () => {
  let {id} = useParams();
  let {idEquipe} = useState();
  const [club, setClub] = useState(null);
  const [clubs, setClubs] = useState([{}]);
  const [terrain, setTerrain] = useState({});
  const [equipes, setEquipes] = useState([{}]);
  const [equipe, setEquipe] = useState();
  const [championnat, setChampionnat] = useState(null);
  const [match, setMatch] = useState(null);
  const [palmares, setpalmares] = useState(null);
  const [arrivee, setArrivee] = useState([]);
  const [depart, setDepart] = useState([]);

  const [text, setText] = useState('');
  const onChangeHandler = (text) => {
    setText(text);
    if (text.length>0){
      axios.get("/api/clubs/search2/?search=" + text, {
        params: {
          _limit: 10
         }
      }).then((res) => {
        setClubs(res.data).slice(1, 10);
      })
      
    }
    else{
      setClubs([{}]);
    }
  }

  const changeEquipe = () => {
     let idEquipeW = document.getElementById("selectEquipe");
    idEquipe = idEquipeW.options[idEquipeW.selectedIndex].value;
    alert(idEquipe);
    axios.get("/api/equipes/" + idEquipe).then((res) => {
      setEquipe(res.data);
      console.log(res.data);
      axios.get("/api/groupes/" + res.data.groupe).then((monGroupe) => { 
        console.log(monGroupe.data);
        axios.get("/api/championnats/" + monGroupe.data.championnat).then((monChampionnat) => {
          console.log(monChampionnat.data)
          setChampionnat(monChampionnat.data);
        })
        
      });
      
      axios.get("/api/transferts/searchEquipe/?acheteur=" + res.data.id).then((transfert) => {
        setArrivee([]);
        transfert.data.forEach((element)=>{
          
          axios.get("/api/joueurs/search?id="+element.joueur).then((res) =>{
            setArrivee(arrivee  => [...arrivee, res.data[0]]);
          })
        })
        
        
        
      })
      axios.get("/api/transferts/searchEquipe/?acheteur=&vendeur=" + res.data.id).then((transfert) => {
        setDepart([]);
        transfert.data.forEach((element)=>{
          
          axios.get("/api/joueurs/search?id="+element.joueur).then((res) =>{
            setDepart(depart => [...depart, res.data[0]]);
          })
        })
      })
    })
  };

  

  useEffect(() => {
    if (id==null){
      id = 1;
    }
    axios.get("/api/clubs/" + id).then((res) => { 
        setClub(res.data);
        console.log(club);
        axios.get("/api/terrains/" + res.data.terrain).then((monTerrain) => { setTerrain(monTerrain.data) });
        axios.get("/api/equipes/searchJoueur/?club=" + res.data.id).then((mesEquipes) => { 
          console.log(mesEquipes);
          setEquipes(mesEquipes.data);
          setEquipe(mesEquipes.data[0]);
          idEquipe = mesEquipes.data[0].id;

          axios.get("/api/groupes/" + mesEquipes.data[0].groupe).then((monGroupe) => { 
            console.log(monGroupe.data.championnat);
            axios.get("/api/championnats/" + monGroupe.data.championnat).then((monChampionnat) => {
              console.log(monChampionnat.data)
              setChampionnat(monChampionnat.data);
            })
            
          });
          
          // axios.get("/api/match/searchEquipe/?equipes=" + mesEquipes.data.id).then((mesMatchs) => { 
            
          //   mesMatchs.data.forEach(element => {
          //       setMatch(element);
          //   })
            
          // });
          
          axios.get("/api/transferts/searchEquipe/?acheteur=" + mesEquipes.data[0].id).then((transfert) => {
            transfert.data.forEach((element)=>{
              
              axios.get("/api/joueurs/search?id="+element.joueur).then((res) =>{
                setArrivee(arrivee  => [...arrivee, res.data[0]]);
              })
            })
            
            
            
          })
          axios.get("/api/transferts/searchEquipe/?acheteur=&vendeur=" + mesEquipes.data[0].id).then((transfert) => {
            transfert.data.forEach((element)=>{
              
              axios.get("/api/joueurs/search?id="+element.joueur).then((res) =>{
                setDepart(depart => [...depart, res.data[0]]);
              })
            })
          })
        });
    axios.get("/api/palmaresclubs/searchClub/?club=" + id).then((res) => {
      
          setpalmares(res.data);
      
    })
     })
}, [])

  

if (club === null || terrain == null || equipes==null || championnat == null) {
  return <p>Chargement données ...</p>
}
  return <div>
    <MonBackground/>
    <div class="px-16 py-8">
      <div>
        {/* Navbar */}
        <Navbar />
        <div className="flex justify-center my-12">
          <h1 className="font-bold text-2xl">Clubs</h1>
        </div>
        <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input type="text" placeholder="Rechercher un club" style={{ marginTop: 10}}
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
          {clubs.map(info => <div key={info.nom} value={info.id} className="col-md-12 justify-content-md-center"><a href={'/club/' + info.id}>{info.nom}</a></div>)}
        </div>
        </div>
        <div className="flex flex-row gap-8 justify-center mt-6">
          {club?<img className="h-24 w-24" src={club.logo} alt="" />:null}
          <div>
            <h2 className="font-bold mb-2">Club : {club.nom}</h2>
            <h2>Adresse : {club.adresse}</h2>
            <h2>Terrain : {terrain.nom}</h2>
          </div>
        </div>
        {/* select  */}
        <div className="flex justify-center mt-10">
          <div className="mb-3 xl:w-96">
            <select id="selectEquipe" onChange={changeEquipe} className="form-select appearance-none
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
              {equipes.map(info => <option key={info.nom} value={info.id}>{info.nom}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <h1 className="font-bold text-lg">Championnat : {championnat.nom}</h1>
        </div>
        <div className="flex justify-center my-8">
          <h1 className="font-bold">Dernier transferts</h1>
        </div>
        <div className="flex flex-row justify-center gap-40">
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Arrivés</h4>
            {arrivee.map(info => <h4 key={info.nom}>{info.nom} {info.prenom} </h4>)}
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Départs</h4>
            {depart.map(info => <h4 key={info.nom}>{info.nom} {info.prenom} </h4>)}
          </div>
        </div>
        <div className="flex flex-col items-center my-12">
          <h1 className="font-bold mb-4">Palmares</h1>
          
          {palmares.map(info => <h4 key={info.titre}>{info.titre}</h4>)}
        </div>
        
        {/* <div className="flex flex-col items-center">
          <h1 className="font-bold">Prochain match</h1>
          <div className="flex flex-row gap-8 justify-center  mt-4">
            <div>
              <div className="flex justify-center">
                <img src={logo_aire} className="h-24 w-24 mb-4" />
              </div>
              <div className="flex justify-center">
                <h1>FC. Aire le lignon</h1>
              </div>
            </div>
            <h1 className="text-7xl font-bold">VS</h1>
            <div>
              <div className="flex justify-center">
                <img src={logo_aire} className="h-24 w-24 mb-4" />
              </div>
              <div className="flex justify-center">
                <h1>FC. Aire le lignon</h1>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="flex flex-row justify-center my-4">
          <div className="flex flex-col gap-2 my-6">
            <div className="flex felx-row gap-2">
              <a className="font-bold">Lieu : </a>
              <a>Chemin de Fossée 8, 1219 aïre</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Date : </a>
              <a>11h40</a>
            </div>
            <div className="flex felx-row gap-2">
              <a className="font-bold">Heure : </a>
              <a>14:30</a>
            </div>
          </div>
        </div> */}
        </div>
    </div>
    <Footer/>
  </div>
}

export default Club;