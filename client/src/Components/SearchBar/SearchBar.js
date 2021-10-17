import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SearchBar.css";
import Annoucement from "../Announcement/Annoucement";

//import Annoucement from "../Announcement/Annoucement";

const SearchBar = () => {


  const [nameJob, setNameJob] = useState("");


  const ResultSearch = () => {
    axios
      .get("http://localhost:8082/advertisement/" + nameJob,)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setNameJob(response.data);

        }
      });
  };

  return (
    <div>
    <div id="search">
      <div>
        <input
          onChange={(e) => {
            setNameJob(e.target.value);
          }}
          type="text"
          placeholder="Job.."
        />
        <button onClick={(e) => ResultSearch()}>Search</button>
      </div>
    </div>

    {/* < Annoucement /> */}
    </div>
  );
};
export default SearchBar;






