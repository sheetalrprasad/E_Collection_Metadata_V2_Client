import React from 'react';
import { useEffect, useState } from "react";
import Axios from "axios";

const VendorListApp = () => {
    
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const { data } = await Axios.get("http://localhost:3001/vendors");
            console.log(data)
            setVendorList(data);
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
                <th scope="col">Vendor ID</th>
                <th scope="col">Vendor Name</th>
                <th scope="col">Vendor Web</th>
                <th scope="col">User Name</th>
                <th scope="col">Password</th>
                <th className="note" scope="col">Note</th>
                <th scope="col">Contact</th>
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
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
};

export default VendorListApp;
