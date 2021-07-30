import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, IconButton, Badge } from '@material-ui/core';
import { Container, Row, Col } from 'react-grid-system';
import { Hidden } from 'react-grid-system';
//import white from '@material-ui/core/colors/white';
//import makeStyles from '@material-ui/core/styles/makeStyles';
import appColors from '../../styles/AppColors';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Modal from '../Modal/Modal';
import { AuthContext } from '../../auth/AuthContext';
import AmbasadorModal from '../Modal/AmbasadorModal';
import LoginAmbasador from '../Modal/loginAmbasador';
import storeContext from '../Store/storeContext';

const Footer = ({ ...props }) => {
  let [ambasadorModal, ambasadorModalMessage] = useState('');
  let [loginambasadorModal, loginambasadorModalMessage] = useState('');
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(auth.profile);

  const loginClicked = () => {
    props.setIsSignUpShown(false);
    props.setIsLoginShown(!props.isLoginShown);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const signUpClicked = () => {
    props.setIsLoginShown(false);
    props.setIsSignUpShown(!props.isSignUpShown);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const becomeAmbassador = () => {
    if (auth.isAuth) {
      ambasadorModalMessage('true');
    } else {
      loginambasadorModalMessage('true');
    }
  };

  const modalClose = () => {
    ambasadorModalMessage(null);
    loginambasadorModalMessage(null);
  };

  return (
    <div className="containerFooter" style={{ margin: 0 }}>
      <div className="container">
        {ambasadorModal && <AmbasadorModal close={modalClose}></AmbasadorModal>}
        {loginambasadorModal && (
          <LoginAmbasador
            showSignup={signUpClicked}
            showLogin={loginClicked}
            close={modalClose}
          ></LoginAmbasador>
        )}
        <Container>
          <Row>
            <Col lg={3} md={2}>
              <Hidden md sm xs>
                <img
                  alt="logo.png"
                  height="130px"
                  width="130px"
                  src="./logos/SF.png"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
                  style={{
                    float: 'left',
                    marginTop: '35px',
                    cursor: 'pointer',
                  }}
                />
              </Hidden>
            </Col>
            <Col
              lg={3}
              md={1}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Button
                size="large"
                variant="contained"
                color="secondary"
                //onClick={onFindProduceClicked}
                style={{
                  width: '250px',
                  marginTop: '50px',
                  textTransform: 'none',
                }}
              >
                Buy a Gift Card
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={becomeAmbassador}
                style={{
                  width: '250px',
                  marginTop: '10px',
                  textTransform: 'none',
                }}
              >
                Become an Ambassador
              </Button>
            </Col>
            <Col
              lg={3}
              md={1}
              style={{
                color: 'white',
                fontSize: '18px',
                paddingLeft: '60px',
                fontWeight: '500',
                marginTop: '35px',
                textAlign: 'left',
              }}
            >
              <p>
                Get in touch: <br />
                <a
                  href="mailto:support@servingfresh.me"
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  support@servingfresh.me
                </a>
              </p>
              <p
                onClick={() => history.push('/terms-and-conditions')}
                style={{ cursor: 'pointer' }}
              >
                Terms and Condtions
              </p>
            </Col>
            <Col
              lg={3}
              md={1}
              style={{
                color: 'white',
                fontSize: '20px',
                fontWeight: '500',
                marginTop: '50px',
              }}
            >
              <IconButton
                onClick={(event) =>
                  (window.location.href =
                    'https://www.facebook.com/ServingFresh')
                }
                edge="end"
                className="link"
                style={{
                  color: 'white',
                }}
              >
                <FacebookIcon
                  fontSize="large"
                  // onClick={(event) =>
                  //   (window.location.href =
                  //     'https://www.facebook.com/ServingFresh')
                  // }
                  aria-hidden="false"
                  aria-label="Facebook"
                  style={{ color: 'white' }}
                />
              </IconButton>
              <IconButton
                onClick={(event) =>
                  (window.location.href =
                    'https://www.instagram.com/servingfresh/')
                }
                edge="end"
                className="link"
                style={{
                  color: 'white',
                }}
              >
                <InstagramIcon
                  fontSize="large"
                  // onClick={(event) =>
                  //   (window.location.href =
                  //     'https://www.instagram.com/servingfresh/')
                  // }
                  aria-hidden="false"
                  aria-label="Instagram"
                  style={{ color: 'white' }}
                />
              </IconButton>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
