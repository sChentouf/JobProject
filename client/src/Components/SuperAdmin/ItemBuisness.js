import axios from "axios";
import validate from 'validator';
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";


const ItemBuisness = (props) => {

    const [dataBuisness, setdataBuisness] = useState(props.buisness);
console.log(dataBuisness)

        // Modifier LES VALEURS
    const handleChangeBuis = (e,id) => {
      setdataBuisness({...dataBuisness, [e.target.name]: e.target.value})

      }

      const UpdateInfosBuisness = (dataBuisness) => {
       if(!validate.isEmail(dataBuisness.email)) {
          alert('warning email invalid');
        }
         else
          axios.post("http://localhost:8082/buisness/" + dataBuisness.id, {
            // if(props.match.params == undefined)
              name: dataBuisness.name,
              activities: dataBuisness.activities,
              contact_name: dataBuisness.contact_name,
              number_employes: dataBuisness.number_employes,
              adress:  dataBuisness.adress,
              postal_code: dataBuisness.postal_code,
              city: dataBuisness.city,
              email:  dataBuisness.email,
              phone:  dataBuisness.phone,
              siret:  dataBuisness.siret,
              password:  dataBuisness.password,
            }).then((response) => {
              console.log(response);
            });
      };

      const [formUpdate, setFormUpdate] = useState(false);


      // SUPPRIMER BUISNESS
      const Delete = () => {
        axios
          .delete("http://localhost:8082/buisness/" + dataBuisness.id)
          .then((response) => {
            console.log(response);
          });
      };



 return (
        <div>
                {/* USER  */}
                <div>
                            <div>
                                {dataBuisness &&
                                    <table key={dataBuisness.id}>
                                    <tr>
                                        <th>Name</th>
                                        <th>activities</th>
                                        <th>contact_name</th>
                                        <th>number_employes</th>
                                        <th>Adress</th>
                                        <th>Postal code</th>
                                        <th>City</th>
                                        <th>email</th>
                                        <th>Phone</th>
                                        <th>siret</th>
                                    </tr>
                                    <tr>
                                        <td>{dataBuisness.name}
                                        {formUpdate && <input type="text" name="name" 
                                        value={dataBuisness.name} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.activities}
                                        {formUpdate && <input type="text" name="activities" 
                                        value={dataBuisness.activities} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.contact_name}
                                        {formUpdate && <input type="text" name="contact_name" 
                                        value={dataBuisness.contact_name} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.number_employes}
                                        {formUpdate && <input type="number" name="number_employes" 
                                        value={dataBuisness.number_employes} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.adress}
                                        {formUpdate && <input type="text" name="adress" 
                                        value={dataBuisness.adress} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.postal_code}
                                        {formUpdate && <input type="numeric" name="postal_code" 
                                        value={dataBuisness.postal_code} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.city}
                                        {formUpdate && <input type="text" name="city" 
                                        value={dataBuisness.city} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.email}
                                        {formUpdate && <input type="email" name="email" 
                                        value={dataBuisness.email} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.phone}
                                        {formUpdate && <input type="numeric" name="phone" 
                                        value={dataBuisness.phone} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                        <td>{dataBuisness.siret}
                                        {formUpdate && <input type="numeric" name="siret" 
                                        value={dataBuisness.siret} onChange={(e) => {handleChangeBuis(e); }}/> }
                                        </td>
                                     
                                        <td>
                                            <button onClick={() => setFormUpdate(!formUpdate)}>Update</button> 
                                            <button onClick={e => UpdateInfosBuisness(dataBuisness)} >Go</button>
                                        </td>
                                        <td>
                                         <button onClick={(e) => Delete()}>Delete buisness</button> 
                                        </td>
                                    </tr>
                                    </table>}
                            </div>
        </div>
                                
 </div>
 )
}

export default ItemBuisness;
