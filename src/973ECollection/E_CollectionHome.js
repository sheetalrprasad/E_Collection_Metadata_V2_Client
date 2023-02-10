import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

function EcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await Axios.get("http://localhost:3001/ecollections");
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);


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
                    <td>Edit</td>
                    <td>Delete</td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>


};

export default EcollectionHome;