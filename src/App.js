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
        <h3>
          Total "likes" per brand on VINTED
        </h3>
        <button className='run_script_btn' title='gdfgdf' onClick={handleClick}
        >
          Refresh Data
        </button>
        <p className='description'>By clicking "refresh data" you'll run the script that will scrap the data from Vinted website and save it to the database.</p>
        <h2>{data}</h2>
        <GraphVerticalBars brandsData={brands} />
      </header>
      {brands &&
      <div>{brands.map((brand) => (<p>{brand.title} - {brand.pretty_favourite_count}</p>))}</div>
      }
    </div>
  );
}

export default App;
