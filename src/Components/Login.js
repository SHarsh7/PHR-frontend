import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host="https://phr-backend.herokuapp.com";
function Login(e) {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleonChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = creds;
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      //SAVE AUTH TOKEN & redirect
      localStorage.setItem("auth-token", json.token);
      navigate("/");
    } else {
      alert("Invalid");
    }
  };
  return (
    <div className='container my-2'>
      <div className='row'>
        <div className='col-md-6 m-auto'>
          <h1 className='text-center display-4 my-4'>Login Form</h1>
          <form onSubmit={handleSubmit} className='my-3'>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                onChange={handleonChange}
                className='form-control'
                name='email'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Password
              </label>
              <input
                type='password'
                onChange={handleonChange}
                name='password'
                className='form-control'
                id='exampleInputPassword1'
              />
            </div>

            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
