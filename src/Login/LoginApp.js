import React from "react";
import { useRef, useState, useEffect } from "react";



const LoginApp = () =>{

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [errMsg, setErrMsg] = useState();

    return (
        <div>

        </div>
    )
    
};

export default LoginApp;