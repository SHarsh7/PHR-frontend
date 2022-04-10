import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host="https://phr-backend.herokuapp.com";
function Signup() {
  const [creds, setCreds] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleonChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = creds;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //SAVE AUTH TOKEN & redirect
      localStorage.setItem("auth-token", json.token);
      navigate("/");
    } else {
      alert("User Already Exists!");
    }
  };

  return (
    <div className='container my-2'>
      <div className='row'>
        <div className='col-md-6 m-auto'>
          <h1 className='text-center display-4 my-4'>Signup Form</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                onChange={handleonChange}
                type='text'
                className='form-control'
                id='text'
                name='name'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email
              </label>
              <input
                onChange={handleonChange}
                type='email'
                name='email'
                className='form-control'
                id='exampleInputEmail1'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Password
              </label>
              <input
                onChange={handleonChange}
                type='password'
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

export default Signup;
