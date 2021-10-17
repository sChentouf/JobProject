import axios from "axios";
import validate from 'validator';
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";


const ItemApplied = (props) => {

    const [dataApplied, setdataApplied] = useState(props.applied);
console.log(dataApplied)

        // Modifier LES VALEURS
    const handleChangeApp = (e,id) => {
      setdataApplied({
        ...dataApplied,
         [e.target.name]: e.target.value,
        });
      }

      const UpdateInfosapplied = (dataApplied) => {
          axios
          .post("http://localhost:8082/applied/" + dataApplied.id, {
              motivation_people: dataApplied.motivation_people,
              advertisement_id: dataApplied.advertisement_id,
              candidate_id: dataApplied.candidate_id,
            }).then((response) => {
              console.log(response);
            });
      };

      const [formUpdate, setFormUpdate] = useState(false);


      // SUPPRIMER applied
      const Delete = () => {
        axios
          .delete("http://localhost:8082/applied/" + dataApplied.id)
          .then((response) => {
            console.log(response);
          });
      };



 return (
        <div>
                {/* APPLIED  */}
                <div>
                            <div>
                                {dataApplied &&
                                    <table key={dataApplied.id}>
                                    <tr>
                                        <th>Motivation</th>
                                        <th>candidate id</th>
                                        <th>advertisements id</th>
                                    </tr>
                                    <tr>
                                        <td>{dataApplied.motivation_people}
                                        {formUpdate && <input type="text" name="motivation_people" 
                                        value={dataApplied.motivation_people} onChange={(e) => {handleChangeApp(e); }}/> }
                                        </td>
                                        <td>{dataApplied.advertisement_id}
                                        {formUpdate && <input type="text" name="advertisement_id" 
                                        value={dataApplied.advertisement_id} onChange={(e) => {handleChangeApp(e); }}/> }
                                        </td>
                                        <td>{dataApplied.candidate_id}
                                        {formUpdate && <input type="text" name="candidate_id" 
                                        value={dataApplied.candidate_id} onChange={(e) => {handleChangeApp(e); }}/> }
                                        </td>
                                        <td>
                                            <button onClick={() => setFormUpdate(!formUpdate)}>Update</button> 
                                            <button onClick={e => UpdateInfosapplied(dataApplied)} >Go</button>
                                        </td>
                                        <td>
                                           <button onClick={(e) => Delete()}>Delete applied</button>   
                                        </td>
                                    </tr>
                                    </table>}
                            </div>
        </div>
                                
 </div>
 )
}

export default ItemApplied;
