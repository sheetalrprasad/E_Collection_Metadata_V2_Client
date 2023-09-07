import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { VENDOR_ADD_URL, VENDOR_DELETE_URL, VENDOR_EDIT_URL, VENDOR_URL } from '../Constants/constants';
import './VendorListApp.css';

const VendorListApp = () => {
    
    const [vendorList, setVendorList] = useState([]);
    const [vendorListOriginal, setVendorListOriginal] = useState([]);
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
            const { data } = await axios.get(VENDOR_URL);
            console.log(data)
            setVendorList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

    const handleFilter = () => {
      let searchString = document.getElementById("filter-input").value;
      const filtered = vendorList.filter(item => (
          item["Vendor Name"].toLowerCase().includes(searchString.toLowerCase())
    ));
    setVendorListOriginal(vendorList);
    setVendorList(filtered);
    }

    const handleCancelFilter = () => {
    setVendorList(vendorListOriginal);
    document.getElementById("filter-input").value = "";
    }

    const redirectEdit = (data) => {
        navigate(VENDOR_EDIT_URL, { state: data });
    };

    const deleteRecord = (data) => {
        console.log(data["Vendor Name"]);
        
        async function deletePost() {
          try {
            const response = await axios.delete(VENDOR_DELETE_URL+"/"+data["Vendor Name"],
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


    if(allowPage) {
    return <div className="collections table-responsive-sm">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <a className="nav-item nav-link" href={ VENDOR_URL }>View/Edit</a>
                    <button className="nav-item nav-link nav-button-filter" onClick={() => setShowFilter(showFilter => !showFilter)}>Filter & Export</button>
                    {/* to do */}
                    <a className="nav-item nav-link" href={ VENDOR_ADD_URL }>Add New</a>
                    </div>
                </div>
            </nav>

            {
              showFilter  ? 
              <div className="input-group mb-8">
                <input type="text" className="form-control" id="filter-input" placeholder="Vendor Name" aria-label="Vendor Name" aria-describedby="basic-addon2" />
                <div className="input-group-addon2 ">
                  <button id = "filter-button" className="btn btn-outline-primary" type="button" onClick={ () => handleFilter() }>Filter</button>
                  <button id = "cancel-button" className="btn btn-outline-danger" type="button" onClick={ () => handleCancelFilter() }>Cancel</button>
                </div>
              </div> : <></>
          }


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
