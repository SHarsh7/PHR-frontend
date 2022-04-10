import React, { useState } from 'react'
import DocContext from './docContext';

const host = "https://phr-backend.herokuapp.com";

function DocState(props) {
    // TO Store user's doc list
    const[docList,setDocList]=useState([]);
    // To store doc list of A freind
    const[friendDocList,setFriendDocList]=useState([]);
    
    // Fetching doc list
    const fetchDoclist =async ()=>{
        const response = await fetch(`${host}/api/docs/getfiles`, {
            method: "GET",
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          });
          const json = await response.json();
          setDocList(json);
    }

    //fetching doc list according to Id
    // Friend's doc list
    const fetchDoclistId= async (id)=>{
      const response = await fetch(`${host}/api/docs/getfiles/${id}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = await response.json();
      setFriendDocList(json);
    }

    // To Delete user's document
    const deleteDoc =async (id)=>{
      const response = await fetch(`${host}/api/docs/deletefile/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const json = await response.json();
      if(json.msg==="Success"){
        alert("Deleted Successfully!");
      }
    }
    


  return (
    
      <DocContext.Provider
        value={{
          docList,friendDocList, fetchDoclist,fetchDoclistId,deleteDoc
        }}>
        {props.children}
      </DocContext.Provider>
  
  )
}

export default DocState