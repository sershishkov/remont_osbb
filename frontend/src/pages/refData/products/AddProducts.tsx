import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import { products__add } from '../../../features/refData/products/products__Slice';
import { productgroup__get_all } from '../../../features/refData/productgroup/productgroup__Slice';
import { producttype__get_all } from '../../../features/refData/producttype/producttype__Slice';
import { unit__get_all } from '../../../features/refData/unit/unit__Slice';

import MySelect from '../../../components/common/MySelect';
import MySelectMultiple from '../../../components/common/MySelectMultiple';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const initState = {
  productName: '',
  unit: '',
  productType: '',
  productGroup: [],
  priceBuyRecommend: '',
  normPerOne: '',
  amountInPackage: '',
  weight: '',
  height: '',
  width: '',
  length: '',
  paintingArea: '',
};

function AddProducts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(
    (state: RootState) => state.products__state
  );

  const arr__Units = useAppSelector(
    (state: RootState) => state.unit__state.items
  );

  const arr__ProductGroups = useAppSelector(
    (state: RootState) => state.productgroup__state.items
  );
  const arr__ProductTypes = useAppSelector(
    (state: RootState) => state.producttype__state.items
  );

  const [formData, setFormdata] = useState(initState);

  const {
    productName,
    unit,
    productType,
    productGroup,
    priceBuyRecommend,
    normPerOne,
    amountInPackage,
    weight,
    height,
    width,
    length,
    paintingArea,
  } = formData;

  useEffect(() => {
    dispatch(unit__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(productgroup__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(producttype__get_all({ page: `0`, limit: `0`, filter: '' }));
  }, [dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('productName');
    inputFocus?.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      productName,
      unit,
      productGroup,
      productType,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 1,
      normPerOne: normPerOne ? Number(normPerOne) : 1,
      amountInPackage: amountInPackage ? Number(amountInPackage) : 1,
      weight: weight ? Number(weight) : 0,
      height: height ? Number(height) : 0,
      width: width ? Number(width) : 0,
      length: length ? Number(length) : 0,
      paintingArea: paintingArea ? Number(paintingArea) : 0,

      navigate,
    };

    dispatch(products__add(created__Data));
  };

  const handleChangeSelects = (targetName: string, targetValue: string) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleChangeMultipleSelects = (
    targetName: string,
    targetValue: string[]
  ) => {
    setFormdata((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onClickAddItem = (link: string) => {
    navigate(`${link}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
    >
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
          name='productName'
          label='productName'
          type='text'
          id='productName'
          value={productName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelect
            selectName={`unit`}
            selectLabel={`Размерность`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
            selectedItem={''}
            // @ts-ignore
            arrToSelect={arr__Units}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/unit/add')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultiple
            selectName={`productGroup`}
            selectLabel={`Группы товаров`}
            fieldToShow={`productGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr__ProductGroups}
          />

          <IconButton
            onClick={() => onClickAddItem('/refdata/productgroup/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelect
            selectName={`productType`}
            selectLabel={`Тип`}
            fieldToShow={`productTypeName`}
            handleChangeSelects={handleChangeSelects}
            selectedItem={''}
            // @ts-ignore
            arrToSelect={arr__ProductTypes}
          />

          <IconButton
            onClick={() => onClickAddItem('/refdata/producttype/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='priceBuyRecommend'
          label='priceBuyRecommend'
          type='number'
          id='priceBuyRecommend'
          value={priceBuyRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid item>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='normPerOne'
          label='normPerOne'
          type='number'
          id='normPerOne'
          value={normPerOne ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='amountInPackage'
          label='amountInPackage'
          type='number'
          id='amountInPackage'
          value={amountInPackage ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='weight'
          label='weight'
          type='number'
          id='weight'
          value={weight ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='height'
          label='height'
          type='number'
          id='height'
          value={height ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='width'
          label='width'
          type='number'
          id='width'
          value={width ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='length'
          label='length'
          type='number'
          id='length'
          value={length ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          // required
          fullWidth
          name='paintingArea'
          label='paintingArea'
          type='number'
          id='paintingArea'
          value={paintingArea ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={!productName || !unit || !productGroup || !productType}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddProducts;
