import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Signup = (props) => {

  document.title = "iNotebook | Signup to your account"

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: ""});

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("https://inotebook-app-code.herokuapp.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("account successfully created","success")
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  };

export default Signup;
