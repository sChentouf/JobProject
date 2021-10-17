import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonLearnMore from "../ButtonLearnMore/ButtonLearnMore";
import "../Announcement/Annoucement.css";
import jwt from "jsonwebtoken";

const UserApplied = () => {
  /* pour afficher la pop */
  //const [pop, setPop] = useState();

  /* pour afficher la pop */
  // function showPop() {
  //   setPop(true);
  // }

  /* pour afficher le contenu de l'annonce */
  const [value, setValue] = useState();

  /* pour afficher le contenu de l'annonce */
  useEffect(() => {
    if (!value) {
      const localtoken = localStorage.getItem("myJWT");
      const decoded = jwt.verify(localtoken, "secret");
      axios
        .get("http://localhost:8082/advertisementt/" + decoded.id,{
          // compagnie={el.compagnie_id}
        })
        .then((response) => {
          // console.log(response.data)
          setValue(
            response.data.map((el) => (
              <Render
                id={el.id}
                title={el.title}
                short={el.short_description}
                date={el.date}
                description={el.description}
                compagnie={el.compagnie_id}
                contrat={el.contrat_type}
              />
            ))
          );
        });
    }
  });

  function Render(props) {
    const [data, setData] = useState(false);
    //const [selectedid, setselectedid] = useState(0);

    return !data ? (
      <div id="contenant_annouc">
        <div id="Annoucem">
          <h2>{props.title}</h2>
          <div>
            <p>{props.short}</p>
          </div>
          <ButtonLearnMore onClick={() => setData(!data)} />
        </div>
      </div>
    ) : (
      <div id="contenant_annouc">
        <div id="Annoucem">
          <h2>{props.title}</h2>
          <h3>{props.compagnie}</h3>
          <div>
            <p>{props.date.split("T")[0]}</p>
            <p>{props.description}</p>
            <p>{props.contrat}</p>
          </div>
          <ButtonLearnMore onClick={() => setData(!data)} />
        </div>
      </div>
    );
  }

  return <div>{value}</div>;
};

export default UserApplied;
