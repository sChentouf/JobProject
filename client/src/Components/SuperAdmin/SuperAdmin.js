import axios from "axios";
import validate from 'validator';
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";
import FormRegistrationBuisness from "../FormRegistrationBuisness/FormRegistrationBuisness";
import CreateAnnoucement from "../CreateAnnoucement/CreateAnnoucement";
import FormApply from "../FormApply/FormApply";
import ItemUser from "../SuperAdmin/ItemUser";
import ItemBuisness from "../SuperAdmin/ItemBuisness";
import ItemAdvertisments from "../SuperAdmin/ItemAdvertisments";
import ItemApplied from "../SuperAdmin/ItemApplied";


const SuperAdmin = (props) => {

    const [dataUser, setdataUser] = useState();
    const [tabUser, setTabUser] = useState(false);

    const [dataBuis, setdataBuis] = useState();
    const [tabBuis, setTabBuis] = useState(false);

    const [dataAdvert, setdataAdvert] = useState();
    const [tabAdvert, setTabAdvert] = useState(false);

    const [dataApplied, setdataApplied] = useState();
    const [tabApplied, setTabApplied] = useState(false);

    // RECUPERER LES VALEURS

    function getDataUser() {
        axios.get("http://localhost:8082/candidate/")
            .then((res) => {
                console.log(res.data)
                setdataUser(res.data);
            })
        setTabUser(!tabUser)
    }

    function getDataBuisness() {
        axios.get("http://localhost:8082/buisness/")
        .then((res) => {
            console.log(res.data)
            setdataBuis(res.data);
        })
        setTabBuis(!tabBuis)
    }
    function getDataAdvert() {
        axios.get("http://localhost:8082/advertisements/")
        .then((res) => {
            console.log(res.data)
            setdataAdvert(res.data);
        })
            setTabAdvert(!tabAdvert)
    }

    function getDataApplied() {
        axios.get("http://localhost:8082/applied/")
        .then((res) => {
            console.log(res.data)
            setdataApplied(res.data);
        })
        setTabApplied(!tabApplied)
    }

    // AFFICHER LES TABLEAU AU CLICK 
  
    const [formCreateUser, setformCreateUser] = useState(false);
    const [formCreateBuisness, setformCreateBuisness] = useState(false);
    const [formCreateAdvert, setformCreateAdvert] = useState(false);
    const [formCreateApplied, setformCreateApplied] = useState(false);


   
  
    

    return (


        <div>
            <div id="btn_get">
                {/* USER  */}
                <div>
                    <h2>User</h2>
                    <button onClick={e => getDataUser()}>get candidate</button>
                    <button onClick={() => setformCreateUser(!formCreateUser)}>create candidate</button>
                    {formCreateUser && <FormRegistrationUser />}
                    {tabUser &&
                    <div>{dataUser
                     && dataUser.map((user) => <ItemUser user={user} />)}
                     </div>}
                </div>
                {/* BUISNESS  */}
                <div>
                    <h2>Buisness</h2>
                    <button onClick={e => getDataBuisness()}>get buisness</button>
                    <button onClick={() => setformCreateBuisness(!formCreateBuisness)}>create buisness</button>
                    {formCreateBuisness && <FormRegistrationBuisness />}
                    {tabBuis &&
                    <div>{dataBuis
                     && dataBuis.map((buisness) => <ItemBuisness buisness={buisness} />)}
                     </div>}
                </div>
                {/* ADVERTISMENT  */}
                <div>
                    <h2>Advertisements</h2>
                    <button onClick={e => getDataAdvert()}>get Advertisements</button>
                    <button onClick={() => setformCreateAdvert(!formCreateAdvert)}>create advertisement</button>
                    {formCreateAdvert && <CreateAnnoucement />}
                    {tabAdvert &&
                    <div>{dataAdvert
                     && dataAdvert.map((advertisement) => <ItemAdvertisments advertisement={advertisement} />)}
                     </div>}
                </div>
                {/* APPLIED  */}
                <div>
                    <h2>Applied</h2>
                    <button onClick={e => getDataApplied()}>get Applied</button>
                    <button onClick={() => setformCreateApplied(!formCreateApplied)}>create Applied</button>
                    {formCreateApplied && <FormApply />}
                    {tabApplied &&
                    <div>{dataApplied
                     && dataApplied.map((applied) => <ItemApplied applied={applied} />)}
                     </div>}
                 </div>
                    
                </div>
            </div>
        
    )
}

export default SuperAdmin;
