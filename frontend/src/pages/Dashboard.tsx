import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Dashboard = () => {
  return (
    <Grid container direction='column' justifyContent='flex-start'>
      <Grid item>
        <Grid container>
          <Grid item xs={3}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6'>Буxгалтерия</Typography>
              </CardContent>
              <CardActions>
                <Grid container direction='column'>
                  <Grid item>
                    <Button component={Link} href='/account/clients'>
                      Клиенты
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} href='/account/suppliers'>
                      Поставщики
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button component={Link} href='/account/ourfirms'>
                      Наши фирмы
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6'>Расчеты</Typography>
              </CardContent>
              <CardActions>
                <Grid container direction='column'>
                  <Grid item>
                    <Button component={Link} href='/calculation/new'>
                      Новый просчет
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6'>расчет по Шаблону</Typography>
              </CardContent>
              <CardActions>
                <Grid container direction='column'>
                  <Grid item>
                    <Button
                      component={Link}
                      href='/calculation/templates/asfalt'
                    >
                      Асфальт
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6'>Отчеты</Typography>
              </CardContent>
              <CardActions>
                <Grid container direction='column'>
                  <Grid item>
                    <Button component={Link} href='/account/reports/by-deals'>
                      По сделкам
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
