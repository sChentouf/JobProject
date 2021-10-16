import axios from "axios";
import validate from 'validator';
import React, { useEffect, useState } from "react";
import "./SuperAdmin.css";
import FormRegistrationUser from "../FormRegistrationUser/FormRegistrationUser";
import FormRegistrationBuisness from "../FormRegistrationBuisness/FormRegistrationBuisness";
import ItemUser from "../SuperAdmin/ItemUser";
import ItemBuisness from "../SuperAdmin/ItemBuisness";
import ItemAdvertisments from "../SuperAdmin/ItemAdvertisments";


const SuperAdmin = (props) => {

    const [dataUser, setdataUser] = useState();
    const [tabUser, setTabUser] = useState(false);

    const [dataBuis, setdataBuis] = useState();
    const [tabBuis, setTabBuis] = useState(false);

    const [dataAdvert, setdataAdvert] = useState();
    const [tabAdvert, setTabAdvert] = useState(false);

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
        const promise = axios.get("http://localhost:8082/applied/")
        const data = promise.then((reponse) => reponse.data)
        console.log()

    }

    // AFFICHER LES TABLEAU AU CLICK 
  
    const [formCreateUser, setformCreateUser] = useState(false);
    const [formCreateBuisness, setformCreateBuisness] = useState(false);


   
  
    const [tabApplied, setTabApplied] = useState(false);

    return (


        <div>
            <div id="btn_get">
                {/* USER  */}
                <div>
                    <h2>User</h2>
                    <button onClick={e => getDataUser()}>get candidate</button>
                    <button onClick={() => setformCreateUser(!formCreateUser)}>create candidate</button>
                    {formCreateUser && <FormRegistrationUser />}
                    {dataUser
                     && dataUser.map((user) => <ItemUser user={user} />)}
                
                </div>
                {/* BUISNESS  */}
                <div>
                    <h2>Buisness</h2>
                    <button onClick={e => getDataBuisness()}>get buisness</button>
                    <button onClick={() => setformCreateBuisness(!formCreateBuisness)}>create buisness</button>
                    {formCreateBuisness && <FormRegistrationBuisness />}
                    {dataBuis
                     && dataBuis.map((buisness) => <ItemBuisness buisness={buisness} />)}
                </div>
                {/* ADVERTISMENT  */}
                <div>
                    <h2>Advertisements</h2>
                    <button onClick={e => getDataAdvert()}>get Advertisements</button>
                    {dataAdvert
                     && dataAdvert.map((advertisement) => <ItemAdvertisments advertisement={advertisement} />)}
                </div>
                {/* APPLIED  */}
                <div>
                    <h2>Applied</h2>
                    <button onClick={e => getDataApplied()}>get Applied</button>
                    {tabApplied &&
                        <div><p>fffffffnc</p></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SuperAdmin;
