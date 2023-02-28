import { ImageList, ImageListItem, TextField } from "@mui/material"
import { useState } from "react";

const GridList = (props) => {

	const [searchVal, setSearchVal] = useState('Pikachu');

	return (
		<div className="grid-list-container">
			<TextField id="standard-basic" label="Buscar por nombre" variant="standard" value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
			<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
			{ 
				props.data.filter((pokemon) => pokemon.id === searchVal ).map((item) => (
					<ImageListItem key={item.img}>
						<img
							src={`${item.img}`}
							srcSet={`${item.img} 2x`}
							alt={item.title}
							loading="lazy"
						/>
					</ImageListItem>
				))
			}
			</ImageList>
		</div>
	)
}

export default GridList;