import React from 'react';
import { useEffect, useState } from "react";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { ALL_E_COLLECTIONS_URL, ALL_E_COLLECTIONS_ADD_URL, ALL_E_COLLECTIONS_DELETE_URL, ALL_E_COLLECTIONS_EDIT_URL, SEARCH_ALMA_URL } from "../Constants/constants";    

const CollectionListApp = () => {
    
    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const [allowPage, setAllowPage] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setAllowPage(true);
        } else {
            setAllowPage(false);
            navigate("/login");
        }
    }, [navigate]);


    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await axios.get(ALL_E_COLLECTIONS_URL);
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);


      const redirectEdit = (data) => {
        navigate(ALL_E_COLLECTIONS_EDIT_URL, { state: data });
      };

      const deleteRecord = (data) => {
        console.log(data["Collection ID"]);
        async function deletePost() {
          try {
            const response = await axios.delete(ALL_E_COLLECTIONS_DELETE_URL+"/"+data["Collection ID"],
              {
                headers: { 'Content-Type': `application/json`},
              }
            );
            if (response?.status===200){
              alert("Delete Successful.");
              window.location.reload(true);
            }else {
              alert("Delete Failed.")
            }
          } catch (err) {
            console.error(err);
            alert("Delete Failed.")
          }
        };
        deletePost();
      };

      const handleFilter = () => {
        let searchString = document.getElementById("filter-input").value;
        const filtered = collectionList.filter(item => (
          item["Collection Name"].toLowerCase().includes(searchString.toLowerCase())
        ));
        setCollectionListOriginal(collectionList);
        setCollectionList(filtered);
      }

      const handleCancelFilter = () => {
        setCollectionList(collectionListOriginal);
        document.getElementById("filter-input").value = "";
      }

      const handlePerpetual = (data) => {
        if (data["Perpetual?"] === 1) {
          return "Y";
        } else if (data["Perpetual?"] === 2) {
          return "Some";
        } else {
          return "N";
        }
      }


    if (allowPage) {
      return <div className="collections table-responsive-sm">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href={ ALL_E_COLLECTIONS_URL }>View/Edit</a>
              <button className="nav-item nav-link nav-button-filter" onClick={() => setShowFilter(showFilter => !showFilter)}>Filter & Export</button>
              <a className="nav-item nav-link" href={ ALL_E_COLLECTIONS_ADD_URL }>Add New</a>
              <a className="nav-item nav-link" href={ SEARCH_ALMA_URL }>Search Alma</a>
            </div>
          </div>
        </nav>

        {
          showFilter  ? 
            <div>
              <div className="input-group mb-8">
                <input type="text" className="form-control" id="filter-input" placeholder="Collection Name" aria-label="Collection Name" aria-describedby="basic-addon2" />
                <div className="input-group-addon2 ">
                  <button id = "filter-button" className="btn btn-outline-primary" type="button" onClick={ () => handleFilter() }>Filter</button>
                  <button id = "cancel-button" className="btn btn-outline-danger" type="button" onClick={ () => handleCancelFilter() }>Cancel</button>
                </div>
              </div>
              <div>
                <button className='filter-button btn btn-outline-primary'>Resource Type</button>
                <button className='filter-button btn btn-outline-primary'>Bib Source</button>
                <button className='filter-button btn btn-outline-primary'>Update Frequency</button>
                <button className='filter-button btn btn-outline-primary'>Active?</button>
                <button className='filter-button btn btn-outline-primary'>Perpetual?</button>
                <button className='filter-button btn btn-outline-primary'>Aggregator?</button>
                <button className='filter-button btn btn-outline-primary'>Data Sync?</button>
                <button className='filter-button btn btn-outline-primary'>OA?</button>
                <button className='filter-button btn btn-outline-primary'>Reclamation?</button>
                <button className='filter-button btn btn-outline-primary'>Vendor</button>
                <button className='filter-button btn btn-outline-primary'>Note</button>
              </div>
            </div> : <></>
        }

        <br/>

        <h3>All E-Collections</h3>

          <table className='table table-bordered table-hover'>
              <tbody>
                  <tr className="table-primary" key='headers'>
                  <th scope="col">Collection ID</th>
                  <th scope="col">Collection Name</th>
                  <th scope="col">Resource Type</th>
                  <th scope="col">Bib Source</th>
                  <th scope="col">Update Frequency</th>
                  <th scope="col">Active?</th>
                  <th scope="col">Perpetual?</th>
                  <th scope="col">Aggregator?</th>
                  <th scope="col">Data Sync?</th>
                  <th scope="col">OA?</th>
                  <th scope="col">Reclamation?</th>
                  <th scope="col">Vendor</th>
                  <th className="noteCollection" scope="col">Note</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  </tr>

                  {collectionList.map((item, index) => (
                      <tr key={index}>
                      <td>{item["Collection ID"]}</td>
                      <td>{item["Collection Name"]}</td>
                      <td>{item["Resource Type"]}</td>
                      <td>{item["Bib Source"]}</td>
                      <td>{item["Update Frequency"]}</td>
                      <td>{item["Active?"]? 'Y': 'N'}</td>
                      <td>{handlePerpetual(item)}</td>
                      <td>{item["Aggregator?"]? 'Y': 'N'}</td>
                      <td>{item["Data Sync?"]? 'Y': 'N'}</td>
                      <td>{item["OA?"]? 'Y': 'N'}</td>
                      <td>{item["Reclamation?"]? 'Y': 'N'}</td>
                      <td>{item["Vendor"]}</td>
                      <td className="noteCollection">{item["Note"]}</td>
                      <td><button onClick={() => redirectEdit(item)} className="btn btn-link">Edit</button></td>
                      <td><button onClick={() => deleteRecord(item)} className="btn btn-link">Delete</button></td>
                      </tr>
                  ))}

              </tbody>
          </table>
      </div>
    }
};

export default CollectionListApp;
