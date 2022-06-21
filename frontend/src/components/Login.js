import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {

  document.title = "iNotebook | Login to your account"

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://inotebook-app-code.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
          localStorage.setItem('token',json.authtoken);
          props.showAlert("logged in successfully","success")
            history.push("/");

    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
