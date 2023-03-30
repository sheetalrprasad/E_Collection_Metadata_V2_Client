import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';

const E_COLLECTIONS_URL = "/ecollections";
const E_COLLECTIONS_DELETE_URL = "/ecollections-delete";

function EcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await axios.get(E_COLLECTIONS_URL);
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

      const redirectEdit = (data) => {
        navigate("/ecollections-edit", { state: data });
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
          }
        };
        deletePost();
      };

      return <div className="collections table-responsive-sm">
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


};

export default EcollectionHome;