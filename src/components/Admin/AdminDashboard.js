import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';
import Revenue from './HighchartTemplate';
import Analytics from './Analytics';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BCCDCE',
    padding: '2rem',
  },
}));

function AdminDashboard() {
  const classes = useStyles();

  return <div className={classes.root}>Dashboard</div>;
}

export default AdminDashboard;
