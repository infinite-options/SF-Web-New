import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box, Button, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminFarmContext } from '../AdminFarmContext';
import CustomerSrc from '../../../sf-svg-icons/Polygon1.svg';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  usrInfo: {
    display: 'flex',
    borderRadius: '20px',
  },
  currUserPic: {
    margin: '1rem',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  usrTitle: {
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    color: '#1C6D74',
    opacity: 1,
    padding: '10px',
  },
  usrDesc: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
  },
}));

function CustomerInfo(props) {
  const classes = useStyles();
  const { custID, custList, setCustList } = useContext(AdminFarmContext);
  useEffect(() => {
    if (!props.val) {
      fetchCustInfo(props.val);
    }
    console.log('mount it!');
  }, []);

  const fetchCustInfo = async (id) => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URI + 'adminCustomerInfo' + id)
      .then((res) => {
        setCustList(
          res.data.result.sort(function (a, b) {
            var textA = a.customer_first_name.toUpperCase();
            var textB = b.customer_first_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
        console.log(res.data.result);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };
  /* const fetchCustInfo = async () => {
    const res = await fetch(
      'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/adminCustomerInfo'
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchCustInfo().then((custList) => {
      setCustList(custList);
      console.log(custList);
    });
  }, []);
 */
  return (
    <div>
      {custList.map((profile, key) => (
        <div className={classes.root}>
          <Box className={classes.currUserInf}>
            <Avatar src={'no-link'} className={classes.currUserPic}>
              <Typography style={{ fontSize: '38px' }}>
                {profile.customer_first_name || profile.customer_last_name
                  ? `${profile.customer_first_name[0]}${profile.customer_last_name[0]}`
                  : 'JD'}
              </Typography>
            </Avatar>
            <Box>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="caption"
                  style={{
                    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 24px/29px SF Pro Display',
                    textAlign: 'left',
                    font: 'normal normal 600 24px/29px SF Pro Display',
                    color: '#1C6D74',
                    opacity: 1,
                  }}
                >
                  {profile.customer_first_name} {profile.customer_last_name}
                </Typography>
                <Button>
                  <img style={{ marginBottom: '10px' }} src={CustomerSrc} />
                </Button>
              </Box>

              <Typography
                variant="title"
                style={{
                  font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 16px/19px SF Pro Display',
                  textTransform: 'none',
                  textAlign: 'center',
                  textDecorationColor: 'none',
                  letterSpacing: '0.25px',
                  color: ' #1C6D74',
                  opacity: 1,
                }}
              >
                <a>Send Message</a>&nbsp;&nbsp;
                <a>Issue Coupon</a>
              </Typography>
            </Box>
          </Box>
          <Box className={classes.usrInfo}>
            <Box className={classes.currUserInf}>
              <table>
                <thead>
                  <tr>
                    <td className={classes.usrTitle}>Phone Number</td>
                    <td className={classes.usrTitle}>Delivery Address </td>
                    <td className={classes.usrTitle}>Delivery Zone</td>
                    <td className={classes.usrTitle}>Last Order Received</td>
                    <td className={classes.usrTitle}>Total no. of Orders</td>
                    <td className={classes.usrTitle}>Total Revenue</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.usrDesc}>
                      {profile.customer_phone_num}
                    </td>
                    <td className={classes.usrDesc}>
                      {profile.customer_address},&nbsp;
                      <br /> {profile.customer_city},&nbsp;{' '}
                      {profile.customer_state}&nbsp; {profile.customer_zip}
                    </td>
                    <td className={classes.usrDesc}>{profile.zone}</td>
                    <td className={classes.usrDesc}>
                      {moment(profile.last_order_date).format('LL')}
                    </td>
                    <td className={classes.usrDesc}>{profile.total_orders}</td>
                    <td className={classes.usrDesc}>{profile.total_revenue}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </div>
      ))}
    </div>
  );
}

export default CustomerInfo;
