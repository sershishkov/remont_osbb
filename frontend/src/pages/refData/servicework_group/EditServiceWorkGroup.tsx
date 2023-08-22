import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  servicework_group__update,
  servicework_group__get_one,
} from '../../../features/refData/servicework_group/servicework_group__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditServiceWorkGroup() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.servicework_group__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [serviceWorkGroupName, set__serviceWorkGroupName] =
    useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(servicework_group__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__serviceWorkGroupName(item.serviceWorkGroupName!);
      const inputFocus = document.getElementById('serviceWorkGroupName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__serviceWorkGroupName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      serviceWorkGroupName,
      navigate,
    };

    dispatch(servicework_group__update(update__Data));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid component='form' onSubmit={onSubmit} container direction='column'>
      <Grid item className='item item-heading'>
        <Typography variant='h3' align='center'>
          Редактировать
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

export default EditServiceWorkGroup;
