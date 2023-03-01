import React, { useEffect, useState } from 'react';
import { Button, TextField, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import axios from 'axios';
import { POKEMON_DEFAULT_API, POKEMON_IMAGE_API } from '../constants';

const PokemonTable = (props) => {
  const [searched, setSearched] = useState('');
	const [pokeData,setPokeData]=useState([]);
	const [url,setUrl]=useState(`${POKEMON_DEFAULT_API}?offset=0&limit=151`)
	const [nextUrl,setNextUrl]=useState();
	const [prevUrl,setPrevUrl]=useState();

	let auxPokeData=[]

  const pokeFun = async() => {
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
			const pokeDataWithIDs = res.data.results.map((result, i) => ({...result, id: result.url.split('/')[result.url.split('/').length-2]}));
			setPokeData(pokeDataWithIDs);
  }


  const requestSearch = (searchedVal) => {
		if(searchedVal!=='') {
			auxPokeData=pokeData;
			const filteredRows = pokeData.filter((row) => {
				return row.name.toLowerCase().includes(searchedVal.toLowerCase());
			});
			setPokeData(filteredRows);
			setSearched(searchedVal);
		} else {
			pokeFun();
			setSearched(searchedVal);
		}
  };

  const cancelSearch = () => {
    setSearched('');
		setPokeData(auxPokeData);
  };

	useEffect(()=>{
    pokeFun();
  },[url])

	const handleNextClick = () => {
		setPokeData([])
		setUrl(nextUrl)
	}

	const handlePrevClick = () => {
		setPokeData([])
		setUrl(prevUrl)
	}

  return (
    <>
        <TextField
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
					onAbortCapture={() => cancelSearch()}
					label="Buscar pokemon"
        />
        <TableContainer component={Paper} style={{ maxHeight: 700, minWidth: 300 }}>
          <Table stickyHeader className="table-pokemon" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Pokemon</TableCell>
                <TableCell align="right">ID</TableCell>
								<TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{maxHeight: 400, scrollBehavior: 'auto'}}>
              {pokeData.map((row, i) => (
                <TableRow color='white' hover onClick={() => props.onPokemonClicked(row.id)} key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">
									<img
										src={`${POKEMON_IMAGE_API}/${row.id}.png`}
										alt={row.title}
										loading="lazy"
										height={50}
										width={50}
									/>
									</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
				<div className="btn-group">
					{  prevUrl && <Button onClick={()=>{handlePrevClick()}}>Previous</Button>}

					{ nextUrl && <Button onClick={()=>handleNextClick()}>Next</Button>}

					</div>
    </>
  );
}

export default PokemonTable;