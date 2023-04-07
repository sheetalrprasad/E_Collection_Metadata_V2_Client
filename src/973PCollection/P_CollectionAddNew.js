import React from "react";
import { useEffect, useState } from "react";
import "./P_Collection.css";
import axios from '../api/axios';

const P_COLLECTIONS_ADD_URL = "/pcollections-add";

function PcollectionAddNew () {
    
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
            const response = await axios.post(P_COLLECTIONS_ADD_URL,
                    formData,
                    {
                        headers: { 'Content-Type': `application/json`},
                    }
                );
           

                console.log(JSON.stringify(response?.status));
                if (response?.status===200){
                  setMsg("Add Successful.")
                }else {
                  setMsg("Add Failed.")
                }
                
        } catch(err){
          console.log(err);
        }

    };

      return (
        <div className="collections table-responsive-sm">
          <h2>Add New P Record</h2>
                
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