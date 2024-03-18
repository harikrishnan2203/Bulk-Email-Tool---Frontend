import React, { useEffect, useState } from 'react';
import Context from './Context';
// import { useJwt } from "react-jwt";

const Provider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [composeRecepiantModal, setComposeRecepiantModal] = useState(false);
    const [exampleModalOfExcel, setExampleModalOfExcel] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const [logData, setLogData] = useState([]);

    // const token = localStorage.getItem("Auth-Token")
    // const { decodedToken } = useJwt(token || "");

  
    useEffect(()=>{
        if (localStorage.getItem("Auth-Token")) {
            setIsLoggedIn(true);
            }
      },[])
  

    return (
        <Context.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            composeRecepiantModal,
            setComposeRecepiantModal,
            exampleModalOfExcel,
            setExampleModalOfExcel,
            previewModal,
            setPreviewModal,
            logData,
            setLogData,
        }}>
            {props.children}
        </Context.Provider>
    );
};

export default Provider;
