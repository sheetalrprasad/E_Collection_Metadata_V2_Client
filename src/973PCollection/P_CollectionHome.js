import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const P_COLLECTIONS_URL = "/pcollections";
const P_COLLECTIONS_DELETE_URL = "/pcollections-delete";
const P_COLLECTIONS_ADD_URL = "/pcollections-add";


function PcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);
    const [collectionListOriginal, setCollectionListOriginal] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await axios.get(P_COLLECTIONS_URL);
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

      const redirectEdit = (data) => {
        navigate("/pcollections-edit", { state: data });
      };

      const redirectAdd = () => {
        navigate(P_COLLECTIONS_ADD_URL);
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
          }
        };
        deletePost();
      };

      const handleFilter = () => {
        let searchString = document.getElementById("filter-input").value;
        const filtered = collectionList.filter(item => (
          item.CollectionName.toLowerCase().includes(searchString.toLowerCase())
        ));
        setCollectionListOriginal(collectionList);
        setCollectionList(filtered);
      }

      const handleCancelFilter = () => {
        setCollectionList(collectionListOriginal);
        document.getElementById("filter-input").value = "";
      }

      return <div className="collections table-responsive-sm">
        
        <div className="input-group mb-8">
          <input type="text" className="form-control" id="filter-input" placeholder="Collection Name" aria-label="Collection Name" aria-describedby="basic-addon2" />
          <div className="input-group-addon2 ">
            <button id = "filter-button" className="btn btn-outline-primary" type="button" onClick={ () => handleFilter() }>Filter</button>
            <button id = "cancel-button" className="btn btn-outline-danger" type="button" onClick={ () => handleCancelFilter() }>Cancel</button>
          </div>
        </div>

        <button type="button" className="btn btn-secondary" onClick={ () => redirectAdd() }>Add New Item</button>

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


};

export default PcollectionHome;