import React, { useEffect, useState } from "react";
import "./AdminAccount.css";
import axios from "axios";

const UserAccount = (props) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log("zeze");
    axios
      .get("http://localhost:8082/candidate/" + props.match.params.id)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setUserData(response.data);
        }
      });
  }, [props]);
  console.log("response");
  return (
    <div>
      <div id="content_user_account">
        {userData && (
          <div id="info_user">
            <h3>Infos User</h3>
            <div>
              {/* if exist else defautl*/}

              <p>Name : {userData.name}</p>
              <p>First Name : {userData.first_name}</p>
              <p>Email : {userData.email}</p>
              {/* if exist*/}
              <p>Change password :</p>
            </div>
          </div>
        )}
        ;
        <div id="candidacy_user">
          <h3>candidacy user</h3>
          <ul>
            <li>"lien de toutes les annonces avec search bar ou pas ?"</li>
            <li>"liste et lien de tous les user avec search bar ou pas ?"</li>
          </ul>
        </div>
        <div></div>
      </div>
      <button>Delate count</button>
      <button>Logout</button>
    </div>
  );
};
export default UserAccount;
