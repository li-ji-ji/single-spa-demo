import logo from './logo.svg';
import './App.css';
import "./singleSpa.js"; // 引入微前端配置文件;

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
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

        <div id="react-app" />
      </header>
    </div>
  );
}

export default App;
