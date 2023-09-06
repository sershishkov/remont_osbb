import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import { serviceworks__add } from '../../../features/refData/serviceworks/serviceworks__Slice';
import { servicework_group__get_all } from '../../../features/refData/servicework_group/servicework_group__Slice';
import { products__get_all } from '../../../features/refData/products/products__Slice';

import { unit__get_all } from '../../../features/refData/unit/unit__Slice';

import MySelectAutoCompl from '../../../components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '../../../components/common/MySelectMultipleAutoCompl';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const initState = {
  serviceWorkName: '',
  description: '',
  unit: '',
  serviceWorkGroup: [],
  priceWorkerRecommend: '',
  priceClientRecommend: '',
  products: [],
  inventars: [],
  tools: [],
  equipment: [],
  workerProtection: [],
};

function AddServiceWorks() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(
    (state: RootState) => state.serviceworks__state
  );

  const arr__Units = useAppSelector(
    (state: RootState) => state.unit__state.items
  );

  const arr__ServiceworkGroups = useAppSelector(
    (state: RootState) => state.servicework_group__state.items
  );

  const arr__Products = useAppSelector(
    (state: RootState) => state.products__state.items
  );

  const arr_Materials = useMemo(
    () =>
      arr__Products?.filter(
        (item) =>
          typeof item.productType !== 'string' &&
          item.productType?.productTypeName === 'стройматериалы'
      ),
    [arr__Products]
  );
  const arr_Inventars = useMemo(
    () =>
      arr__Products?.filter(
        (item) =>
          typeof item.productType !== 'string' &&
          item.productType?.productTypeName === 'инвентарь'
      ),
    [arr__Products]
  );
  const arr_Tools = useMemo(
    () =>
      arr__Products?.filter(
        (item) =>
          typeof item.productType !== 'string' &&
          item.productType?.productTypeName === 'инструмент'
      ),
    [arr__Products]
  );
  const arr_Equipments = useMemo(
    () =>
      arr__Products?.filter(
        (item) =>
          typeof item.productType !== 'string' &&
          item.productType?.productTypeName === 'оборудование'
      ),
    [arr__Products]
  );
  const arr_WorkerProtections = useMemo(
    () =>
      arr__Products?.filter(
        (item) =>
          typeof item.productType !== 'string' &&
          item.productType?.productTypeName === 'средство защиты'
      ),
    [arr__Products]
  );

  const [formData, setFormdata] = useState(initState);

  const {
    serviceWorkName,
    description,
    unit,
    serviceWorkGroup,
    priceWorkerRecommend,
    priceClientRecommend,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = formData;

  useEffect(() => {
    dispatch(unit__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(servicework_group__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(products__get_all({ page: `0`, limit: `0`, filter: '' }));
  }, [dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('serviceWorkName');
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
      serviceWorkName,
      description,
      unit,
      serviceWorkGroup,

      priceWorkerRecommend: priceWorkerRecommend
        ? Number(priceWorkerRecommend)
        : 1,
      priceClientRecommend: priceClientRecommend
        ? Number(priceClientRecommend)
        : 0,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,

      navigate,
    };

    dispatch(serviceworks__add(created__Data));
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
          name='serviceWorkName'
          label='serviceWorkName'
          type='text'
          id='serviceWorkName'
          value={serviceWorkName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <TextField
          margin='normal'
          multiline
          maxRows={4}
          fullWidth
          name='description'
          label='Описание'
          type='text'
          id='description'
          value={description ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`unit`}
            selectLabel={`Размерность`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
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
          <MySelectMultipleAutoCompl
            selectName={`serviceWorkGroup`}
            selectLabel={`Группы работ`}
            fieldToShow={`serviceWorkGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr__ServiceworkGroups}
          />

          <IconButton
            onClick={() => onClickAddItem('/refdata/servicework-group/add')}
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
          name='priceWorkerRecommend'
          label='priceWorkerRecommend'
          type='number'
          id='priceWorkerRecommend'
          value={priceWorkerRecommend ?? ''}
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
          name='priceClientRecommend'
          label='priceClientRecommend'
          type='number'
          id='priceClientRecommend'
          value={priceClientRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid item sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`products`}
            selectLabel={`Товары`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Materials ?? []}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/products/add')}>
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
          <MySelectMultipleAutoCompl
            selectName={`inventars`}
            selectLabel={`Инвентарь`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Inventars ?? []}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/products/add')}>
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
          <MySelectMultipleAutoCompl
            selectName={`tools`}
            selectLabel={`Инструмент`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Tools ?? []}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/products/add')}>
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
          <MySelectMultipleAutoCompl
            selectName={`equipment`}
            selectLabel={`Оборудование`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_Equipments ?? []}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/products/add')}>
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
          <MySelectMultipleAutoCompl
            selectName={`workerProtection`}
            selectLabel={`Средства Защиты`}
            fieldToShow={`productName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            // @ts-ignore
            arrToSelect={arr_WorkerProtections ?? []}
          />

          <IconButton onClick={() => onClickAddItem('/refdata/products/add')}>
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid item>
        <Button
          type='submit'
          fullWidth
          disabled={
            !serviceWorkName ||
            !unit ||
            !serviceWorkGroup ||
            !priceWorkerRecommend
          }
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddServiceWorks;
