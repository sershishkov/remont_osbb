import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { set_theme_mode } from '../../features/theme/themeSlice';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import NavigationList from './NavigationList';
import { MaterialUISwitch } from './MaterialUISwitch';

function Header() {
  const [openDrawer, set__openDrawer] = useState<boolean>(false);
  const [themeChecked, set__themeChecked] = useState<boolean>(
    JSON.parse(localStorage.getItem('theme')!)
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(set_theme_mode(themeChecked));
  }, [dispatch, themeChecked]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      set__openDrawer(open);
    };

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_theme_mode(event.target.checked));
    set__themeChecked(event.target.checked);
    localStorage.setItem('theme', JSON.stringify(event.target.checked));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <NavigationList toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>
          <Link href='/' sx={{ flexGrow: 1, color: '#fff' }}>
            Расчет Ремонтов
          </Link>

          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={themeChecked}
            onChange={toggleTheme}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
