import React from "react";
import { useNavigate } from "react-router-dom";
import "./VendorListApp.css";
import axios from '../api/axios';
import { VENDOR_ADD_URL, VENDOR_URL } from "../Constants/constants";


function VendorAdd () {
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) =>{

    e.preventDefault();
    const form = document.querySelector("form");
    console.log("form: ",form);
    const formData = new FormData(e.target);
    console.log("formData:",formData);
    try{
      const response = await axios.post(VENDOR_ADD_URL,
              formData,
              {
                  headers: { 'Content-Type': `application/json`},
              }
          );
      

          console.log(JSON.stringify(response?.status));
          if (response?.status===200){
            alert("Add Successful.");
            navigate(VENDOR_URL);
            
          }else {
            alert("Add Failed.")
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
                    <a className="nav-item nav-link" href={ VENDOR_URL }>View/Edit</a>
                    <a className="nav-item nav-link" href={ VENDOR_ADD_URL }>Add New</a>
                    <a className="nav-item nav-link" href="/">Search Alma</a>
                    </div>
                </div>
            </nav>
          
          <h3>Add Vendor Record</h3>
                
              <div className="add-973E-form">

                <form id="adde973E" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="vendorId">Vendor ID:</label>
                      <input type="number" className="form-control" name="vendorId" id="vendorId" required/>
                    </div> <br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-6" htmlFor="vendorName">Vendor Name:</label>
                      <input type="text" className="form-control" name="vendorName" id="vendorName" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="vendorWeb">Vendor Web</label>
                      <input type="text" className="form-control" name="vendorWeb" id="vendorWeb" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="userName">User Name</label>
                      <input type="text" className="form-control" name="userName" id="userName" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="password">Password</label>
                      <input type="text" className="form-control" name="password" id="password" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-8" htmlFor="note">Note:</label>
                      <div className="text-area">
                        <textarea type="text" name="note" id="note" className="form-control flex-child" rows="3" ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-6" htmlFor="contact">Contact:</label>
                      <input type="text" className="form-control" name="contact" id="contact" required/>
                    </div><br/>
                  </div>

                  <input type ="submit" className="btn btn-primary align-btn"/>


                </form>
              
              </div>
              </div>
    )
};

export default VendorAdd;