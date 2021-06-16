import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import AdminNavBarNew from './AdminNavBarNew';
import Farmer from '../Farm/Farmer';
import { AdminFarmContext } from './AdminFarmContext';
import { AuthContext } from '../../auth/AuthContext';
import AdminDashboard from './AdminDashboard';
import FarmerHome from '../Farm/FarmerHome';
import FarmerReport from '../Farm/FarmerReport';
import FarmerSettings from '../Farm/FarmerSettings';
import FarmProfiles from './FarmProfiles';
import FarmOrders from './FarmOrders';
import Items from './Items';
import Customers from './Customers';
import OrderSummary from './OrderSummary';
//within this admin page, we need ability to display any farmer page
//the option to select which farm to view is in AdminNavBar
//get selected farm from AdmiNavBar and use it in Farmer
//to pass data easily, wrap AdminNavBar and Farmer in a Provider

//TODO: order purchase amounts by business total, Item total, amount paid
//TODO: Add date to delivery day
function Admin(authLevel, isAuth) {
  const Auth = useContext(AuthContext);
  const [farmID, setFarmID] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [farmList, setFarmList] = useState([]);
  const [farmDict, setFarmDict] = useState({});
  const [timeChange, setTimeChange] = useState({});
  const [deliveryTime, setDeliveryTime] = useState({});

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
    if (farmID !== '') localStorage.setItem('farmID', farmID);
  }, [farmID]);

  useEffect(() => {
    localStorage.setItem('farmerTab', tab);
  }, [tab]);

  useEffect(() => {
    if (Auth.authLevel >= 2) {
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
  };
  return (
    <React.Fragment>
      <AdminFarmContext.Provider
        value={{
          showNav,
          setShowNav,
          farmID,
          setFarmID,
          timeChange,
          setTimeChange,
          deliveryTime,
          setDeliveryTime,
          farmDict,
          farmList,
          setFarmList,
          handleChangeFarm,
        }}
      >
        <AdminNavBarNew />
        {/* {Auth.authLevel >= 1 && <Farmer tab={tab} />} */}
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
          <Route exact path="/admin/items">
            <Items />
          </Route>
          <Route exact path="/admin/ordersummary">
            <OrderSummary />
          </Route>
          <Route exact path="/admin/customers">
            <Customers />
          </Route>
        </Switch>
      </AdminFarmContext.Provider>
    </React.Fragment>
  );
}

export default Admin;
