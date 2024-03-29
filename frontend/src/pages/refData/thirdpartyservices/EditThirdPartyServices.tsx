import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';

import {
  thirdpartyservices__update,
  thirdpartyservices__get_one,
} from '../../../features/refData/thirdpartyservices/thirdpartyservices__Slice';
import { thirdpartyservice_group__get_all } from '../../../features/refData/thirdpartyservice_group/thirdpartyservice_group__Slice';

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
  thirdPartyServiceName: '',
  description: '',
  unit: '',
  thirdPartyServiceGroup: [],
  priceBuyRecommend: '',
};

function EditThirdPartyServices() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let { id } = useParams();

  const { item, isLoading } = useAppSelector(
    (state: RootState) => state.thirdpartyservices__state
  );

  const arr__Units = useAppSelector(
    (state: RootState) => state.unit__state.items
  );

  const arr__ThirdPartyServiceGroups = useAppSelector(
    (state: RootState) => state.thirdpartyservice_group__state.items
  );

  const [formData, setFormdata] = useState(initState);

  const {
    thirdPartyServiceName,
    description,
    unit,
    thirdPartyServiceGroup,
    priceBuyRecommend,
  } = formData;

  useEffect(() => {
    if (id) {
      dispatch(thirdpartyservices__get_one({ _id: id }));
    }
    dispatch(unit__get_all({ page: `0`, limit: `0`, filter: '' }));
    dispatch(
      thirdpartyservice_group__get_all({ page: `0`, limit: `0`, filter: '' })
    );
  }, [id, dispatch]);

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceName');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (item) {
      // @ts-ignore
      const arrToSet_thirdPartyServiceGroup = item.thirdPartyServiceGroup!.map(
        (item) => {
          return typeof item !== 'string' ? item._id! : item;
        }
      );

      setFormdata({
        thirdPartyServiceName: item.thirdPartyServiceName!,
        unit: typeof item.unit! === 'string' ? item.unit : item.unit?._id!,

        // @ts-ignore
        thirdPartyServiceGroup: arrToSet_thirdPartyServiceGroup!,
        priceBuyRecommend: item.priceBuyRecommend!.toString(),
      });
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
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 1,

      navigate,
    };

    dispatch(thirdpartyservices__update(created__Data));
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
          name='thirdPartyServiceName'
          label='thirdPartyServiceName'
          type='text'
          id='thirdPartyServiceName'
          value={thirdPartyServiceName ?? ''}
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
            // prettier-ignore
            selectedOption={unit ?? ""}
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
            selectName={`thirdPartyServiceGroup`}
            selectLabel={`Группы сторонних работ`}
            fieldToShow={`thirdPartyServiceGroupName`}
            handleChangeMultipleSelects={handleChangeMultipleSelects}
            selectedOptions={
              thirdPartyServiceGroup.length !== 0 ? thirdPartyServiceGroup : []
            }
            // @ts-ignore
            arrToSelect={arr__ThirdPartyServiceGroups}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/refdata/thirdpartyservice-group/add')
            }
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
        <Button
          type='submit'
          fullWidth
          disabled={
            !thirdPartyServiceName ||
            !unit ||
            thirdPartyServiceGroup.length === 0 ||
            !priceBuyRecommend
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

export default EditThirdPartyServices;
