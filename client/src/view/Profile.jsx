import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import setting from '../assets/setting.png';
import { account } from '../config/account';
import pathname from '../config/pathname';
import { logout } from '../redux/slice/auth';
import '../scss/profile.scss';
import { getUserInfo } from '../service/user';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo((res) => {
      if (res.data.success === true) {
        setUser(res.data.user);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);

  const handleEditProfile = () => {
    navigate(pathname.editProfile);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='profile'>
      <div className='container'>
        <div className='image'>
          <img src={setting} alt='setting' />
        </div>
        <div className='profile-user'>
          <div className='user-detail'>
            <div className='name'>{user.name}</div>
            <p>{user.phone}</p>
            <p>{user.email}</p>
          </div>
          <div className='edit' onClick={handleEditProfile}>
            <span class='material-symbols-rounded'>edit_note</span>
          </div>
        </div>
        <div className='actions'>
          <p style={{ marginBottom: '10px' }}>Your account</p>
          <div className='account-action-list'>
            {account.map((acc, index) => {
              return (
                <div
                  className='action'
                  onClick={() => {
                    if (acc.name === 'Logout') {
                      handleLogout();
                    } else {
                      navigate(acc.to);
                    }
                  }}
                >
                  <div className='icon'>
                    <span
                      className='material-icons'
                      style={{
                        color: 'var(--white)',
                        fontSize: '25px',
                      }}
                    >
                      {acc.icon}
                    </span>
                    <p>{acc.name}</p>
                  </div>

                  <span class='material-symbols-rounded'>chevron_right</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
