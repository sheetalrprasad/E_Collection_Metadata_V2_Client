import React from 'react';
import axios from '../api/axios';
import { useState } from 'react';
import { SEARCH_ALMA_API_URL } from '../Constants/constants';


const SearchAlma = () => {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionId, setCollectionId] = useState('');
    const [errorData, setErrorData] = useState('');
    
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
            <div>
                <br/>
                {Object.keys(collectionList).length > 0 ? <div>
                    <h5>Collection Information</h5>
                    <ul>
                        <li><b>Name:</b> {collectionList.name}</li>
                        <li><b>Collection ID:</b> {collectionId}</li>
                        <li><b>Num of Portfolios:</b> {collectionList.numport}</li>
                        <li><b>Perpetual?:</b> {collectionList.perp}</li>
                        <li><b>Aggregator?:</b> {collectionList.aggre}</li>
                        <li><b>OA?:</b> {collectionList.free}</li>
                        <li><b>Local?:</b> {collectionList.iz}</li>
                        <li><b>Proxy?:</b> {collectionList.proxy}</li>
                        <li><b>CDI?:</b> {collectionList.cdi}</li>
                        <li><b>PO:</b> {collectionList.po}</li>
                        <li><b>Interface:</b> {collectionList.interface}</li>
                        <li><b>Description:</b> {collectionList.des}</li>
                        <li><b>Internal Description:</b> {collectionList.internal_des}</li>
                        <li><b>Public Note:</b> {collectionList.pub_note}</li>
                    </ul>

                    <h5>Service Information</h5>
                    <ul>
                        <li><b>Num of Portfolios: {collectionList.sernum}</b></li>
                        {
                            collectionList.serviceData.map((serviceData, index) => (
                            <div>
                                <li><b>Service{index+1} Available?: </b>{serviceData.servail}</li>
                                <li><b>Service{index+1} Portfolio:</b> {serviceData.sernum}</li>
                                <li><b>Service{index+1} description: </b>{serviceData.serdesc}</li>
                            </div>
                            ))
                        }
                    </ul>

                </div> : <div> 
                    {errorData !=="" ? <p className='error-msg'>{errorData}</p> : <p></p> }
                </div>
                }
            </div>
        </div>
          
    </div>
};

export default SearchAlma;