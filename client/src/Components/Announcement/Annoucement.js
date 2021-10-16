import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonApply from "../ButtonApply/ButtonApply";
import ButtonLearnMore from "../ButtonLearnMore/ButtonLearnMore";
import Pop from "../Pop/Pop";
import "./Annoucement.css";

const Annoucement = () => {
  /* pour afficher la pop */
  const [pop, setPop] = useState();

  /* pour afficher la pop */
  // function showPop() {
  //   setPop(true);
  // }

  /* pour afficher le contenu de l'annonce */
  const [value, setValue] = useState();

  /* pour afficher le contenu de l'annonce */
  useEffect(() => {
    if (!value) {
      const promise = axios.get("http://localhost:8082/advertisements/", {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      promise.then((response) => {
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
    const [pop, setPop] = useState(false);

    const [data, setData] = useState(false);
    const [selectedid, setselectedid] = useState(0);

    return !data ? (
      <div id="contenant_annouc">
        {pop && <Pop id={selectedid} />}

        <div id="Annoucem">
          <h2>{props.title}</h2>
          <div>
            <p>{props.short}</p>
          </div>
          <ButtonLearnMore onClick={() => setData(!data)} />
          <ButtonApply
            onClick={() => {
              setPop(!pop);
              setselectedid(props.id);
            }}
          />
        </div>
      </div>
    ) : (
      <div id="contenant_annouc">
        {pop && <Pop />}
        <div id="Annoucem">
          <h2>{props.title}</h2>
          <h3>{props.compagnie}</h3>
          <div>
            <p>{props.date.split("T")[0]}</p>
            <p>{props.description}</p>
            <p>{props.contrat}</p>
          </div>
          <ButtonLearnMore onClick={() => setData(!data)} />
          <ButtonApply onClick={() => setPop(!pop)} />
        </div>
      </div>
    );
  }

  return <div>{value}</div>;
};

export default Annoucement;
