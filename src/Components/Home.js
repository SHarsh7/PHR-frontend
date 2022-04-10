import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DocContext from "../Context/Docs/docContext";

const host ="https://phr-backend.herokuapp.com";
function Home() {
  const navigate = useNavigate();
  // To store data of uploadedFile
  const [file, setFile] = useState("");
  //To change the display name after upload
  const [displyName, setDisplayName] = useState("Choose File ...");

  const context = useContext(DocContext);
  const { docList, fetchDoclist, deleteDoc } = context;

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      fetchDoclist();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [docList]);

  //Delete functioality
  const removeDoc = id => {
    deleteDoc(id);
  };

  const handleChange = e => {
    const f = e.target.files[0];
    setFile(f);
    setDisplayName(f.name);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const url = `${host}/api/docs/upload`;
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: formData,
    });
    let json = await response.json();
    fetchDoclist();
    if (json.success) {
      alert("Doc uploaded");
    }
  };
  return (
    <div className='container my-2'>
      <div className='row'>
        <div className='col-md-6 m-auto'>
          <h1 className='text-center display-4 my-4'>Upload docs</h1>
          <form
            onSubmit={handleSubmit}
            method='POST'
            encType='multipart/form-data'>
            <div className='custom-file'>
              <input
                type='file'
                className='custom-file-input'
                id='validatedCustomFile'
                name='file'
                onChange={handleChange}
                required
              />
              <label
                className='custom-file-label'
                htmlFor='validatedCustomFile'>
                {displyName}
              </label>
            </div>
            <button type='submit' className='btn btn-primary my-3'>
              Submit
            </button>
          </form>
          <h4 className='text-center display-4 my-2'>Your Files</h4>
          {docList
            ? docList.map(doc => {
                return (
                  <div className='list-group' key={doc._id}>
                    <span className='d-flex align-items-baseline justify-content-between list-group-item list-group-item-action my-1'>
                      <a
                        target='_blank'
                        rel='noreferrer'
                        href={`${host}/api/docs/readfile/${doc.filename}`}>
                        {doc.metadata.uploadName}
                      </a>
                      <button
                        onClick={() => {
                          removeDoc(doc._id);
                        }}
                        className='btn btn-danger '>
                        Delete
                      </button>
                    </span>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Home;
