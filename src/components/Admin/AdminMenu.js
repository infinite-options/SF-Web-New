import React, { useContext, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { AuthContext } from '../../auth/AuthContext';
import { AdminFarmContext } from './AdminFarmContext';

import appColors from '../../styles/AppColors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 100,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menulistgrow: {
    padding: 0,
    height: '90vh',
  },
  menuitem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'block',
    padding: '20px 20px',
    '&:hover': {
      backgroundColor: '#136D74',
      color: '#FF8500',
    },
  },
  activeitem: {
    backgroundColor: '#136D74',
    color: '#FF8500',
  },
}));

const AdminMenu = ({ props }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const anchorRef = React.useRef(null);

  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(!(auth.isAuth || auth.isGuest));
  const [active, setActive] = useState('Dashboard');
  useMemo(() => {
    setIsDisabled(!(auth.isAuth || auth.isGuest));
  }, [auth.isAuth, auth.isGuest]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleMenuItem = (event, nav) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    switch (nav) {
      case 'Admin':
        if (auth.authLevel === 2)
          history.push({
            pathname: '/admin',
          });
        break;
      case 'Farm':
        if (auth.authLevel === 1)
          history.push({
            pathname: '/admin',
          });
        break;
      case 'Dashboard':
        history.push({
          pathname: '/admin',
          state: { storePage: 0 },
        });
        break;
      case 'Farm Profiles':
        history.push({
          pathname: '/admin/farmprofiles',
          state: { storePage: 0 },
        });
        break;
      case 'Farm Orders':
        history.push({
          pathname: '/admin/farmorders',
          state: { storePage: 0 },
        });
        break;
      case 'Items':
        history.push({
          pathname: '/admin/items',
          state: { storePage: 0 },
        });
        break;
      case 'Orders':
        history.push({
          pathname: '/admin/farmerreport',
          state: { storePage: 0 },
        });
        break;
      case 'Order Summary':
        history.push({
          pathname: '/admin/ordersummary',
          state: { storePage: 0 },
        });
        break;
      case 'Customers':
        history.push({
          pathname: '/admin/customers',
          state: { storePage: 0 },
        });
        break;
      default:
        break;
    }
    setActive(nav);
    setOpen(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menulistgrow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon
            style={{ color: '#1c6d74', width: '3rem', height: '3rem' }}
            aria-hidden="false"
            aria-label="Menu list"
          />
        </IconButton>
        <Popper
          className={classes.menulistgrow}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper
                style={{
                  backgroundColor: appColors.secondary,
                  minHeight: '100%',
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Dashboard'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Dashboard');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Dashboard
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Farm Profiles'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Farm Profiles');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Farm Profiles
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Farm Orders'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Farm Orders');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Farm Orders
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Items'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Items');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Items
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Orders'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Orders');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Orders
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Order Summary'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Order Summary');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Order Summary
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem
                      disabled={isDisabled}
                      className={
                        active === 'Customers'
                          ? `${classes.activeitem}`
                          : `${classes.menuitem}`
                      }
                      onClick={(e) => {
                        handleMenuItem(e, 'Customers');
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            marginLeft: '1rem',
                            fontSize: '18px',
                          }}
                        >
                          Customers
                        </div>
                      </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withRouter(AdminMenu);
