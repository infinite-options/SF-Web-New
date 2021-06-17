import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'auth/AuthContext';
import AuthUtils from '../../utils/AuthUtils';
import { Box, Button, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  currUserInf: {
    display: 'flex',
    margin: '1rem',
    alignItems: 'center',
  },
  usrInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5.5rem',
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
    justifyContent: 'start',
    padding: '10px',
  },
  usrDesc: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '5px',
  },
  table: {},
}));

function CustomerInfo() {
  const classes = useStyles();
  const history = useHistory();
  const Auth = useContext(AuthContext);
  const { profile, setProfile, isAuth, setIsAuth, setAuthLevel, cartTotal } =
    Auth;
  const [startDate, setStartDate] = React.useState(new Date('2020-11-25'));
  const [endDate, setEndDate] = React.useState(new Date());
  const [custList, setCustList] = useState([]);
  React.useEffect(() => {
    console.warn('In useEffect');
    if (Auth.isAuth) {
      const AuthMethods = new AuthUtils();
      AuthMethods.getProfile().then((authRes) => {
        console.warn('AuthRes = ', authRes);
        const updatedProfile = {
          email: authRes.customer_email,
          firstName: authRes.customer_first_name,
          lastName: authRes.customer_last_name,
          pushNotifications:
            authRes.cust_notification_approval === 'TRUE' ? true : false,
          phoneNum: authRes.customer_phone_num,
          address: authRes.customer_address,
          unit: authRes.customer_unit,
          city: authRes.customer_city,
          state: authRes.customer_state,
          zip: authRes.customer_zip,
          deliveryInstructions: '',
          referralSource: authRes.referral_source,
          role: authRes.role,
          latitude: authRes.customer_lat,
          longitude: authRes.customer_long,
          zone: '',
          socialMedia: authRes.user_social_media || '',
          socialID: authRes.social_id || '',
          userAccessToken: authRes.userAccessToken,
          userRefreshToken: authRes.userRefreshToken,
          mobileAccessToken: authRes.mobile_access_token,
          mobileRefreshToken: authRes.mobile_refresh_token,
          hashed_pwd: authRes.password_hashed,
        };

        setProfile(updatedProfile);
      });
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/summary_reports/customer' +
          ',' +
          startDate +
          ',' +
          endDate
      )
      .then((res) => {
        setCustList(
          res.data.result.sort(function (a, b) {
            var textA = a.delivery_first_name.toUpperCase();
            var textB = b.delivery_first_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
        console.log(JSON.stringify({ res }));
      })
      .catch((err) => {
        if (err.res) {
          console.log(err.res);
        }
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Box className={classes.currUserInf}>
        <Avatar src={'no-link'} className={classes.currUserPic}>
          <Typography style={{ fontSize: '38px' }}>
            {profile.firstName || profile.lastName
              ? `${profile.firstName[0]}${profile.lastName[0]}`
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
              {profile.firstName} {profile.lastName}
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
                <td className={classes.usrDesc}>{profile.phoneNum}</td>
                <td className={classes.usrDesc}>
                  {profile.address},&nbsp;
                  <br /> {profile.city},&nbsp; {profile.state}&nbsp;{' '}
                  {profile.zip}
                </td>
                <td className={classes.usrDesc}>{profile.zone}</td>
                <td className={classes.usrDesc}>{profile.phoneNum}</td>
                <td className={classes.usrDesc}>{profile.phoneNum}</td>
                <td className={classes.usrDesc}>{profile.phoneNum}</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </div>
  );
}

export default CustomerInfo;
