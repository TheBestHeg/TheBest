import React from 'react';
import { useParams } from 'react-router-dom';


const NoterArbitre = () => {
    return   <div>
    <h1 className="text-center text-2xl font-bold my-6">Noter arbitre</h1>
    <br />
    <br />
    <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <div><img className="h-40 w-40" src="img/referee_esther_staubli_switzerland_.jpeg" /></div>
      <div><h2 className="text-center text-xl font-bold my-6">Esther Staubli</h2>
        <br /><h3 className="text-base font-semibold">38 ans / 10.07.1983</h3>
        <br /><h3 className="text-base font-semibold">Suisse</h3>
      </div>
      <div><h2 className="text-center text-xl font-bold my-6">Note moyenne du match</h2>
        <h2 className="text-center text-4xl font-bold my-6">8.4</h2>
      </div>
    </div>
    <br />
    {/* Prochain matchs */}
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold my-6font-bold">Match terminé</h1>
      <div className="flex flex-row gap-8 justify-center  mt-4">
        <div>
          <div className="flex justify-center">
            <img src="./images/aire_fc.png" className="h-24 w-24 mb-4" /> 
          </div>
          <div className="flex justify-center">
            <h1>FC. Aire le lignon</h1>
          </div>
        </div>
        <h1 className="text-7xl font-bold">VS</h1>
        <div>
          <div className="flex justify-center">
            <img src="./images/aire_fc.png" className="h-24 w-24 mb-4" /> 
          </div>
          <div className="flex justify-center">
            <h1>FC. Aire le lignon</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold my-6 font-bold">Incidents</h1>
    </div>
    <div className="flex flex-row justify-center md:gap-24 gap-2 mx-4">
      <div><h3 className="text-base font-semibold">Nombre de cartons jaunes :</h3>
        <br /><h3 className="text-base font-semibold">Nombre de cartons rouges :</h3>
      </div>
      <div><h3 className="text-base font-semibold">6</h3>
        <br /><h3 className="text-base font-semibold">10</h3>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold my-6 font-bold">Note</h1>
    </div>
    <div className="flex flex-row justify-center md:gap-24 gap-4 mx-4">
      <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="arbitre" type="text" placeholder="Noter arbitre" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Noter</button>
    </div>
  </div>
}
export default NoterArbitre;
