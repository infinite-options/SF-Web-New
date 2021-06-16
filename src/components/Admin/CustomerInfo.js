import React, { Component, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'auth/AuthContext';
import AuthUtils from '../../utils/AuthUtils';

import {
  Box,
  Button,
  Typography,
  TextField,
  Avatar,
  Dialog,
} from '@material-ui/core';
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
    marginLeft: '20rem',
  },
  currUserPic: {
    margin: '1rem',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  usrTitle: {
    textAlign: 'center',
    font: 'normal normal 600 16px/19px SF Pro Display',
    fontSize: '20px',
    letterSpacing: '0.25px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
  },
  usrDesc: {
    textAlign: 'center',
    font: 'normal normal 600 20px/23px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
  },
  table: {
    minWidth: 650,
    borderColor: 'white',
  },
}));

function CustomerInfo() {
  const classes = useStyles();
  const history = useHistory();
  const Auth = useContext(AuthContext);
  const { profile, setProfile, isAuth, setIsAuth, setAuthLevel, cartTotal } =
    Auth;
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
  /* React.useEffect(()=.{
      console.warn('In useEffect');
      if(Auth.isAuth{
    
      })
  }) */
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
              display="block"
              variant="caption"
              style={{
                font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 24px/29px SF Pro Display',
                textAlign: 'left',
                font: 'normal normal 600 24px/29px SF Pro Display',
                letterSpacing: '0.38px',
                color: '#1C6D74',
                opacity: 1,
              }}
            >
              {profile.firstName} &nbsp;
              {profile.lastName}
            </Typography>
            <Button>
              <img style={{ marginBottom: '10px' }} src={CustomerSrc} />
            </Button>
          </Box>

          <Typography
            variant="title"
            display="block"
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
            <a>Send Message</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a>Issue Coupon</a>
          </Typography>
        </Box>
      </Box>
      <Box className={classes.usrInfo}>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>Phone Number</Typography>
            <Typography className={classes.usrDesc}>
              {profile.phoneNum}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>
              Delivery Address
            </Typography>
            <Typography className={classes.usrDesc}>
              {profile.address},&nbsp;
              <br /> {profile.city},&nbsp; {profile.state}&nbsp; {profile.zip}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>Delivery Zone</Typography>
            <Typography className={classes.usrDesc}>{profile.zone}</Typography>
          </Box>
        </Box>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>
              Last Order Received
            </Typography>
            <Typography className={classes.usrDesc}>{profile.zone}</Typography>
          </Box>
        </Box>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>
              Total no. of Orders
            </Typography>
            <Typography className={classes.usrDesc}>{profile.zone}</Typography>
          </Box>
        </Box>
        <Box className={classes.currUserInf}>
          <Box>
            <Typography className={classes.usrTitle}>Total Revenue</Typography>
            <Typography className={classes.usrDesc}>{profile.zone}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CustomerInfo;
