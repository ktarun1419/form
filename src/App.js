import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Form from './Form/Form';
function App() {
  return (
    <div className="App" id='app'>
      <div className='loader'></div>
      <Form />
      {/* <Button variant="contained">Hello world</Button> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
