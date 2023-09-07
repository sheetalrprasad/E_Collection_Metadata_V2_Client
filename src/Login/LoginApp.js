import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, HOME_URL } from "../Constants/constants";
import "./LoginApp.css";

import axios from '../api/axios';

axios.defaults.withCredentials = true;

const LoginApp = ({setAuthenticated}) =>{

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState();
    const [loggedIn,setLoggedIn] = useState(false);
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setLoggedIn(true);
            navigate(HOME_URL);
        } else {
            setLoggedIn(false);
        }
    }, [navigate]);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL,
                    JSON.stringify({user, pwd}),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
           
                localStorage.setItem('user', response.data[0].Name);
                setPwd('')
                navigate(HOME_URL);
                setLoggedIn(true);
                setAuthenticated(true);
                
        } catch(err){
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400){
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            setLoggedIn(false);
            setAuthenticated(false);
        }


        
    }

      if (!loggedIn) {
            return (
                <div>
                    <div className="form-group login">
                                    <section>
                                        <h1>Sign In</h1>
                                        <form onSubmit={(e) => handleSubmit(e) }>
                                            
                                            <label htmlFor="username">Username:</label>
                                            <input 
                                                type="text" 
                                                id="username"
                                                className="form-control" 
                                                autoComplete="off" 
                                                onChange={(e) => setUser(e.target.value)}
                                                value={user}
                                                required
                                            />

                                            <label htmlFor="password">Password:</label>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                className="form-control"
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={pwd}
                                                required
                                            />

                                            <button type="submit" className="btn btn-primary login-button">Sign In</button>

                                            <p>
                                                Need an Account?<br/>
                                                Reach out to admin for creation of new account.
                                            </p>
                                            <p className="error-msg">{ errMsg ? errMsg : ''}</p>
                                        </form>
                                    </section>
                                </div>
                    </div>
            )
            
        } 
};
export default LoginApp;