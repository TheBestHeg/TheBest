import React from 'react';
import axios from "axios";

import { useState, useEffect } from 'react';
const Terrain = () => {

    
    const[terrains, setTerrains] = useState(null);
    useEffect(() =>{
        axios
        .get("/api/terrains/")
        .then((res) => {setTerrains(res.data)})
    }, []);

    return <div>
        {
            terrains != null && <div>
                {terrains.map(terrain => 
                <div>
                    <h1>{terrain.nom}</h1>
                    <h1>{terrain.capacite}</h1>
                    <h1>{terrain.adresse}</h1>
                </div>
            )}
            </div>
        }
    </div>
}
export default Terrain;