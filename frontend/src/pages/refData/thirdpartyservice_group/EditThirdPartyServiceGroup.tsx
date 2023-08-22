import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  thirdpartyservice_group__update,
  thirdpartyservice_group__get_one,
} from '../../../features/refData/thirdpartyservice_group/thirdpartyservice_group__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditThirdPartyServiceGroup() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.thirdpartyservice_group__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [thirdPartyServiceGroupName, set__thirdPartyServiceGroupName] =
    useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(thirdpartyservice_group__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__thirdPartyServiceGroupName(item.thirdPartyServiceGroupName!);
      const inputFocus = document.getElementById('thirdPartyServiceGroupName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__thirdPartyServiceGroupName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      thirdPartyServiceGroupName,
      navigate,
    };

    dispatch(thirdpartyservice_group__update(update__Data));
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

export default EditThirdPartyServiceGroup;
