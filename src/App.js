import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import GraphVerticalBars from './components/GraphVerticalBars'
import axios from 'axios';

function App() {

  const [data, setData] = useState("");
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    try {
      const response = await axios("https://gp14fu4252.execute-api.eu-west-3.amazonaws.com/dev/brands");
      return response.data;
    } catch (error) {
      console.log("Fetch brands error>>>", error)
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
    const data = await getBrands();
    console.log("Brands>>>", data)
    setBrands(data)
   }
   
    fetchBrands();
  }, [])

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
      {brands &&
      <div>{brands.map((brand) => (<p>{brand.title}</p>))}</div>
      }
    </div>
  );
}

export default App;
