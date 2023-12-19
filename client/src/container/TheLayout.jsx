import { Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nav from '../nav';
import { getAllDeviceType } from '../redux/action/deviceType';
import { getAllHome } from '../redux/action/home';
import { getAllRoomType } from '../redux/action/roomType';
import routes from '../routes';
import '../scss/layout.scss';
import { getAllowedNav, getAllowedRoute } from '../service/auth';
import TheContent from './TheContent';
import TheHeader from './TheHeader';
import TheNavbar from './TheNavbar';

const TheLayout = () => {
  const role = 'OWNER';
  const dispatch = useDispatch();
  let allowedNav, allowedRoute;
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.data);

  if (user) {
    allowedRoute = getAllowedRoute(routes, role);
    allowedNav = getAllowedNav(nav, role);
    dispatch(getAllRoomType());
    dispatch(getAllHome());
    dispatch(getAllDeviceType());
  } else {
    window.location.href = '/login';
  }

  return (
    <Layout>
      <Layout>
        <TheHeader />
        <TheContent menu={allowedRoute} socket={socket} />
        <TheNavbar menu={allowedNav} />
      </Layout>
    </Layout>
  );
};

export default TheLayout;
