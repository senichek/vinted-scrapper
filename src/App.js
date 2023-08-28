import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import GraphVerticalBars from './components/GraphVerticalBars'

function App() {

  const [data, setData] = useState("");

  const handleClick = async () => {
    const data = await fetch("https://a5tdowu1ld.execute-api.eu-west-3.amazonaws.com/dev/runscrapper")
    const jsonData = await data.json();
    console.log("API response>>>", jsonData);
    setData(jsonData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}
        >
          Run Script
        </button>
        <h2>{data}</h2>
        <GraphVerticalBars brandsData={data} />
      </header>
    </div>
  );
}

export default App;
