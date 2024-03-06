import { useState } from "react";
import "./App.css";

const DECISION_URL = "https://project-django-09i4.onrender.com/complain/";

function App() {
  const [formvalue, setFormvalue] = useState({
    complaint_type: "",
    complaint_description: "",
  });

  const [priortiy, setPriority] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formvalue);

    try {
      const response = await fetch(DECISION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formvalue),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const decisionResult = await response.json();
      setPriority(decisionResult.result);
      console.log(priortiy);
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
          <select
            name="complaint_type"
            onChange={handleInput}
            defaultValue={"-- Select a complaint type --"}
          >
            <option disabled>-- Select a complaint type --</option>
            <option>CIVIL RIGHTS COMPLAINT</option>
            <option>CRIMINAL ALLEGATION</option>
            <option>DEPARTMENTAL VIOLATIONS</option>
            <option>DOMESTIC</option>
            <option>DRUGS</option>
            <option>FALSIFICATION</option>
            <option>FORCE-TASER/CED/ECW</option>
            <option>HARASSMENT</option>
            <option>LACK OF SERVICE</option>
            <option>NON-INVESTIGATORY INCIDENT</option>
            <option>OTHER MISCONDUCT</option>
            <option>PHYSICAL ABUSE</option>
            <option>SEXUAL CRIME/MISCONDUCT</option>
            <option>UNPROFESSIONAL CONDUCT</option>
            <option>USE OF FORCE NTERNAL</option>
            <option>VERBAL ABUSE</option>
          </select>
        </div>

        <div className="complaint-description">
          {/* Complaint description field */}
          <label className="complaint-description-label">
            Complaint Description
          </label>
          <textarea
            name="complaint_description"
            // value={formvalue.complaint_description}
            onChange={handleInput}
            className="complaint-description-input"
          ></textarea>
        </div>

        <div className="submit-button">
          <button className="submit-button">Submit</button>
        </div>

        <div className="complaint-decision">
          <label className="complaint-decision-label">Complaint Priority</label>
          <input
            type="text"
            name="complaint_decision"
            value={priortiy}
            readOnly={true}
            className="complaint-decision-input"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
