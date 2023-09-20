import React from 'react';
import { useState } from "react";
import axios from '../api/axios';
import { SEARCH_ALMA_API_URL } from '../Constants/constants';


const SearchAlma = () => {

    const [collectionList, setCollectionList] = useState({});
    
    const handleSubmit = async (e) =>{
        
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log("Obj:",formDataObj);

        await axios.get(SEARCH_ALMA_API_URL+"/"+formDataObj["almaid"],
            {
                headers: { 'Content-Type': `application/json`},
            }
        ).then((response) => {
            console.log("Response: ",response.json());
            setCollectionList(response.data);
        }).catch((error) => {   
            console.log(error);
        });

    };


    return <div className="collections table-responsive-sm">

        <div className="modify-E-form">
            <h3>Search Alma Details</h3>
            <form id="modifyEcollections" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="almaid">Collection ID:</label>
                    <input type="number" className="form-control" name="almaid" id="almaid"/>
                    </div> <br/>
                </div>
                <button type="submit" className="btn btn-primary align-btn">Search</button>
            </form>
            { collectionList.length > 0 ?
                <div>
                    <h1> Results </h1>
                </div>
            :<></>}
        </div>
          
    </div>
};

export default SearchAlma;