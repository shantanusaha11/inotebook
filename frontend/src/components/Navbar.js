import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import notebook from '../assets/notebook.png';

function Navbar() {
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    history.push("/login")
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <img src={notebook} alt="notebook" height="57rem" />
            iNotebook
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mb-1">
                <Link className={`nav-link ${ location.pathname === "/" ? "active" : "" }`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/Signup" role="button">
                Signup
              </Link>
            </form>:
            <button className="btn btn-primary" onClick={handleLogout} >Logout</button>
            }
          </div>  
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
