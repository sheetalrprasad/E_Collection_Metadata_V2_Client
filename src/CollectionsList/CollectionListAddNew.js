import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionListApp.css";
import axios from '../api/axios';
import { ALL_E_COLLECTIONS_URL, ALL_E_COLLECTIONS_ADD_URL, ALL_VENDOR_NAME_URL } from "../Constants/constants";

function CollectionListAddNew () {
    
    const [vendorNames, setVendorNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
              const { data } = await axios.get(ALL_VENDOR_NAME_URL);
              setVendorNames(data);
            } catch (err) {
              console.error(err);
            }
          };
          fetch();
    }, []);

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = document.querySelector("form");
        console.log("form: ",form);
        const formData = new FormData(e.target);
        console.log("formData:",formData);
        try{
        const response = await axios.post(ALL_E_COLLECTIONS_ADD_URL,
                formData,
                {
                    headers: { 'Content-Type': `application/json`},
                }
            );
        

            console.log(JSON.stringify(response?.status));
            if (response?.status===200){
                alert("Add Successful.");
                navigate("/allcollections");
            }else {
                alert("Add Failed.");
            }
            
        } catch(err){
            console.log(err);
        }

    };


      return (
        <div className="collections table-responsive-sm">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" href={ ALL_E_COLLECTIONS_URL }>View/Edit</a>
                    <a className="nav-item nav-link" href={ ALL_E_COLLECTIONS_ADD_URL }>Add New</a>
                    <a className="nav-item nav-link" href="/">Search Alma</a>
                    </div>
                </div>
            </nav>
                
            <h3>Add E Record</h3>

              <div className="add-973E-form">

              <form id="modifyEcollections" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">


                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="collectionID">Collection ID:</label>
                    <input type="number" className="form-control" name="collectionID" id="collectionID"/>
                    </div> <br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-6" htmlFor="collectionName">Collection Name:</label>
                    <input type="text" className="form-control" name="collectionName" id="collectionName"/>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="resourceType">Resouce Type</label>
                    
                    <select name="resourceType" id="resourceType"  className="form-select" multiple>
                        <option value="book">Book</option>
                        <option value="audio">Audio</option>
                        <option value="streaming audio">Streaming Audio</option>
                        <option value="video">Video</option>
                        <option value="streaming video">Streaming Video</option>
                        <option value="journal">Journal</option>
                        <option value="newspaper">Newspaper</option>
                        <option value="govdoc">Gov Doc</option>
                        <option value="masterthesis">Master Thesis</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="bibSource">BIB Source</label>
                    <select name="bibSource" id="bibSource" className="form-select">
                        <option value="vendor">Vendor</option>
                        <option value="CZ">CZ</option>
                        <option value="WCM">WCM</option>
                        <option value="OCLC">OCLC</option>
                        <option value="vendor">Vendor</option>
                        <option value="-">?</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="updateFreq">Update Frequency</label>
                    <select name="updateFreq" id="updateFreq" className="form-select">
                        <option value="monthly">Monthly</option>
                        <option value="one time">One time</option>
                        <option value="-">?</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="active">Active?</label>
                    <select name="active" id="active" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="perpetual">Perpetual?</label>
                    <select name="perpetual" id="perpetual" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        <option value="2">Some</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="aggregator">Aggregator?</label>
                    <select name="aggregator" id="aggregator" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="datasync">Data Sync?</label>
                    <select name="datasync" id="datasync" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="oa">OA?</label>
                    <select name="oa" id="oa" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="reclamation">Reclamation?</label>
                    <select name="reclamation" id="reclamation" className="form-select">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    </div><br/>
                </div>

               
                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-4" htmlFor="collectionVendor">Vendor</label>
                    <select name="collectionVendor" id="collectionVendor" className="form-select">
                        <option value="-">?</option>
                        {
                            vendorNames.map(vendor => <option key={vendor['Vendor Name']} value={vendor['Vendor Name']}>{vendor['Vendor Name']} </option>)
                        }
                    </select>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <label className="control-label col-sm-8" htmlFor="collectionNotes">Note</label>
                    <div className="text-area">
                        <textarea type="text" name="collectionNotes" id="collectionNotes" className="form-control flex-child" rows="3"></textarea>
                    </div>
                    </div>
                </div>
                <input type ="submit" className="btn btn-primary align-btn"/>

                </form>
              
              </div>
            </div>
    )
};

export default CollectionListAddNew;