import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import { updateUserProfile, logout } from '../../features/auth/auth__Slice';

const UserEditDetails = () => {
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [showPassword, set__showPassword] = useState<boolean>(false);
  const [showPassword2, set__showPassword2] = useState<boolean>(false);
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(
    (state: RootState) => state.auth__state
  );

  useLayoutEffect(() => {
    if (user) {
      setFormdata((prevState) => ({
        ...prevState,
        name: user.name ? user.name : '',
        email: user.email ? user.email : '',
      }));
    }
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitDetail = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password,
        navigate,
      };

      dispatch(updateUserProfile(userData));
      dispatch(logout());
    }
  };

  const handleClickShowPassword = () => {
    set__showPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    set__showPassword2(!showPassword2);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container direction='column'>
      <Grid item sx={{ mb: 5 }}>
        <Typography variant='h3' align='center'>
          Моя страница
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant='h3' align='center'>
          Изменить почту или имя
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='name'
          label='Имя'
          type='text'
          id='name'
          value={name}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='email'
          type='email'
          id='email'
          value={email}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mt: 5 }}>
        <Typography variant='h3' align='center'>
          Изменить пароль
        </Typography>
      </Grid>
      <Grid item>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password'>Пароль</InputLabel>
          <OutlinedInput
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl variant='outlined' fullWidth margin='normal'>
          <InputLabel htmlFor='password2'>Подтвердить пароль</InputLabel>
          <OutlinedInput
            id='password2'
            name='password2'
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            onChange={onChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Подтвердить пароль'
          />
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          type='button'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={onSubmitDetail}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserEditDetails;
