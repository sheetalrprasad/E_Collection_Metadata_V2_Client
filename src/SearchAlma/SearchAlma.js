import React from 'react';
import axios from '../api/axios';
import { useState } from 'react';
import { SEARCH_ALMA_API_URL } from '../Constants/constants';
import AlmaSubPageDetails from './AlmaSubPageDetails';


const SearchAlma = () => {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionId, setCollectionId] = useState('');
    const [errorData, setErrorData] = useState('');
    const [show, setShow] = useState(false);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        setCollectionId(formDataObj.almaid);

        await axios.post(SEARCH_ALMA_API_URL,formDataObj,
            {
                headers: { 
                    'Content-Type': `application/json`,
                    'Accept': 'application/json'
                },
            }
        ).then((response) => { 
            setCollectionList(response.data);
        }).catch((error) => { 
            console.log("Error:",error); 
            setCollectionList({});
            setErrorData(error.code+" - "+error.message);
        }); 

        setShow(true);
        
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
            <br/>
            <div>
                {show ? <AlmaSubPageDetails collectionList={collectionList} collectionId={collectionId} errorData={errorData}/> : <p></p>}
            </div>
        </div>
          
    </div>
};

export default SearchAlma;