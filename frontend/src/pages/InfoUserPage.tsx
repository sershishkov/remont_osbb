import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';

function InfoUserPage() {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='h3' align='center'>
          Информация для клиентов
        </Typography>
        <Typography variant='h5' align='center'>
          Наша компания осуществляет услуги по ремонтам для ОСББ, так же мы
          работаем с физическими лицами
        </Typography>
      </Grid>

      <Grid item style={{ marginBottom: '3em' }}>
        <Typography variant='h5' align='center'>
          Основные наши направления:
        </Typography>
        <List>
          <ListItem>
            <Typography variant='h6'>Асфальтные работы</Typography>
          </ListItem>

          <ListItem>
            <Typography variant='h6'>Ремонт подъездов</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>Кровельные работы</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>Крыльцо и козырьки подъездов</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>Высотные работы</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>Электромонтажные работы</Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>
              Изготовление и установка металлоконструкций
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6'>Сантехнические работы</Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' align='center'>
          Асфальтные работы
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              Укладка асфальта
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Установка бордюров и поребриков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Укладка тротуарной плитки
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Укладка асфальтной крошки
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' align='center'>
          Ремонт подъездов
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              Ремонт стен
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Ремонт потолков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Покраска стен и потолков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Покраска перил
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Замена окон на металлопластиковые
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Замена дверей на металлопластиковые
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              Устройство откосов
            </Typography>
          </ListItem>
        </List>
      </Grid>
      <Grid item>
        <Typography variant='h6' align='center'>
          Кровельные работы
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт мягкой кровли
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              демонтаж и монтаж покрытия мягкой кровли
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт смотровых окон шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт коньков шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт и замена водосточной системы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              демонтаж и монтаж кровель на основе металлоцерепицы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              демонтаж и монтаж кровель на основе профнастила
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' align='center'>
          Высотные работы
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              Ремонт межпанельных швов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт температурных швов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт панелей дома
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              утепление домов пенопластом
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' align='center'>
          Электромонтажные работы
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              ремонт и поиск неисправности в электропроводке
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              установка и замена щитового оборудования и его компонентов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              монтаж и замена вводно-распределительного устройства
              электропроводки осветительной арматуры электрощитовой
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              проверка и ревизия контактных соединений и состояния проводов в
              соединительных и видгалужуных коробках и щитах
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item>
        <Typography variant='h6' align='center'>
          Сантехнические работы
        </Typography>

        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              монтаж и замена трубопроводов и стояков горячего и голодного
              водоснабжения
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              монтаж и замена системы канализации
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              монтаж и замена системы отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='body2' align='center'>
              монтаж и замена задвижек
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default InfoUserPage;
