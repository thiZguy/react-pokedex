import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, CircularProgress, Dialog, DialogTitle } from '@mui/material';
import { POKEMON_DEFAULT_API, POKEMON_IMAGE_API } from '../constants';
import axios from 'axios';

const PokemonDetailDialog = (props) => {
  const { pokemonId, open, handleClose } = props;
  const [pokemonData, setPokemonData] = useState();
	const [color, setColor] = useState('chocolate');

  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonData = async () => {
    const res = await axios.get(`${POKEMON_DEFAULT_API}${pokemonId}`);
		const speciesDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    setPokemonData(res.data);
		mapColor(speciesDetails.data.color.name)
  };

	const mapColor = (apiColorName) => {
		switch (apiColorName) {
			case 'green':
				setColor('#59cdbc')
				break;
			case 'blue':
				setColor('#8aacf6')
				break;
			case 'red':
				setColor('#cd3837')
				break;
			case 'black':
				setColor('#202124')
				break;
			case 'purple':
				setColor('#574da6')
				break;
			case 'yellow':
				setColor('#c9b023')
				break;
			default:
				setColor('chocolate')
				break;
		}
	}

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: '100%', height: '100%', alignSelf: 'center' }}
    >
      {!pokemonData ? (
        <Box
          sx={{
            display: 'flex',
            width: 150,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ paddingRight: '20px', paddingLeft: '20px', paddingBottom: '10px', backgroundColor: color }}>
          <DialogTitle className='dialog-text'>{pokemonData?.name}</DialogTitle>
          <img
            src={`${POKEMON_IMAGE_API}/${pokemonId}.png`}
						alt={pokemonData?.name}
            loading="lazy"
            height={150}
            width={150}
          />
          <div>
						<h2 className='dialog-text'>stats:</h2>
            {pokemonData.stats.map((poke, i) => {
              return (
								<h4 className='dialog-text' key={i}>
									{poke.stat.name}:   {poke.base_stat}
								</h4>
              );
            })}
          </div>
          <div>
            <h2 className='dialog-text'>Abilities:</h2>
            {pokemonData.abilities.map((poke, i) => {
              return (
                  <h4 className='dialog-text' key={i}>{poke.ability.name}</h4>
              );
            })}
          </div>
					<div>
            <h2 className='dialog-text'>Types:</h2>
            {pokemonData.types.map((poke, i) => {
              return (
								<Chip key={i} sx={{ color: 'white', backgroundColor: '#a1a2a4' }} label={poke.type.name} />
              );
            })}
          </div>
        </div>
      )}
    </Dialog>
  );
};

PokemonDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  pokemonId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PokemonDetailDialog;
