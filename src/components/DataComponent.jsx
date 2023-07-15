import React from 'react';
import { Divider } from '@mui/material';

const DataComponent = ({ userData }) => {

  let address = `${userData.city}, ${userData.region} ${userData.postalCode}`;

  return (
    <div className='dataWrapper'>
      <div className="dataInfo">
        <p>IP ADDRESS</p>
        <h3>{userData.IP}</h3>
      </div>

      <Divider orientation="vertical" flexItem />

      <div className="dataInfo">
        <p>LOCATION</p>
        <h3>{address}</h3>
      </div>
      
      <Divider orientation="vertical" flexItem />

      <div className="dataInfo">
        <p>TIMEZONE</p>
        <h3>{`UTC ${userData.timezone}`}</h3>
      </div>
      
      <Divider orientation="vertical" flexItem />

      <div className="dataInfo">
        <p>ISP</p>
        <h3>{userData.isp}</h3>
      </div>
    </div>
  )
}

export default DataComponent
