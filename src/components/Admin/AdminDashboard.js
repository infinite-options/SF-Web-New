import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Paper, Typography, Avatar } from '@material-ui/core';
import Revenue from './HighchartTemplate';
import Analytics from './Analytics';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: '#BCCDCE',
    padding: '2rem',
    justifyContent: 'space-between',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '20px',
  },
  header: {
    textAlign: 'left',
    font: 'normal normal bold 16px/19px SF Pro Display',
    letterSpacing: '0.25px',
    color: '#1C6D74',
    opacity: 1,
  },
  upcoming: {
    display: 'flex',
    color: 'var(--unnamed-color-1c6d74)',
    textSlign: 'left',
    font: 'normal normal medium SF Pro Display',
    fontSize: '14px',
    letterSpacing: ' 0.22px',
    color: '#1C6D74',
    opacity: 1,
    padding: '2px',
  },
  currUserPic: {
    margin: '5px',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function AdminDashboard() {
  const classes = useStyles();
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/orderSummary'
      )
      .then((res) => {
        setUpcomingOrders(
          res.data.result.sort(function (a, b) {
            var textA = a.delivery_first_name.toUpperCase();
            var textB = b.delivery_first_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ paddingRight: '20px' }}>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                Upcoming Orders
              </Typography>
              <div>
                {upcomingOrders.map((info) => (
                  <div
                    style={{
                      display: 'flex',
                      borderBottom: '0.5px solid #F5841F',
                      padding: '5px',
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography className={classes.upcoming}>
                        {moment(info.start_delivery_date)
                          .format('dddd, MMMM Do')
                          .slice(0, -2)}
                      </Typography>
                    </Box>

                    <Avatar
                      variant="rounded"
                      src={'no-link'}
                      className={classes.currUserPic}
                    >
                      <Typography style={{ fontSize: '25px' }}>
                        {info.delivery_first_name || info.delivery_last_name
                          ? `${info.delivery_first_name[0]}${info.delivery_last_name[0]}`
                          : 'JD'}
                      </Typography>
                    </Avatar>
                    <Box>
                      <Box alignItems="center" justifyContent="center">
                        <Typography className={classes.upcoming}>
                          {info.delivery_first_name}
                          {info.delivery_last_name}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography className={classes.upcoming}>
                          {info.delivery_address}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                Revenue for the week
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography className={classes.header}>Revenue($ vs time)</Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                Revenue for the week
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography className={classes.header}>
          Analytics(# or $ by customer)
        </Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                Revenue for the week
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography className={classes.header}>
                First time customers
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AdminDashboard;
