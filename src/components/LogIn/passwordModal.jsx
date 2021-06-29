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

const PassModal = (props) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  let [modalSignup, modalSignupMessage] = useState('');
  
const onClear=()=>{
    props.clear(false);
}



 
  console.log((props.code));

  return (
    <>
      <Card
        className={classes.modalSuccess}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: '520px',
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
            Temporary password sent
          </h2>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '23px',
              marginBottom: '50px',
              marginTop: '30px',
              color:'black'
            }}
          >
            We have sent you an email with a<br/> temporary password. Please<br/> follow the instructions in the email<br/> to create a new password.
          </h2>
          <button
          
            onClick={onClear}
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
            Okay
            </button>
           
            <p></p>
        </div>
        
        
        
          
         
        

        
      </Card>
    </>
  );
};

export default PassModal;
