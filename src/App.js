import { Button, TextField } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [data, setData] = useState("");
  let [unit, setUnit] = useState(13);
  let [earnings, setEarnings] = useState(16500);

  function predictMix(timeUnit, providedEarnings) {
    let earnings = 0;
    let tCount = 0,
      pCount = 0,
      cCount = 0;

    while (timeUnit > 0) {
      // Calculate remaining time for each building type
      const tTime = timeUnit - 5;
      const pTime = timeUnit - 4;
      const cTime = timeUnit - 10;

      // Choose the building type that maximizes profit
      if (
        tTime >= 0 &&
        tTime * 1500 + earnings >= pTime * 1000 + earnings &&
        tTime * 1500 + earnings >= cTime * 3000 + earnings
      ) {
        tCount++;
        earnings += 1500;
        timeUnit -= 5;
      } else if (
        pTime >= 0 &&
        pTime * 1000 + earnings >= cTime * 3000 + earnings
      ) {
        pCount++;
        earnings += 1000;
        timeUnit -= 4;
      } else if (cTime >= 0) {
        cCount++;
        earnings += 3000;
        timeUnit -= 10;
      } else {
        break; // No more buildings can be constructed
      }
    }
    setData([{ T: tCount, P: pCount, C: cCount, Earnings: earnings }]);
    return { T: tCount, P: pCount, C: cCount, Earnings: earnings };
  }

  useEffect(() => {
    predictMix(Number(unit), Number(earnings));
  }, []);
  // Function to Calculate Max Profit
  function handleCalculate() {
    if (!unit || !earnings) {
      alert("Please provide a time unit and Earnings");
    } else {
      predictMix(Number(unit), Number(earnings));
    }
  }
  return (
    <div className="App">
      <h1>Max Profit Predictions</h1>
      <div className="input-container">
        <div className="input-box">
          <h3>Time Unit</h3>
          <TextField
            id="outlined-number"
            label="Unit"
            type="Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
        <div className="input-box">
          <h3>Earnings</h3>
          <TextField
            id="outlined-number"
            label="Earnings"
            type="Number"
            InputLabelProps={{
              shrink: true,
            }}
            value={earnings}
            onChange={(e) => setEarnings(e.target.value)}
          />
        </div>
      </div>
        <br />
      <div className="input-btn">
        <Button onClick={handleCalculate} variant="contained">
          Calculate
        </Button>
        </div>

      {data ? (
        <div>
          <h2>Answer</h2>
          <div className="answers">
            <div className="answer-container">
              <div className="ans-head">
                <p>
                  <b>Time Unit:</b> {unit}
                </p>
                <p>
                  <b>Earnings:</b> {earnings}
                </p>
                <p>
                  <b>Solution:</b>
                </p>
              </div>
              {data &&
                data.map((val, ind) => (
                  <div className="answer-box" key={ind}>
                    <b className="si-no">{ind + 1} )</b>
                    <p className="output-data">T:{val.T}</p>
                    <p className="output-data">P:{val.P}</p>
                    <p className="output-data">C:{val.C}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Please Enter a value to calculate the Max Profit</h2>
        </div>
      )}
    </div>
  );
}

export default App;
