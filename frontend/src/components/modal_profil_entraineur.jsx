import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import axios from "axios";


export default function Modal_profil_entraineur({ visible, onClose, onExit, diplome, entraineur, image }) {

    
    if(diplome === null){
        diplome = "DiplÃ´me";
    }
    const [picture, setPicture] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [imageJ, setImageJ] = useState({});

    const onChangePicture = e => {
        console.log(e.target.files);
        setPicture(URL.createObjectURL(e.target.files[0]));
        setUploadImage(e.target.files[0]);

    }

    
    
    const [diplomeE, setDiplome] = useState(null);
    

    function submit(e) {

        console.log(imageJ.name);
        e.preventDefault();
        
        console.log(uploadImage);
        e.preventDefault();
        let form_data = new FormData();


        form_data.append('nom', entraineur.nom);
        form_data.append('prenom', entraineur.prenom);
        form_data.append('dateNaissance', entraineur.dateNaissance);
        form_data.append('email', entraineur.email);
        form_data.append('mdp', entraineur.mdp);
        if (uploadImage === null) {
            form_data.append('image', imageJ, imageJ.name);
        } else {
            form_data.append('image', uploadImage, uploadImage.name);

        }
        
        if (diplome === null) {
            form_data.append('diplome', entraineur.diplome)
        } else {
            form_data.append('diplome', diplomeE);
        }
        let url = '/api/entraineurs/update/' + entraineur.id + "/";
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }).then(res => {
            console.log(res.data);
        }).catch(err => console.log(err))

    }
    useEffect(() => {
        


    }, [])

    if (!visible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Modifier entraineur
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
                        Diplome
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="diplome" type="text" onChange={(e) => { console.log(e.target.value); setDiplome(e.target.value) }}/>

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