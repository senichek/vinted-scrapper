import './App.css';
import { useEffect, useState } from 'react';
import GraphVerticalBars from './components/GraphVerticalBars'
import axios from 'axios';
import Loading from './components/Loading';

function App() {

  const [data, setData] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBrands = async () => {
    try {
      const response = await axios("https://gp14fu4252.execute-api.eu-west-3.amazonaws.com/dev/brands");
      if (response.data !== undefined && response.data.length > 0) {
        setLoading(false)
      }
      return response.data;
    } catch (error) {
      console.log("Fetch brands error>>>", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
    const data = await getBrands();
    console.log("Brands>>>", data)
    if (data?.length > 23) {
      setBrands(data?.slice(0, 22))
    }
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
        {loading ? 
          (<Loading />) : 
          <div>
            <h3>
              Total number of "likes" per brand on VINTED
            </h3>
        <button className='run_script_btn' onClick={handleClick}
        >
          Refresh Data
        </button>
        <p className='description'>By clicking "refresh data" you'll run the script that will scrap the data from Vinted website and save it to the database.</p>
        <h2>{data}</h2>
        {(brands === undefined || brands.length < 1) ? (<div>No data. Maybe there is an issue with the data loading.</div>) : <GraphVerticalBars brandsData={brands} /> }
        </div>
        }
      </header>
      {brands &&
      <div>{brands.map((brand) => (<p>{brand.title} - {brand.pretty_favourite_count}</p>))}</div>
      }
    </div>
  );
}

export default App;
