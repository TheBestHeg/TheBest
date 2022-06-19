import React from 'react';
import Admin_ajouter_match from "./admin_ajouter_match";
import Admin_ajouter_but from "./admin_ajouter_but";
import Admin_ajouter_passed from "./admin_ajouter_passed";
import Admin_ajouter_carton from "./admin_ajouter_carton";
import Admin_ajouter_transfert from "./admin_ajouter_transfert";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo_aire from '../images/aire_fc.png'
import logo from '../images/logo_465x320.png'
import axios from "axios";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Footer from './footer';
import MonBackground from './background';
import Navbar from './navbar';



const Acceuil_admin = () => {
    let {table} = useParams();
    const [tables, setTables] = useState([]);
    const [text, setText] = useState('');

    const [openAddMatch, setOpenAddMatch] = useState(false);
    const handleOnCloseAddMatch = () => setOpenAddMatch(false);

    const [openAddBut, setOpenAddBut] = useState(false);
    const handleOnCloseAddBut = () => setOpenAddBut(false);

    const [openAddPasseD, setOpenAddPasseD] = useState(false);
    const handleOnCloseAddPasseD = () => setOpenAddPasseD(false);

    const [openAddCarton, setOpenAddCarton] = useState(false);
    const handleOnCloseAddCarton = () => setOpenAddCarton(false);

    const [openAddTransfert, setOpenAddTransfert] = useState(false);
    const handleOnCloseAddTransfert = () => setOpenAddTransfert(false);

    function handleClick(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        window.location.reload(false);
      }

    function back() {
        setTables([{}]);
      }

      function deleteElement(id) {
        if (window.confirm('Voulez vous vraiment supprimer cette ligne ?')) {
            axios.delete('/api/'+table+'/delete/' + id).then(() => alert("element supprimé"))
           }
         };

    useEffect(() => {
        axios.get("/api/"+ table + "/search2/?search=").then((res) => {
            console.log(res.data);
            setTables(res.data);
        })
    }, [])


    const onChangeHandler = (text) => {
        setText(text);
        axios.get("/api/"+ table + "/search2/?search=" + text).then((res) => {
            console.log(res.data);
            setTables(res.data);
        })
      }
    console.log(tables)
    if (table == null){
        return <div>
    <MonBackground/>
    
    <div className="flex justify-center my-12">
          <h1 className="font-bold text-2xl">Toutes les tables</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-items-center my-8">

        <a href="/accueil_admin/championnats">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Championnats
     </button>
    </a>

    <a href="/accueil_admin/terrains">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Terrains
     </button>
    </a>

    <a href="/accueil_admin/clubs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Clubs
     </button>
    </a>
    
    <a href="/accueil_admin/postes">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Postes
     </button>
    </a>

    <a href="/accueil_admin/spectateurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Spectateurs
     </button>
    </a>

    <a href="/accueil_admin/joueurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Joueurs
     </button>
    </a>

    <a href="/accueil_admin/equipes">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Equipes
     </button>
    </a>

    <a href="/accueil_admin/entraineurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Entraineurs
     </button>
    </a>

    <a href="/accueil_admin/arbitres">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Arbitres
     </button>
    </a>

    <a href="/accueil_admin/matchs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Matchs
     </button>
    </a>

    <a href="/accueil_admin/entrainements">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Entrainements
     </button>
    </a>

    <a href="/accueil_admin/presences">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Presences
     </button>
    </a>

    <a href="/accueil_admin/statistiquesEquipes">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Statistiques equipe
     </button>
    </a>

    <a href="/accueil_admin/statistiquesarbitres">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Statistiques arbitre
     </button>
    </a>

    <a href="/accueil_admin/statistiquesjoueurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Statistiques joueur
     </button>
    </a>

    <a href="/accueil_admin/transferts">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Transferts
     </button>
    </a>

    <a href="/accueil_admin/palmaresclubs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Palmares club
     </button>
    </a>

    <a href="/accueil_admin/palmaresjoueurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Palmares joueur
     </button>
    </a>

    <a href="/accueil_admin/noteJoueurs">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Notes joueur
     </button>
    </a>

    <a href="/accueil_admin/noteArbitres">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Notes arbitre
     </button>
    </a>

    <a href="/accueil_admin/buts">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Buts
     </button>
    </a>

    <a href="/accueil_admin/passeds">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Passes Décisives
     </button>
    </a>

    <a href="/accueil_admin/cartons">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Cartons
     </button>
    </a>

    <a href="/accueil_admin/compositions">
     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Compositions
     </button>
    </a>
        
        
        </div>

        <div className="flex justify-center my-12">
          <h1 className="font-bold text-2xl">Insertions admin</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 justify-items-center my-8">
     <button onClick={() => setOpenAddMatch(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Ajouter un match
     </button>

     <button onClick={() => setOpenAddBut(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Ajouter un but
     </button>

     <button onClick={() => setOpenAddPasseD(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Ajouter une passe décisive
     </button>

     <button onClick={()=> setOpenAddCarton(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Ajouter un carton
     </button>

     <button onClick={()=> setOpenAddTransfert(true)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="button">
          Ajouter un transfer
     </button>

     <button onClick={handleClick} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
  Déconnexion
</button>
        </div>
        <Admin_ajouter_match visible={openAddMatch} onClose={handleOnCloseAddMatch} />
        <Admin_ajouter_but visible={openAddBut} onClose={handleOnCloseAddBut}/>
        <Admin_ajouter_passed visible={openAddPasseD} onClose={handleOnCloseAddPasseD}/>
        <Admin_ajouter_carton visible={openAddCarton} onClose={handleOnCloseAddCarton}/>
        <Admin_ajouter_transfert visible={openAddTransfert} onClose={handleOnCloseAddTransfert}/>
  </div>
    }
    else{

        
        return <div>
            <MonBackground/>
            
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-center">
            <Link to="/accueil_admin">
            <button onClick={back} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
            Retour
            </button>
            </Link>
            <input type="text" placeholder="Rechercher" style={{ marginTop: 10}}
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
            
            </div>
            
    <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    

        {tables.length>0&&
            <tr>
        {Object.keys(tables[0]).map((table) =>
         <th>{table}</th>)}
         </tr>
        }
        
    
  </thead>
        <tbody>

            {
                tables.map(item => (
                    
                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                    {Object.entries(item).map( ([key, value]) => 
                    key!=="equipes"
                    ?<td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" key={key}>{value}</td>
                    :<td scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" key={key}>{value[0]}, {value[1]}</td>
                    )}
                    <td class="px-6 py-4 text-right">
                    <a href="#" onClick={(id) => deleteElement(item.id)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Supprimer</a></td>
                </tr>
                 ))
            }

        </tbody>
    </table>
    

</div>


            </div>
    }

}

export default Acceuil_admin;