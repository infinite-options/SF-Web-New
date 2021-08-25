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
          width: '100%',
          maxWidth: '100%',
          // border: 'dashed'
        }}
      >
        {/* <ZipcodeSearch/> */}
        <div
          className="addrSearchContainer"
          // style={{
          //   border: '1px solid yellow',
          //   width: 
          // }}
        >
          <Box 
            className="addrSearchLeft"
            style={{ 
              // width: '50%',
              // minWidth: '300px',
              // border: '1px solid cyan'
            }}
          >
            <p
              style={{
                color: appColors.buttonText,
                fontSize: '45px',
                textAlign: 'left',
                fontWeight: '700',
                marginLeft: '20px',
                letterSpacing: '0.95px',
              }}
            >
              {/* Local produce delivered <br />
              to your doorstep */}
              Local produce delivered
              to your doorstep
            </p>
          </Box>
          <Box 
            className="addrSearchRight"
            style={{ 
              // width: '50%',
              // border: '1px solid red'
            }}
          >
            <DeliveryLocationSearch
              isLoginShown={isLoginShown}
              setIsLoginShown={setIsLoginShown}
              isSignUpShown={isSignUpShown}
              setIsSignUpShown={setIsSignUpShown}
            />
          </Box>
        </div>
      </Box>
      <Box
        className={classes.title}
        style={{
          textAlign: 'left',
          paddingBottom: '00px',
          backgroundColor: '#2F787F26',
          paddingTop: '20px',
        }}
      >
        <u style={{ marginLeft: '50px' }}>Weekly Fresh Produce</u>
      </Box>
      <ProductDisplay />
      {/* START: Info Section */}
      <Box className={classes.root} style={{}}>
        <Box
          // display="flex"
          className="info-container"
        >
          <Box className={classes.infoSection} id="mobileInfoSection">
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.secondary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginLeft: '20px',
                }}
              >
                55+ items
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
                Fruits, vegetables and other organic produce to choose from
              </p>
            </div>
          </Box>

          <Box className={classes.infoSection} id="mobileInfoSection">
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.secondary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginLeft: '20px',
                }}
              >
                17% Savings
              </p>
              <p
                style={{
                  textAlign: 'center',
                  font: 'normal normal 600 24px ',
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
          <Box className={classes.infoSection} id="mobileInfoSection">
            <div className={classes.infoDesc}>
              <p
                style={{
                  color: appColors.secondary,
                  fontSize: '40px',
                  textAlign: 'center',
                  fontWeight: '600',
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
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <p
            style={{
              textAlign: 'center',
              font: 'normal normal 600 24px SF Pro Display',
              letterSpacing: '0.45px',
              color: appColors.secondary,
              opacity: 1,
            }}
          >
            We are currently Serving <br />
            Sunnyvale, Cupertino, Saratoga, Los Gatos, Willow Glen, San Jose
          </p>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => history.push('/store')}
            style={{
              width: '300px',
              textTransform: 'none',
              float: 'center',
              color: 'white',
              borderRadius: '15px',
            }}
          >
            Shop Fresh Produce
          </Button>
        </Box>
      </Box>
      {/* END: Info Section */}
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
      {/* START: Local Produce Search */}
      {/* END: Local Produce Search */}
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
      {/* </Box> */}
      <div>
        <Box style={{ marginBottom: '20px' }}>
          <Order
            isLoginShown={isLoginShown}
            setIsLoginShown={setIsLoginShown}
            isSignUpShown={isSignUpShown}
            setIsSignUpShown={setIsSignUpShown}
          />
        </Box>

        <Box style={{ backgroundColor: 'rgb(251,132,0)' }}>
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
