import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import axios from "axios";


export default function Modal_profil_joueur({ visible, onClose, onExit, poste, joueur, image }) {

    if(poste === null){
        poste = 1;
    }
    
    const [picture, setPicture] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [imageJ, setImageJ] = useState({});

    const onChangePicture = e => {
        console.log(e.target.files);
        setPicture(URL.createObjectURL(e.target.files[0]));
        setUploadImage(e.target.files[0]);

    }

    
    console.log(joueur.image);
    const [posteChoisi, setPosteChoisi] = useState(null);
    const [listePostes, setListePostes] = useState([]);

    function submit(e) {

        console.log(imageJ.name);
        e.preventDefault();
        console.log(posteChoisi);
        console.log(uploadImage);
        console.log(picture);

        console.log(joueur.image);
        console.log(uploadImage);
        e.preventDefault();
        let form_data = new FormData();


        form_data.append('nom', joueur.nom);
        form_data.append('prenom', joueur.prenom);
        form_data.append('dateNaissance', joueur.dateNaissance);
        form_data.append('email', joueur.email);
        form_data.append('mdp', joueur.mdp);
        if (uploadImage === null) {
            form_data.append('image', imageJ, imageJ.name);
        } else {
            form_data.append('image', uploadImage, uploadImage.name);

        }
        form_data.append('pied', joueur.pied);
        form_data.append('taille', joueur.taille);
        form_data.append('etatFacture', joueur.etatFacture);
        if (posteChoisi === null) {
            form_data.append('poste', poste.id)
        } else {
            form_data.append('poste', posteChoisi);
        }
        let url = '/api/joueurs/update/' + joueur.id + "/";
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err))

    }
    useEffect(() => {
        axios.get("/api/postes/search/").then((postes) => {
            setListePostes(postes.data);
        })
        
        fetch(joueur.image + "/" )
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                
                // Here's where you get access to the blob
                // And you can use it for whatever you want
                // Like calling ref().put(blob)

                // Here, I use it to make an image appear on the page
                let objectURL = URL.createObjectURL(blob);
                let myImage = new Image();
                myImage.src = objectURL;
                setImageJ(myImage);
            });


    }, [])

    if (!visible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Modifier joueur
                </h1>


                <div class="">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                        Image
                    </label>
                    <div className="register_profile_image">
                        <input id="profilePic" type="file" onChange={onChangePicture} />
                    </div>
                    <div className="previewProfilePic" >
                        <img className="playerProfilePic_home_tile" src={picture}></img>
                    </div>

                </div>

                <div class="">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="prenom">
                        Poste
                    </label>
                    <select defaultValue={poste.id} className="text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={(e) => { console.log(e.target.value); setPosteChoisi(e.target.value) }} >

                        {listePostes.map(poste =>
                            <option value={poste.id}>{poste.nom}</option>
                        )}
                    </select>
                </div>

                <form onSubmit={(e) => submit(e)} class="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                    <div class="flex items-center justify-end">
                        <button onClick={() => { onExit(); }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Ajouter
                        </button>
                    </div>

                </form>

                <button onClick={() => { onClose(); }} className="px-5 py-2 bg-gray-700 text-white rounded">
                    Annuler
                </button>
            </div>
        </div>
    )
}