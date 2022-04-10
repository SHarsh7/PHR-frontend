import React, { useContext, useState } from "react";
import friendContext from "../Context/Friends/friendContext";

function AddFriend() {
    const context = useContext(friendContext);
    const[email,setEmail]=useState('');
    const { addFriend } = context;
    const handleSubmit=(e)=>{
        e.preventDefault();
        addFriend(email);
    }
    const handleonChange=(e)=>{
        setEmail(e.target.value);
    }
  return (
    <div>
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
    </div>
  );
}

export default AddFriend;
