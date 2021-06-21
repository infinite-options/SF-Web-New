import React, { useContext, useState,useEffect } from 'react';
import moment from 'moment';
import { AuthContext } from '../../auth/AuthContext';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';
import { AdminFarmContext } from './AdminFarmContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BCCDCE',
    padding: '20px',
  },
  usrInfo: {
    display: 'flex',
    backgroundColor: '#E8D1BD',
    borderRadius: '20px',
    width: 'auto',
    height: '345px',
    overflowY: 'scroll',
  },
  currUserPic: {
    margin: '1rem',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  usrTitle: {
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    color: '#00000',
    opacity: 1,
    justifyContent: 'start',
    padding: '10px',
  },
  usrDesc: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
  },
  table: {
    marginLeft: '40px',
    borderCollapse: 'collapse',
  },
  
}));




function OrderSummary() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [color, setColor] = useState([]);
  //test
  useEffect(() => {
    fetch('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/order_summary_page/2021-06-20', {
      method: 'GET',
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
  
          return response.json();
        })
        .then((json) => {
          setOrders(json.result);
          
        })
        .catch((error) => {
          console.error(error);
        })
      },[])
 
  return (
        <div className={classes.root}>
          <Grid container>
            <Grid
              lg={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1rem',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                borderRadius: '20px',
                opacity: 1,
              }}
            >
              Dates and revenue
              
            </Grid>

            <Grid
              lg={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1rem',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                borderRadius: '20px',
                opacity: 1,
              }}
            >
              <div
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                letterSpacing: '0.32px',
                color: '#F5841F',
                opacity: 1,
                margin: '1rem',
              }}> 
                Upcoming Orders
              </div>
              <div
              style={{
                marginTop: '1rem',
              }}> 
              <table className={classes.table}>
                    <tr className={classes.tr}>
                      <td className={classes.usrTitle}>Name</td>
                      <td className={classes.usrTitle}>Picture</td>
                      <td className={classes.usrTitle}>Unit</td>
                      <td className={classes.usrTitle}>Farm Name </td>
                      <td className={classes.usrTitle}>Suppliers</td>
                      <td className={classes.usrTitle}>Cost Price</td>
                      <td className={classes.usrTitle}>Sales Price</td>
                      <td className={classes.usrTitle}>Profit</td>
                      <td className={classes.usrTitle}>Quantity</td>
                      <td className={classes.usrTitle}>Total Revenue</td>
                      <td className={classes.usrTitle}>Total Profit</td>
                    </tr>

                    {orders.map((orderVal) => (

                      <tr className={classes.tr}>
                        <td className={classes.usrDesc}>{orderVal.name}</td>
                        <td className={classes.usrDesc}>
                          <img src={orderVal.img} 
                                alt="" height="50" width="50">
                          </img>
                        </td>
                        <td className={classes.usrDesc}>{orderVal.unit}</td>
                        <td className={classes.usrDesc}>{orderVal.business_name} </td>
                        <td className={classes.usrDesc}>{orderVal.farms.split(",")[orderVal.farms.split(",").length-1]}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.business_price).toFixed(2)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.price).toFixed(2)}</td>
                        
                        <td className={classes.usrDesc} >
                        ${Number(orderVal.profit).toFixed(2)}
                        </td>
                        <td className={classes.usrDesc}>{Number(orderVal.quantity).toFixed(2)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.total_revenue).toFixed(2)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.total_profit).toFixed(2)}</td>
                      </tr>
                      ))}

              </table>
              </div>
            </Grid>
          
          </Grid>
        </div>
      );
    }
  

export default OrderSummary;
