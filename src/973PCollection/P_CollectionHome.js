import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Select from "react-select";
import { P_COLLECTIONS_ADD_URL, P_COLLECTIONS_DELETE_URL, P_COLLECTIONS_EDIT_URL, P_COLLECTIONS_URL, SEARCH_ALMA_URL } from '../Constants/constants';


function PcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const [allowPage, setAllowPage] = useState(false);

    const filterOptions = [
      { value: 'Collection Name', label: 'Collection Name' },
      { value: 'Note', label: 'Note'}
    ];

    const [selectedFilters, setSelectedFilters] = useState([]);

    
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
            const { data } = await axios.get(P_COLLECTIONS_URL);
            setCollectionList(data);
            setCollectionListOriginal(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

      const redirectEdit = (data) => {
        navigate(P_COLLECTIONS_EDIT_URL, { state: data });
      };

      const deleteRecord = (data) => {
        console.log(data["CollectionName"]);
        
        async function deletePost() {
          try {
            const response = await axios.delete(P_COLLECTIONS_DELETE_URL+"/"+data["CollectionName"],
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

      const handleFilter = (e) => {
        e.preventDefault();
        let name = document.getElementById("filter-input-name");
        let note = document.getElementById("filter-input-note");
        
        let searchString;
        let column;
        let filtered = collectionListOriginal;
  
          if (name !== null && name.value !== "") {
            searchString = name.value;
            column = "CollectionName";
            filtered = filtered.filter(item => (
              item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
          }
         
          if (note !== null && note.value !== "") {
            searchString = note.value;
            column = "Note";
            filtered = filtered.filter(item => (
              item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
          }
          
          setCollectionList(filtered);
      }
  
      const handleReset = () => {
        setCollectionList(collectionListOriginal);
        setSelectedFilters([]);
      }


      if(allowPage){

        return <div className="collections table-responsive-sm">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link" href={ P_COLLECTIONS_URL }>View/Edit</a>
              <button className="nav-item nav-link nav-button-filter" onClick={() => setShowFilter(showFilter => !showFilter)}>Filter & Export</button>
              <a className="nav-item nav-link" href={ P_COLLECTIONS_ADD_URL }>Add New</a>
              <a className="nav-item nav-link" href={ SEARCH_ALMA_URL }>Search Alma</a>
            </div>
          </div>
        </nav>

        {
          showFilter  ? 
            <div className='filter-section'>
              <div className='filter-select'>
                <Select
                  options={filterOptions}
                  value={selectedFilters}
                  placeholder='Select Filters'
                  onChange = { (e) => setSelectedFilters(e) }
                  isMulti={true}
                  name="filter-dropdown"
                  id="filter-dropdown" />
              </div>

              { selectedFilters.length > 0 ?
                  <form id="filter-form" onSubmit={handleFilter} className='filter-form'>
                    <div className="form-group">
                      { selectedFilters.find(e => e.value === filterOptions[0].value)? <div>  
                        <label htmlFor="filter-input-name">Collection Name</label>
                        <input type="text" className="form-control" id="filter-input-name" placeholder="Enter Collection Name" />
                        </div> : <></>  }
                      { selectedFilters.find(e => e.value === filterOptions[1].value) ? <div>
                        <label htmlFor="filter-input-note">Note</label>
                        <input type="text" className="form-control" id="filter-input-note" placeholder="Enter Note" />
                        </div> : <></>  }
                      
                      <input type="submit" className="btn btn-outline-primary" value="Apply" />
                      <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset</button>
                    </div>
                  </form>: <></>
              }
                  
              </div> : <></>
            }

          <br/>
          <h3>P-Collections with 973</h3>

          <table className='table table-bordered table-hover'>
              <tbody>
                  <tr className="table-primary" key='headers'>
                  <th scope="col">Collection Name</th>
                  <th className="noteCollection" scope="col">Note</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  </tr>

                  {collectionList.map((item, index) => (
                      <tr key={index}>
                      <td>{item["CollectionName"]}</td>
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

export default PcollectionHome;