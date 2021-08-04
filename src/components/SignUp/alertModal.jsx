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
// import appColors from '../../styles/AppColors';

const AlertModal = (props) => {
  // const AuthMethods = new AuthUtils();
  // const auth = useContext(AuthContext);
  let [modalSignup, modalSignupMessage] = useState('');

  const modalClick = () => {
    modalSignupMessage('true');
    console.log(modalSignupMessage, modalSignup);
    props.clear(false);
    props.signClear(false);
    props.loginShow(true);
    // props.modalClear();
    // props.setIsLoginShown(true);
    // props.setConfirmEmail(false)
  };
  console.log(props.code);

  return (
    <>
      <div id="overlay"></div>
      <Card
        className={classes.modalSuccess}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: '450px',
          width: '480px',
          position: 'absolute',
          top: '100px',
          right: '350px',
          zIndex: 10040,
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
            {props.title}
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
            {props.subject}
          </h2>
          <button
            onClick={modalClick}
            style={{
              width: '350px',
              marginBottom: '20px',
              height: '60px',
              borderRadius: '15px',
              backgroundColor: 'rgb(239,139,52)',
              border: ' 2px solid rgb(239,139,52)',
              color: 'rgb(255,255,255)',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            Log In
          </button>
        </div>
      </Card>
    </>
  );
};

export default AlertModal;
