import React from "react";
import { useNavigate } from "react-router-dom";
import "./P_Collection.css";
import axios from '../api/axios';
import { P_COLLECTIONS_URL, SEARCH_ALMA_URL } from "../Constants/constants";

const P_COLLECTIONS_ADD_URL = "/pcollections-add";

function PcollectionAddNew () {
    
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      
          e.preventDefault();
         
          const formData = new FormData(e.target);
        

          try{
            const response = await axios.post(P_COLLECTIONS_ADD_URL,
                    formData,
                    {
                        headers: { 'Content-Type': `application/json`},
                    }
                );

          
                if (response?.status===200){
                  alert("Add Successful.")
                  navigate("/pcollections")

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
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" href={ P_COLLECTIONS_URL }>View/Edit</a>
                    <a className="nav-item nav-link" href={ P_COLLECTIONS_ADD_URL }>Add New</a>
                    <a className="nav-item nav-link" href={ SEARCH_ALMA_URL }>Search Alma</a>
                    </div>
                </div>
            </nav>

          <h3>Add New P Record</h3>
                
              <div className="add-973P-form">

                <form id="add973P" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-6" htmlFor="p973name">Collection Name in 973:</label>
                      <input type="text" className="form-control" name="p973name" id="p973name" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-8" htmlFor="p973note">Note:</label>
                      <div className="text-area">
                        <textarea type="text" name="p973note" id="p973note" className="form-control flex-child" rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <input type ="submit" id="submit-add" className="btn btn-primary align-btn"/>

                </form>
              
              </div>

        </div> 
    )
};

export default PcollectionAddNew;