import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AdminLogin from '../LogIn/AdminLogin';
import LandingNavBar from '../LandingNavBar/LandingNavBar';
import Footer from '../Footer/Footer';
import './Sweepstakes.css';
import Box from '@material-ui/core/Box';
import { Container } from '@material-ui/core';
import { Grid, Paper, Typography, Avatar, Button } from '@material-ui/core';
import Apple from '../../images/Mask Group 1.png';
import Google from '../../images/en_badge_web_generic.png';
import { useHistory } from 'react-router-dom';
import appColors from '../../styles/AppColors';
import { makeStyles } from '@material-ui/core/styles';
import Signup from '../SignUp/newSignUp';
import ConfirmatioModal from 'components/SignUp/ConfirmationModal';

const useStyles = makeStyles((theme) => ({
  authModal: {
    position: 'absolute',
    // width: '500px',
    top: '50px',
    zIndex: '10040',
    height: 'auto',
  },
  infoSection: {
    width: '33.33%',
    justifyContent: 'center',
    fontSize: '20px',
  },
  infoImg: {
    //: 'flex-end',
    alignItems: 'center',
    height: '150px',
  },
  infoTitle: {
    color: appColors.primary,
    // marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '32px',
    marginBottom: '5px',
  },
  infoDesc: {
    paddingLeft: '20%',
    paddingRight: '20%',
    textAlign: 'center',
    color: '#000000',
  },
  title: {
    color: appColors.secondary,
    fontSize: '40px',
    fontWeight: '700',
  },
  bar: {
    borderBottom: '4px solid ' + appColors.secondary,
    marginBottom: '50px',
    width: '410px',
  },
  root: {
    backgroundColor: appColors.buttonText,
    width: '100%',
    height: 'auto',
    //paddingTop: '5px',
    paddingBottom: '30px',
  },

  farmTitle: {
    color: appColors.primary,
    marginBottom: '10px',
    fontSize: '30px',
    fontWeight: '700',
    textAlign: 'left',
  },
  farmDesc: {
    color: 'black',
    textAlign: 'left',
    fontSize: '20px',
    fontWeight: '500',
  },

  testimonial: {
    //backgroundColor: appColors.componentBg,
    width: '100%',

    paddingTop: '30px',
    paddingBottom: '30px',
  },

  farmer: {
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
}));

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ref.current.hidden
      ) {
        ref.current.hidden = true;
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}


const Platform = () => {
  const history = useHistory();
  const classes = useStyles();

  const [isLoginShown, setIsLoginShown] = useState(false); // checks if user is logged in
  const [isSignUpShown, setIsSignUpShown] = useState(false);
  const [confirmEmailstate, setConfirmEmail] = useState(false);

  const loginWrapperRef = useRef(null);
  useOutsideAlerter(loginWrapperRef, setIsLoginShown);
  const signupWrapperRef = useRef(null);
  useOutsideAlerter(signupWrapperRef, setIsSignUpShown);

  return (
    <div
      id="beforeClick"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        backgroundSize: 'cover',
        backgroundImage: `url(${'fruits-and-vegetables.png'})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <div>
        {/* <LandingNavBar /> */}
        <LandingNavBar
          isLoginShown={isLoginShown}
          setIsLoginShown={setIsLoginShown}
          isSignUpShown={isSignUpShown}
          setIsSignUpShown={setIsSignUpShown}
        />

        {/* START: Login/SignUp Modal */}
      <Box 
        display="flex" justifyContent="flex-end"
        style={{
          // border: 'solid red'
        }}
      >
        {/* Login Modal */}
        <Box
          position="absolute"
          // width="50%"
          width="100%"
          display="flex"
          justifyContent="center"
          zIndex={40}
          style={{
            // border: 'solid blue'
          }}
        >
          <Box
            ref={loginWrapperRef}
            className={classes.authModal}
            hidden={!isLoginShown}
            // width="100%"
            style={{
              // border: 'solid green',
              // width: '100%'
              // padding: '0',
              // margin: '0'
            }}
          >
            <AdminLogin
              // ref={loginWrapperRef}
              // hidden={!isLoginShown}
              isLoginShown={isLoginShown}
              setIsLoginShown={setIsLoginShown}
              isSignUpShown={isSignUpShown}
              setIsSignUpShown={setIsSignUpShown}
            />
          </Box>
        </Box>

        {/* Sign Up Modal */}
        <Box 
          display="flex" justifyContent="flex-end"
          width="100%"
          style={{
            // border: 'solid red'
          }}
          position="absolute"
        >
          <Box
            // position="absolute"
            // width="50%"
            display="flex"
            width="100%"
            justifyContent="center"
            zIndex={4000}
            style={{
              // border: 'solid blue'
            }}
          >
            <Box
              ref={signupWrapperRef}
              className={classes.authModal}
              hidden={!isSignUpShown}
              // width="100%"
              style={{
                // border: 'solid green',
                // width: '100%'
              }}
            >
              <Signup
                isLoginShown={isLoginShown}
                setIsLoginShown={setIsLoginShown}
                isSignUpShown={isSignUpShown}
                setIsSignUpShown={setIsSignUpShown}
                isconfirmEmailstate={confirmEmailstate}
                setConfirmEmail={setConfirmEmail}
              />
            </Box>
          </Box>
        </Box>
        {confirmEmailstate && (
          <ConfirmatioModal
            isLoginShown={isLoginShown}
            setIsLoginShown={setIsLoginShown}
            isSignUpShown={isSignUpShown}
            setIsSignUpShown={setIsSignUpShown}
            isconfirmEmailstate={confirmEmailstate}
            setConfirmEmail={setConfirmEmail}
          />
        )}
      </Box>

        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              flex: '1',
            }}
          >
            <div
              style={{
                marginLeft: '20%',
                marginTop: '100px',
                backgroundSize: 'cover',
                backgroundImage: `url(${'Rectangle_191.png'})`,
                backgroundRepeat: 'no-repeat',
                width: '60%',
                paddingBottom: '25px',
                borderRadius: '20px'
              }}
            >
                <p
                  className="downloadText"
                  style={{
                    margin: '10px',
                    paddingTopx: '20px',
                  }}
                >
                  The best organic produce in the palm of your hand
                </p>
                <div>
                  <a
                    href="https://apps.apple.com/us/app/serving-fresh/id1488267727"
                    target="_blank"
                  >
                    <img 
                      className="img"
                      src={Apple} 
                      alt='Serving Fresh iOS App'
                      style={{
                        width: '177px'
                      }}
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.servingfresh"
                    target="_blank"
                  >
                    <img
                      className="img"
                      src={Google} 
                      alt='Serving Fresh Android App'
                      style={{
                        width: '200px'
                      }}
                    />
                  </a>
                </div>
            </div>
            <div
              style={{
                marginLeft: '20',
                marginTop: '30px',
                marginBottom: '30px',
                backgroundSize: 'cover',
                backgroundImage: `url(${'Rectangle_191.png'})`,
                backgroundRepeat: 'no-repeat',
                width: '60%',
                paddingTop: '25px',
                paddingBottom: '25px',
                borderRadius: '20px'
              }}
            >
              <div className="downloadText">
                Or visit us on
              </div>
              <div className="downloadText">
                <a
                  href='https://servingresh.me'
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  ServingFresh.me
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: '1',
            }}
          >
            <img
              src='/home_mob.png'
              alt='Serving Fresh App screen'
              style={{
                width: '100%',
                minWidth: '375px',
              }}
            />
          </div>
        </Box>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>  
  );
};

export default Platform;
