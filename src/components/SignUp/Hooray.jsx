import React, { useState, useContext } from 'react';
import classes from './modal.module.css';
import Card from 'react-bootstrap/Card';
import cross from '../../icon/cross.svg';
import AuthUtils from '../../utils/AuthUtils';
import { AuthContext } from '../../auth/AuthContext';

const Hooray = (props) => {
  const AuthMethods = new AuthUtils();
  const auth = useContext(AuthContext);
  let [modalSignup, modalSignupMessage] = useState('');

  const modalClick = () => {
    // modalSignupMessage('true');
    // console.log(modalSignupMessage, modalSignup);

    props.clear(false);
    props.signClear(false);
    // props.modalClear();
    // props.setIsLoginShown(true);
    // props.setConfirmEmail(false)
  };

  console.log(props.code);

  return (
    <>
      <Card
        className={classes.modalSuccess}
        style={{
          borderRadius: '10px',
          marginBottom: '20px',
          height: 'auto',
          width: '400px',
          top: '100px',
          border: 'none',
        }}
      >
        <div>
          <img
            src={cross}
            onClick={modalClick}
            alt={''}
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
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: '25px',
              marginTop: '100px',
              fontSize: '30px',
            }}
          >
            Still Growing ...
          </h2>
        </div>
        <div
          style={{
            width: '300px',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: '25px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Sorry, it looks like we don’t deliver to your neighborhood yet. Enter
          your email address and we will let you know as soon as we come to your
          neighborhood.
        </div>
        <div>
          <input
            placeholder="Enter your email"
            style={{
              width: '300px',
              height: '20px',
              marginBottom: '25px',
              marginTop: '20px',
              borderRadius: '8px',
              padding: '10px',
              border: '1px solid #E1E7E7',
            }}
          ></input>
        </div>
        <div>
          <button
            onClick={modalClick}
            style={{
              width: '300px',
              height: '50px',
              marginBottom: '25px',
              borderRadius: '8px',
              backgroundColor: '#FF8500',
              color: 'white',
              border: ' 1px solid #E1E7E7',
              fontSize: '18px',
            }}
          >
            Submit
          </button>
        </div>
      </Card>
    </>
  );
};

export default Hooray;
