import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VendorListApp.css";
import axios from '../api/axios';
import { VENDOR_EDIT_URL } from '../Constants/constants';

function VendorEdit () {
    
    const [vendorData, setVendorData] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [msg, setMsg] =  useState(() => {
      return localStorage.getItem('msg') || ''
    });
    const [textNote, setTextNote] = useState();
    const location = useLocation();
    const data = location.state;
    
    useEffect(() => {
      localStorage.setItem('msg', msg);
    }, [msg]);


    useEffect(() => {
      console.log(data);
      setVendorData(data);
    }, [data]);

    const handleTextChange = (e) => {
      setTextNote(e.target.value);
    }
    
    const handleSubmit = async (e) =>{

        const form = document.querySelector("form");
        console.log("form: ",form);
        const formData = new FormData(e.target);
    
        try{
          const response = await axios.post(VENDOR_EDIT_URL,
                  formData,
                  {
                      headers: { 'Content-Type': `application/json`},
                  }
              );
              
              if (response?.status===200){
                setMsg("Update Successful.")
              }else {
                setMsg("Update Failed.")
              }
              
        } catch(err){
          console.log(err);
        }

    };

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };

      return (
        <div className="vendors table-responsive-sm">
        <h2>Update Record</h2>
        { vendorData ? (
            <div>
            <table className='table table-bordered table-hover'>
                <tbody>
                <tr className="table-primary" key='headers'>
                    <th scope="col">Vendor ID</th>
                    <th scope="col">Vendor Name</th>
                    <th scope="col">Vendor Web</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Password</th>
                    <th className="noteCollection" scope="col">Note</th>
                    <th scope="col">Contact</th>
                </tr>

                <tr>
                    <td>{vendorData["Vendor ID"]}</td>
                    <td>{vendorData["Vendor Name"]}</td>
                    <td>{vendorData["Vendor Web"]}</td>
                    <td>{vendorData["Vendor Web UserName"]}</td>
                    <td>{vendorData["Vendor Web PWD"]}</td>
                    <td className="noteCollection">{vendorData["Note"]}</td>
                    <td>{vendorData["Vendor Contact"]}</td>
                </tr>

                </tbody>
            </table>
                
            <div className="modify-973E-form">
                <h3>Modify</h3>
                <p>Check the field that you would like to change first and enter the new value.</p>

                <form id="modifye973E" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">


                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="idcheck" name="idcheck" className="form-check-input" onChange={handleCheckboxChange} />
                    <label className="control-label col-sm-4" htmlFor="vendorId">Vendor ID:</label>
                    <input type="number" className="form-control" name="vendorId" id="vendorId"/>
                    </div> <br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="namecheck" name="namecheck" className="form-check-input" onChange={handleCheckboxChange}/>
                    <label className="control-label col-sm-6" htmlFor="vendorName">Vendor Name:</label>
                    <input type="text" className="form-control" name="vendorName" id="vendorName"/>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="bibcheck" name="bibcheck" className="form-check-input" onChange={handleCheckboxChange}/>
                    <label className="control-label col-sm-4" htmlFor="vendorWeb">Vendor Web</label>
                    <input type="text" className="form-control" name="vendorWeb" id="vendorWeb"/>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="nrcheck" name="nrcheck" className="form-check-input" onChange={handleCheckboxChange}/>
                    <label className="control-label col-sm-4" htmlFor="userName">User Name</label>
                    <input type="text" className="form-control" name="userName" id="userName"/>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="izcheck" name="izcheck" className="form-check-input" onChange={handleCheckboxChange} />
                    <label className="control-label col-sm-4" htmlFor="password">Password</label>
                    <input type="text" className="form-control" name="password" id="password"/>
                    </div><br/>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="notecheck" name="notecheck" className="form-check-input" onChange={handleCheckboxChange} />
                    <label className="control-label col-sm-8" htmlFor="e973note">Note</label>
                    <div className="text-area">
                        <textarea type="text" name="e973note" id="e973note" className="form-control flex-child" rows="3" value={textNote} onChange={ (e) => handleTextChange(e) }></textarea>
                        <button type="button" id="copy-button" className="btn btn-info btn-sm flex-child" onClick= { () => { setTextNote(vendorData["Note"]+" "+new Date().toLocaleString() + " ") }}>Copy Note</button>
                    </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-3">
                    <input type="checkbox" id="contactcheck" name="contactcheck" className="form-check-input" onChange={handleCheckboxChange} />
                    <label className="control-label col-sm-4" htmlFor="contact">Contact</label>
                    <input type="text" className="form-control" name="contact" id="contact"/>
                    </div><br/>
                </div>


                <input type ="submit" className="btn btn-primary align-btn" disabled={!isChecked}/>

                <input type="hidden" name='oldID' value={vendorData["Vendor ID"]}/><br/>

                { !isChecked ? (
                <div className="warn-msg">
                    <p id="msg_warn">Please select at least one field to modify before submit.</p>
                </div>) : (<div></div>)
                }

                </form>
            
            </div>
            </div>
            ) : (
            <div>
                {msg}
            </div>
            ) }

        </div>
    )
};

export default VendorEdit;