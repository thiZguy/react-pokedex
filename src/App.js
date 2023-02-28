import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p style={{"fontFamily": "roboto"}}>
          This is our app with the logo and UI library ready
        </p>
      </header>
    </div>
  );
}

export default App;
