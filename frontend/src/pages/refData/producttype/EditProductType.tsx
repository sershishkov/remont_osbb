import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { useNavigate, useParams } from 'react-router-dom';

import {
  producttype__update,
  producttype__get_one,
} from '../../../features/refData/producttype/producttype__Slice';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

function EditProductType() {
  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.producttype__state
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const [productTypeName, set__productTypeName] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(producttype__get_one({ _id: id }));
    }
  }, [id, dispatch]);

  useLayoutEffect(() => {
    if (item) {
      set__productTypeName(item.productTypeName!);
      const inputFocus = document.getElementById('productTypeName');
      inputFocus?.focus();
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set__productTypeName(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const update__Data = {
      _id: id,
      productTypeName,
      navigate,
    };

    dispatch(producttype__update(update__Data));
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
          name='productTypeName'
          label='productTypeName'
          type='text'
          id='productTypeName'
          value={productTypeName}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={productTypeName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditProductType;
