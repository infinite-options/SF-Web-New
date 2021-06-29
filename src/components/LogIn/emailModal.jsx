import Modal from 'react-bootstrap/Modal';
// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useContext } from 'react';
import classes from './modal.module.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
import Signup from '../SignUp/Signup';
import { Paper } from '@material-ui/core';
import AuthUtils from '../../utils/AuthUtils';
import { AuthContext } from '../../auth/AuthContext';
import appColors from '../../styles/AppColors';

const EmailModal = (props) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  let [modalSignup, modalSignupMessage] = useState('');
  
const onClear=()=>{
    props.clear(false);
}



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
  console.log((props.code));

  return (
    <>
      <Card
        className={classes.modalSuccess}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: '550px',
          width: '480px',
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
              color:'black',
              
            }}
          >
            Account Not Found
          </h2>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '25px',
              marginBottom: '50px',
              marginTop: '30px',
              color:'black'
            }}
          >
            Sorry, we don’t recognize this <br/>email or username.
          </h2>
          <button
          
            onClick={onLogin}
            style={{
                width: '350px',
                marginTop:'30px',
                marginBottom: '20px',
                height: '60px',
                borderRadius: '15px',
                backgroundColor: 'rgb(239,139,52)',
                border: ' 2px solid rgb(239,139,52)',
                color: 'rgb(255,255,255)',
                fontSize: '20px',
                fontWeight:'bold'
              
            }}
          >
            Try again with different username
            </button>
            <p style={{float:'left',marginLeft:'65px',fontSize:'14px',fontWeight:'bold'}}>Dont have an account?</p>
            <button
          
            onClick={onsignUp}
            style={{
              width: '350px',
              marginBottom: '20px',
              height: '60px',
              borderRadius: '15px',
              backgroundColor: 'rgb(239,139,52)',
              border: ' 2px solid rgb(239,139,52)',
              color: 'rgb(255,255,255)',
              fontSize: '20px',
              fontWeight:'bold'
              
            }}
          >
            Sign Up
            </button>
            <p></p>
        </div>
        
        
        
          
         
        

        
      </Card>
    </>
  );
};

export default EmailModal;
