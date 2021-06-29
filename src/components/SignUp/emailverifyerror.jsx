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
import { useHistory } from 'react-router-dom';

const Emailverify = (props) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  const history = useHistory();
  let [modalSignup, modalSignupMessage] = useState('');
  const modalClick = () => {
    props.clear(false)
  };
  return (
    <>
      <Card
        className={classes.modalConfirmation}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: '480px',
          width: '450px',
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
            }}
          ></img>
        </div>
        <div>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '40px',
              marginBottom: '50px',
              marginTop: '80px',
              color: 'black'
            }}
          >
            Hmm..
          </h2>
        </div>
        <div
          style={{
            width: '300px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '20px',
            marginBottom: '50px',
            fontWeight:'bold',
            color: 'black'
          }}
        >
          We tried sending you an email and it didn’t go through. Please check your email address in the Sign Up section.
        </div>
        
        
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
              fontWeight:'bold'
                
              }}
          >
            Okay
          </button>
         
        

        
      </Card>
    </>
  );
};

export default Emailverify;
