import React, { useState } from 'react';
import Axios from 'axios';

const RegistrationForm = () => {

  const [ attending, setAttending ] = useState();

  const onSubmit = () => {
    Axios.post("http://localhost:5000/users/registration", {
      attending: attending
    })
  }

  const handleAttending = (e) => {
    setAttending(e.target.value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Kommer du på bröllopet?</label>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="attending" value="true" onChange={handleAttending} />
            <label className="form-check-label" for="isAttending">
              Jag kommer
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="attending" value="false" onChange={handleAttending} />
            <label className="form-check-label" for="isNotAttending">
              Jag kommer inte
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
