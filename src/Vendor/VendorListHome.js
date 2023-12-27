import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Select from "react-select";
import { VENDOR_ADD_URL, VENDOR_DELETE_URL, VENDOR_EDIT_URL, VENDOR_URL } from '../Constants/constants';
import './VendorListApp.css';

const VendorListApp = () => {
    
    const [vendorList, setVendorList] = useState([]);
    const [vendorListOriginal, setVendorListOriginal] = useState([]);
    const [allowPage, setAllowPage] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const filterOptions = [
      { value: 'Vendor Name', label: 'Vendor Name'},
      { value: 'Vendor Web', label: 'Vendor Web' },
      { value: 'User Name', label: 'User Name' },
      { value: 'Password', label: 'Update Frequency' },
      { value: 'Note', label: 'Note' },
      { value: 'Contact', label: 'Contact' },
    ];

    const [selectedFilters, setSelectedFilters] = useState([]);


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
            const { data } = await axios.get(VENDOR_URL);
            
            setVendorList(data);
            setVendorListOriginal(data);

          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

    const handleFilter = (e) => {
      e.preventDefault();
      let name = document.getElementById("filter-input-name");
      let web = document.getElementById("filter-input-web");
      let username = document.getElementById("filter-input-username");
      let password = document.getElementById("filter-input-password");
      let note = document.getElementById("filter-input-note");
      let contact = document.getElementById("filter-input-contact");
      
      let searchString;
      let column;
      let filtered = vendorListOriginal;

        if (name !== null && name.value !== "") {
          searchString = name.value;
          column = "Vendor Name";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (web !== null && web.value !== "") {
          searchString = web.value;
          column = "Vendor Web";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (username !== null && username.value !== "") {
          searchString = username.value;
          column = "Vendor Web UserName";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (password !== null && password.value !== "")  {
          searchString = password.value;
          column = "Vendor Web PWD";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (note !== null && note.value !== "") {
          searchString = note.value;
          column = "Note";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        if (contact !== null && contact.value !== "") {
          searchString = contact.value ;
          column = "Vendor Contact";
          filtered = filtered.filter(item => (
            item[column] && item[column].toLowerCase().includes(searchString.toLowerCase().trim())));
        }
        
        setVendorList(filtered);
    }

    const handleReset = () => {
      setVendorList(vendorListOriginal);
      setSelectedFilters([]);
    }


    const redirectEdit = (data) => {
        navigate(VENDOR_EDIT_URL, { state: data });
    };

    const deleteRecord = (data) => {
        
        async function deletePost() {
          try {
            const response = await axios.delete(VENDOR_DELETE_URL+"/"+data["Vendor ID"]+"&"+data["Vendor Name"],
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

        let answer = window.confirm("Delete "+data["Vendor Name"]+"?");
        if(answer){
          deletePost();
        }
    };

    const handleExport = () => {
      let csvContent = "data:text/csv;charset=utf-8,";
      let header = Object.keys(vendorList[0]).join(",");
      csvContent += header + "\r\n";
      vendorList.forEach(function(rowArray){
        let row = Object.values(rowArray).join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      let today = new Date();
      let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      link.setAttribute("download", "All Vendors Export "+date+".csv");
      document.body.appendChild(link); // Required for FF
      link.click();
    }

    

    if(allowPage) {
    return <div className="collections table-responsive-sm">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" href={ VENDOR_URL }>View/Edit</a>
                    <button className="nav-item nav-link nav-button-filter" onClick={() => setShowFilter(showFilter => !showFilter)}>Filter & Export</button>
                    <a className="nav-item nav-link" href={ VENDOR_ADD_URL }>Add New</a>
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
                          <label htmlFor="filter-input-name">Vendor Name</label>
                          <input type="text" className="form-control" id="filter-input-name" placeholder="Enter Vendor Name" />
                          </div> : <></>  }
                        { selectedFilters.find(e => e.value === filterOptions[1].value)? <div>  
                          <label htmlFor="filter-input-web">Vendor Web</label>
                          <input type="text" className="form-control" id="filter-input-web" placeholder="Enter Vendor Web" />
                          </div> : <></>  }
                        { selectedFilters.find(e => e.value === filterOptions[2].value) ? <div>
                          <label htmlFor="filter-input-username">User Name</label>
                          <input type="text" className="form-control" id="filter-input-username" placeholder="Enter User Name" />
                          </div> : <></>  }
                        { selectedFilters.find(e => e.value === filterOptions[3].value) ? <div>
                          <label htmlFor="filter-input-password">Password</label>
                          <input type="text" className="form-control" id="filter-input-password" placeholder="Enter Password" />
                          </div> : <></>  }
                        { selectedFilters.find(e => e.value === filterOptions[4].value) ? <div>
                          <label htmlFor="filter-input-note">Note</label>
                          <input type="text" className="form-control" id="filter-input-note" placeholder="Enter Note" />
                          </div> : <></>  }
                        { selectedFilters.find(e => e.value === filterOptions[5].value) ? <div>
                        <label htmlFor="filter-input-contact">Note</label>
                        <input type="text" className="form-control" id="filter-input-contact" placeholder="Enter Contact" />
                        </div> : <></>  }
                        
                        <input type="submit" className="btn btn-outline-primary" value="Apply" />
                        <button type="button" className="btn btn-outline-danger" onClick={handleReset}>Reset</button>
                      </div>
                    </form>: <></>
                  }
                  <button type="button" className="btn btn-outline-success export" onClick={handleExport}>Export</button>
                </div> : <></>
            }


        <br />
        <h3>Vendors</h3>

        <table className='table table-bordered table-hover'>
            <tbody>
                <tr className="table-primary" key='headers'>
                <th scope="col">Vendor ID</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Vendor Web</th>
                <th scope="col">User Name</th>
                <th scope="col">Password</th>
                <th className="note" scope="col">Note</th>
                <th scope="col">Contact</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>

                {vendorList.map((item, index) => (
                    <tr key={index}>
                    <td>{item["Vendor ID"]}</td>
                    <td>{item["Vendor Name"]}</td>
                    <td>{item["Vendor Web"]}</td>
                    <td>{item["Vendor Web UserName"]}</td>
                    <td>{item["Vendor Web PWD"]}</td>
                    <td className="note">{item["Note"]}</td>
                    <td>{item["Vendor Contact"]}</td>
                    <td><button onClick={() => redirectEdit(item)} className="btn btn-link">Edit</button></td>
                    <td><button onClick={() => deleteRecord(item)} className="btn btn-link">Delete</button></td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
    }
};

export default VendorListApp;
