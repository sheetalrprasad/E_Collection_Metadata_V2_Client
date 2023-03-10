import React from "react";
import { useRef, useState, useEffect } from "react";
import "./LoginApp.css";



const LoginApp = () =>{

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(()=> {
        userRef.current.focus();
    },[])

    useEffect(()=> {
        setErrMsg('');
    },[user, pwd])

    const handleSubmit = async (e) =>{

        setSuccess(true);
        console.log(user, pwd);
        //call api
        setUser('');
        setPwd('');
        
        e.preventDefault();
        
    }

    return (
        <div>
            { success ? ( 
                <section>
                    <h1>You are logged In.</h1>
                    <p><a href="/"> Home</a></p>
                </section>
                ) : (
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
                                </form>
                            </section>
                        </div>
                    )
                }
        </div>
    )
    
};

export default LoginApp;