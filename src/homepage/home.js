import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import sdsu_lib from '../static/sdsu_lib.jpg';
import "./home.css";

function HomePage () {

    const navigate = useNavigate();
    const [allowPage, setAllowPage] = useState(false);
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setAllowPage(true);
        } else {
            setAllowPage(false);
        }
    }, [navigate]);

   if (allowPage) {
        return (
            <div className="home">
                <h1>Welcome to Metadata of Collections' Page</h1>
                <img src={sdsu_lib} alt="SDSU Library" />
        
            </div>
        );
    } else {
        return <div className="home">
            <h1>This is Metadata of Collections' Page.</h1>
            <p>Please Login to proceed.</p>
            <img src={sdsu_lib} alt="SDSU Library" />
            <p className="link-to-login"><a href="/login"> Login </a></p>

        </div>
    }
};

export default HomePage;