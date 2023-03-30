import React from "react";
import { useEffect, useState } from "react";
import "./E_Collection.css";
import axios from '../api/axios';

const E_COLLECTIONS_ADD_URL = "/ecollections-add";

function EcollectionAddNew () {
    
    const [msg, setMsg] =  useState(() => {
      return localStorage.getItem('msg') || ''
    });
    
    useEffect(() => {
      localStorage.setItem('msg', msg);
    }, [msg]);

    
    const handleSubmit = async (e) =>{
          const form = document.querySelector("form");
          console.log("form: ",form);
          const formData = new FormData(e.target);
          console.log("formData:",formData);
          try{
            const response = await axios.post(E_COLLECTIONS_ADD_URL,
                    formData,
                    {
                        headers: { 'Content-Type': `application/json`},
                    }
                );
           

                console.log(JSON.stringify(response?.status));
                if (response?.status===200){
                  setMsg("Update Successful.")
                }else {
                  setMsg("Update Failed.")
                }
                
        } catch(err){
          console.log(err);
        }

    };


      return (
        <div className="collections table-responsive-sm">
          <h2>Add E Record</h2>
                
              <div className="add-973E-form">

                <form id="adde973E" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="e973id">Collection ID:</label>
                      <input type="number" className="form-control" name="e973id" id="e973id" required/>
                    </div> <br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-6" htmlFor="e973name">Collection Name in 973:</label>
                      <input type="text" className="form-control" name="e973name" id="e973name" required/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="e973bib">973 in All BIB?</label>
                      <select name="e973bib" id="e973bib" className="form-select" required>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="e973nr">973 Norm Rule?</label>
                      <select name="e973nr" id="e973nr" className="form-select" required> 
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-4" htmlFor="e973iz">IZ Only?</label>
                      <select name="e973iz" id="e973iz" className="form-select" required>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="control-label col-sm-8" htmlFor="e973note">Note:</label>
                      <div className="text-area">
                        <textarea type="text" name="e973note" id="e973note" className="form-control flex-child" rows="3" ></textarea>
                      </div>
                    </div>
                  </div>
                  <input type ="submit" className="btn btn-primary align-btn"/>

                </form>
              
              </div>
            </div>
    )
};

export default EcollectionAddNew;