import axios from "axios";
import { useEffect, useState } from "react";
import Choice from "./components/Choice";

function App() {
  const [country, setCountry] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setResult(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <form >
        find countries <input value={country} onChange={handleChange} />
      </form>
      <div>
        <Choice key={result.id} result={result} country={country} />
      </div>
    </>
  );
}

export default App;
