import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import { servicework_group__add } from '../../../features/refData/servicework_group/servicework_group__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddServiceWorkGroup() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.servicework_group__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [serviceWorkGroupName, set__serviceWorkGroupName] =
    useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('serviceWorkGroupName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__serviceWorkGroupName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      serviceWorkGroupName,
      navigate,
    };

    dispatch(servicework_group__add(created__Data));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Добавить
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          required
          fullWidth
          name='serviceWorkGroupName'
          label='serviceWorkGroupName'
          type='text'
          id='serviceWorkGroupName'
          value={serviceWorkGroupName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={serviceWorkGroupName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddServiceWorkGroup;
