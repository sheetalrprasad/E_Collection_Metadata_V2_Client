import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import Select from "react-select";
import { E_COLLECTIONS_ADD_URL, E_COLLECTIONS_DELETE_URL, E_COLLECTIONS_EDIT_URL, E_COLLECTIONS_URL, SEARCH_ALMA_URL } from '../Constants/constants';

function EcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const [allowPage, setAllowPage] = useState(false);

    const filterOptions = [
      { value: 'Collection Name', label: 'Collection Name' },
      { value: '973 in Bib?', label: '973 in Bib?' },
      { value: '973 Norm Rule?', label: '973 Norm Rule?' },
      { value: 'IZ Only?', label: 'IZ Only?' },
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

        let answer = window.confirm("Delete "+data["973Value"]+"?");
        if(answer){
            deletePost();
        }
      };

      const getYesNoSearchString = (searchString) => {
        if (searchString.toLowerCase() === "y") {
            return 1;
        }else if (searchString.toLowerCase() === "n") {
            return 0;
        }
      };

      const handleFilter = (e) => {
        e.preventDefault();
        let name = document.getElementById("filter-input-name");
        let bib = document.getElementById("filter-input-bib");
        let norm = document.getElementById("filter-input-norm");
        let iz = document.getElementById("filter-input-iz");
        let note = document.getElementById("filter-input-note");
        
        let searchString;
        let column;
        let filtered = collectionListOriginal;
  
          if (name !== null && name.value !== "") {
            searchString = name.value;
            column = "973Value";
            filtered = filtered.filter(item => (
              item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
          }
          if (bib !== null && bib.value !== "") {
            searchString = bib.value;
            column = "973inAllBIB";
            searchString = getYesNoSearchString(searchString);
            filtered = filtered.filter(item => (
              item[column] === searchString));
          }
          if (norm !== null && norm.value !== "") {
            searchString = norm.value;
            column = "973NormRule";
            searchString = getYesNoSearchString(searchString);
            filtered = filtered.filter(item => (
              item[column] === searchString));
          }
          if (iz !== null && iz.value !== "")  {
            searchString = iz.value;
            column = "IZonly?";
            searchString = getYesNoSearchString(searchString);
            filtered = filtered.filter(item => (
              item[column] === searchString));
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

      const handleExport = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        let header = Object.keys(collectionList[0]).join(",");
        csvContent += header + "\r\n";
        collectionList.forEach(function(rowArray){
          let row = Object.values(rowArray).join(",");
          csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        link.setAttribute("download", "All E-Collections Export "+date+".csv");
        document.body.appendChild(link); // Required for FF
        link.click();
      }

      if (allowPage) {
        return <div className="collections table-responsive-sm">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
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
                      { selectedFilters.find(e => e.value === filterOptions[1].value)? <div>  
                        <label htmlFor="filter-input-bib">973 in Bib?</label>
                        <input type="text" className="form-control" id="filter-input-bib" placeholder="Enter Y/N" />
                        </div> : <></>  }
                      { selectedFilters.find(e => e.value === filterOptions[2].value) ? <div>
                        <label htmlFor="filter-input-norm">973 Norm Rule?</label>
                        <input type="text" className="form-control" id="filter-input-norm" placeholder="Enter Y/N" />
                        </div> : <></>  }
                      { selectedFilters.find(e => e.value === filterOptions[3].value) ? <div>
                        <label htmlFor="filter-input-iz">IZ Only?</label>
                        <input type="text" className="form-control" id="filter-input-iz" placeholder="Enter Y/N" />
                        </div> : <></>  }
                      { selectedFilters.find(e => e.value === filterOptions[4].value) ? <div>
                        <label htmlFor="filter-input-note">Note</label>
                        <input type="text" className="form-control" id="filter-input-note" placeholder="Enter Note" />
                        </div> : <></>  }
                      
                      <input type="submit" className="btn btn-outline-primary" value="Apply" />
                      <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset</button>
                    </div>
                  </form>: <></>
              }
                <button type="button" className="btn btn-outline-success export" onClick={handleExport}>Export</button>
              </div> : <></>
            }

      <br/>
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
                      <td>{item["IZOnly?"]?'Y':'N'}</td>
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