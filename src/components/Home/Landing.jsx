import React, { useContext, useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import appColors from '../../styles/AppColors';
import LandingNavBar from '../LandingNavBar/LandingNavBar';
import AdminLogin from '../LogIn/AdminLogin';
import Signup from '../SignUp/newSignUp';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import DeliveryLocationSearch from '../DeliverySearch/DeliveryLocationSearch';
import Farmers from '../Farmers/Farmers';
import Testimonial from '../Testimonial/Testimonial';
import Order from '../Order/Order';
import Footer from '../Footer/Footer';
import bg from '../../icon/bg.svg';
import ConfirmatioModal from 'components/SignUp/ConfirmationModal';
// import { AdminFarmContext } from '../Admin/AdminFarmContext';
import { AuthContext } from '../../auth/AuthContext';

import zonesLeft from '../../images/ZonesLeft.png';
import zonesRight from '../../images/ZonesRight.png';

const useStyles = makeStyles((theme) => ({
  authModal: {
    position: 'absolute',
    // width: '500px',
    top: '50px',
    zIndex: '10040',
    height: 'auto',
  },
  authModal2: {
    position: 'absolute',
    // width: '500px',
    top: '130px',
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
    maxWidth: '100%',
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

  imgSFSJ:{
    '&:hover':{
      msTransform: 'scale(1.3)', /* IE 9 */
      webkitTransform: 'scale(1.3)', /* Safari 3-8 */
      transform: 'scale(1.3)',
    }
  },

  linkDiv: {
      
      background: 'url(landing/linkBackground.png) no-repeat center center', 
      webkitBackgroundSize: '100%',
      mozBackgroundSize: '100%',
      oBackgroundSize: '100%',
      backgroundSize: '100%',
    
  }
}));

function fetchSweepstakes(setSweepstakeActive) {
  const endpoint = `https://3o9ul2w8a1.execute-api.us-west-1.amazonaws.com/dev/api/v2/promotions`;
  fetch(
    `${endpoint}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: 'SF'}),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      const sweeps = json;
      setSweepstakeActive(sweeps === 'ACTIVE');
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
// TODO: click outside works, needs configuration on initial click
function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      console.log("(UOA) ref.current: ", ref.current)
      console.log("(UOA) event: ", event)

      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ref.current.hidden
      ) {
        ref.current.hidden = true;
      }
    }

    console.log("(UOA) ref: ", ref)

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

//backgroundImage:`url(${Background})`,

// TODO:  Social login can login direct login only if the email is verified
// TODO:  Add auto address fill
// DONE:  Allow a click out of login to close it
const Landing = ({ ...props }) => {
  const classes = useStyles();
  const history = useHistory();
  // const adminFarm = useContext(AdminFarmContext);
  const auth = useContext(AuthContext);
  // Toggles for the login and signup box to be passed in as props to the Landing Nav Bar
  const [isLoginShown, setIsLoginShown] = useState(false); // checks if user is logged in
  const [isSignUpShown, setIsSignUpShown] = useState(false);
  const [confirmEmailstate, setConfirmEmail] = useState(false);
  console.log('Landing Sweepstake Value:', auth.sweepstakeActive);
  const loginWrapperRef = useRef(null);
  useOutsideAlerter(loginWrapperRef, setIsLoginShown);
  const signupWrapperRef = useRef(null);
  useOutsideAlerter(signupWrapperRef, setIsSignUpShown);
  useEffect(() => fetchSweepstakes(auth.setSweepstakeActive), []);

  useEffect(() => {
    console.log("(UE) isLoginShown? ", isLoginShown);
  }, [isLoginShown])

  useEffect(() => {
    console.log("(UE) logginWrapperRef ", loginWrapperRef);
  }, [loginWrapperRef])

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  // const handleClose = () => {
  //   console.log('close');
  //   setIsLoginShown(false);
  //   setIsSignUpShown(false);
  // };

  return (
    <div 
      className="contentWrap"
      style={{
        // border: 'blue solid'
      }}
    >
      {/* <Box
          style={{
            backgroundSize: 'cover',
            // backgroundImage: `url(${'transparent-landing-bg.png'})`,
            opacity: 1,
            paddingBottom: '100px',
          }}
        > */}
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
      <div>
        {auth.sweepstakeActive ? (
          <div>
            <Box
              className="homeHeader"
              onClick={() => history.push('/sweepstakes')}
              style={{
                background: '#F8851B 0% 0% no-repeat padding-box',
                opacity: 1,
                // height: '60px',
                minHeight: '60px',
                // paddingTop: '10px',
                cursor: 'pointer',
              }}
            >
              <div
                className="homeHeaderContainer"
              >
                <div
                  // style={{
                  //   border: 'solid red'
                  // }}
                  className="homeHeaderLeft"
                >
                  <span
                    style={{
                      textAlign: 'center',
                      fontSize: ' 40px ',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      opacity: 1,
                      // paddingRight: '30px',
                      // marginTop: '20px',
                      // border: 'solid lime'
                    }}
                  >
                    Free Fresh Food!
                  </span>
                </div>
                <div
                  // style={{
                  //   border: 'solid purple'
                  // }}
                  className="homeHeaderRight"
                >
                  <span
                    style={{
                      textAlign: 'center',
                      fontSize: ' 20px ',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      opacity: 1,
                      // border: '1px solid cyan',
                      width: '100%'
                      // marginBottom: '10px'
                    }}
                  >
                    Click here to enter now to &nbsp;
                    <span
                      style={{
                        fontWeight: '600',
                        color: '#2B6D74',
                      }}
                    >
                      win $50 worth &nbsp;
                    </span>
                    of fresh produce, delivered free of charge to your door
                  </span>
                </div>
              </div>
            </Box>
          </div>
        ) : null}
      </div>

      {/* END: Login/SignUp Modal */}
      {/* START: landing Logo and Guest Login */}
      {/* <Container
            fluid
            //class="container-fluid px-0"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              backgroundSize: 'cover',
              backgroundImage: `url(${'fruits-and-vegetables.png'})`,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <Row class="align-items-center">
              <Col lg={6} md={{ size: 6, order: 2, offset: 1 }}>
                <div
                  id="headingGroup"
                  class="text-white text-center d-none d-lg-block mt-5"
                >
                  <h1
                    id="text"
                    style={{
                      color: appColors.buttonText,
                      fontSize: '80px',
                      textAlign: 'left',
                      fontWeight: '700',
                      marginLeft: '90px',
                    }}
                  >
                    Fresh, Organic <br></br>
                    Produce <br></br>Delivered
                  </h1>
                </div>
              </Col>
              <Col lg={6} md={{ size: 6, order: 1, offset: 1 }}>
                <img
                  class="img-fluid"
                  src="./logos/SF.png"
                  style={{
                    marginTop: '40px',
                    //marginLeft: '800px',
                  }}
                />
              </Col>
            </Row>
          </Container> */}
      {/* END: Landing Page Logo */}
      {/* START: Info Section */}
      {/* <Box className={classes.title} style={{ paddingTop: '30px',position:'sticky' }}>
            Why try Serving Fresh
          </Box>
          <Box mx="auto" className={classes.bar} />
          <Box
            // display="flex"
            className="info-container"
          >
            <Box className={classes.infoSection} id="mobileInfoSection">
              <Box className={classes.infoImg}>
                <img
                  src="./landing/vegetables_info.png"
                  alt="vegetables info"
                />
              </Box>
              <div className={classes.infoTitle}>Farm to doorstep</div>
              <div className={classes.infoDesc}>
                We bring fresh produce from local farms right to our consumers'
                doorstep. It's a farmer's market experience at your fingertips
              </div>
            </Box>
            <Box className={classes.infoSection} id="mobileInfoSection">
              <Box className={classes.infoImg}>
                <img src="./landing/farmer_info.png" alt="farmer info" />
              </Box>
              <div className={classes.infoTitle}>Help local farmers</div>
              <div className={classes.infoDesc}>
                Helping farmers continue their businesses in the post pandemic
                world. Serving Fresh brings their produce to your doorstep in
                the safest way possible.
              </div>
            </Box>
            <Box className={classes.infoSection} id="mobileInfoSection">
              <Box className={classes.infoImg}>
                <img src="./landing/student_info.png" alt="student info" />
              </Box>
              <div className={classes.infoTitle}>Empower students</div>
              <div className={classes.infoDesc}>
                We help students gain real world experience by working with us
                on developing Serving Fresh.
              </div>
            </Box>
          </Box> */}
      {/* END: Info Section */}
      {/* START: Local Produce Search */}
      {/* <Box my={10}>
            <ProductDisplay />
          </Box> */}
      {/* END: Local Produce Search */}
      {/* START: Farmer information */}
      {/* <Container
            fluid
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: '50px',
              backgroundSize: 'cover',
              backgroundColor: `white`,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <Box
              className={classes.title}
              style={{
                textAlign: 'left',
                marginLeft: '150px',
                paddingBottom: '50px',
              }}
            >
              Featured Farmer
            </Box>
            <Row>
              <Col lg={4}>
                <img
                  src="./landing/farmer_pic.jpg"
                  alt="farmer info"
                  style={{ width: '400px', height: '510px' }}
                />
                <Box
                  className={classes.farmTitle}
                  style={{ marginLeft: '150px' }}
                >
                  Rodriguez Farms
                  <div className={classes.farmDesc}>
                    City: <br></br>
                    Contact:
                  </div>
                </Box>
              </Col>
              <Hidden md sm xs>
                <Col md={8}>
                  <img
                    src="./landing/farm_pic.jpg"
                    alt="farm info"
                    style={{ width: '869px', height: '518px' }}
                  />
                </Col>
              </Hidden>
            </Row>
            <Row style={{ paddingTop: '50px' }}>
              <Hidden md sm xs>
                <Col md={4}></Col>
                <Col md={4}>
                  <img
                    src="./landing/produce.jpg"
                    alt="farm info"
                    style={{
                      width: '435px',
                      height: '518px',
                      paddingLeft: '180px',
                    }}
                  />
                </Col>
              </Hidden>
              <Col md={4}>
                <div
                  className={classes.farmTitle}
                  style={{ marginLeft: '100px' }}
                >
                  Featured Produce
                  <div className={classes.farmDesc}>
                    Item1 <br></br>
                    Item2 <br></br>
                    Item3
                  </div>
                </div>
              </Col>
            </Row>
          </Container> */}
      {/* </Box>
      </Box> */}
      {/* END: Login/SignUp Modal */}
      {/* START: landing Logo and Guest Login */}
      <Container
        fluid
        //class="container-fluid px-0"
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          backgroundSize: 'cover',
          backgroundImage: `url(${'fruits-and-vegetables2.png'})`,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Row className="align-items-center">
          <Col
            lg={6}
            //  md={{ size: 6, order: 2, offset: 1 }}
          >
            <div
              id="headingGroup"
              className="text-white text-center d-none d-lg-block mt-5"
            >
              {/* <h1
                id="text"
                style={{
                  color: appColors.buttonText,
                  fontSize: '80px',
                  textAlign: 'left',
                  fontWeight: '700',
                  marginLeft: '175px',
                  marginTop: '150px',
                  marginBottom: '150px',
                }}
              >
                Fresh, Organic <br></br>
                Produce <br></br>Delivered
              </h1> */}
              <h1
                className="freshOrganic"
                id="text"
                style={{
                  color: appColors.buttonText,
                  // fontSize: '80px',
                  // textAlign: 'left',
                  // fontWeight: '700',
                  // marginLeft: '175px',
                  // marginTop: '150px',
                  // marginBottom: '150px',
                  // border: 'dashed'
                }}
              >
                Fresh, Organic
                <br />
                Produce 
                <br />
                Delivered
              </h1>
            </div>
          </Col>
          <Col
            lg={6}
            // md={{ size: 6, order: 1, offset: 1 }}
            // style={{
            //   border: 'dashed'
            // }}
          >
            <img
              className='homeLogo'
              // className="img-fluid"
              src="./logos/SF.png"
              style={{
                // marginTop: '30px',
                width: '306px',
                height: '306px',
                // marginTop: '160px',
                //marginLeft: '800px',
              }}
            />
          </Col>
        </Row>
      </Container>
      {/* END: Landing Page Logo */}
      <Box
        // className="hero-right"
        // display="flex"
        // flexDirection="row"
        // alignItems="center"
        // className="addrSearchContainer"
        style={{
          // display: 'flex',
          backgroundColor: '#2F787F',
          minHeight: '200px',
          // maxHeight: '300px',
          // width: 'auto',
          // width: '1000%',
          // maxWidth: '100%',
          textAlign: 'left',
          // border: 'dashed'
        }}
      >
        {/* <ZipcodeSearch/> */}
        <div
          className="addrSearchContainer"
          style={{
            // border: '1px solid yellow',
            // width: '150%',
          }}
        >
          <Box 
            className="addrSearchLeft"
            style={{ 
              width: '100%',
              // minWidth: '500px',
              
              
            }}
          >
            <h2
              style={{
                color: appColors.buttonText,
                fontSize: '45px',
                fontWeight: '700',
                marginLeft: '20%',
                letterSpacing: '0.95px',
              }}
            >
              {/* Local produce delivered <br />
              to your doorstep */}
              Local produce delivered<br/>
              to your doorstep
            </h2>
          </Box>
          <Box 
            className={classes.title}
            style={{ 
              width: '100%',
              textAlign:'right',
              // minWidth: '500px',
              marginRight: '10%',
              marginTop: '3%'
              
            }}
           
          >
            <a href="#searchAddress" style={{textDecoration: 'none'}}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              // onClick={login}
              style={{
                width: '50%',
                height: '40%',
                textTransform: 'none',
                borderRadius: '20px',
                // marginTop: '20px',
                textAlign: 'center',
                // font: 'normal normal 400 26px/18px SF Pro Display',
                fontSize: '23px',
                letterSpacing: '0.51px',
                color: '#FFFFFF',
                opacity: 1,
                // marginTop: '6%',
                margin:'0',
                
              }}
          >
          See if we deliver to you
        </Button>
        </a>
          </Box>
        </div>
      </Box>
      <Box
        className={classes.title}
        style={{
          textAlign: 'center',
          paddingBottom: '00px',
          backgroundColor: '#2F787F26',
          paddingTop: '20px',
        }}
      >
        <u style={{ textAlign: 'center' }}>Weekly Fresh Produce</u>
      </Box>
      <ProductDisplay />
      {/* START: Info Section */}
      <Box className={classes.root} style={{paddingBottom:'0'}}>
        <Box
          //display="flex"
          className="info-container"
        >
          <Box className={classes.infoSection} id="mobileInfoSection" style={{marginBottom:'2.5%',marginTop:'1%'}}> 
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.primary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '700',
                  marginLeft: '20px',
                }}
              >
                100+ items
              </p>
              <p
                style={{
                  textAlign: 'center',
                  font: 'normal normal 600 24px',
                  letterSpacing: '0.45px',
                  color: appColors.secondary,
                  opacity: 1,
                  marginBottom: '20px'
                }}
              >
                Fruits, vegetables and other organic produce to choose from
              </p>
            </div>
          </Box>

          <Box className={classes.infoSection} id="mobileInfoSection" style={{marginBottom:'2.5%',marginTop:'1%'}}>
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.primary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '700',
                  marginLeft: '20px',
                }}
              >
                17% Savings
              </p>
              <p
                style={{
                  textAlign: 'center',
                  font: 'normal normal 600',
                  letterSpacing: '0.45px',
                  color: appColors.secondary,
                  opacity: 1,
                }}
              >
                Our affordable produce can help you save an average of 17% more
                than that compared to organic produce at local grocery stores.
              </p>
            </div>
          </Box>
          <Box className={classes.infoSection} id="mobileInfoSection" style={{marginBottom:'2.5%',marginTop:'1%'}}>
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.primary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '700',
                  marginLeft: '20px',
                }}
              >
                7+ Farms
              </p>
              <p
                style={{
                  textAlign: 'center',
                  font: 'normal normal 600 24px',
                  letterSpacing: '0.45px',
                  color: appColors.secondary,
                  opacity: 1,
                }}
              >
                Support our farm partners by ordering here and stay updated with
                new, seasonal produce.
              </p>
            </div>
          </Box>
        </Box>
        <Box
        className={classes.farmer}
        id="searchAddress"
        style={{
          // paddingBottom: '00px',
          backgroundColor: '#2F787F',
          display:'flex',
          paddingBottom: '0',
         
        }}
      >
       
        <Box style={{width:'100%'}}>
          <Box className={classes.title}
            style= {{
                      color:'white',
                      font: 'normal normal 600 24px ',
                      // font:'SFProText-Semibold',
                      fontSize: '40px',
                      textAlign: 'center',
                      fontWeight: '600',
                      marginLeft: '20px',
                      marginBottom:'2%',
            }}
          >
          Look at the map below to see the areas we deliver to
          </Box>
          <Box 
            style={{
              float:'left',
              width:'50%',
              
              
            }}>
          <img
            className = {classes.imgSFSJ}
            style={{height:'80%',width:'80%',transition: 'transform .2s'}}
            // src="./zonesLeft.png" alt="vegetables info" 
            src={zonesLeft} alt="vegetables info" 
            />
            <p style={{marginTop:'2%', fontSize: '24px ', color:'white',}}>
            Now serving the above marked areas in  
              <p style={{fontSize: '40px ', color:'white',margin:'0'}}><b>San Francisco</b></p>
            </p>
          </Box>
          <Box
            style={{
              float:'right',
              width:'50%',
              
            }}
          >
            <img 
              className = {classes.imgSFSJ}
              style={{height:'80%',width:'80%',transition: 'transform .2s'}}
              // src="./zonesRight.png" alt="vegetables info" 
              src={zonesRight} alt="vegetables info" 
            />
            <p style={{marginTop:'2%', fontSize: '24px ', color:'white',}}>
            Sunnyvale, Cupertino, Saratoga, Los Gatos, Willow Glen, <br/>South San Jose
            </p>
          </Box>
        </Box>
      </Box>

      <Box 
            
            style={{backgroundColor:'#2F787F', paddingBottom:'10px',paddingTop:'2%',}}
          >
          <DeliveryLocationSearch
              isLoginShown={isLoginShown}
              setIsLoginShown={setIsLoginShown}
              isSignUpShown={isSignUpShown}
              setIsSignUpShown={setIsSignUpShown}
            />
      </Box>
      
      <Box 
      // className={classes.title}
            id="test"
            style={{backgroundColor:'#2F787F', paddingTop:'2%', paddingBottom:'10px', color:'white', fontSize:'2.5rem',
                    paddingRight:'5%',fontWeight:'650'
          }}
          >
         No Minimums <span style={{color: "#FF8500"}}> I </span> No Subscriptions
      </Box>
      <Box 
      // className={classes.title}
            id="test"
            style={{backgroundColor:'#2F787F', paddingBottom:'2.5%', color:'white', fontSize:'1.8rem',
                    paddingRight:'5%', fontWeight:'600'
          }}
          >
         Free delivery on all orders over $30
      </Box>
        
      </Box>
      {/* END: Info Section */}
      
      <Box
        className={classes.testimonial}
        style={{
          backgroundColor: '#F1F4F4',
          // height: '20em',
          width: '100%',
          border: '0px solid black',
        }}
      >
        <Box
          className={classes.title}
          style={{
            marginLeft: '50px',
            paddingBottom: 'px',
            textAlign: 'left',
            backgroundColor: '#F1F4F4',
          }}
        >
          <u>Testimonials</u>
        </Box>
        <Testimonial></Testimonial>
      </Box>

      {/* START: Farmer information */}
      <Box className={classes.farmer}>
        <Box
          className={classes.title}
          style={{
            textAlign: 'left',
            marginLeft: '50px',
            paddingBottom: '20px',
          }}
        >
          <u>Meet the Farmers</u>
        </Box>
        <Farmers />
      </Box>
      {/* END: Farmer Information */}
      {/* START: Info Section */}
      <Box style={{ backgroundImage: `url(${bg})` }}>
        <Box
          className={classes.title}
          style={{ paddingTop: '30px', zIndex: '0' }}
        >
          Why try Serving Fresh
        </Box>
        <Box mx="auto" className={classes.bar} />
        <Box
          // display="flex"
          className="info-container"
        >
          <Box className={classes.infoSection} id="mobileInfoSection">
            <Box className={classes.infoImg}>
              <img src="./landing/vegetables_info.png" alt="vegetables info" />
            </Box>
            <div className={classes.infoTitle}>Farm to doorstep</div>
            <div className={classes.infoDesc}>
              We bring fresh produce from local farms right to our consumers'
              doorstep. It's a farmer's market experience at your fingertips
            </div>
          </Box>
          <Box className={classes.infoSection} id="mobileInfoSection">
            <Box className={classes.infoImg}>
              <img src="./landing/farmer_info.png" alt="farmer info" />
            </Box>
            <div className={classes.infoTitle}>Help local farmers</div>
            <div className={classes.infoDesc}>
              Helping farmers continue their businesses in the post pandemic
              world. Serving Fresh brings their produce to your doorstep in the
              safest way possible.
            </div>
          </Box>
          <Box className={classes.infoSection} id="mobileInfoSection">
            <Box className={classes.infoImg}>
              <img src="./landing/student_info.png" alt="student info" />
            </Box>
            <div className={classes.infoTitle}>Empower students</div>
            <div className={classes.infoDesc}>
              We help students gain real world experience by working with us on
              developing Serving Fresh.
            </div>
          </Box>
        </Box>
      </Box>
      {/* END: Info Section */}
      
        <Box style={{ marginBottom: '20px' }}>
          <Order
            isLoginShown={isLoginShown}
            setIsLoginShown={setIsLoginShown}
            isSignUpShown={isSignUpShown}
            setIsSignUpShown={setIsSignUpShown}
          />
        </Box>
      

        {/* START: Info Section */}
        
        {
          
          dimensions['width'] >= 400 ?(
            <div
            style={{
              display: "flex",
              width: "100%",
              height:'100%',
              marginTop: "30px",
              backgroundImage: `url(${'links/backFruits1.png'})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize:'cover' 
            }}
          >
                <Box
                      style={{
                        float:'left',
                        width:'50%',
                        display:'flex',
                        alignItems: 'flex-end',
                        
                      }}
                    >
                      <img src='links/qrScan.png'  width="60%" height="90%" style={{marginLeft:'40%'}} />
                    </Box>

                    <Box 
                      style={{
                        float:'right',
                        width:'50%',
                        textAlign:'left',
                        marginTop:'7%',
                        
                      }}>
                          <Box style={{margin:'0'}}>
                            <img src='links/displayText.png' width="50%" />
                          </Box>
                          
                          <Box style={{display:'block', margin:'0'}}>
                            <a href="https://play.google.com/store/apps/details?id=com.servingfresh">
                            <img src='links/googlePlay.png' width="20%" style={{marginLeft:'13%'}}/> 
                            </a>                            
                          </Box>
                          
                          <Box style={{display:'block',margin:'0'}}>
                            <a href="https://apps.apple.com/us/app/serving-fresh/id1488267727">
                            <img src='links/appStore.png' width="18%" style={{marginLeft:'14%'}} />
                            </a>
                          </Box>

                         
            
                    </Box>
 
                
                </div>
              
            ):
          (   
            <div
            style={{
              
              display: "block",
              width: "100%",
              height:'570px',
              marginTop: "30px",
              backgroundImage: `url(${'links/mobileBack2.png'})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize:'cover'
            }}
          >
               
            <Box style={{marginTop:'0',textAlign:'center'}}>
              <img src='links/displayTextMobile.png' width="255px" style={{marginTop:'10%'}}/>
            </Box>
            
            <Box style={{ margin:'0',textAlign:'center'}}>
            <a href="https://play.google.com/store/apps/details?id=com.servingfresh">
            <img src='links/googlePlay.png' width="60%" style={{marginTop:'10%'}}/> 
            </a>                            
            </Box>
            <Box style={{margin:'0',textAlign:'center'}}>
            <a href="https://apps.apple.com/us/app/serving-fresh/id1488267727">
            <img src='links/appStore.png' width="55%" style={{marginTop:'0%'}}/>
            </a>
            </Box>
            
            <Box style={{margin:'0',textAlign:'center'}}>
              <img src='links/qrScan.png'  width="60%" height="100%"  style={{postion:'absolute',left:'0',bottom:'0'}}/>
            </Box>
 
                
          </div>
            
            )
          
        }
        
        {/* END: Info Section */}
        <div>
        <Box style={{ backgroundColor: 'rgb(251,132,0)',marginTop:'0px' }}>
          <Footer
            isLoginShown={isLoginShown}
            setIsLoginShown={setIsLoginShown}
            isSignUpShown={isSignUpShown}
            setIsSignUpShown={setIsSignUpShown}
          />
        </Box>
        </div>
    </div>
  );
};

export default Landing;