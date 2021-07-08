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

  return (
    <div className={classes.root}>
      <Box
        style={{
          display: 'flex',
          marginBottom: '1rem',
          marginRight: '1rem',
          flexDirection: 'column',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          borderRadius: '20px',
          opacity: 1,
          boxSizing: 'border-box',
          maxWidth: '50%',
          maxHeight: '70%',
          position: 'relative',
        }}
      >
        <Revenue />
      </Box>
      <Box
        style={{
          display: 'flex',
          marginBottom: '1rem',
          marginRight: '1rem',
          flexDirection: 'column',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          borderRadius: '20px',
          opacity: 1,
          maxWidth: '50%',
          maxHeight: '70%',
        }}
      >
        <Analytics />
      </Box>
    </div>
  );
}

export default AdminDashboard;
