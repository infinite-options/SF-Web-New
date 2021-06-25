import React, { Component } from 'react';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import CssTextField from '../../utils/CssTextField';
import appColors from '../../styles/AppColors';
import SocialLogin from '../LogIn/SocialLogin';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Signupmodal from './Signupmodal';



const Signup = ({...props}) => {
  const [customer, setCustomer] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    message: ''
    
    
    });
    const [modal,setModal]=useState('')
    

  
  const history = useHistory();
  const onSubmit1 = (event) => {
      event.preventDefault();
      setModal('success');

  };
  const onSubmit2 = (event) => {
    event.preventDefault();
    console.log('_onSubmit');
    console.log(customer);
    if (
      customer.password === customer.confirmPassword &&
      customer.password.length > 0
    ) {
      axios
        .get('https://dev.virtualearth.net/REST/v1/Locations/', {
          params: {
            CountryRegion: 'US',
            adminDistrict: customer.state,
            locality: customer.city,
            postalCode: customer.zip,
            addressLine: customer.address,
            key: process.env.REACT_APP_BING_LOCATION_KEY,
          },
        })
        .then((res) => {
          console.log(res);
          let locationApiResult = res.data;
          if (locationApiResult.statusCode === 200) {
            let locations = locationApiResult.resourceSets[0].resources;
            /* Possible improvement: choose better location in case first one not desired
             */
            let location = locations[0];
            let lat = location.geocodePoints[0].coordinates[0];
            let long = location.geocodePoints[0].coordinates[1];
            if (location.geocodePoints.length === 2) {
              lat = location.geocodePoints[1].coordinates[0];
              long = location.geocodePoints[1].coordinates[1];
            }
            let object = {
              email: customer.email,
              password: customer.password,
              first_name: customer.firstName,
              last_name: customer.lastName,
              phone_number: customer.phone,
              address: customer.address,
              unit: customer.unit,
              city: customer.city,
              state: customer.state,
              zip_code: customer.zip,
              latitude: lat.toString(),
              longitude: long.toString(),
              referral_source: 'WEB',
              role: 'CUSTOMER',
              social: 'FALSE',
              social_id: 'NULL',
              user_access_token: 'FALSE',
              user_refresh_token: 'FALSE',
              mobile_access_token: 'FALSE',
              mobile_refresh_token: 'FALSE',
            };
            console.log(JSON.stringify(object));
            axios
              .post(
                process.env.REACT_APP_SERVER_BASE_URI + 'createAccount',
                object,
                {
                  headers: {
                    'Content-Type': 'text/plain',
                  },
                }
              )
              .then((res) => {
                let customerInfo = res.data.result;
                console.log(customerInfo);
                if (res.data.code === 200) {
                  axios
                    .post(
                      process.env.REACT_APP_SERVER_BASE_URI +
                        'email_verification',
                      { email: customer.email },
                      {
                        headers: {
                          'Content-Type': 'text/plain',
                        },
                      }
                    )
                    .then((res) => {
                      setCustomer({
                        message: 'success',
                        
                      });
                      console.log(res);
                      console.log("state"+customer);
                      alert("Confirmation email sent. Please check and click the link included.");
                      props.setIsSignUpShown(false);
                      props.setIsLoginShown(true);
                    })
                    .catch((err) => {
                      if (err.response) {
                        console.log(err.response);
                      }
                      console.log("err"+err);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                if (err.response) {
                  console.log("err+"+err.response);
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(err.response);
          }
        });
    } else {
      console.log('Passwords not matching');
    }
  };




  const _emailChange = (event) => {
    setCustomer({
        ...customer,
      email: event.target.value,
    });
    console.log(customer);
  };

  const _passwordChange = (event) => {
    setCustomer({
        ...customer,
      password: event.target.value,
    });
    console.log(customer);
  };

    const _confirmPasswordChange = (event) => {
    setCustomer({
        ...customer,
      confirmPassword: event.target.value,
    });
    console.log(customer);
  };

  const _firstNameChange = (event) => {
    setCustomer({
        ...customer,
      firstName: event.target.value,
    });
    console.log(customer);
  };

  const _lastNameChange = (event) => {
    setCustomer({
        ...customer,
      lastName: event.target.value,
    });
    console.log(customer);
  };

   const _phoneChange = (event) => {
    setCustomer({
        ...customer,
      phone: event.target.value,
    });
    console.log(customer);
  };

  const _addressChange = (event) => {
    setCustomer({
        ...customer,
      address: event.target.value,
    });
    console.log(customer);
  };

  const _unitChange = (event) => {
    setCustomer({
        ...customer,
      unit: event.target.value,
    });
    console.log(customer);
  };

 const  _cityChange = (event) => {
    setCustomer({
        ...customer,
      city: event.target.value,
    });
    console.log(customer);
  };

  const _stateChange = (event) => {
    setCustomer({
        ...customer,
      state: event.target.value,
    });
    console.log(customer);
  };

  const _zipChange = (event) => {
    setCustomer({
        ...customer,
      zip: event.target.value,
    });
    console.log(customer);
  };

  return (
    <Paper
      style={{
        width: 480,
        height: 'auto',
        padding: 20,
        backgroundColor: '#E0E6E6F2',
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      {/* <div >
          <img src={cross}  style={{float:'right',height:'25px',width:'25px',color:'black',marginTop:'3px',marginRight:'3px'}}></img>
         </div> */}
    
      
      <p
        style={{
          color: appColors.secondary,
          fontSize: '32px',
          fontWeight: 'bolder',
          textDecoration: 'underline',
        }}
      >
        Sign Up
      </p>
        {modal === 'success' && (
            <>
              
            <SocialLogin />
        <Box
          style={{
            borderBottom: '2px solid #136D74',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        ></Box>
        <p style={{ fontWeight: 'bold' }}>Or continue with email</p>
        <Box display="flex" mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.firstName}
            onChange={_firstNameChange}
            label="First Name"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Box display="flex" mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.lastName}
            onChange={_lastNameChange}
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            style={{ borderRadius: '5px', height: '40px' }}
          />
        </Box>
        <Box mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.email}
            onChange={_emailChange}
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Box mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.email}
            onChange={_emailChange}
            label="Confirm Email"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Box mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.password}
            onChange={_passwordChange}
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Box mb={1} style={{ marginBottom: '20px' }}>
          <CssTextField
            value={customer.confirmPassword}
            onChange={_confirmPasswordChange}
            type="password"
            label="Confirm Password"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
        <Button
            variant="contained"
            type="submit"
            onClick={onSubmit2}
            style={{
              backgroundColor: appColors.primary,
              color: 'white',
              width: '287px',
              height: '40px',
              borderRadius: '8px',
            }}
          >
            Submit
          </Button>
</>)}
        
        <div>
          
          {/* <Button
            variant="contained"
            style={{
              marginLeft: '20px',
              backgroundColor: appColors.primary,
              color: 'white',
            }}
            type="button"
            onClick={this._onReset}
          >
            Reset
          </Button> */}
        </div>



        {modal === '' && (
          <>
         <p style={{fontWeight:'bold'}}> Lets Make sure We deliver to you!</p> 
          <Box  mb={1}>
            <CssTextField
              value={customer.firstName}
              onChange={_firstNameChange}
              label="First Name"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box m={1} />
            <CssTextField
              value={customer.lastName}
              onChange={_lastNameChange}
              label="Last Name"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          
          <Box mb={1}>
            <CssTextField
              value={customer.address}
              onChange={_addressChange}
              label="Street Address"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box display="flex" mb={1}>
            <CssTextField
              value={customer.unit}
              onChange={_unitChange}
              
              label="Unit"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box m={1} />
            <CssTextField
              value={customer.city}
              onChange={_cityChange}
              label="City"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <Box display="flex" mb={1}>
            <CssTextField
              value={customer.state}
              onChange={_stateChange}
              label="State"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box m={1} />
            <CssTextField
              value={customer.zip}
              onChange={_zipChange}
              label="Zip Code"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          {/* <Box display="flex" mb={1}>
            <CssTextField
              value={customer.unit}
              onChange={_unitChange}
              label="Unit"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box m={0.5} />
            <CssTextField
              value={customer.city}
              onChange={_cityChange}
              label="City"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box m={0.5} />
            <CssTextField
              value={customer.state}
              onChange={_stateChange}
              label="State"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box> */}
          {/* <CssTextField
              value={customer.zip}
              onChange={_zipChange}
            label="Zip code"
            variant="outlined"
            size="small"
            fullWidth
          /> */}
          <br />
          <Box mb={1}>
            <CssTextField
              value={customer.phone}
              onChange={_phoneChange}
              label="Phone"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box>
          <br />
          <br />
          <Button
            variant="contained"
            type="submit"
            onClick={onSubmit1}
            style={{
              backgroundColor: appColors.primary,
              color: 'white',
              width: '287px',
              height: '40px',
              borderRadius: '8px',
            }}
          >
            Submit
          </Button>
        </>
          
          )}
        
        {/* <Box my={2}>
          <Box>or</Box>
        </Box> */}
      
    </Paper>
  );
};
export default withRouter(Signup);