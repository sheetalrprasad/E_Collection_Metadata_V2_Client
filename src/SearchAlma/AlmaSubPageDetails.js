import React from 'react';

const AlmaSubPageDetails = (props) => {

    const { collectionList, collectionId, errorData } = props;

    return <div className="collections table-responsive-sm">
            <div>
                {Object.keys(collectionList).length > 0 ? <div>
                    <h5>Collection Information</h5>
                    <ul>
                        <li><b>Name:</b> {collectionList.name}</li>
                        <li><b>Collection ID:</b> {collectionId}</li>
                        <li><b>Num of Portfolios:</b> {collectionList.numport}</li>
                        <li><b>Perpetual?:</b> {collectionList.perp}</li>
                        <li><b>Aggregator?:</b> {collectionList.aggre}</li>
                        <li><b>OA?:</b> {collectionList.free}</li>
                        <li><b>Local?:</b> {collectionList.iz}</li>
                        <li><b>Proxy?:</b> {collectionList.proxy}</li>
                        <li><b>CDI?:</b> {collectionList.cdi}</li>
                        <li><b>PO:</b> {collectionList.po}</li>
                        <li><b>Interface:</b> {collectionList.interface}</li>
                        <li><b>Description:</b> {collectionList.des}</li>
                        <li><b>Internal Description:</b> {collectionList.internal_des}</li>
                        <li><b>Public Note:</b> {collectionList.pub_note}</li>
                    </ul>

                    <h5>Service Information</h5>
                    <ul>
                        <li><b>Num of Portfolios: {collectionList.sernum}</b></li>
                        {
                            collectionList.serviceData.map((serviceData, index) => (
                            <div>
                                <li><b>Service{index+1} Available?: </b>{serviceData.servail}</li>
                                <li><b>Service{index+1} Portfolio:</b> {serviceData.sernum}</li>
                                <li><b>Service{index+1} description: </b>{serviceData.serdesc}</li>
                            </div>
                            ))
                        }
                    </ul>

                </div> : <div> 
                    {errorData !=="" ? <p className='error-msg'>{errorData}</p> : <p></p> }
                </div>
                }
            </div>
        </div>
};

export default AlmaSubPageDetails;