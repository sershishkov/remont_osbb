import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import {
  products__update,
  products__get_one,
} from '../../../features/refData/products/products__Slice';
import { productgroup__get_all } from '../../../features/refData/productgroup/productgroup__Slice';
import { producttype__get_all } from '../../../features/refData/producttype/producttype__Slice';
import { unit__get_all } from '../../../features/refData/unit/unit__Slice';

import {
  I_Unit,
  I_ProductGroup,
  I_ProductType,
} from '../../../interfaces/AccountingInterfaces';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const initState = {
  productName: '',
  unit: '',
  productType: '',
  priceBuyRecommend: '',
  normPerOne: '',
  amountInPackage: '',
  weight: '',
  height: '',
  width: '',
  length: '',
  paintingArea: '',
};

function EditProducts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const { item, isLoading } = useAppSelector(
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
  const [productGroup, set__productGroup] = useState<string[]>([]);

  const {
    productName,
    unit,
    productType,
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
    if (id) {
      dispatch(products__get_one({ _id: id }));
    }
    dispatch(unit__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(productgroup__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(producttype__get_all({ page: `0`, limit: `0`, filter: '' }));
  }, [id, dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('productName');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (item) {
      setFormdata({
        productName: item.productName!,

        unit: typeof item.unit! === 'string' ? item.unit : item.unit?._id!,
        productType:
          typeof item.productType! === 'string'
            ? item.productType
            : item.productType?._id!,

        priceBuyRecommend: item.priceBuyRecommend!.toString(),
        normPerOne: item.normPerOne!.toString(),
        amountInPackage: item.amountInPackage!.toString(),
        weight: item.weight!.toString(),
        height: item.height!.toString(),
        width: item.width!.toString(),
        length: item.length!.toString(),
        paintingArea: item.paintingArea!.toString(),
      });
      const arrToSet = item.productGroup!.map((item) => {
        return typeof item !== 'string' ? item._id! : item;
      });
      set__productGroup(arrToSet);
    }
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      _id: id,
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

    dispatch(products__update(created__Data));
  };

  const handleChangeSelects = (event: SelectChangeEvent) => {
    setFormdata((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value as string,
    }));
  };
  const handleChangeMultipleSelects = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    set__productGroup(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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
          Редактировать
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
          <FormControl fullWidth>
            <InputLabel id='unit-label'>unit</InputLabel>
            <Select
              labelId='unit-label'
              id='unit'
              name='unit'
              value={unit ?? ''}
              label='Размерность'
              onChange={handleChangeSelects}
            >
              {arr__Units?.map((item: I_Unit) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.unitName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel id='productGroup-label'>productGroup</InputLabel>
            <Select
              labelId='productGroup-label'
              id='productGroup'
              multiple
              value={productGroup ?? []}
              onChange={handleChangeMultipleSelects}
              input={<OutlinedInput label='productGroup' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const newItem = arr__ProductGroups?.find(
                      (item) => item._id === value
                    );
                    return (
                      <Chip key={value} label={newItem?.productGroupName} />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {arr__ProductGroups?.map((item: I_ProductGroup) => (
                <MenuItem key={item._id} value={item._id}>
                  <Checkbox checked={productGroup!.indexOf(item._id!) > -1} />
                  <ListItemText primary={item.productGroupName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel id='productType-label'>productType</InputLabel>
            <Select
              labelId='productType-label'
              id='productType'
              name='productType'
              value={productType ?? ''}
              label='Тип'
              onChange={handleChangeSelects}
            >
              {arr__ProductTypes?.map((item: I_ProductType) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.productTypeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default EditProducts;
