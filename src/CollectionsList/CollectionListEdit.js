import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from '../api/axios';
import Select  from "react-select";
import "./CollectionListApp.css";
import {ALL_E_COLLECTIONS_EDIT_URL, ALL_VENDOR_NAME_URL, SEARCH_ALMA_API_URL} from '../Constants/constants';
import AlmaSubPageDetails from '../SearchAlma/AlmaSubPageDetails';


const CollectionListEdit = () => {
    
    const [collectionData, setCollectionData] = useState();
    const [vendorNames, setVendorNames] = useState([]);
    const [showAlma, setShowAlma] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [msg, setMsg] =  useState(() => {
      return localStorage.getItem('msg') || ''
    });
    const [textNote, setTextNote] = useState('');

    const [almaDetails, setAlmaDetails] = useState([]);
    const [errorData, setErrorData] = useState('');

    const location = useLocation();
    const data = location.state;

    const [resourceType, setResourceType] = useState([]);
    const resourceOptions = [
     { label: 'Book', value: 'book'},
     { label: 'Audio', value: 'audio'},
     { label: 'Streaming Audio', value: 'streaming audio'},
     { label: 'Video', value: 'video'},
     { label: 'Streaming Video', value: 'streaming video'},
     { label: 'Journal', value: 'journal'},
     { label: 'Newspaper', value: 'newspaper'},
     {  label: 'Gov Doc', value: 'govdoc'},
      { label: 'Master Thesis', value: 'masterthesis'}
    ];
    
    useEffect(() => {
      localStorage.setItem('msg', msg);
    }, [msg]);

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

    useEffect(() => {
      axios.get("/allcollections/collectionid/"+data["Collection ID"],
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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./multiselect.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleTextChange = (e) => {
      setTextNote(e.target.value);
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault();

        const form = document.querySelector("form");
        console.log("form: ",form);
        const formData = new FormData(e.target);
        console.log("formData:",formData);
        

        try{
          await axios.post(ALL_E_COLLECTIONS_EDIT_URL,
                  formData,
                  {
                      headers: { 'Content-Type': `application/json`},
                  }
          ).then((response) => {
            
            if(response.status===200){
              alert("Update Successful.");
              window.location = ALL_E_COLLECTIONS_EDIT_URL;
            } else{
              setMsg("Update Failed.");
            }
    
          }).catch((error) => {
            console.log("Error:",error);
            setMsg("Update Failed.");
          });
              
      } catch(err){
        console.log(err);
        setMsg("Update Failed.");
      }
    };

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };

    const handleAlmaInfo = async () => {

      var almaDetails = { "almaid": collectionData["Collection ID"] };
      
      if (!showAlma) {
        await axios.post(SEARCH_ALMA_API_URL, almaDetails,
          {
              headers: { 
                  'Content-Type': `application/json`,
                  'Accept': 'application/json'
              },
            }
        ).then((response) => { 
            setAlmaDetails(response.data);
        }).catch((error) => { 
            console.log("Error:",error); 
            setAlmaDetails({});
            setErrorData(error.code+" - "+error.message);
        }); 
      }

      setShowAlma(!showAlma);

    };

    const handlePerpetual = (data) => {
      if (data["Perpetual?"] === 1) {
        return "Y";
      } else if (data["Perpetual?"] === 2) {
        return "Some";
      } else {
        return "N";
      }
    }

    return <div className="collections table-responsive-sm">
      { collectionData ? (
      <div>
      <h3>Update record</h3>
        <div>
          <table className='table table-bordered table-hover'>
              <tbody>
                  <tr className="table-primary" key='headers'>
                  <th scope="col">Collection ID</th>
                  <th scope="col">Collection Name</th>
                  <th scope="col">Resource Type</th>
                  <th scope="col">Bib Source</th>
                  <th scope="col">Update Frequency</th>
                  <th scope="col">PO Linked?</th>
                  <th scope="col">Active?</th>
                  <th scope="col">Perpetual?</th>
                  <th scope="col">Aggregator?</th>
                  <th scope="col">Data Sync?</th>
                  <th scope="col">OA?</th>
                  <th scope="col">Reclamation?</th>
                  <th scope="col">Vendor</th>
                  <th scope="col">Lendable Note</th>
                  <th className="noteCollection" scope="col">Note</th>
                  </tr>

                  <tr>
                  <td>{collectionData["Collection ID"]}</td>
                  <td>{collectionData["Collection Name"]}</td>
                  <td>{collectionData["Resource Type"]}</td>
                  <td>{collectionData["Bib Source"]}</td>
                  <td>{collectionData["Update Frequency"]}</td>
                  <td>{collectionData["PO Linked?"]? 'Y' : 'N'}</td>
                  <td>{collectionData["Active?"]? 'Y': 'N'}</td>
                  <td>{handlePerpetual(collectionData)}</td>
                  <td>{collectionData["Aggregator?"]? 'Y': 'N'}</td>
                  <td>{collectionData["Data Sync?"]? 'Y': 'N'}</td>
                  <td>{collectionData["OA?"]? 'Y': 'N'}</td>
                  <td>{collectionData["Reclamation?"]? 'Y': 'N'}</td>
                  <td>{collectionData["Vendor"]}</td>
                  <td>{collectionData["Lendable Note"]}</td>
                  <td className="noteCollection">{collectionData["Note"]}</td>
                  </tr>
              </tbody>
          </table>

          { !showAlma ? (
            <button id = "alma-button" className="btn btn-info" type="button" onClick={ () => handleAlmaInfo() }>View Information in Alma</button>
          ) : (
            <button id = "alma-button" className="btn btn-info" type="button" onClick={ () => handleAlmaInfo() }>Hide Information in Alma</button>
          )}

          { showAlma ? (
            <div className='alma-info'>
              <AlmaSubPageDetails collectionList={almaDetails} collectionId={collectionData["Collection ID"]} errorData={errorData}/>
            </div> ): null}
            <div className="modify-E-form">
              <h3>Modify</h3>
              <p>Check the field that you would like to change first and enter the new value.</p>

              <form id="modifyEcollections" onSubmit={(e) => handleSubmit(e) } className="form-horizontal">


              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="idcheck" name="idcheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="eid">Collection ID:</label>
                  <input type="number" className="form-control" name="eid" id="eid"/>
                  </div> <br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="namecheck" name="namecheck" className="form-check-input" onChange={handleCheckboxChange}/>
                  <label className="control-label col-sm-6" htmlFor="ename">Collection Name:</label>
                  <input type="text" className="form-control" name="ename" id="ename"/>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                   <input type="checkbox" id="resourcecheck" name="resourcecheck" className="form-check-input" onChange={handleCheckboxChange}/>
                   <label className="control-label col-sm-4" htmlFor="resourceType">Resouce Type</label> <br/>
                    <Select
                      options={resourceOptions}
                      value={resourceType}
                      placeholder='Select Resource Type'
                      onChange = { (value) => setResourceType(value) }
                      showCheckbox={true}
                      isMulti={true}
                      name="resourceType"
                      id="resourceType"
                    />
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="bibcheck" name="bibcheck" className="form-check-input" onChange={handleCheckboxChange}/>
                  <label className="control-label col-sm-4" htmlFor="ebib">BIB Source</label>
                  <select name="ebib" id="ebib" className="form-select">
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
                  <input type="checkbox" id="updatecheck" name="updatecheck" className="form-check-input" onChange={handleCheckboxChange}/>
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
                  <input type="checkbox" id="pocheck" name="pocheck" className="form-check-input" onChange={handleCheckboxChange}/>
                  <label className="control-label col-sm-4" htmlFor="po">PO Linked?</label>
                  <select name="po" id="po" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="activecheck" name="activecheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="active">Active?</label>
                  <select name="active" id="active" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="perpcheck" name="perpcheck" className="form-check-input" onChange={handleCheckboxChange} />
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
                  <input type="checkbox" id="aggcheck" name="aggcheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="aggregator">Aggregator?</label>
                  <select name="aggregator" id="aggregator" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="datasynccheck" name="datasynccheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="datasync">Data Sync?</label>
                  <select name="datasync" id="datasync" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="oacheck" name="oacheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="oa">OA?</label>
                  <select name="oa" id="oa" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="reclamationcheck" name="reclamationcheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="reclamation">Reclamation?</label>
                  <select name="reclamation" id="reclamation" className="form-select">
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="vendorcheck" name="vendorcheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="vendor">Vendor</label>
                  <select name="vendor" id="vendor" className="form-select">
                  <option value="-">?</option>
                  {
                      vendorNames.map(vendor => <option key={vendor['Vendor Name']} value={vendor['Vendor Name']}>{vendor['Vendor Name']} </option>)
                  }
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="lendablecheck" name="lendablecheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-4" htmlFor="lendable">Lendable Note</label>
                  <select name="lendable" id="lendable" className="form-select">
                      <option value="">?</option>
                      <option value="LendableInternational">Lendable International</option>
                      <option value="Lendable Country">Lendable Country</option>
                      <option value="LocalOnly">Local Only</option>
                  </select>
                  </div><br/>
              </div>

              <div className="form-group">
                  <div className="col-sm-3">
                  <input type="checkbox" id="notecheck" name="notecheck" className="form-check-input" onChange={handleCheckboxChange} />
                  <label className="control-label col-sm-8" htmlFor="enote">Note</label>
                  <div className="text-area">
                      <textarea type="text" name="enote" id="enote" className="form-control flex-child" rows="3" value={textNote} onChange={ (e) => handleTextChange(e) }></textarea>
                      <button type="button" id="copy-button" className="btn btn-info btn-sm flex-child" onClick= { () => { setTextNote(collectionData["Note"]) }}>Copy Note</button>
                      <button type="button" id="copy-button" className="btn btn-info btn-sm flex-child" onClick= { () => { setTextNote(textNote+" "+new Date().toLocaleDateString()+" ") }}>Add Date</button>

                  </div>
                  </div>
              </div>
              <input type ="submit" className="btn btn-primary align-btn" disabled={!isChecked}/>

              <input type="hidden" name='oldID' value={collectionData["Collection ID"]}/><br/>

              { !isChecked ? (
              <div className="warn-msg">
                  <p id="msg_warn">Please select at least one field to modify before submit.</p>
              </div>) : (<div></div>)
              }

              </form>
            </div>
          </div>
        </div> ) : (
            <div>
              {msg}
            </div>
        ) }
      </div>
};



export default CollectionListEdit;
