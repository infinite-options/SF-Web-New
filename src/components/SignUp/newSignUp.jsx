import React, { Component } from 'react';
import BusiApiReqs from '../../utils/BusiApiReqs';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import CssTextField from '../../utils/CssTextField';
import appColors from '../../styles/AppColors';
import SocialLogin from '../LogIn/SocialLogin';
import { useState } from 'react';
import Signupmodal from './Signupmodal';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ConfirmatioModal from './ConfirmationModal';
import AlertModal from './alertModal';
import Hooray from './Hooray';
import { useHistory } from 'react-router-dom';
import Emailverify from './emailverifyerror';

const Signup = ({ ...props }) => {
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
    message: '',
    confirmemail: '',
  });
  const [modal, setModal] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });
  const [emailError, setemailError] = useState('');
  const [passError, setpassError] = useState('');
  let [apiCode, setApiCode] = useState('');
  let [apiCode1, setApiCode1] = useState({});
  let [hooray, setHooray] = useState('');
  let [emailverify, setemailverify] = useState('');

  const BusiMethods = new BusiApiReqs();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    console.log(results);
    setAddress(value);
    setCoordinates(latLng);
    let addr = value.split(',');
    console.log(results[0].place_id);
    console.log('addr', addr);
    const results1 = await geocodeByPlaceId(results[0].place_id);
    const array_fragment = results1[0].address_components;
    const zipCode1 = array_fragment[array_fragment.length - 1];
    const zipCode2 = array_fragment[array_fragment.length - 2];
    console.log(zipCode1, zipCode2);
    console.log(array_fragment);
    setCustomer({
      ...customer,
      address: addr[0],
      city: addr[1],
      state: addr[2],
      zip: zipCode1.length == 5 ? zipCode1.long_name : zipCode2.long_name,
    });
    const res = await BusiMethods.getLocationBusinessIds(
      latLng.lng,
      latLng.lat
    );
    let modalProp = !res.result.length;
    if (modalProp) {
      setHooray({
        title: 'true',
        heading: "It seems we don't deliver at your address yet",
      });
      // alert("We don't deliver at your area currently")
    }
  };

  const history = useHistory();
  const onSubmit1 = (event) => {
    event.preventDefault();

    setModal('success');
  };
  const onSubmit2 = (event) => {
    event.preventDefault();
    console.log('_onSubmit');
    // console.log(customer);
    if (customer.email === customer.confirmemail) {
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
              // console.log(JSON.stringify(object));
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
                  // console.log(customerInfo);
                  // console.log(res.data.code);
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
                        console.log(res.status);
                        setCustomer({
                          ...customer,
                          message: 'success',
                        });

                        console.log(res);
                        // console.log("state"+customer);
                        // alert("Confirmation email sent. Please log in to continue.");
                        props.setIsSignUpShown(false);
                        // props.setIsLoginShown(true);
                        props.setConfirmEmail(true);
                      })
                      .catch((err) => {
                        // alert("Unable to verify email");
                        setemailverify(true);
                        if (err.response) {
                          console.log(err.response);
                        }
                        console.log('err' + err);
                      });
                  } else if (res.data.code === 409) {
                    setApiCode(res.data.code);
                    setApiCode1({
                      title: 'Account already Exist ',
                      subject:
                        'We have found this account with a different login. Please click below to continue.',
                    });
                  } else if (res.data.code === 480) {
                    // setApiCode1("Sorry the Problem seems to be on our side.");
                    // setApiCode(res.data.code)
                  }
                })
                .catch((err) => {
                  console.log(err);

                  if (err.response) {
                    console.log('err+' + err.response);
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
        // console.log('Passwords not matching');
        setpassError(true);
      }
    } else {
      // alert("Email do not match");
      setemailError(true);
    }
  };
  const onSubmit3 = (event) => {
    event.preventDefault();
    setModalEmail('email');
  };

  const _emailChange = (event) => {
    setCustomer({
      ...customer,
      email: event.target.value,
    });
    // console.log(customer);
    setemailError(false);
  };
  const _confirmemailChange = (event) => {
    setCustomer({
      ...customer,
      confirmemail: event.target.value,
    });
    setemailError(false);
    // console.log(customer);
  };
  const _passwordChange = (event) => {
    setCustomer({
      ...customer,
      password: event.target.value,
    });
    setpassError(false);
    // console.log(customer);
  };

  const _confirmPasswordChange = (event) => {
    setCustomer({
      ...customer,
      confirmPassword: event.target.value,
    });
    setpassError(false);
    // console.log(customer);
  };

  const _firstNameChange = (event) => {
    setCustomer({
      ...customer,
      firstName: event.target.value,
    });
    // console.log(customer);
  };

  const _lastNameChange = (event) => {
    setCustomer({
      ...customer,
      lastName: event.target.value,
    });
    // console.log(customer);
  };

  const _phoneChange = (event) => {
    setCustomer({
      ...customer,
      phone: event.target.value,
    });
    // console.log(customer);
  };

  const _addressChange = (event) => {
    setCustomer({
      ...customer,
      address: event.target.value,
    });
    // console.log(customer.address);
  };

  const _unitChange = (event) => {
    setCustomer({
      ...customer,
      unit: event.target.value,
    });
    // console.log(customer);
  };

  const _cityChange = (event) => {
    setCustomer({
      ...customer,
      city: event.target.value,
    });
    // console.log(customer);
  };

  const _stateChange = (event) => {
    setCustomer({
      ...customer,
      state: event.target.value,
    });
    // console.log(customer);
  };

  const _zipChange = (event) => {
    setCustomer({
      ...customer,
      zip: event.target.value,
    });
    // console.log(customer);
  };
  if (apiCode === 490) {
    setApiCode1('It Seems You already have an account. Please Sign In');
  }
  if (apiCode === 480) {
    setApiCode1(
      'There Seems to be a problem on our side.We are working on it.'
    );
  }

  const google = window.google;
  const searchOptions = {
    location: new google.maps.LatLng(37.2366, -121.887),
    radius: 15,
    types: ['address'],
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
        position: 'absolute',
        top: '50px',
        right: '300px',
        zIndex: 10040,
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
          <p style={{ fontWeight: 'bold' }} onClick={onSubmit3}>
            Or continue with email
          </p>

          {modalEmail === 'email' && (
            <div>
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
                  value={customer.confirmemail}
                  onChange={_confirmemailChange}
                  label="Confirm Email"
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Box>
              {emailError && (
                <Box>
                  <p style={{ color: 'red' }}>Emails don't match</p>
                </Box>
              )}
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
              {passError && (
                <Box>
                  <p style={{ color: 'red' }}>Passwords don't match</p>
                </Box>
              )}
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
            </div>
          )}
        </>
      )}

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
          <p style={{ fontWeight: 'bold' }}>
            {' '}
            Lets Make sure We deliver to you!
          </p>
          <Box mb={1}>
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
            <PlacesAutocomplete
              value={address.split(',')[0]}
              onChange={setAddress}
              onSelect={handleSelect}
              style={{}}
              // options={options}
              searchOptions={searchOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <CssTextField
                    value={customer.address}
                    label="Street Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getInputProps({
                      placeholder: 'Search for your address',
                    })}
                  />

                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active
                        ? 'rgb(54,97,102)'
                        : 'rgb(226,234,236)',
                      width: suggestion.active ? '475px' : '475px',
                      marginLeft: suggestion.active ? 'auto' : 'auto',
                      marginRight: suggestion.active ? 'auto' : 'auto',
                      height: suggestion.active ? '50px' : '50px',
                      border: suggestion.active
                        ? '1px solid black'
                        : '1px solid black',
                      color: suggestion.active ? 'white' : 'black',
                      zIndex: suggestion.active ? '1000' : '1000',
                      position: suggestion.active ? 'active' : 'active',
                      left: suggestion.active ? '00%' : '0%',
                      // float:suggestion.active?'right':'right'

                      // float:suggestion.active ? 'right':'right'
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              )}
            </PlacesAutocomplete>

            {/* <CssTextField
              value={customer.address}
              onChange={_addressChange}
              label="Street Address"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Box> */}
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
      {emailverify && <Emailverify clear={setemailverify}></Emailverify>}
      {apiCode && (
        <AlertModal
          title={apiCode1.title}
          subject={apiCode1.subject}
          clear={setApiCode}
          signClear={props.setIsSignUpShown}
          loginShow={props.setIsLoginShown}
        ></AlertModal>
      )}
      {hooray && (
        <Hooray
          clear={setHooray}
          signClear={props.setIsSignUpShown}
          ok={setModal}
        ></Hooray>
      )}
    </Paper>
  );
};
export default withRouter(Signup);
