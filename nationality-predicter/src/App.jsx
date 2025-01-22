
import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [prediction, setPrediction] = useState(null);
  const inputRef = useRef(null);

  // Fetch nationality data from API
  const fetchNationality = async () => {
    if (!name.trim()) {
      alert("Please enter a name.");
      return;
    }
    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();
      if (data.country && data.country.length > 0) {
        setPrediction(data.country[0]); // Display the first country's details
      } else {
        setPrediction(null);
        alert("No nationality prediction available for this name.");
      }
    } catch (error) {
      console.error("Error fetching nationality data:", error);
      alert("Failed to fetch nationality prediction. Please try again.");
    }
  };

  // Auto-focus the input field on page load
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="App">
      <h1>Nationality Predictor</h1>
      <p>Enter a name to predict the nationality:</p>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button onClick={fetchNationality}>Predict</button>
      </div>
      {prediction && (
        <div className="result">
          <h2>Prediction Result</h2>
          <p>
            Country: <strong>{prediction.country_id}</strong>
          </p>
          <p>
            Probability: <strong>{(prediction.probability * 100).toFixed(2)}%</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
