import React, { useState } from 'react';
import { withRouter } from 'react-router';
import classes from './modal.module.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
import appColors from '../../styles/AppColors';
import PassModal from './passwordModal';

const IncorrectPasswordModal = ({ ...props }) => {
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
      <div id="overlay"></div>
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
            Incorrect Password{' '}
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
            Seems like an incorrect password <br /> was entered for the
            associated
            <br /> email with this account.
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
            Try again with a correct password
          </button>
          <p
            style={{
              color: appColors.secondary,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={onReset}
          >
            Forgot Password?
          </p>
          {passModal && <PassModal clear={setpassModal}></PassModal>}
        </div>
      </Card>
    </>
  );
};

export default withRouter(IncorrectPasswordModal);
