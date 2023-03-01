import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const POKEMON_IMAGE_API = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';


const originalRows = [
	{ name: 'Bulbasaur', id: 1 },
	{ name: 'Ivysaur', id: 2 },
	{ name: 'Venosaur', id: 3 },
];

const PokemonTable = (props) => {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState('');

	const [pokeData,setPokeData]=useState([]);
	const [loading,setLoading]=useState(true);
	const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
	const [nextUrl,setNextUrl]=useState();
	const [prevUrl,setPrevUrl]=useState();

  const pokeFun = async() => {
      setLoading(true)
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
			const pokeDataWithIDs = res.data.results.map((result, i) => ({...result, id: result.url.split('/')[result.url.split('/').length-2]}));
			console.log('pokeData: ', pokeDataWithIDs);
			setPokeData(pokeDataWithIDs);
      setLoading(false)
  }


  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
		setSearched(searchedVal);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
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
					onEmptied={() => cancelSearch()}
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