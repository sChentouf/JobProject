import React, { useState } from "react";
import axios from "axios";
import ".././FormRegistrationUser/FormRegistrationUser.css";

const CreateAnnoucement = () => {
 
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [compagnie_id, setcompagnie_id] = useState("");
  const [contrat_type, setcontrat_type] = useState("");
  const [short_description, setshort_description] = useState("");

  const createAnnouc = () => {
      axios.post("http://localhost:8082/advertisements", {
        title: title,
        description: description,
        date: date,
        contrat_type: contrat_type,
        short_description: short_description,
        // compagnie_id: compagnie_id,
        })
        .then((response) => {
          console.log(response);
        });
  };

  return (
    <div id="registrationBuis">
      <div id="form_registrationBuis">
        <label>
          <b>Title</b>
        </label>
        <input
          type="text" onChange={(e) => {setTitle(e.target.value); }}
          placeholder="Enter title of your description" name="title"
        />
        <label>
          <b>Description</b>
        </label>
        <input
          type="text" onChange={(e) => {setdescription(e.target.value);}}
          placeholder="Enter the description" name="description"
        />
        <label>
          <b>Date</b>
        </label>
        <input
          type="date" onChange={(e) => {setdate(e.target.value); }}
         name="date"
        />
        <label>
          <b>Contrat type</b>
        </label>
        <input
          type="text" onChange={(e) => {setcontrat_type(e.target.value);}}
          placeholder="Enter the type of contrat" name="contrat_type"
        />
        <label>
          <b>Short description</b>
        </label>
        <input
          type="text" onChange={(e) => {setshort_description(e.target.value);}}
          placeholder="Enter a short description of your advertisements" name="short_description"
        />
        <button className="button_form" onClick={e =>createAnnouc()} id="submit_advert" value="create"
        >Create Advertisement</button>
      </div>
    </div>
  );
};

export default CreateAnnoucement ;
