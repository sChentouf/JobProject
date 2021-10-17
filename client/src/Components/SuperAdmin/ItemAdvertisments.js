import axios from "axios";
import validate from "validator";
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";

const ItemAdvertisments = (props) => {
  const [dataAdvertisement, setdataAdvertisement] = useState(
    props.advertisement
  );
  console.log(dataAdvertisement);

  // Modifier LES VALEURS
  const handleChangeAdv = (e, id) => {
    setdataAdvertisement({
      ...dataAdvertisement,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateInfosadvertisement = (dataAdvertisement) => {
    axios
      .post("http://localhost:8082/advertisements/" + dataAdvertisement.id, {
        title: dataAdvertisement.title,
        description: dataAdvertisement.description,
        date: dataAdvertisement.date,
        compagnie_id: dataAdvertisement.compagnie_id,
        contrat_type: dataAdvertisement.contrat_type,
        short_description: dataAdvertisement.short_description,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const [formUpdate, setFormUpdate] = useState(false);

  // SUPPRIMER advertisement
  const Delete = (dataAdvertisement) => {
    axios
      .delete("http://localhost:8082/advertisements/" + dataAdvertisement.id)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      {/* ADVERTISEMENTS  */}
      <div>
        <div>
          {dataAdvertisement && (
            <table key={dataAdvertisement.id}>
              <tr>
                <th>title</th>
                <th>description</th>
                <th>date</th>
                <th>compagnie_id</th>
                <th>contrat_type</th>
                <th>short_description</th>
              </tr>
              <tr>
                <td>
                  {dataAdvertisement.title}
                  {formUpdate && (
                    <input
                      type="text"
                      name="title"
                      value={dataAdvertisement.title}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  {dataAdvertisement.description}
                  {formUpdate && (
                    <input
                      type="text"
                      name="description"
                      value={dataAdvertisement.description}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  {dataAdvertisement.date}
                  {formUpdate && (
                    <input
                      type="date"
                      name="date"
                      value={dataAdvertisement.date}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  {dataAdvertisement.compagnie_id}
                  {formUpdate && (
                    <input
                      type="number"
                      name="compagnie_id"
                      value={dataAdvertisement.compagnie_id}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  {dataAdvertisement.contrat_type}
                  {formUpdate && (
                    <input
                      type="text"
                      name="contrat_type"
                      value={dataAdvertisement.contrat_type}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  {dataAdvertisement.short_description}
                  {formUpdate && (
                    <input
                      type="text"
                      name="short_description"
                      value={dataAdvertisement.short_description}
                      onChange={(e) => {
                        handleChangeAdv(e);
                      }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => setFormUpdate(!formUpdate)}>
                    Update
                  </button>
                  <button
                    onClick={(e) => UpdateInfosadvertisement(dataAdvertisement)}
                  >
                    Go
                  </button>
                </td>
                <td>
                  <button onClick={(e) => Delete(dataAdvertisement)}>
                    Delete Advertisement
                  </button>
                </td>
              </tr>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemAdvertisments;
