import './App.css';
import { useEffect, useState } from 'react';
import PokemonTable from './components/PokemonTable';

const App = () => {

  const getDetails = (pokemonId) => {
    console.log('pokemon clicked: ', pokemonId)
  }
  
  return (
    <div className="app">
      <PokemonTable onPokemonClicked={(pokemonId) => getDetails(pokemonId)}/>
    </div>
  );
}

export default App;
