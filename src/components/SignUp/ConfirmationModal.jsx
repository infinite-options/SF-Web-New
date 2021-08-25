// import Modal from 'react-bootstrap/Modal';
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react';
import classes from './modal.module.css';
// import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
// import Signup from '../SignUp/Signup';
// import { Paper } from '@material-ui/core';
// import AuthUtils from '../../utils/AuthUtils';
// import { AuthContext } from '../../auth/AuthContext';
// import { useHistory } from 'react-router-dom';

const ConfirmatioModal = (props) => {
  // const AuthMethods = new AuthUtils();
  // const auth = useContext(AuthContext);
  // const history = useHistory();
  let [modalSignup, modalSignupMessage] = useState('');
  const modalClick = () => {
    modalSignupMessage('true');
    console.log(modalSignupMessage, modalSignup);
    // props.modalClear();
    props.setIsLoginShown(true);
    props.setConfirmEmail(false);
    // history.push('/store')
  };
  return (
    <>
      <div id="overlay"></div>
      <Card
        className={classes.modalConfirmation}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: 'auto',
          width: '400px',
          position: 'absolute',
          top: '125px',
          left: '570px',
          border: 'none',
        }}
      >
        <div>
          <img
            src={cross}
            onClick={modalClick}
            style={{
              float: 'right',
              height: '25px',
              width: '25px',
              color: '#136D74',
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
              fontSize: '30px',
              marginBottom: '25px',
              marginTop: '25px',
              color: 'black',
            }}
          >
            Congratulations! <br />
            Please verify Email
          </h2>
        </div>
        <div
          style={{
            width: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '18px',
            marginBottom: '25px',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          You’ve successfully sign up for <br />
          Serving Fresh!
          <br />
          <br /> We’ve sent you an email. Please verify your account by clicking
          on the link in that email.
        </div>

        <button
          onClick={modalClick}
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
          Okay
        </button>
      </Card>
    </>
  );
};

export default ConfirmatioModal;
