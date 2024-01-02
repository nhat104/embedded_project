import { Badge, Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import pathname from '../config/pathname';
import '../scss/header.scss';

const TheHeader = () => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div>
        <Button type='primary' onClick={() => navigate(pathname.home)}>
          Home
        </Button>
      </div>
      <div>
        <Button onClick={() => navigate(pathname.createHouse)}>Create House</Button>
      </div>
      <div className='avatar' onClick={() => navigate(pathname.profile)}>
        <img src={`${process.env.PUBLIC_URL}/images/avatars/avatar_3.jpg`} alt='avatar' />
        {/* <img src={`${process.env.REACT_APP_IMAGE}/${userAvatar}`} alt='avatar' /> */}
      </div>
    </div>
  );
};

export default TheHeader;
