import React, { useState } from 'react';
import Axios from 'axios';

const RegistrationForm = () => {

  const token = localStorage.getItem('token');
  const [ attending, setAttending ] = useState();
  const [ alcohol, setAlcohol ] = useState();
  const [ diet, setDiet ] = useState();
  const [ performing, setPerforming ] = useState();

  const onSubmit = () => {
    Axios.post("http://localhost:5000/users/registration", {
      attending: attending,
      alcohol: alcohol,
      diet: diet,
      performing: performing
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
  }

  const handleAttending = (e) => {
    setAttending(e.target.value);
  }

  const handleAlcohol = (e) => {
    setAlcohol(e.target.value);
  }

  const handleDiet = (e) => {
    setDiet(e.target.value);
  }
  const handlePerforming = (e) => {
    setPerforming(e.target.value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Kommer du på bröllopet?</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="true" onChange={handleAttending} />
            <label className="form-check-label">
              Jag kommer
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="false" onChange={handleAttending} />
            <label className="form-check-label">
              Jag kommer inte
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Vill du ha alkoholfri eller alkoholhaltig dryck?</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="false" onChange={handleAlcohol} />
            <label className="form-check-label">
              Alkoholfri dryck
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="true" onChange={handleAlcohol} />
            <label className="form-check-label">
              Alkoholhaltig dryck
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Har du några allergier/matpreferenser?</label>
          <textarea class="form-control"  rows="3" onChange={handleDiet}></textarea>
        </div>

        <div className="form-group">
          <label>Vill du göra något uppträdande eller hålla tal under middagen?</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="true" onChange={handlePerforming} />
            <label className="form-check-label">
              Ja
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="false" onChange={handlePerforming} />
            <label className="form-check-label">
              Nej
            </label>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default RegistrationForm
