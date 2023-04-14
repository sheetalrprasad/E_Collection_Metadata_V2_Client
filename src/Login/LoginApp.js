
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginApp.css";

import axios from '../api/axios';

const LOGIN_URL = '/auth';


const LoginApp = () =>{

    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState();

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
           
                localStorage.setItem('user', JSON.stringify(response?.data));
                setPwd('')
                navigate('/allcollections');
                
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
        }


        
    }

    return (
        <div>
            <div className="form-group login">
                            <section>
                                <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <h1>Sign In</h1>
                                <form onSubmit={(e) => handleSubmit(e) }>
                                    
                                    <label htmlFor="username">Username:</label>
                                    <input 
                                        type="text" 
                                        id="username"
                                        className="form-control" 
                                        ref={userRef} 
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
    
};

export default LoginApp;