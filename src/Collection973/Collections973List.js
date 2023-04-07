
import React from 'react';
import { useEffect, useState } from "react";
import axios from '../api/axios';
import './Collections973List.css';

const ALL_COLLECTIONS_URL = "/all973collections";

const Collection973ListApp = () => {
    
    const [collectionList, setCollectionList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await axios.get(ALL_COLLECTIONS_URL);
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

    
    return <div className="collections973 table-responsive-sm">
        <h2> All 973 collection names</h2>
        <table className='table table-bordered table-hover table-details'>
            <tbody>
                <tr className="table-primary" key='headers'>
                <th scope="col">Collection Name</th>
                <th scope="col">P/E</th>
                </tr>

                {collectionList.map((item, index) => (
                    <tr key={index}>
                    <td>{item["CollectionName"]}</td>
                    <td>{item["P/E"]}</td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
};

export default Collection973ListApp;
