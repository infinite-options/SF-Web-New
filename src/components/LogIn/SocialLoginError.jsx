import Modal from 'react-bootstrap/Modal';
import React, { useState, useContext } from 'react';

import { withRouter } from 'react-router';
import classes from './modal.module.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
import AuthUtils from '../../utils/AuthUtils';
import { AuthContext } from '../../auth/AuthContext';
import appColors from '../../styles/AppColors';
import SocialLogin from './SocialLogin';
import PassModal from './passwordModal';

const SocialLoginError = ({ ...props }) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  const [passModal, setpassModal] = useState();

  const API_URL = process.env.REACT_APP_SERVER_BASE_URI + '';
  let [modalSignup, modalSignupMessage] = useState('');

  const onClear = () => {
    props.clear(false);
  };
  const onReset = async (value) => {
    axios
      .post(API_URL + 'set_temp_password', { email: props.emailValue })
      .then((response) => {
        let res = response;
        if (res.data.message === 'A temporary password has been sent') {
          console.log(res);
          setpassModal(true);
        } else if (res.data.code === 280) {
          console.log(res);
          alert('No account found with that email.');
        }
      });
  };
  console.log('Email:', props.emailValue);
  const onLogin = () => {
    modalSignupMessage('true');
    console.log(modalSignupMessage, modalSignup);
    props.clear(false);
    props.setIsLoginShown(true);
    props.setIsSignUpShown(false);
    // props.clear(false);
    // props.signClear(false);
    // props.loginShow(true);
    // props.modalClear();
    // props.setIsLoginShown(true);
    // props.setConfirmEmail(false)
  };

  return (
    <>
      <Card
        className={classes.modalSuccess}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: 'auto',
          width: '400px',
          overflow: 'hidden',
          border: 'none',
        }}
      >
        <div>
          <img
            src={cross}
            onClick={onClear}
            style={{
              float: 'right',
              height: '25px',
              width: '25px',
              color: 'black',
              marginTop: '3px',
              marginRight: '3px',
              cursor: 'pointer',
            }}
          ></img>
        </div>
        <div>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '35px',
              marginBottom: '80px',
              marginTop: '50px',
              color: 'black',
            }}
          >
            Social Sign Up Exists
          </h2>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '25px',
              marginBottom: '50px',
              marginTop: '30px',
              color: 'black',
            }}
          >
            We have found this account with
            <br /> a different social login. Please
            <br /> click below to continue.
          </h2>

          {props.socialMedia === 'Google' && (
            <SocialLogin socialMedia={props.socialMedia} />
          )}
        </div>
      </Card>
    </>
  );
};

export default withRouter(SocialLoginError);
