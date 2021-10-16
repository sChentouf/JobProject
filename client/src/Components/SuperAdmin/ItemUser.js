import axios from "axios";
import validate from 'validator';
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";


const ItemUser = (props) => {

    const [dataUser, setdataUser] = useState(props.user);
console.log(dataUser)

        // Modifier LES VALEURS
    const handleChange = (e,id) => {
        setdataUser({...dataUser, [e.target.name]: e.target.value})
      }

      const UpdateInfosUser = (dataUser) => {
       if(!validate.isEmail(dataUser.email)) {
          alert('warning email invalid');
        }
         else
          axios.post("http://localhost:8082/candidate/" + dataUser.id, {
            // if(props.match.params == undefined)
              name: dataUser.name,
              first_name: dataUser.first_name,
              email: dataUser.email,
              phone: dataUser.phone,
              adress:  dataUser.adress,
              postal_code: dataUser.postal_code,
              city: dataUser.city,
              birth_date:  dataUser.birth_date,
              password:  dataUser.password,
              // confirm_password:  user.confirm_password,
            }).then((response) => {
              console.log(response);
            });
      };

      const [formUpdate, setFormUpdate] = useState(false);


      //SUPPRIMER USER
      const Delete = () => {
        axios
          .delete("http://localhost:8082/candidate/" + dataUser.id)
          .then((response) => {
            console.log(response);
          });
      };



 return (
        <div>
                {/* USER  */}
                <div>
                            <div>
                                {dataUser &&
                                    <table key={dataUser.id}>
                                    <tr>
                                        <th>Name</th>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Adress</th>
                                        <th>Postal code</th>
                                        <th>City</th>
                                        <th>Phone</th>
                                        <th>Birth date</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        <td>{dataUser.name}
                                        {formUpdate && <input type="text" name="name" 
                                        value={dataUser.name} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.first_name}
                                        {formUpdate && <input type="text" name="first_name" 
                                        value={dataUser.first_name} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.email}
                                        {formUpdate && <input type="email" name="email" 
                                        value={dataUser.email} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.adress}
                                        {formUpdate && <input type="text" name="adress" 
                                        value={dataUser.adress} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.postal_code}
                                        {formUpdate && <input type="numeric" name="postal_code" 
                                        value={dataUser.postal_code} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.city}
                                        {formUpdate && <input type="text" name="city" 
                                        value={dataUser.city} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.phone}
                                        {formUpdate && <input type="tel" name="tel" 
                                        value={dataUser.phone} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.birth_date}
                                        {formUpdate && <input type="date" name="birth_date" 
                                        value={dataUser.birth_date} onChange={(e) => {handleChange(e); }}/> }
                                        </td>
                                        <td>{dataUser.gender}
                                        {formUpdate && 
                                            <select name="gender" id="gender"  onChange={(e) => {handleChange(e); }}>
                                            <option value="Girl">Girl</option>
                                            <option value="Boy">Boy</option>
                                            <option value="Non_binary">Non binary</option>
                                            </select>}
                                        </td>
                                        <td>
                                            <button onClick={() => setFormUpdate(!formUpdate)}>Update</button>
                                            <button onClick={e => UpdateInfosUser(dataUser)} >Go</button>
                                        </td>
                                        <td>
                                        <button onClick={(e) => Delete()}>Delete user</button>
                                        </td>
                                    </tr>
                                    </table>}
                            </div>
        </div>
                                
 </div>
 )
}

export default ItemUser;
