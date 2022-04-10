import React, { useState } from "react";

import Friendlist from "./Friendlist";
const host="https://phr-backend.herokuapp.com";
function Friends() {
  const [friendMail, setFriendMail] = useState("");
  const handleonChange = e => {
    setFriendMail({ ...friendMail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { email } = friendMail;
    const response = await fetch(`${host}/api/auth/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ email }),
    });
    const json = await response.json();
    console.log(json);
  };
  return (
 
      <div className='container my-2'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <h1 className='text-center display-4 my-4'>Add Friend</h1>
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

              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
            <Friendlist></Friendlist>
          </div>
        </div>
      </div>
   
  );
}

export default Friends;
