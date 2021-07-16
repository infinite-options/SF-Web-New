import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
// import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Paper,
} from '@material-ui/core';
import { AuthContext } from '../../auth/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';
import Popover from '@material-ui/core/Popover';
import appColors from '../../styles/AppColors';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E8D1BD',
    padding: '2rem',
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
    color: '#1C6D74',
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
  infoTable: {
    marginLeft: '30px',
    borderCollapse: 'collapse',
  },
  infoRow: {
    borderBottom: '1px solid #747474',
  },
  currUserInf: {
    display: 'flex',
    alignItems: 'center',
  },
  infoTitle: {
    textAlign: 'center',
    font: 'normal normal 600 16px SF Pro Display',
    letterSpacing: '0.25px',
    color: ' #1C6D74',
    opacity: 1,
    padding: '10px 16px',
  },
  desc: {
    textAlign: 'center',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '10px 16px',
  },
  header: {
    textAlign: 'left',
    font: 'normal normal bold 20px/28px SF Pro Display',
    letterSpacing: '0.32px',
    color: '#F5841F',
    opacity: 1,
  },
  paymentTable: { borderCollapse: 'collapse', margin: '10px' },
  paymentHeader: {
    color: 'var(--unnamed-color-000000)',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 600,
    font: 'SF Pro Text',
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
  },
  paymentInfo: {
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'medium',
    font: 'SF Pro Text',
    letterSpacing: ' -0.34px',
    color: '#000000D9',
    opacity: 1,
    borderBottom: ' 1px solid #0000001A',
    opacity: 1,
  },
  td: {
    padding: '10px',
  },
  activePayment: {
    background: ' #1C6D74 0% 0% no-repeat padding-box',
    opacity: 1,
    color: 'white',
  },
  card: {
    borderBottom: '6px solid' + appColors.checkoutSectionBorder,
    marginBottom: '50px',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    textAlign: 'left',
    fontSize: '22px',
    color: appColors.paragraphText,
    marginBottom: '10px',
  },
  delivered: {
    textAlign: 'left',
    fontSize: '16px',
    color: '#136D74',
    marginBottom: '10px',
    fontSize: '20px',
    font: 'SFProText-Semibold',
  },
  date: {
    textAlign: 'left',
    fontSize: '16px',
    color: appColors.paragraphText,
    marginBottom: '10px',
  },
  items: {
    fontSize: '16px',
  },
  total: { fontWeight: 'bold' },
  savingDetails: {
    fontSize: '16px',
    font: 'SFProText-Medium',
  },
  section: {
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  tableRow:{
    borderBottom:'1px solid black'
  },
  buttonRight: {
    textAlign: 'left',
    font: 'normal normal bold 20px/28px SF Pro Text',
    letterSpacing: ' 0px',
    color: '#F5841F',
    opacity: 1,
    textTransform: 'none',
  },
}));

function fetchBusinessInfo(setselectedBusiness, id,setProfit1) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_order_summary_page/2021-06-20,`+id,
    {
      method: 'GET',
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw response;
      }

      return response.json();
    })
    .then((json) => {
      const selectedB = json.result;
      setselectedBusiness(selectedB);
      console.log(selectedB);
      
      let p=0;
      let q=0;
      let numItems=selectedB.length;
    for(let i=0;i<selectedB.length;i++){
      p=p+selectedB[i]['total_revenue']
      q=q+selectedB[i]['quantity']
    }
    console.log(p);
    console.log(q);
  
    setProfit1({
      profit:p,
      num:numItems,
      quantity:q
    })
      
    })
    .catch((error) => {
      console.error(error);
    })
  };

function fetchBusinessPackingInfo(setPacking, id, day) {
    fetch(
      `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_packing_data/`+id+`,`+day,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
  
        return response.json();
      })
      .then((response) => {
        
        console.log("response is ---------",response)
        if (response === 'no data'){
          response = {
            "No data for this delivery date": [
                0,
                0,
                "null",
                "https://s3-us-west-1.amazonaws.com/servingfresh/items/310-000353",
                [
                    0
                ]
            ]}
        }
        setPacking(response);
        
        
       
    
      
        
      })
      .catch((error) => {
        console.error(error);
      })
    };
  
function FarmOrders() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  useEffect(() => {
    farmerObj();
  }, []);
  let [farmerInfo, setfarmerInfo] = useState([]);
  let [busiSelect, setBusiSelect] = useState([]);
  let [SelectedBusiness, setselectedBusiness] = useState([]);
  let [profit1, setProfit1] = useState([]);
  let [packing, setPacking] = useState({});
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

  const farmerObj = async () => {
    await axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
      )
      .then((response) => {
        console.log(response);
        setfarmerInfo(response.data.result.result);
      });
  };
  
  console.log(profit1)
  console.log(farmerInfo)
  const farm = () => {
    if (Auth.authLevel >= 2) {
      return (
        <Grid lg={12} className={classes.usrInfo}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tr}>
              
                <td className={classes.usrTitle}>Business Name</td>
                <td className={classes.usrTitle}>City</td>
                <td className={classes.usrTitle}>Business Id</td>
                <td className={classes.usrTitle}> Business Zip</td>
                <td className={classes.usrTitle}>Phone</td>
                <td className={classes.usrTitle}>Business Image</td>
              </tr>
            </thead>
            {farmerInfo.map((profile) => (
              <tbody>
                <tr
                  key={profile.business_uid}
                  className={classes.tr}
                  style={{ cursor: 'pointer' }}
                  onClick={()=>{
                    setBusiSelect(profile);
                    fetchBusinessInfo(setselectedBusiness,profile.business_uid,setProfit1);
                    fetchBusinessPackingInfo(setPacking,profile.business_uid)
                    
                  }}
                  
                 
                >
                  <td className={classes.usrDesc}>
                    {profile.business_name}&nbsp;
                    
                  </td>
                  <td className={classes.usrDesc}>{profile.business_city}</td>
                  <td className={classes.usrDesc}>{profile.business_uid}</td>
                  
                  <td className={classes.usrDesc}>
                    {profile.business_zip},&nbsp;
                    
                  </td>
                  <td className={classes.usrDesc}>{profile.business_phone_num}</td>
                  <td><img style={{height:'40px'}}src={profile.business_image}></img></td>

                </tr>
              </tbody>
            ))}
          </table>
        </Grid>
      );
    }
  };



const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;

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
        <div >
        <Box style={{float:'left'}}>
         <img style={{height:'125px',float:'left',margin:'20px'}}src={busiSelect.business_image}></img>
         <div style={{float:'left'}}>
         <h2 style={{marginTop:'50px',color:'#1C6D74'}}>{busiSelect.business_name}</h2>
         <h5 style={{marginTop:'5px',color:'#1C6D74',textDecoration:'underline'}}>Send message</h5>
         </div>
         </Box>
          <Box  style={{float:'left',marginLeft:'20px',marginTop:'30px'}}>
          <IconButton
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
           style={{margin:'15%',}}
          >
            <img src={CustomerSrc} alt="user pic" style={{}} />
          </IconButton>
          </Box>
          <Box>
          <div style={{float:'right',margin:'20px',color:'#1C6D74'}}>
            <h5>Revenue from farm</h5>
            <p style={{color:'black',fontWeight:'bolder',fontSize:'25px'}}>$ {profit1.profit}</p>
            </div>
            <div style={{float:'right',margin:'20px',color:'#1C6D74'}}>
              <h5>Total no. Orders</h5>
            <p style={{color:'black',fontWeight:'bolder',fontSize:'25px'}}>{profit1.num}</p>
            </div>
            
            <div style={{float:'right',margin:'20px',color:'#1C6D74'}}>
            <h5>Number of items</h5>
            <p style={{color:'black',fontWeight:'bolder',fontSize:'25px'}}>{profit1.quantity}</p>
            </div>
            <div><DayPickerInput
                          placeholder={deliveryDate}
                          value={deliveryDate}
                          format="MM/DD/YYYY"
                          onDayChange={handleDeliveryDate}/>
            </div>
          </Box>
          
        </div>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 600, left: 600 }}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            style={{ borderRadius: '20px' }}
          >
            {farm()}
          </Popover>
        
      </Grid>

      <Box
                style={{
                  width:'48%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: '1rem',
                  display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          borderRadius: '20px',
          opacity: 1,
                }}
              >
                <div style={{marginLeft:'3rem',textAlign:'left',color:'#F5841F'}}><h2 >Upcoming Order</h2></div>
                {<table>
                  <thead>
                    <tr>
                      <td className={classes.infoTitle}>Name</td>
                      <td className={classes.infoTitle}>Picture </td>
                      <td className={classes.infoTitle}>Unit</td>
                      <td className={classes.infoTitle}>Packing</td>
                      
                    </tr>
                  </thead>
                  {console.log("IN RENDER ",packing)}
                  {Object.entries(packing).map(([key,vals]) => (
                    <tbody>
                      <tr>
                        <td className={classes.desc}>
                          {key}
                        </td>
                        <td className={classes.desc}>
                         <img style={{height:'50px'}}src= {vals[3]}></img>
                        </td>
                        <td className={classes.desc}>{vals[2]}</td>
                        {console.log("valsss",vals,vals[4])}
                        { vals[4].map((numbs) => (
                            <td className={classes.desc}>{numbs} </td>
                        )
                        )}
                        
                        
                      </tr>
                    </tbody>
                  ))}
                </table>}
              </Box>


      <Box
                style={{
                  width:'48%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: '1rem',
                  display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          borderRadius: '20px',
          opacity: 1,
                }}
              >
                <div style={{marginLeft:'3rem',textAlign:'left',color:'#F5841F'}}><h2 >Upcoming Revenue</h2></div>
                <table className={classes.infoTable}>
                  <thead>
                    <tr className={classes.infoRow}>
                      <td className={classes.infoTitle}>Name</td>
                      <td className={classes.infoTitle}>Picture </td>
                      <td className={classes.infoTitle}>Unit</td>
                      <td className={classes.infoTitle}>Cost Price</td>
                      <td className={classes.infoTitle}>Quantity</td>
                      <td className={classes.infoTitle}>Farm Revenue</td>
                    </tr>
                  </thead>
                  {SelectedBusiness.map((info) => (
                    <tbody>
                      <tr className={classes.infoRow}>
                        <td className={classes.desc}>
                          {info.name}
                        </td>
                        <td className={classes.desc}>
                         <img style={{height:'50px'}}src= {info.img}></img>
                        </td>
                        <td className={classes.desc}>{info.unit}</td>
                        <td className={classes.desc}>
                          $ {info.price}
                        </td>
                        <td className={classes.desc}>{info.quantity} </td>
                        <td className={classes.desc}>$ {info.total_revenue}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Box>
      
              
        
      
    </Grid>
  </div>
);
}

export default FarmOrders;