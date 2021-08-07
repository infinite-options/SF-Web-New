import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Button, IconButton, Badge } from '@material-ui/core';

import appColors from 'styles/AppColors';
import MenuNavButton from '../../utils/MenuNavButton';
import { AuthContext } from '../../auth/AuthContext';
import sf from '../../icon/sfnav.svg';
import AuthUtils from '../../utils/AuthUtils';
import BusiApiReqs from '../../utils/BusiApiReqs';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#2F787F',
    marginBottom: '0px',
    height: '80px'
  },
  authButton: {
    color: 'white',
    width: '77px'
    // marginRight: '10px',
  },
}));

export default function LandingNavBar({ ...props }) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { profile } = useContext(AuthContext);

  let [customerName, setCustomerName] = useState('');
  let [loggedIn, setLoggedIn] = useState(false);

  const BusiMethods = new BusiApiReqs();
  const AuthMethods = new AuthUtils();
  AuthMethods.getProfile().then((response) => {
    console.log("(LNB) response: ", response);
    // if(response && response.customer_first_name) {
    //   console.log(response.customer_first_name);
    //   setCustomerName(response.customer_first_name);
    // }
    console.log(response.customer_first_name);
    setCustomerName(response.customer_first_name);
    console.log("(LNB) customer_uid: ", response.customer_uid)
    if(response.customer_uid){
      setLoggedIn(true);
    }
  });

  const badgeContent = parseInt(localStorage.getItem('cartTotal') || '0');
  console.log('badgeContent: ' + badgeContent);

  const loginClicked = () => {
    props.setIsSignUpShown(false);
    props.setIsLoginShown(!props.isLoginShown);
  };

  const signUpClicked = () => {
    props.setIsLoginShown(false);
    props.setIsSignUpShown(!props.isSignUpShown);
  };

  function handleStoreClick() {
    localStorage.setItem('currentStorePage', 1);
    history.push('/store');
  }
  function handleCartClick() {
    localStorage.setItem('currentStorePage', 0);
    history.push('/store');
  }
  const handleClickLogOut = () => {
    localStorage.removeItem('currentStorePage');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('cartItems');
    Cookies.remove('login-session');
    Cookies.remove('customer_uid');

    auth.setIsAuth(false);
    auth.setAuthLevel(0);
    history.push('/');
  };

  return (
    <div 
      className={classes.root} 
      style={{
        backgroundColor:'#2F787F',
        // border: 'red solid'
      }}
    >
    <AppBar
     
      position="static"
      elevation={0}
      style={{
        borderBottom: '1px solid ' + appColors.secondary,
        // border: 'solid red',
        height: '100%'
      }}
    >
      

      <Toolbar 
        style={{
          backgroundColor:'#2F787F',
          height: '100%',
          // border: 'dashed'
        }}
      >
      
        <MenuNavButton 
          style={{
            color:'white',
            // border: 'solid lime'
          }}
        />
        
        <Box flexGrow={1} >
          <div 
            style={{
              // marginRight:'50px',
              // marginLeft:'150px'
              // border: 'solid lime'
            }}
          >
          
            <img 
              style={{
                // marginRight:'50px',
                // marginLeft:'150px'
              }} 
              src={sf}
            />
          
          </div>
        </Box>
        
        <Box 
          hidden={auth.isAuth} 
          style={{
            width: '18%',
            height: '100%',
            // border: 'solid cyan',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
        
          {/* <Button
            className={classes.authButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={signUpClicked}
            style={{
              position: 'absolute',
              right: '0'
            }}
          >
            Sign Up
          </Button>
          <Button
            className={classes.authButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={loginClicked}
            style={{
              position: 'absolute',
              right: '87px'
            }}
          >
            Login
          </Button> */}

          {loggedIn === false ? (<>
            <Button
              className={classes.authButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={signUpClicked}
              style={{
                position: 'absolute',
                right: '0'
              }}
            >
              Sign Up
            </Button>
            <Button
              className={classes.authButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={loginClicked}
              style={{
                position: 'absolute',
                right: '87px'
              }}
            >
              Login
            </Button>
          </>) : (
            null
          )}
          
        </Box>

        <Box 
          hidden={!auth.isAuth} 
          style={{
            width:'18%'
          }}
        >

          <div style={{width:'50%',float:'left'}} hidden={(window.width < 1024) ? true : false}>
          <p style={{color:'white'}}>{customerName}</p>
          </div>
          
          <div style={{width:'50%',float:'right'}}>  
            {/* <Button
              className={classes.authButton}
              variant="contained"
              size="small"
              color="primary"
              style={{
                marginLeft: '2rem',
                height: '2rem',
                marginTop: '0.5rem',
                
              }}
              onClick={handleClickLogOut}
            >
              Log Out
            </Button> */}
            <Button
              className={classes.authButton}
              variant="contained"
              size="small"
              color="primary"
              onClick={handleClickLogOut}
              style={{marginTop:'.5rem'}}
            >
              Logout
            </Button>
          </div>
          
        </Box>

        <Box hidden={!(auth.isAuth || auth.isGuest)}>
          {/* <IconButton edge="end" className="link">
            <StorefrontIcon
                fontSize="large"
                color={'default'}
                onClick={handleCartClick}
                aria-hidden="false"
                aria-label = 'Go to store'
            />
          </IconButton>
          <IconButton edge="end" className="link">
            <Badge badgeContent={badgeContent} color="primary">
              <ShoppingCartIcon
                fontSize="large"
                color={'default'}
                onClick={handleStoreClick}
                aria-hidden="false"
                aria-label = 'Go to shopping cart'
              />
            </Badge>
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  </div>
  );
}
