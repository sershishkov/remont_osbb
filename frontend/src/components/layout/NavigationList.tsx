import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/auth__Slice';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { manager_role, refData_links } from '../../constants/constants';

function NavigationList({ toggleDrawer }: { toggleDrawer: Function }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth__state);
  const [openAuth, set__openAuth] = useState<boolean>(false);
  const [open__RefData, set__open__RefData] = useState<boolean>(false);
  // const [open__accounting, set__open__accounting] = useState<boolean>(false);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      onClick={() => toggleDrawer(false)}
    >
      <ListItemButton onClick={() => set__openAuth(!openAuth)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Пользователь' />
        {openAuth ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAuth} timeout='auto' unmountOnExit>
        <List disablePadding>
          {user ? (
            <>
              <ListItemButton
                // sx={{ pl: 4 }}
                component={Link}
                href='/infouser'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaSignInAlt />
                </ListItemIcon>
                <ListItemText primary='Информация' />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  toggleDrawer(false);
                  onLogout();
                }}
              >
                <ListItemIcon>
                  <FaSignOutAlt />
                </ListItemIcon>
                <ListItemText primary='Выход' />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/user-profile'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary={`${user.name}`} />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/auth/register'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary='Регистрация' />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/auth/login'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaSignInAlt />
                </ListItemIcon>
                <ListItemText primary='Вход' />
              </ListItemButton>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                component={Link}
                href='/user-admin'
                onClick={() => toggleDrawer(false)}
              >
                <ListItemIcon>
                  <FaSignInAlt />
                </ListItemIcon>
                <ListItemText primary='Пользователи' />
              </ListItemButton>
            </>
          )}
        </List>
      </Collapse>
      {manager_role.includes(user?.role!) && (
        <>
          <ListItemButton onClick={() => set__open__RefData(!open__RefData)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Справочники' />
            {open__RefData ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open__RefData} timeout='auto' unmountOnExit>
            <List disablePadding>
              {refData_links.map((item) => (
                <ListItemButton
                  key={item.link}
                  sx={{ pl: 4 }}
                  component={Link}
                  href={item.link}
                  onClick={() => toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${item.caption}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
}

export default NavigationList;
