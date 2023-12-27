import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./E_Collection.css";
import axios from '../api/axios';
import { E_COLLECTIONS_EDIT_URL, E_COLLECTIONS_URL } from '../Constants/constants';


function EcollectionEdit () {
    
    const [collectionData, setCollectionData] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [msg, setMsg] =  useState(() => {
      return localStorage.getItem('msg') || ''
    });
    const [textNote, setTextNote] = useState('');
    const location = useLocation();
    const data = location.state;
    
    useEffect(() => {
      localStorage.setItem('msg', msg);
    }, [msg]);


    useEffect(() => {
      axios.get("/ecollections/collectionid/"+data["973Value"],
      {
          headers: { 'Content-Type': `application/json`},
      }
      ).then((response) => {
        
        if(response.status===200){
          setCollectionData(response.data[0]); 
        } else {
          setCollectionData(data);
        }
      }).catch((error) => {
        console.log("Error:",error);
      });
    }, [data]);

    const handleTextChange = (e) => {
      setTextNote(e.target.value);
    }
    
    const handleSubmit = async (e) =>{

        e.preventDefault();
        const formData = new FormData(e.target);
    
        try{
          const response = await axios.post(E_COLLECTIONS_EDIT_URL,
                  formData,
                  {
                      headers: { 'Content-Type': `application/json`},
                  }
              );
              
              if (response?.status===200){
                alert("Update Successful. To see the 'Collection Name' changes please visit the 'E-Collections with 973' page.");
                if((formData.get("e973name")==="") || (formData.get("e973name")===null)){
                  window.location = E_COLLECTIONS_EDIT_URL;
                }else{
                  window.location = E_COLLECTIONS_URL;
                }
              }else {
                alert("Update Failed.")
                setMsg("To see the Name changes please visit the table page.")
              }
              
        } catch(err){
          console.log(err);
        }

    };

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };

      return (
        <div className="collections table-responsive-sm">
          <h2>Update Record</h2>
          { collectionData ? (
            <div>
              <table className='table table-bordered table-hover'>
                <tbody>
                  <tr className="table-primary" key='headers'>
                    <th scope="col">Collection ID</th>
                    <th scope="col">Collection Name</th>
                    <th scope="col">973 in Bib?</th>
                    <th scope="col">973 Norm Rule?</th>
                    <th scope="col">IZ Only?</th>
                    <th className="noteCollection" scope="col">Note</th>
                  </tr>

                  <tr>
                    <td>{collectionData["CollectionID"]}</td>
                    <td>{collectionData["973Value"]}</td>
                    <td>{collectionData["973inAllBIB"] ? 'Y' : 'N'}</td>
                    <td>{collectionData["973NormRule"] ? 'Y' : 'N'}</td>
                    <td>{collectionData["IZonly?"] ? 'Y' : 'N'}</td>
                    <td className="noteCollection">{collectionData["Note"]}</td>
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
                      <label className="control-label col-sm-4" htmlFor="e973id">Collection ID:</label>
                      <input type="number" className="form-control" name="e973id" id="e973id"/>
                    </div> <br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input type="checkbox" id="namecheck" name="namecheck" className="form-check-input" onChange={handleCheckboxChange}/>
                      <label className="control-label col-sm-6" htmlFor="e973name">Collection Name in 973:</label>
                      <input type="text" className="form-control" name="e973name" id="e973name"/>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input type="checkbox" id="bibcheck" name="bibcheck" className="form-check-input" onChange={handleCheckboxChange}/>
                      <label className="control-label col-sm-4" htmlFor="e973bib">973 in All BIB?</label>
                      <select name="e973bib" id="e973bib" className="form-select">
                        <option value="3"> No Change Needed </option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input type="checkbox" id="nrcheck" name="nrcheck" className="form-check-input" onChange={handleCheckboxChange}/>
                      <label className="control-label col-sm-4" htmlFor="e973nr">973 Norm Rule?</label>
                      <select name="e973nr" id="e973nr" className="form-select">
                        <option value="3">No Change Needed</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input type="checkbox" id="izcheck" name="izcheck" className="form-check-input" onChange={handleCheckboxChange} />
                      <label className="control-label col-sm-4" htmlFor="e973iz">IZ Only?</label>
                      <select name="e973iz" id="e973iz" className="form-select">
                        <option value="3">No Change Needed</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div><br/>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-3">
                      <input type="checkbox" id="notecheck" name="notecheck" className="form-check-input" onChange={handleCheckboxChange} />
                      <label className="control-label col-sm-8" htmlFor="e973note">Note</label>
                      <div className="text-area">
                        <textarea type="text" name="e973note" id="e973note" className="form-control flex-child" rows="3" value={textNote} onChange={ (e) => handleTextChange(e) }></textarea>
                        <button type="button" id="copy-button" className="btn btn-info btn-sm flex-child" onClick= { () => { setTextNote(collectionData["Note"]) }}>Copy Note</button>
                        <button type="button" id="copy-button" className="btn btn-info btn-sm flex-child" onClick= { () => { setTextNote(textNote+" "+new Date().toLocaleDateString()+" ") }}>Add Date</button>
                      </div>
                    </div>
                  </div>
                  <input type ="submit" className="btn btn-primary align-btn" disabled={!isChecked}/>

                  <input type="hidden" name='oldID' value={collectionData["973Value"]}/><br/>

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

export default EcollectionEdit;