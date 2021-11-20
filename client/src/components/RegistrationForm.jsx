import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const RegistrationForm = (props) => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [attending, setAttending] = useState(props.attending);
  const [alcohol, setAlcohol] = useState(props.alcohol);
  const [diet, setDiet] = useState(props.diet);
  const [performing, setPerforming] = useState(props.performing);
  const [email, setEmail] = useState(props.email);

  /*
   * Send answers to server
   */

  const onSubmit = () => {
    Axios.post(
      "http://localhost:5000/users/registration",
      {
        attending: attending,
        alcohol: alcohol,
        diet: diet,
        performing: performing,
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    history.push("/registration");
  };

  /*
   * Handling changes in form
   */

  const handleAttending = (e) => {
    setAttending(convertToBool(e.target.value));
  };

  const handleAlcohol = (e) => {
    setAlcohol(convertToBool(e.target.value));
  };

  const handleDiet = (e) => {
    setDiet(e.target.value);
  };
  const handlePerforming = (e) => {
    setPerforming(convertToBool(e.target.value));
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  function convertToBool(value) {
    let bool;
    if (value === "true") {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Kommer du på bröllopet?</label>
          <div className=" radio">
            <input
              className="form-check-input"
              name="attending"
              type="radio"
              value={true}
              checked={attending === true}
              onChange={handleAttending}
            />
            <label className="form-check-label">Jag kommer</label>
          </div>
          <div className="radio">
            <input
              className="form-check-input"
              name="attending"
              type="radio"
              value={false}
              checked={attending === false}
              onChange={handleAttending}
            />
            <label className="form-check-label">Jag kommer inte</label>
          </div>
        </div>

        {attending === true && (
          <>
            <div className="form-group">
              <label>Vill du ha alkoholhaltig eller alkoholfri dryck?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="alcohol"
                  type="radio"
                  value={true}
                  checked={alcohol === true}
                  onChange={handleAlcohol}
                />
                <label className="form-check-label">Alkoholhaltig dryck</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="alcohol"
                  type="radio"
                  value={false}
                  checked={alcohol === false}
                  onChange={handleAlcohol}
                />
                <label className="form-check-label">Alkoholfri dryck</label>
              </div>
            </div>

            <div className="form-group">
              <label>Har du några allergier/matpreferenser?</label>
              <textarea
                className="form-control"
                rows="3"
                onChange={handleDiet}
                defaultValue={diet}
              ></textarea>
            </div>

            <div className="form-group">
              <label>
                Vill du göra något uppträdande eller hålla tal under middagen?
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="performing"
                  type="radio"
                  value={true}
                  checked={performing === true}
                  onChange={handlePerforming}
                />
                <label className="form-check-label">Ja</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  name="performing"
                  type="radio"
                  value={false}
                  checked={performing === false}
                  onChange={handlePerforming}
                />
                <label className="form-check-label">Nej</label>
              </div>
              {performing === true && (
                <div className="form-group">
                  <label>Ange email så kontaktar toastmastern dig</label>
                  <input
                    type="email"
                    className="form-control"
                    rows="3"
                    defaultValue={email}
                    onChange={handleEmail}
                  />
                </div>
              )}
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
