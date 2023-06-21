import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  productgroup__update,
  productgroup__get_one,
} from '../../../features/refData/productgroup/productgroup__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditProductGroup() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.productgroup__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [productGroupName, set__unitName] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(productgroup__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__unitName(item.productGroupName!);
      const inputFocus = document.getElementById('productGroupName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__unitName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      productGroupName,
      navigate,
    };

    dispatch(productgroup__update(update__Data));
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
          name='productGroupName'
          label='productGroupName'
          type='text'
          id='productGroupName'
          value={productGroupName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={productGroupName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditProductGroup;
