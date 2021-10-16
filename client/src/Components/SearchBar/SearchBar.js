import React, { useEffect, useState } from "react";
//import axios from "axios";
import "./SearchBar.css";
//import Annoucement from "../Announcement/Annoucement";
const SearchBar = () => {
  const [nameJob, setNameJob] = useState("");
  const ResultSearch = () => {};
  return (
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
  );
};
export default SearchBar;
