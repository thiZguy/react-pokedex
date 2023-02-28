import logo from './assets/logo.png';
import './App.css';
import GridList from './components/GridList';

const POKEMON_IMAGES = [{img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png', id: '61'},
{img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png', id: '62'}]

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p style={{"fontFamily": "roboto"}}>
          This is our app with the logo and UI library ready
        </p>
      </header>
      <GridList data={POKEMON_IMAGES}></GridList>
    </div>
  );
}

export default App;
