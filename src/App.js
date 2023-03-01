import './App.css';
import { useState, useEffect } from 'react';
import PokemonTable from './components/PokemonTable';
import PokemonDetailDialog from './components/PokemonDetailDialog';

const App = () => {
  const [open, setOpen] = useState(false);
  const [pokemonId, setPokemonId] = useState('');
  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(pokemonId!=='') {
      setOpen(true);
    }
  },[pokemonId])

  return (
    <div className="app">
      {
        open &&
        <PokemonDetailDialog
          pokemonId={pokemonId}
          open={open}
          handleClose={handleClose}
        />
      }
      <PokemonTable onPokemonClicked={(pokemonId) => setPokemonId(pokemonId)}/>
    </div>
  );
}

export default App;
