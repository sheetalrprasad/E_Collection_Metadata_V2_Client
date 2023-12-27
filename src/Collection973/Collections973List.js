import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Collections973List.css';
import { ALL_973COLLECTIONS_URL, LOGIN_URL } from "../Constants/constants";


const Collection973ListApp = () => {
    
    const [collectionList, setCollectionList] = useState([]);
    const [allowPage, setAllowPage] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setAllowPage(true);
        } else {
            setAllowPage(false);
            navigate(LOGIN_URL);
        }
    }, [navigate]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await axios.get(ALL_973COLLECTIONS_URL);
            setCollectionList(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetch();
      }, []);

    if (allowPage) {
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
    }
};

export default Collection973ListApp;
