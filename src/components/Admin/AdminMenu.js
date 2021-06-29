import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { AuthContext } from '../../auth/AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#136D74',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#136D74',
  },
  drawerContainer: {
    overflow: 'auto',
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

    cursor: 'pointer',
  },
  activeitem: {
    color: '#FF8500',
    textDecoration: 'none',
    fontSize: '16px',
    display: 'block',
    padding: '20px 20px',
    '&:hover': {
      backgroundColor: '#136D74',
      color: '#FF8500',
    },
  },
}));

const AdminMenu = ({ props }) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const anchorRef = React.useRef(null);

  const [active, setActive] = useState('');

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
          pathname: '/admin/adminitems',
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
      case 'Messages':
        history.push({
          pathname: '/admin/messages',
          state: { storePage: 0 },
        });
        break;
      default:
        break;
    }
    setActive(nav);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
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
            </ListItem>
            <ListItem
              className={
                active === 'Messages'
                  ? `${classes.activeitem}`
                  : `${classes.menuitem}`
              }
              onClick={(e) => {
                handleMenuItem(e, 'Messages');
              }}
            >
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    marginLeft: '1rem',
                    fontSize: '18px',
                  }}
                >
                  Messages
                </div>
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default withRouter(AdminMenu);
