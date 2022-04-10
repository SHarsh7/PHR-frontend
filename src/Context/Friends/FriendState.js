import React from "react";
import { useState } from "react";
import FriendContext from "./friendContext";

const host = "https://phr-backend.herokuapp.com";

function FriendState(props) {
  const [friends, setfriends] = useState([]);
  const [accessFrom, setAccessFrom] = useState([]);
  // To get all the friends
  const fetchList = async () => {
    const response = await fetch(`${host}/api/accessgiven/accessGiven`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    console.log(json)
    setfriends(json);
  };

  //TO get list of user who provided you access
  const fetchFrieds = async () => {
    const response = await fetch(`${host}/api/accessgiven/accessFrom`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setAccessFrom(json);
  };

  //to add a friend
  const addFriend = async email => {
    const response = await fetch(`${host}/api/accessgiven/addFriend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ email }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      fetchList();
      alert("Friend Added!");
    } else if (json.msg){
      alert(json.msg);
    }
  };

  //to remove a friend
  const removeFriend = async id => {
    const response = await fetch(`${host}/api/accessgiven/delteFriend/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    if(json.msg){
      alert("Friend Removed!");
    }
  };

  return (
    <div>
      <FriendContext.Provider
        value={{
          friends,
          accessFrom,
          fetchList,
          removeFriend,
          addFriend,
          fetchFrieds,
        }}>
        {props.children}
      </FriendContext.Provider>
    </div>
  );
}

export default FriendState;
