import React, { Component } from 'react';
import {
  Box,
  Badge,
  Grid,
  Dialog,
  Button,
  Hidden,
  IconButton,
  Drawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfo from './CustomerInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BCCDCE',
    padding: '20px',
  },
}));

function Customers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          lg={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1rem',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          <CustomerInfo />
        </Grid>

        <Grid
          lg={3}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            marginRight: '4.8rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          Payment History
        </Grid>
        <Grid
          lg={5}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            marginRight: '4.8rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          Payment Made
        </Grid>
        <Grid lg={3}>
          <Grid
            style={{
              display: 'flex',
              marginBottom: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
            }}
          >
            Farms Supported
          </Grid>
          <Grid
            style={{
              display: 'flex',
              marginBottom: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
            }}
          >
            Produce Ordered
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customers;
