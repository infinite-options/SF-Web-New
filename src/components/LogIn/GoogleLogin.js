import React, { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Col, Row, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../auth/AuthContext';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
let SCOPES =
  'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile';

function GoogleLogin(props) {
  const history = useHistory();
  const Auth = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [socialId, setSocialId] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [accessExpiresIn, setAccessExpiresIn] = useState('');
  let codeClient = {};
  function getAuthorizationCode() {
    // Request authorization code and obtain user consent,  method of the code client to trigger the user flow
    codeClient.requestCode();
  }

  useEffect(() => {
    /* global google */

    if (window.google) {
      // initialize a code client for the authorization code flow.
      codeClient = google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          // gets back authorization code
          if (tokenResponse && tokenResponse.code) {
            let auth_code = tokenResponse.code;
            let authorization_url =
              'https://accounts.google.com/o/oauth2/token';

            var details = {
              code: auth_code,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              redirectUri: 'postmessage',
              grant_type: 'authorization_code',
            };
            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
            // use authorization code, send it to google endpoint to get back ACCESS TOKEN n REFRESH TOKEN
            fetch(authorization_url, {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: formBody,
            })
              .then((response) => {
                return response.json();
              })

              .then((data) => {
                let at = data['access_token'];
                let rt = data['refresh_token'];
                let ax = data['expires_in'];
                //  expires every 1 hr
                setAccessToken(at);
                // stays the same and used to refresh ACCESS token
                setRefreshToken(rt);
                setAccessExpiresIn(ax);
                //  use ACCESS token, to get email and other account info
                axios
                  .get(
                    'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' +
                      at
                  )
                  .then((response) => {
                    let data = response.data;

                    let e = data['email'];
                    let si = data['id'];

                    setEmail(e);

                    setSocialId(si);
                    history.push('/socialsignup', {
                      email: e,
                      accessToken: at,
                      socialId: si,
                      platform: 'GOOGLE',
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                return (
                  accessToken, refreshToken, accessExpiresIn, email, socialId
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
      });
    }
  }, [getAuthorizationCode]);

  function handleCallBackResponse(response) {
    console.log(response);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    if (userObject) {
      let email = userObject.email;

      let user_id = '';
      let socialId = '';
      axios
        .get(
          `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserToken/SF/${email}`
        )
        .then((response) => {
          console.log(response['data']['result'].length);
          if (response['data']['result'].length === 0) {
            getAuthorizationCode();
          } else {
            user_id = response['data']['result'][0]['customer_uid'];
            var old_at = response['data']['result'][0]['user_access_token'];
            var refreshToken =
              response['data']['result'][0]['user_refresh_token'];
            let socialId = response['data']['result'][0]['social_id'];

            fetch(
              `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
              {
                method: 'GET',
              }
            )
              .then((response) => {
                if (response['status'] === 400) {
                  let authorization_url =
                    'https://accounts.google.com/o/oauth2/token';

                  var details = {
                    refresh_token: refreshToken,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: 'refresh_token',
                  };

                  var formBody = [];
                  for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + '=' + encodedValue);
                  }
                  formBody = formBody.join('&');

                  fetch(authorization_url, {
                    method: 'POST',
                    headers: {
                      'Content-Type':
                        'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: formBody,
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((responseData) => {
                      return responseData;
                    })
                    .then((data) => {
                      let at = data['access_token'];

                      socialGoogle(email, at, socialId, 'GOOGLE');
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    }
  }
  const socialGoogle = async (email, accessToken, socialId, platform) => {
    axios
      .post(process.env.REACT_APP_SERVER_BASE_URI + 'Login/', {
        email: email,
        password: '',
        social_id: socialId,
        signup_platform: platform,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          let customerInfo = res.data.result[0];
          // Successful log in, Try to update tokens, then continue to next page based on role
          axios
            .post(
              process.env.REACT_APP_SERVER_BASE_URI +
                'token_fetch_update/update_web',
              {
                uid: customerInfo.customer_uid,
                user_access_token: accessToken,
                user_refresh_token: 'FALSE',
              }
            )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response);
              }
              console.log(err);
            })
            .finally(() => {
              console.log(customerInfo);
              Cookies.set('login-session', 'good');

              var CryptoJS = require('crypto-js');
              console.log(
                'working on encryption--in',
                typeof process.env.REACT_APP_UID_ENCRYPT_CODE
              );
              var ciphertext = CryptoJS.AES.encrypt(
                customerInfo.customer_uid,
                process.env.REACT_APP_UID_ENCRYPT_CODE
              ).toString();
              Cookies.set('customer_uid', ciphertext);

              Auth.setIsAuth(true);
              let newAccountType = customerInfo.role.toLowerCase();
              switch (newAccountType) {
                case 'admin':
                  Auth.setAuthLevel(2);
                  history.push('/admin');
                  break;
                case 'farmer':
                  Auth.setAuthLevel(1);
                  history.push('/admin');
                  break;
                case 'customer':
                  Auth.setAuthLevel(0);
                  history.push('/store');
                  break;
                // Farmer roles are moving towared business Id string
                default:
                  Auth.setAuthLevel(1);
                  history.push('/admin');
                  break;
              }
            });
        } else if (res.data.code === 404) {
          history.push('/socialsignup', {
            email: email,
            accessToken: accessToken,
            socialId: socialId,
            platform: platform,
          });
        } else if (res.data.code === 411) {
          console.log('Wrong social media');
          props.setError('social');
          let startIndex = res.data.message.indexOf("'");
          startIndex += 1;
          let endIndex = res.data.message.indexOf("'", startIndex + 1);
          let socialMediaUsed = res.data.message.slice(startIndex, endIndex);
          console.log(socialMediaUsed);
          let socialMediaUsedFormat =
            socialMediaUsed.charAt(0) + socialMediaUsed.slice(1).toLowerCase();
          let newErrorMessage = 'Use ' + socialMediaUsedFormat + ' to login';
          props.setErrorMessage(newErrorMessage);
        } else if (res.data.code === 406) {
          console.log('Use Password Login');
          props.setError('social');
          props.setErrorMessage('Use email and password to log in');
        } else {
          console.log('Unknown log in error');
          props.setError('Log in failed, try again');
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      //  initializes the Sign In With Google client based on the configuration object
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallBackResponse,
      });
      //    method renders a Sign In With Google button in your web pages.
      google.accounts.id.renderButton(document.getElementById('signInDiv'), {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        // shape: 'pill',
      });
      // access tokens
    }
  }, []);

  return (
    <Row>
      <Col></Col>
      <Col
        xs={8}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItens: 'center',
          marginLeft: '3.5rem',
        }}
      >
        <div id="signInDiv"></div>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default GoogleLogin;
