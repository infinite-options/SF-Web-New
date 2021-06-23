import React, {useState,useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

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
  
  original: {
    color: "orange"
  },

  replacement: {
    color: "purple"
  },
  
}));

function OrderSummary() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [farm, setFarm] = useState();
  const [produce, setProduce] = useState();
  const [deliveryDate, setDeliveryDate] = useState('2021-06-20')
  
  
  const handleToClose = value => () => {
    console.log("in close",value)
    if (value === "yes"){
      //call endpoint
      console.log("endpoint called for ",farm,produce)
      fetch('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/replace_produce_admin/'+String(farm)+','+String(produce)+','+String(deliveryDate), {
      method: 'GET',
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
  
          return response.json();
        })
        .then((json) => {
          console.log('farm replaced')
          
        })
        .catch((error) => {
          console.error(error);
        })

    }


    setOpen(false);

  };
  
  
  useEffect(() => {
    fetch('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/order_summary_page/'+deliveryDate, {
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
  
  const handleChangeFarm = (event) => {
    console.log(event)
    const { myValue } = event.currentTarget.dataset;
    setFarm(event.target.value)
    setProduce(myValue)
    setOpen(true)
    
  };
  
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
              <tbody>
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
                        <td className={classes.usrDesc}>
                         
                            <Select
                              defaultValue={orderVal.business_name}
                              onChange={handleChangeFarm}
                              
                            >
                              
                                {(orderVal.farms.split(",").slice(0,-1)).map((item,index) => {
                                  return (
                                    <MenuItem className={item===orderVal.business_name? classes.original:classes.replacement} 
                                              key={index} 
                                              value={item}
                                              data-my-value={orderVal.name}>
                                      {item}
                                  </MenuItem>
                                        );
                                })}
                            </Select>  
                        </td>

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
              </tbody>
              </table>
              </div>
            </Grid>
          
          </Grid>
          
          <div>
            <Dialog open={open} onClose={handleToClose("no")}>
              <DialogTitle>{"Caution!!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  If you click Okay then farm will change for the selected produce
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleToClose("yes")}
                        
                        color="primary" autoFocus>
                  Okay
                </Button>
                <Button onClick={handleToClose("no")} 
                        
                        color="primary" autoFocus>
                  Cancel
                </Button>
              </DialogActions>
        </Dialog>
          </div>

        </div>
      );
    }
  

export default OrderSummary;
