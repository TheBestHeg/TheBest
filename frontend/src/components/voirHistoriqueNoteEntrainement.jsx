import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useNavigate,
    useLocation
} from "react-router-dom";

import Footer from './footer';
import MonBackground from './background';
import Navbar from './navbar';

const ListeHistoriqueNotesEntrainements = () => {
    

    const [jourEntrainements, setJourEntrainement] = useState([]);
    const [entraineur, setEntraineur] = useState(JSON.parse(localStorage.getItem("user")))
    const navigate = useNavigate();
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }
    useEffect(() => {
        axios
            .get("/api/noterEntrainementsDistinctDate/search/?entraineur=" + entraineur.id)
            .then((res) => {
                setJourEntrainement(res.data);
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
    return <div>
        <Navbar />
        <MonBackground />
        <div class="px-16 py-20">
            {/* Navbar */}
            <h1 class="text-center text-2xl font-bold my-12">Historique notes entrainements</h1>

            {
                jourEntrainements.length === 0
                ?<h1 className='text-center'>Pas d'historiques :(</h1>
                :null
            }
            <div className='flex flex-col gap-4'>
                {jourEntrainements.map((jour) =>
                    jour
                        ? <Link to={'/historique_notes_entrainments/?date=' + jour.date}>
                            <div className='bg-white py-4 flex justify-center rounded-lg border-2 border-inherit'>
                                <a className='text-center'>Entrainement du {convertDate(jour.date)}</a>
                            </div>
                        </Link>

                        : null
                )}
            </div>


        </div>

        <div className='md:fixed md:inset-x-0 md:bottom-0'>
            <Footer />
        </div>
    </div>
}
export default ListeHistoriqueNotesEntrainements;