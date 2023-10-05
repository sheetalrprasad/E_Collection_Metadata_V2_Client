import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { E_COLLECTIONS_ADD_URL, E_COLLECTIONS_DELETE_URL, E_COLLECTIONS_EDIT_URL, E_COLLECTIONS_URL, SEARCH_ALMA_URL } from '../Constants/constants';

function EcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const [allowPage, setAllowPage] = useState(false);
    
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
            const { data } = await axios.get(E_COLLECTIONS_URL);
            setCollectionList(data);
            setCollectionListOriginal(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

      const redirectEdit = (data) => {
        navigate(E_COLLECTIONS_EDIT_URL, { state: data });
      };

      const deleteRecord = (data) => {
        console.log(data["973Value"]);
        
        async function deletePost() {
          try {
            const response = await axios.delete(E_COLLECTIONS_DELETE_URL+"/"+data["973Value"],
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

      const handleColumnFilter = (column) => {

        let searchString = document.getElementById("filter-input").value;
        let filtered;
        if (column === "973inAllBIB" || column === "973NormRule" || column === "IZonly?" ) {
        if (searchString.toLowerCase() === "y") {
            searchString = 1;
        }else if (searchString.toLowerCase() === "n") {
            searchString = 0;
        }

        filtered = collectionListOriginal.filter(item => (
          item[column] === searchString
        ));

      } else{

        filtered = collectionListOriginal.filter(item => (
          item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim() )
        ));
      }
        
        setCollectionList(filtered);
      }

      const handleCancelFilter = () => {
        setCollectionList(collectionListOriginal);
        document.getElementById("filter-input").value = "";
      }

      if (allowPage) {
        return <div className="collections table-responsive-sm">
          
        

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href={ E_COLLECTIONS_URL }>View/Edit</a>
              <button className="nav-item nav-link nav-button-filter" onClick={() => setShowFilter(showFilter => !showFilter)}>Filter & Export</button>
              <a className="nav-item nav-link" href={ E_COLLECTIONS_ADD_URL }>Add New</a>
              <a className="nav-item nav-link" href={ SEARCH_ALMA_URL }>Search Alma</a>
            </div>
          </div>
        </nav>

        {
          showFilter  ? 
            <div>
              <div className="input-group mb-8">
              <input type="text" className="form-control" id="filter-input" placeholder="Enter you text" aria-label="Collection Name" aria-describedby="basic-addon2" />
              <div className="input-group-addon2 ">
                <button id = "cancel-button" className="btn btn-outline-danger" type="button" onClick={ () => handleCancelFilter() }>Cancel</button>
              </div>
              </div>

              <button className='filter-button btn btn-outline-primary' onClick={ ()=> handleColumnFilter("973inAllBIB")}>973 in Bib?</button>
              <button className='filter-button btn btn-outline-primary' onClick={ ()=> handleColumnFilter("973NormRule")}>973 Norm Rule?</button>
              <button className='filter-button btn btn-outline-primary' onClick={ ()=> handleColumnFilter("IZonly?")}>IZ Only?</button>
              <button className='filter-button btn btn-outline-primary' onClick={ ()=> handleColumnFilter("Note")}>Note</button>
              <br/>
              <br/>
            </div> : <></>
        }

      <h3>E-Collections with 973</h3>

          <table className='table table-bordered table-hover'>
              <tbody>
                  <tr className="table-primary" key='headers'>
                  <th scope="col">Collection ID</th>
                  <th scope="col">Collection Name</th>
                  <th scope="col">973 in Bib?</th>
                  <th scope="col">973 Norm Rule?</th>
                  <th scope="col">IZ Only?</th>
                  <th className="noteCollection" scope="col">Note</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  </tr>

                  {collectionList.map((item, index) => (
                      <tr key={index}>
                      <td>{item["CollectionID"]}</td>
                      <td>{item["973Value"]}</td>
                      <td>{item["973inAllBIB"]? 'Y': 'N'}</td>
                      <td>{item["973NormRule"]? 'Y': 'N'}</td>
                      <td>{item["IZonly?"]? 'Y': 'N'}</td>
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

export default EcollectionHome;