import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

function PcollectionHome () {

    const [collectionList, setCollectionList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await Axios.get("http://localhost:3001/pcollections");
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
                <th scope="col">Collection Name</th>
                <th className="noteCollection" scope="col">Note</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>

                {collectionList.map((item, index) => (
                    <tr key={index}>
                    <td>{item["CollectionName"]}</td>
                    <td className="noteCollection">{item["Note"]}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>


};

export default PcollectionHome;