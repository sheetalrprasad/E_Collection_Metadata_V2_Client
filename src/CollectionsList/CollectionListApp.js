
import React from 'react';
import { useEffect, useState } from "react";
import axios from '../api/axios';

const ALL_COLLECTIONS_URL = "/allcollections";

const CollectionListApp = () => {
    
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

    
    return <div className="collections table-responsive-sm">
        <table className='table table-bordered table-hover'>
            <tbody>
                <tr className="table-primary" key='headers'>
                <th scope="col">Collection ID</th>
                <th scope="col">Collection Name</th>
                <th scope="col">Resource Type</th>
                <th scope="col">Bib Source</th>
                <th scope="col">Update Frequency</th>
                <th scope="col">Active?</th>
                <th scope="col">Perpetual?</th>
                <th scope="col">Aggregator?</th>
                <th scope="col">Data Sync?</th>
                <th scope="col">OA?</th>
                <th scope="col">Reclamation?</th>
                <th scope="col">Vendor</th>
                <th className="noteCollection" scope="col">Note</th>
                </tr>

                {collectionList.map((item, index) => (
                    <tr key={index}>
                    <td>{item["Collection ID"]}</td>
                    <td>{item["Collection Name"]}</td>
                    <td>{item["Resource Type"]}</td>
                    <td>{item["Bib Source"]}</td>
                    <td>{item["Update Frequency"]}</td>
                    <td>{item["Active?"]? 'Y': 'N'}</td>
                    <td>{item["Perpetual?"]? 'Y': 'N'}</td>
                    <td>{item["Aggregator?"]? 'Y': 'N'}</td>
                    <td>{item["Data Sync?"]? 'Y': 'N'}</td>
                    <td>{item["OA?"]? 'Y': 'N'}</td>
                    <td>{item["Reclamation?"]? 'Y': 'N'}</td>
                    <td>{item["Vendor"]}</td>
                    <td className="noteCollection">{item["Note"]}</td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
};

export default CollectionListApp;
