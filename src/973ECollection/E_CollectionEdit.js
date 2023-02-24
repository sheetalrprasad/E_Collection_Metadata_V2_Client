import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from '../api/axios';

const E_COLLECTIONS_EDIT_URL = "/ecollections-edit";

function EcollectionEdit () {
    
    const [collectionData, setCollectionData] = useState();

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
    }, [data]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { responseData } = await axios.get(E_COLLECTIONS_EDIT_URL, {
                params: {
                    id: data.CollectionID
                }
            });
            setCollectionData(responseData);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, [data]);


      return (
        <div className="collections table-responsive-sm">
            <table className='table table-bordered table-hover'>
                <tbody>
                    <tr className="table-primary" key='headers'>
                    <th scope="col">Collection ID</th>
                    <th scope="col">Collection Name</th>
                    <th scope="col">973 in Bib?</th>
                    <th scope="col">973 Norm Rule?</th>
                    <th scope="col">IZ Only?</th>
                    <th className="noteCollection" scope="col">Note</th>
                    </tr>

                    <tr>
                        <td>{collectionData["CollectionID"]}</td>
                        <td>{collectionData["973Value"]}</td>
                        <td>{collectionData["973inAllBIB"]? 'Y': 'N'}</td>
                        <td>{collectionData["973NormRule"]? 'Y': 'N'}</td>
                        <td>{collectionData["IZonly?"]? 'Y': 'N'}</td>
                        <td className="noteCollection">{collectionData["Note"]}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
};

export default EcollectionEdit;