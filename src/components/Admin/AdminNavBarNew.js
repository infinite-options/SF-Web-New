import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';
import { AdminFarmContext } from './AdminFarmContext';
import appColors from 'styles/AppColors';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#D3D3D3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: '#136D74',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#136D74',
      color: '#FF8500',
    },
  },
  rightButtons: {
    position: 'absolute',
    right: '10px',
    color: 'white',
    marginRight: '10px',
  },
  farmSelect: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function AdminNavBarNew({ tab, setTab, ...props }) {
  const history = useHistory();

  const anchorRef = React.useRef(null);
  const {
    showNav,
    setShowNav,
    farmID,
    farmList,
    setFarmList,
    handleChangeFarm,
    farmDict,
  } = useContext(AdminFarmContext);

  const [defaultFarm, setDefaultFarm] = useState(
    farmList.includes(localStorage.getItem('farmID'))
      ? localStorage.getItem('farmID')
      : 'all'
  );

  useEffect(() => {
    setDefaultFarm(
      farmList.includes(localStorage.getItem('farmID'))
        ? localStorage.getItem('farmID')
        : 'all'
    );
  }, [farmList]);

  const Auth = useContext(AuthContext);
  useEffect(() => {
    // axios
    //   .get(process.env.REACT_APP_SERVER_BASE_URI + 'all_businesses')
    //   .then((res) => {
    //     console.log(res);
    //     setFarmList(res.data.result);
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       console.log(err.response);
    //     }
    //     console.log(err);
    //   });
  }, []);

  //when admin logs out, remove their login info from cookies
  const handleClickLogOut = () => {
    localStorage.removeItem('currentStorePage');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('cartItems');
    Cookies.remove('login-session');
    Cookies.remove('customer_uid');

    Auth.setIsAuth(false);
    Auth.setAuthLevel(0);
    props.history.push('/');
  };

  const handleLogoClick = (event) => {
    console.log(event.target.value);
    props.history.push('/store');
  };

  const classes = useStyles();
  const businessList = () => {
    if (Auth.authLevel >= 2) {
      // Complete business list for admin roles

      return (
        <Select
          defaultValue={'all'}
          className={classes.farmSelect}
          onChange={handleChangeFarm}
        >
          <MenuItem value={'all'}>All</MenuItem>
          );
          {farmList.map((item, index) => {
            return (
              <MenuItem key={index} value={item.business_uid}>
                {item.business_name}
              </MenuItem>
            );
          })}
        </Select>
      );
    }

    let ownedFarm = farmList.filter((farm) => farm.business_uid === farmID);

    if (ownedFarm.length > 0) {
      ownedFarm = ownedFarm[0];
      return (
        <Button size={'small'} className={classes.button}>
          {ownedFarm.business_name}
        </Button>
      );
    }
    return null;
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar
          className={classes.appBar}
          color="white"
          position="fixed"
          elevation={0}
          style={{
            borderBottom: '1px solid ' + appColors.secondary,
          }}
        >
          <Toolbar>
            <Box
              width="98%"
              position="absolute"
              display="flex"
              justifyContent="center"
            >
              <img
                width="50"
                height="50"
                src="/logos/sf logo_without text.png"
                alt="logo"
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <Box>
              <IconButton ref={anchorRef} aria-haspopup="true">
                <MenuIcon
                  style={{ color: '#1c6d74', width: '3rem', height: '3rem' }}
                  aria-hidden="false"
                  aria-label="Menu list"
                />
              </IconButton>
            </Box>
            {Auth.authLevel >= 1 && (
              <React.Fragment>
                <Box>
                  {Auth.authLevel === 2 && (
                    <Typography
                      style={{
                        color: '#136D74',
                        textTransform: 'none',
                        paddingRight: '30px',
                      }}
                    >
                      Admin
                    </Typography>
                  )}
                </Box>
                <Box>
                  {Auth.authLevel === 1 && (
                    <Typography
                      style={{
                        color: '#136D74',
                        textTransform: 'none',
                        paddingRight: '30px',
                      }}
                    >
                      Farm
                    </Typography>
                  )}
                </Box>
                {businessList()}
                <Box>
                  <Button
                    size={'small'}
                    className={classes.button}
                    onClick={() => history.push('/admin/adminitems')}
                    //onClick={() => setTab(0)}
                  >
                    Items
                  </Button>
                  <Button
                    size={'small'}
                    className={classes.button}
                    onClick={() => history.push('/admin/farmerreport')}
                    //onClick={() => setTab(1)}
                  >
                    Orders
                  </Button>
                  <Button
                    size={'small'}
                    className={classes.button}
                    onClick={() => history.push('/admin/farmersettings')}
                    //onClick={() => setTab(2)}
                  >
                    Settings
                  </Button>
                </Box>
              </React.Fragment>
            )}
            <div className={classes.rightButtons}>
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: '#F5841F',
                  color: 'white',
                  marginLeft: '2rem',
                  height: '2rem',
                  marginTop: '0.75rem',
                  textTransform: 'none',
                }}
                onClick={handleClickLogOut}
              >
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(AdminNavBarNew);
