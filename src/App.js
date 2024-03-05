import { useState } from "react";
import "./App.css";

const DECISION_URL = "https://project-django-09i4.onrender.com/complain/";

function App() {
  const [formvalue, setFormvalue] = useState({
    complaintCategory: "",
    complaintDescription: "",
  });

  const [result, setResult] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = formvalue;

    try {
      const response = await fetch(DECISION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const decisionResult = await response.json();
      setResult(decisionResult);
      console.log(result);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Welcome to complaint portal</h1>
        <h2>Determine the priortiy of your complaint with AI</h2>
        <p>Please be patient it is on testing phase</p>
      </div>

      <form className="complaint-form" onSubmit={handleFormSubmit}>
        <div className="complaint">
          {/* Complaint category field */}
          <label className="complaint-category-label">Complaint Category</label>
          <select>
            <option value="CIVIL RIGHTS">CIVIL RIGHTS COMPLAINT</option>
            <option value="CRIMINAL ALLEGATION">CRIMINAL ALLEGATION</option>
            <option value="DEPARTMENTAL VIOLATIONS">
              DEPARTMENTAL VIOLATIONS
            </option>
            <option value="DOMESTIC">DOMESTIC</option>
            <option value="DRUGS">DRUGS</option>
            <option value="FALSIFICATION">FALSIFICATION</option>
            <option value="FORCE-TASER/CED/ECW">FORCE-TASER/CED/ECW</option>
            <option value="HARASSMENT">HARASSMENT</option>
            <option value="LACK OF SERVICE">LACK OF SERVICE</option>
            <option value="NON-INVESTIGATORY INCIDENT">
              NON-INVESTIGATORY INCIDENT
            </option>
            <option value="OTHER MISCONDUCT">OTHER MISCONDUCT</option>
            <option value="PHYSICAL ABUSE">PHYSICAL ABUSE</option>
            <option value="SEXUAL CRIME/MISCONDUCT">
              SEXUAL CRIME/MISCONDUCT
            </option>
            <option value="UNPROFESSIONAL CONDUCT">
              UNPROFESSIONAL CONDUCT
            </option>
            <option value="USE OF FORCE INTERNAL">USE OF FORCE NTERNAL</option>
            <option value="VERBAL ABUSE">VERBAL ABUSE</option>
          </select>
        </div>

        <div className="complaint-description">
          {/* Complaint description field */}
          <label className="complaint-description-label">
            Complaint Description
          </label>
          <input
            type="text"
            name="complaintDescription"
            value={formvalue.complaintDescription}
            onChange={handleInput}
            className="complaint-description-input"
          />
        </div>

        <div className="submit-button">
          <button className="submit-button">Submit</button>
        </div>

        <div className="complaint-decision">
          <label className="complaint-decision-label">Complaint Priority</label>
          <input
            type="text"
            name="complaintDecision"
            value={result}
            readOnly
            onChange={handleInput}
            className="complaint-decision-input"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
