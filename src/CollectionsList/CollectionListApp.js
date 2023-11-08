import React from 'react';
import { useEffect, useState } from "react";
import axios from '../api/axios';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import { ALL_E_COLLECTIONS_URL, ALL_E_COLLECTIONS_ADD_URL, ALL_E_COLLECTIONS_DELETE_URL, ALL_E_COLLECTIONS_EDIT_URL, SEARCH_ALMA_URL } from "../Constants/constants";    

const CollectionListApp = () => {
    
    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const [allowPage, setAllowPage] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();

    const filterOptions = [
      { value: 'Collection Name', label: 'Collection Name'},
      { value: 'Resource Type', label: 'Resource Type' },
      { value: 'Bib Source', label: 'Bib Source' },
      { value: 'Update Frequency', label: 'Update Frequency' },
      { value: 'Active?', label: 'Active?' },
      { value: 'Perpetual?', label: 'Perpetual?' },
      { value: 'Aggregator?', label: 'Aggregator?' },
      { value: 'Data Sync?', label: 'Data Sync?' },
      { value: 'OA?', label: 'OA?' },
      { value: 'Reclamation?', label: 'Reclamation?' },
      { value: 'Vendor', label: 'Vendor' },
      { value: 'Note', label: 'Note'},
      { value: 'PO Linked?', label: 'PO Linked?'},
      { value: 'Lendable Note', label: 'Lendable Note'}
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
            const { data } = await axios.get(ALL_E_COLLECTIONS_URL);
            setCollectionList(data);
            setCollectionListOriginal(data);
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

      const getYesNoSearchString = (searchString) => {
        if (searchString.toLowerCase() === "y") {
            return 1;
        }else if (searchString.toLowerCase() === "n") {
            return 0;
        } else if (searchString.toLowerCase() === "some") {
           return 2;
        }
      };

      const handleColumnFilter = (e) => {
        e.preventDefault();
        let name = document.getElementById("filter-input-name");
        let resource = document.getElementById("filter-input-resource");
        let bib = document.getElementById("filter-input-bib");
        let update = document.getElementById("filter-input-update");
        let active = document.getElementById("filter-input-active");
        let perp = document.getElementById("filter-input-perp");
        let agg = document.getElementById("filter-input-agg");
        let data = document.getElementById("filter-input-data");
        let oa = document.getElementById("filter-input-oa");
        let rec = document.getElementById("filter-input-rec");
        let vendor = document.getElementById("filter-input-vendor");
        let note = document.getElementById("filter-input-note");
        let po = document.getElementById("filter-input-po");
        let lendable = document.getElementById("filter-input-lendable");
        
        let searchString;
        let column;
        let filtered = collectionListOriginal;

        if (name !== null && name.value !== "") {
          searchString = name.value;
          column = "Collection Name";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (resource !== null && resource.value !== "") {
          searchString = resource.value;
          column = "Resource Type";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (bib !== null && bib.value !== "") {
          searchString = bib.value;
          column = "Bib Source";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (update !== null && update.value !== "")  {
          searchString = update.value;
          column = "Update Frequency";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (active !== null && active.value !== "") {
          searchString = active.value;
          column = "Active?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (perp !== null && perp.value !== "") {
          searchString = perp.value;
          column = "Perpetual?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (agg !== null && agg.value !== "") {
          searchString = agg.value;
          column = "Aggregator?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (data !== null && data.value !== "") {
          searchString = data.value;
          column = "Data Sync?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (oa !== null && oa.value !== "") {
          searchString = oa.value;
          column = "OA?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (rec !== null && rec.value !== "") {
          searchString = rec.value ;
          column = "Reclamation?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (vendor !== null && vendor.value !== "") {
          searchString = vendor.value ;
          column = "Vendor";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (note !== null && note.value !== "") {
          searchString = note.value;
          column = "Note";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (po !== null && po.value !== "") {
          searchString = po.value;
          column = "PO Linked?";
          searchString = getYesNoSearchString(searchString);
          filtered = filtered.filter(item => (
            item[column] === searchString));
        }
        if (lendable !== null && lendable.value !== "") {
          searchString = lendable.value;
          column = "Lendable Note";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        
        setCollectionList(filtered);
      }


      const handleReset = () => {
        setCollectionList(collectionListOriginal);
        setSelectedFilters([]);
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
                <form id="filter-form" onSubmit={handleColumnFilter} className='filter-form'>
                  <div className="form-group">
                    { selectedFilters.find(e => e.value === filterOptions[0].value)? <div>  
                      <label htmlFor="filter-input-name">Collection Name</label>
                      <input type="text" className="form-control" id="filter-input-name" placeholder="Enter Collection Name" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[1].value)? <div>  
                      <label htmlFor="filter-input-resource">Resource Type</label>
                      <input type="text" className="form-control" id="filter-input-resource" placeholder="Enter Resource Type" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[2].value) ? <div>
                      <label htmlFor="filter-input-bib">Bib Source</label>
                      <input type="text" className="form-control" id="filter-input-bib" placeholder="Enter Bib Source" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[3].value) ? <div>
                      <label htmlFor="filter-input-update">Update Frequency</label>
                      <input type="text" className="form-control" id="filter-input-update" placeholder="Enter Update Frequency" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[4].value) ? <div>
                      <label htmlFor="filter-input-active">Active?</label>
                      <input type="text" className="form-control" id="filter-input-active" placeholder="Enter Y/N" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[5].value) ? <div>
                      <label htmlFor="filter-input-perp">Perpetual?</label>
                      <input type="text" className="form-control" id="filter-input-perp" placeholder="Enter Y/N/Some" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[6].value) ? <div>
                      <label htmlFor="filter-input-agg">Aggregator?</label>
                      <input type="text" className="form-control" id="filter-input-agg" placeholder="Enter Y/N" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[7].value) ? <div>
                      <label htmlFor="filter-input-data">Data Sync?</label>
                      <input type="text" className="form-control" id="filter-input-data" placeholder="Enter Y/N" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[8].value) ? <div>
                      <label htmlFor="filter-input-oa">OA?</label>
                      <input type="text" className="form-control" id="filter-input-oa" placeholder="Enter Y/N" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[9].value) ? <div>
                      <label htmlFor="filter-input-rec">Reclamation?</label>
                      <input type="text" className="form-control" id="filter-input-rec" placeholder="Enter Y/N" />

                      </div> : <></>  } 
                    { selectedFilters.find(e => e.value === filterOptions[10].value) ? <div>
                      <label htmlFor="filter-input-vendor">Vendor</label>
                      <input type="text" className="form-control" id="filter-input-vendor" placeholder="Enter Vendor" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[11].value) ? <div>
                      <label htmlFor="filter-input-note">Note</label>
                      <input type="text" className="form-control" id="filter-input-note" placeholder="Enter Note" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[12].value) ? <div>
                      <label htmlFor="filter-input-po">Note</label>
                      <input type="text" className="form-control" id="filter-input-po" placeholder="Enter Y/N" />
                      </div> : <></>  }
                    { selectedFilters.find(e => e.value === filterOptions[13].value) ? <div>
                      <label htmlFor="filter-input-lendable">Note</label>
                      <input type="text" className="form-control" id="filter-input-lendable" placeholder="Enter Value" />
                      </div> : <></>  }
                    
                    <input type="submit" className="btn btn-outline-primary" value="Apply" />
                    <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset</button>
                  </div>
                </form>: <></>
              }
              
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
                      <td>{item["PO Linked?"]? 'Y' : 'N'}</td>
                      <td>{item["Active?"]? 'Y': 'N'}</td>
                      <td>{handlePerpetual(item)}</td>
                      <td>{item["Aggregator?"]? 'Y': 'N'}</td>
                      <td>{item["Data Sync?"]? 'Y': 'N'}</td>
                      <td>{item["OA?"]? 'Y': 'N'}</td>
                      <td>{item["Reclamation?"]? 'Y': 'N'}</td>
                      <td>{item["Vendor"]}</td>
                      <td>{item["Lendable Note"]}</td>
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
