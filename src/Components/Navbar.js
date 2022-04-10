import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        PHR
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/' aria-current='page'>
              Home
            </Link>
          </li>
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          {localStorage.getItem("auth-token") ? (
            <div>
              <button className='btn btn-primary mx-2' onClick={handleLogout}>
                Log out
              </button>
              <Link className='btn btn-primary' to='/friends'>
                Friends
              </Link>
            </div>
          ) : (
            <div>
              <Link className='btn btn-primary mx-2' to='/login'>
                Login
              </Link>
              <Link className='btn btn-primary' to='/signup'>
                Signup
              </Link>
            </div>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
