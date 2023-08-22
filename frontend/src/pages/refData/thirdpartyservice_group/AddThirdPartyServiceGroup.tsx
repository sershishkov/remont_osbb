import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import { thirdpartyservice_group__add } from '../../../features/refData/thirdpartyservice_group/thirdpartyservice_group__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function AddThirdPartyServiceGroup() {
  const { isLoading } = useAppSelector(
    (state: RootState) => state.thirdpartyservice_group__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [thirdPartyServiceGroupName, set__thirdPartyServiceGroupName] =
    useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceGroupName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__thirdPartyServiceGroupName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      thirdPartyServiceGroupName,
      navigate,
    };

    dispatch(thirdpartyservice_group__add(created__Data));
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
          name='thirdPartyServiceGroupName'
          label='thirdPartyServiceGroupName'
          type='text'
          id='thirdPartyServiceGroupName'
          value={thirdPartyServiceGroupName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={thirdPartyServiceGroupName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddThirdPartyServiceGroup;
