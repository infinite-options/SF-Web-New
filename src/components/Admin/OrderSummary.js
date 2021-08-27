import React, {useState,useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import axios from 'axios';



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
  usrTitleLine: {
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    color: '#00000',
    opacity: 1,
    justifyContent: 'start',
    padding: '10px',
    borderRight:'1px solid #0000001A',
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
  usrDescLine: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
    borderRight:'1px solid #0000001A',
  },
  table: {
    marginLeft: '40px',
    marginRight:'5px',
    borderCollapse: 'collapse',
  },
  tr:{
    borderBottom: '1px solid #0000001A'
  },
  
  
  original: {
    color: "orange"
  },

  replacement: {
    color: "purple"
  },

  posProfit: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
    color: 'green',
  },

  negProfit: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    color: '#1C6D74',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
    color: 'red',
  },

  leftHalf: {
    // postion:"absolute",
    left: "0px",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    display:"flex",
    fontSize:"1.5rem",
    fontWeight:"bold",
  },

  rightHalf: {
    // postion:"absolute",
    right: "0px",
    width: "70%",
  },
  
}));

function OrderSummary() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [farm, setFarm] = useState();
  const [produce, setProduce] = useState();
  
  const [deliveryDate, setDeliveryDate] = useState(() => { 
    let currDate = moment().format('YYYY-MM-DD')
    let wedDate = moment().isoWeekday(3).format('YYYY-MM-DD')
    let sunDate = moment().clone().add(1, 'weeks').startOf('week').format('YYYY-MM-DD')
    let resDate = ''
    if (currDate > wedDate){
      resDate = sunDate
    }  
    else{
      resDate = wedDate
    }
    return (resDate) 
  })
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [globalProfit,setGlobalProfit] = useState(0);
  const [globalOrders,setGlobalOrders] = useState(0);
  const [globalRevenueSF,setGlobalRevenueSF] = useState(0);
  const [globalRevenueFarm,setGlobalRevenueFarm] = useState(0);
  
  const handleToClose = value => () => {
      console.log("in close",value)
      if (value === "yes"){
        //call endpoint
        //console.log("endpoint called for ",farm,produce)
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
            //console.log('farm replaced')
            
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

              if(json.code!=280){
                json['result'] = []
              }
              let temp_qty = 0
              let temp_rev = 0
              let temp_prof = 0
              let temp_cost = 0

              let temp_json = []
              for (const vals of json.result){
                
                temp_qty = temp_qty + Number(vals['quantity']?vals['quantity']:0)
                temp_rev = temp_rev + Number(vals['total_revenue']?vals['total_revenue']:0)
                temp_prof = temp_prof + Number(vals['total_profit']?vals['total_profit']:0)
                temp_cost = temp_cost + Number(vals['total_cp']?vals['total_cp']:0)
                
                for (const [key, value] of Object.entries(vals)){
                  if (key === "farms"){vals[key]=value?value:"No Business,No Business,0"}
                  if (key === "business_price"||key === "price"||key === "profit"||key === "quantity"||key === "total_profit"||key === "total_revenue"){vals[key]=value?value:0}
                }
                temp_json.push(vals)
                
              }
              setTotalQuantity(Number(temp_qty))
              setTotalRevenue(Number(temp_rev).toFixed(2))
              setTotalProfit(Number(temp_prof).toFixed(2))
              setTotalCost(Number(temp_cost).toFixed(2))
              json.result = temp_json
              //console.log("@#",json.result)
              setOrders(json.result);
            })
            .catch((error) => {
              console.error(error);
            })
          },[deliveryDate])
      
  useEffect(() => {
    fetch('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/total_revenue_profit', {
          method: 'GET',
        })
            .then((response) => {
              if (!response.ok) {
                throw response;
              }
      
              return response.json();
            })
            .then((json) => {
              console.log("revenue stream ",json)
              setGlobalOrders(Number(json.result[0]['total_orders']).toFixed(2))
              setGlobalProfit(Number(json.result[0]['total_profit']).toFixed(2))
              setGlobalRevenueSF(Number(json.result[0]['total_revenue']).toFixed(2))
              setGlobalRevenueFarm(Number(json.result[0]['total_bus_revenue']).toFixed(2))
              

            })
            .catch((error) => {
              console.error(error);
            })
          }, [])

  const handleChangeFarm = (event) => {
    
    //const { myValue } = event.currentTarget.dataset;
    // console.log("hello",event.target.value.split(",")[0],event.target.value.split(",")[1])
    setFarm(event.target.value.split(",")[0])
    setProduce(event.target.value.split(",")[1])
    // setFarm(event.target.value)
    // setProduce(myValue)
    setOpen(true)
    
  };

  const handleTestClick = () => {

    // axios
    //   .get('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/email_info/parva.shah808@gmail.com',
    //   {
    //     auth: {
    //       username: 'parva.shah808@gmail.com',
    //       password: 'parva.shah808@gmail.com' // Bad password
    //   }})
    //   .then((res) => {
    //     console.log('testing perfect',res);
        
    //   })
    //   .catch((err) => {
    //     if(err.response) {
    //       console.log('testing perfect',err.response);
    //     }
    //     console.log('testing perfect',err);
    //   })
    var username = "parva.shah808@gmail.comm"
    var password = "parva.shah808@gmail.com"
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + window.btoa(username+":"+password));
    
    fetch('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/email_info/parva.shah808@gmail.com', {
          method: 'GET',
          headers: headers,
          
        })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
  
          return response.json();
        })
            
            .then((json) => {
              console.log("fetch working! ",json)
              
            })
            .catch((error) => {
              console.error("fetch working! ",error);
            })

  };
  
  const handleDeliveryDate = (day) => {
    let tmp_ip_day = day.toLocaleDateString().split('/');
    let ip_day = [tmp_ip_day[2], tmp_ip_day[0], tmp_ip_day[1]];
    let res_day = '';
    let i = 0;
    for (i = 0; i < ip_day.length; i++) {
      if (ip_day[i].length === 1) {
        res_day += '0' + ip_day[i] + '-';
      } else {
        res_day += ip_day[i] + '-';
      }
    }
    //console.log(res_day);
    res_day = res_day.slice(0, -1);
    setDeliveryDate(res_day);
    //console.log(ip_day);
  };
  
  return (
        <div className={classes.root}>
          <Grid container >
            <Grid 
              lg={12}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '1rem',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                borderRadius: '20px',
                opacity: 1,
              }}
            >
              <div className={classes.leftHalf} style={{color:'#1C6D74',textAlign:'center'}}>All Orders</div>

              <div className={classes.rightHalf} >
              
                  <table className={classes.table}>
                  <tbody>
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Total no. of Orders</td>
                      <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Total Revenue</td>
                      <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Revenue for Farms</td>
                      <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Revenue for SF</td>
                      <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Select Delivery Date</td>
                      {/* <td className={classes.usrTitle} style={{color:'#1C6D74'}}>Test Button</td> */}
                    </tr>
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle}>#{globalOrders}</td>
                      <td className={classes.usrTitle}>${globalRevenueSF}</td>
                      <td className={classes.usrTitle}>${globalRevenueFarm}</td>
                      <td className={classes.usrTitle}>${globalProfit}</td>
                      <td className={classes.usrTitle}><DayPickerInput
                          placeholder={deliveryDate}
                          value={deliveryDate}
                          format="MM/DD/YYYY"
                          onDayChange={handleDeliveryDate}/>
                      </td>
                      {/* <td className={classes.usrTitle}>
                      <Button
                        onClick = {handleTestClick}
                      >
                        Save Changes
                      </Button>
                      </td> */}
                      
                    </tr>
                    </tbody>
                  </table>
                
                
              </div>
              
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
                fontSize: '1.5rem',
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
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}>#{totalQuantity}</td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}></td>
                      <td className={classes.usrTitle}>${totalCost}</td>
                      <td className={classes.usrTitle}>${totalRevenue}</td>
                      <td className={classes.usrTitle}>${totalProfit}</td>
                    </tr>
                    
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle}>Name</td>
                      <td className={classes.usrTitle}>Picture</td>
                      <td className={classes.usrTitle}>Unit</td>
                      <td className={classes.usrTitle}>Farm Name </td>
                      <td className={classes.usrTitleLine}>Suppliers</td>
                      <td className={classes.usrTitle}>Quantity</td>
                      <td className={classes.usrTitle}>Cost Price</td>
                      <td className={classes.usrTitle}>Sales Price</td>
                      <td className={classes.usrTitle}>Profit</td>
                      <td className={classes.usrTitle}>Total Cost Price</td>
                      <td className={classes.usrTitle}>Total Revenue</td>
                      <td className={classes.usrTitle}>Total Profit</td>
                    </tr>
                  { orders.map((orderVal) => (
        
                      <tr className={classes.tr}>
                        <td className={classes.usrDesc}>{orderVal.name}</td>
                        <td className={classes.usrDesc}>
                          <img src={orderVal.img} 
                                alt="" height="50" width="50">
                          </img>
                        </td>
                        <td className={classes.usrDesc}>{orderVal.unit}</td>
                        <td className={classes.usrDesc}>

                          <select style={{border:'0px',textAlign:'center',width:"auto"}} onChange={handleChangeFarm}>
                            {(orderVal.farms.split(",").slice(0,-1)).map((item,index) => {
                                    return (
                                      <option 
                                      selected = {item===orderVal.business_name?"selected":""}
                                      className={item===orderVal.business_name? classes.original:classes.replacement} 
                                                key={index} 
                                                value={item+','+orderVal.name}
                                                
                                                >
                                        {item}
                                    </option>
                                          );
                                  })}
                          </select>
                        
                        
                            {/* <Select
                              defaultValue={
                                () => {
                                var temp = '';
                                orderVal.farms.split(",").slice(0,-1).map((item) =>{if(item===orderVal.business_name){temp=item}})
                                return (temp)
                              }}
                               onChange={handleChangeFarm}
                            >
                                
                                {(orderVal.farms.split(",").slice(0,-1)).map((item,index) => {
                                  return (
                                    <MenuItem 
                                    className={item===orderVal.business_name? classes.original:classes.replacement} 
                                    key={index} 
                                    value={item}
                                    data-my-value={orderVal.name}
                                    selected={item===orderVal.business_name}>
                                      {item}
                                  </MenuItem>
                                        );
                                })}
                            </Select> */}
                           
                        </td>
                
                        <td className={classes.usrDescLine}>{orderVal.farms.split(",")[orderVal.farms.split(",").length-1]}</td>
                        <td className={classes.usrDesc}>{Number(orderVal.quantity)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.business_price).toFixed(2)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.price).toFixed(2)}</td>
                        <td className = {Number(orderVal.profit)>=0? classes.posProfit:classes.negProfit} >{Number(orderVal.profit)>=0?"":"-"}${Number(orderVal.profit).toFixed(2)}</td>
                        <td className={classes.usrDesc}>${Number(orderVal.total_cp).toFixed(2)}</td>
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
                  If you click Okay then <b>{produce}</b> will have <b>{farm}</b> as it's business for delivery date <b>{deliveryDate}</b>
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
