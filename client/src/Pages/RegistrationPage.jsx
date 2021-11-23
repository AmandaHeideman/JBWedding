import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import axios from "axios";

const RegistrationPage = () => {
  const token = localStorage.getItem("token");
  const [registration, setRegistraion] = useState();
  const [fullName, setFullName] = useState();
  const [attending, setAttending] = useState();
  const [alcohol, setAlcohol] = useState();
  const [diet, setDiet] = useState();
  const [performing, setPerforming] = useState();
  const [email, setEmail] = useState();
  const [err, setErr] = useState();

  async function getRegistration() {
    await axios
      .get("http://localhost:5000/users/registration", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        let user = res.data.user;
        setFullName(user.fullName);
        setRegistraion(user);

        if (user.attending !== undefined) {
          if (user.attending) {
            setAttending("Ja");
          } else {
            setAttending("Nej");
          }
        }

        if (user.alcohol !== undefined) {
          if (user.alcohol) {
            setAlcohol("Alkoholhaltig dryck");
          } else {
            setAlcohol("Alkoholfri dryck");
          }
        }

        if (user.diet !== undefined) {
          setDiet(user.diet);
        }

        if (user.performing !== undefined) {
          if (user.performing) {
            setPerforming("Ja");
          } else {
            setPerforming("Nej");
          }
        }

        if (user.email !== undefined) {
          setEmail(user.email);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setErr("Du behöver logga in för att se den här sidan");
      });
  }

  useEffect(() => {
    getRegistration();
  }, []);

  return (
    <div className="registration">
      {fullName && (
        <div >
          {attending !== undefined ? (
            <>
          <h1 className="page-header center">{fullName}</h1>
            <div className="styled-div">
                    <h3 className="center">Din registrerade anmälan:</h3>
                
              <div className="d-flex justify-content-between">
                <p>Kommer du på bröllopet? </p>
                <p className="text-right"> {attending}</p>
              </div>
              {attending === "Ja" && (
                <>
                  
                  <div className="d-flex justify-content-between">
                    <p>Vill du ha alkoholfri eller alkoholhaltig dryck? </p>
                    <p className="text-right"> {alcohol}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Har du några allergier/matpreferenser? </p>
                    <p className="text-right"> {diet}</p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p>Vill du göra något uppträdande eller hålla tal under middagen? </p>
                    <p className="text-right"> {performing}</p>
                  </div>
                  {performing === "Ja" && 
                    <div className="d-flex justify-content-between">
                      <p>Email: </p>
                      <p className="text-right"> {email}</p>
                    </div>}
                </>
              )}
              <Link className="center"
                to={{
                  pathname: "/registration/edit",
                  state: { registration },
                }}
              >
                Uppdatera din anmälan
              </Link>
            </div>
            </>
          ) : (
            <RegistrationForm />
          )}
        </div>
      )}
      {err && <p>{err}</p>}
    </div>
  );
};

export default RegistrationPage;
