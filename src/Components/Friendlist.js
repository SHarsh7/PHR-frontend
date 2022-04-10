import React, { useContext, useEffect } from "react";
import friendContext from "../Context/Friends/friendContext";
import docContext from "../Context/Docs/docContext";
import { useNavigate } from "react-router-dom";
import AddFriend from "./AddFriend";
const host="https://phr-backend.herokuapp.com";

function Friendlist() {
  //Friend Context
  const context = useContext(friendContext);
  const { friends, accessFrom, fetchList, fetchFrieds, removeFriend } = context;

  //Doc context
  const context1 = useContext(docContext);
  const {  fetchDoclistId, friendDocList } = context1;

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      const func=async ()=>{
        await fetchList();
        await fetchFrieds();
        await fetchDoclistId();
      }
     func();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  //Remove the access
  const onRemove = id => {
    removeFriend(id);

    //To fetch new data
    fetchList();
    fetchFrieds();
  };

  //See the friend Docs
  const seeFreindsDocs = id => {
    fetchDoclistId(id);
  };

  return (
    <div className='container my-2'>
      <div className='row '>
        <div className='col-md-6 m-auto'>
          <h1 className='text-center display-4 my-4'>Add a friend</h1>
          <AddFriend />
          <h1 className='text-center display-4 my-4'>Friend List</h1>
          <div className='container d-flex flex-row  justify-content-center'>
            <div className='dropdown'>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                You have Given Access to these people
              </button>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                {friends.map(friend => {
                  return (
                    <div key={friend.uids} className='d-flex'>
                      <p className='dropdown-item'>{friend.name}</p>
                      <button
                        className='btn btn-primary mx-2'
                        onClick={() => {
                          onRemove(friend.uids);
                        }}>
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='dropdown mx-3'>
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                id='dropdownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'>
                You have Access From these people
              </button>
              <div
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                {accessFrom.map(access => {
                  return (
                    <div className='d-flex' key={access.uids}>
                      <p className='dropdown-item'>{access.name}</p>
                      <button
                        onClick={() => {
                          seeFreindsDocs(access.uids);
                        }}
                        className='btn btn-primary mx-3'>
                        See Docs
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h1 className='text-center display-4 my-4'>Friend's Docs</h1>
            {friendDocList
              ? friendDocList.map(doc => {
                  return (
                    <div className='list-group' key={doc._id}>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href={`${host}/api/docs/readfile/${doc.filename}`}
                        className='list-group-item list-group-item-action my-1'>
                        {doc.metadata.uploadName}
                      </a>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friendlist;
