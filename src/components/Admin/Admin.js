import React, { useState, useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AdminNavBarNew from './AdminNavBarNew';
import { AdminFarmContext } from './AdminFarmContext';
import { AuthContext } from '../../auth/AuthContext';
import AdminDashboard from './AdminDashboard';
import FarmerHome from '../Farm/FarmerHome';
import FarmerReport from '../Farm/FarmerReport';
import FarmerSettings from '../Farm/FarmerSettings';
import FarmProfiles from './FarmProfiles';
import FarmOrders from './FarmOrders';
import AdminItems from './AdminItems';
import Customers from './Customers/Customers';
import OrderSummary from './OrderSummary';
import AdminMenu from './AdminMenu';
//within this admin page, we need ability to display any farmer page
//the option to select which farm to view is in AdminNavBar
//get selected farm from AdmiNavBar and use it in Farmer
//to pass data easily, wrap AdminNavBar and Farmer in a Provider

//TODO: order purchase amounts by business total, Item total, amount paid
//TODO: Add date to delivery day
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    paddingLeft: 200,
    paddingTop: 70,
  },
}));

function Admin(authLevel, isAuth) {
  const classes = useStyles();

  const Auth = useContext(AuthContext);
  const [farmID, setFarmID] = useState('');
  const [farmList, setFarmList] = useState([]);
  const [farmDict, setFarmDict] = useState({});
  const [timeChange, setTimeChange] = useState({});
  const [deliveryTime, setDeliveryTime] = useState({});
  const [custID, setCustID] = useState('');
  const [custList, setCustList] = useState([]);
  const [custDict, setCustDict] = useState({});

  const [tab, setTab] = useState(
    Number(localStorage.getItem('farmerTab')) || 0
  );
  const farmName = (() => {
    switch (farmID) {
      case '200-000003':
        return 'Esquivel Farm';
      case '200-000004':
        return 'Resendiz Family';
      case '200-0000016':
        return 'Royal Greens Farms';
      default:
        return null;
    }
  })();
  useEffect(() => {
    if (custID !== '') localStorage.setItem('custID', custID);
  }, [custID]);

  useEffect(() => {
    if (farmID !== '') localStorage.setItem('farmID', farmID);
  }, [farmID]);

  useEffect(() => {
    localStorage.setItem('farmerTab', tab);
  }, [tab]);

  useEffect(() => {
    if (Auth.authLevel >= 2) {
      axios
        .get(process.env.REACT_APP_SERVER_BASE_URI + 'adminCustomerInfo')
        .then((res) => {
          setCustList(
            res.data.result.sort(function (a, b) {
              var textA = a.customer_first_name.toUpperCase();
              var textB = b.customer_first_name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
          );
          setCustID(localStorage.getItem('custID'));

          const _custDict = {};
          for (const cust of res.data.result) {
            _custDict[cust.customer_first_name] = cust.customer_first_name;
          }
          setCustDict(_custDict);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
          console.log(err);
        });
      axios
        .get(process.env.REACT_APP_SERVER_BASE_URI + 'all_businesses')
        .then((res) => {
          setFarmList(
            res.data.result.sort(function (a, b) {
              var textA = a.business_name.toUpperCase();
              var textB = b.business_name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
          );
          // setFarmID(localStorage.getItem('farmID'));
          setFarmID('all');

          const _farmDict = {};
          for (const farm of res.data.result) {
            _farmDict[farm.business_uid] = farm.business_name;
          }
          setFarmDict(_farmDict);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
          console.log(err);
        });
    } else {
      axios
        .get(
          process.env.REACT_APP_SERVER_BASE_URI +
            'Profile/' +
            Cookies.get('customer_uid')
        )
        .then((response) => {
          let customerInfo = response.data.result[0];
          setFarmID(customerInfo.role);
          axios
            .get(process.env.REACT_APP_SERVER_BASE_URI + 'all_businesses')
            .then((res) => {
              const _farmDict = {};
              for (const farm of res.data.result) {
                _farmDict[farm.business_uid] = farm.business_name;
              }
              setFarmDict(_farmDict);
            })
            .catch((err) => {
              if (err.response) {
                console.log(err.response);
              }
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleChangeFarm = (event) => {
    setFarmID(event.target.value);
    console.log(event.target.value);
  };
  const handleCustChange = (event) => {
    setCustID(event.currentTarget.value);
    console.log(event.currentTarget.value);
  };

  return (
    <div className={classes.root}>
      <React.Fragment>
        <AdminFarmContext.Provider
          value={{
            farmID,
            setFarmID,
            custID,
            setCustID,
            custList,
            setCustList,
            custDict,
            setCustDict,
            timeChange,
            setTimeChange,
            deliveryTime,
            setDeliveryTime,
            farmDict,
            farmList,
            setFarmList,
            handleChangeFarm,
            handleCustChange,
          }}
        >
          <AdminNavBarNew />
          <AdminMenu />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/admin">
                <AdminDashboard />
              </Route>

              <Route exact path="/admin/farmerhome">
                <FarmerHome farmID={farmID} farmName={farmName} />
              </Route>
              <Route exact path="/admin/farmerreport">
                <FarmerReport
                  farmID={farmID}
                  deliveryTime={deliveryTime}
                  farmName={farmName}
                />
              </Route>
              <Route exact path="/admin/farmersettings">
                <FarmerSettings farmID={farmID} farmName={farmName} />
              </Route>
              <Route exact path="/admin/farmprofiles">
                <FarmProfiles />
              </Route>
              <Route exact path="/admin/farmorders">
                <FarmOrders />
              </Route>
              <Route exact path="/admin/adminitems">
                <AdminItems />
              </Route>
              <Route exact path="/admin/ordersummary">
                <OrderSummary />
              </Route>
              <Route exact path="/admin/customers">
                <Customers custID={custID} />
              </Route>
            </Switch>
          </div>
        </AdminFarmContext.Provider>
      </React.Fragment>
    </div>
  );
}

export default Admin;
