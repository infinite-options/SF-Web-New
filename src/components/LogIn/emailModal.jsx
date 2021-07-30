import Modal from 'react-bootstrap/Modal';
import React, { useState, useContext } from 'react';
import classes from './modal.module.css';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
import AuthUtils from '../../utils/AuthUtils';
import { AuthContext } from '../../auth/AuthContext';

const EmailModal = (props) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  let [modalSignup, modalSignupMessage] = useState('');

  const onClear = () => {
    props.clear(false);
  };

  const onsignUp = () => {
    modalSignupMessage('true');
    console.log(modalSignupMessage, modalSignup);
    props.clear(false);
    props.setIsSignUpShown(true);
    props.setIsLoginShown(false);
    // props.clear(false);
    // props.signClear(false);
    // props.loginShow(true);
    // props.modalClear();
    // props.setIsLoginShown(true);
    // props.setConfirmEmail(false)
  };
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
  console.log(props.code);

  return (
    <>
      <div id="overlay"></div>
      <div>
        <Card
          className={classes.modalSuccess}
          style={{
            borderRadius: '10px',
            marginBottom: '20px',
            height: 'auto',
            width: '400px',
            top: '125px',
            left: '570px',
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
                fontSize: '25px',
                marginBottom: '25px',
                marginTop: '25px',
                color: 'black',
              }}
            >
              Account Not Found
            </h2>
            <h2
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                marginBottom: '25px',
                marginTop: '25px',
                color: 'black',
              }}
            >
              Sorry, we don’t recognize this <br />
              email or username.
            </h2>
            <button
              onClick={onLogin}
              style={{
                width: '350px',
                marginTop: '25px',
                marginBottom: '20px',
                height: '50px',
                borderRadius: '8px',
                backgroundColor: 'rgb(239,139,52)',
                border: ' 2px solid rgb(239,139,52)',
                color: 'rgb(255,255,255)',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Try again with different username
            </button>
            <p
              style={{
                float: 'left',
                marginLeft: '65px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Dont have an account?
            </p>
            <button
              onClick={onsignUp}
              style={{
                width: '350px',
                marginBottom: '20px',
                height: '50px',
                borderRadius: '8px',
                backgroundColor: 'rgb(239,139,52)',
                border: ' 2px solid rgb(239,139,52)',
                color: 'rgb(255,255,255)',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </button>
            <p></p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default EmailModal;
