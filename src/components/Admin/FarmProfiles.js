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
import { Radio } from '@material-ui/icons';
import save from '../icon/save.png';
import del from '../icon/delete.png';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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
    padding: '10px 11px',
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



function FarmProfiles() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  useEffect(() => {
    farmerObj();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);
  let [farmerInfo, setfarmerInfo] = useState([]);
  let [busiSelect, setBusiSelect] = useState([]);
  let [SelectedBusiness, setselectedBusiness] = useState([]);
  let [businessProfile, setbusinessProfile] = useState([]);
  let [profit1, setProfit1] = useState([]);
  let [products, setProducts] = useState([]);
  let [selectedProduct, setSelectedProduct] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);


  const fetchProducts= async (id)=>{
    setProducts([])
    await axios.get(
      'http://127.0.0.1:4000/api/v2/admin_farmer_items/'+id
    ).then(response => {
      console.log(response.data.result.result);
      setProducts(response.data.result.result);
      // setbusinessProfile(response.data.result[0]);
      // console.log(businessProfile);

    })
  }


  const handleNameChange=(e)=>{
    setSelectedProduct({
      ...selectedProduct,
      item_name:e.target.value
    });
    console.log(selectedProduct);
  }
  const handlePriceChange=(e)=>{
    setSelectedProduct({
      ...selectedProduct,
      item_price:e.target.value
    });
    console.log(selectedProduct);
  }
  const handleStatusChange=(e)=>{
    setSelectedProduct({
      ...selectedProduct,
      item_status:e.target.value
    });
    console.log(selectedProduct);
  }
  const handleDescChange=(e)=>{
    setSelectedProduct({
      ...selectedProduct,
      item_desc:e.target.value
    });
    console.log(selectedProduct);
  }
  
  const handleSave=async (id,action )=>{
    console.log(id,action);
    console.log(selectedProduct); 
    await axios.post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_item_admin/'+action,selectedProduct)
    .then((response) => {
      setDialogOpen(true)
    })
    .catch((er) => {
      console.log(er);
    });
  }



  const fetchFarmProfile= async (id)=>{
    await axios.post(
      'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/Get',{business_uid: id}
    ).then(response => {
      console.log(response.data.result[0]);
      setbusinessProfile(response.data.result[0]);
      console.log(businessProfile);

    })
    
    //   if (!response.ok) {
    //     throw response;
    //   }

    //   return response.json();
    // })
    // .then((json) => {
    //   console.log(json);
      
    // })
    // .catch((error) => {
    //   console.error(error);
    // })
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
                    fetchFarmProfile(profile.business_uid);
                    fetchProducts(profile.business_uid);
                    
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
                  width:'770px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: '0rem',
                  display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          background: '#FFFFFF 0% 0% no-repeat padding-box',
          borderRadius: '20px',
          opacity: 1,
                }}
              >
                <div style={{marginLeft:'3rem',textAlign:'left'}}><h2 style={{color:'#F5841F'}}>Produce Offered</h2>
                <div>
                  <table >
                    <thead>
                      <td className={classes.desc}>Name</td>
                      <td className={classes.desc}>Picture</td>
                      <td className={classes.desc}>Units</td>
                      <td className={classes.desc}>Cost Price</td>
                      <td className={classes.desc}>Item Description</td>
                      <td className={classes.desc}>Status</td>
                      <td className={classes.desc}></td>
                    </thead>
                    {products.map((info) => (
                    <tbody key={info.business_uid} >
                      <tr className={classes.infoRow} onClick={()=>setSelectedProduct(info)}>
                        <td className={classes.desc}>
                         <input id='name' type="text" defaultValue={info.item_name} style={{width:'100px'}} onChange={handleNameChange}/> 
                        </td>
                        <td className={classes.desc}>
                         <img style={{height:'50px'}}src= {info.item_photo}></img>
                        </td>
                        <td className={classes.desc}>
                         <p style={{height:'50px'}} > {info.item_unit}</p>
                        </td>
                        <td className={classes.desc}>
                          <input id="price" type="text" defaultValue={info.item_price} style={{width:'30px'}} onChange={handlePriceChange}/></td>
                        <td className={classes.desc}>
                           <input type="text" defaultValue={info.item_desc} style={{width:'70px'}} onChange={handleDescChange}/>
                        </td>
                        <td className={classes.desc}>
                           <input id="status" type="text" defaultValue={info.item_status} style={{width:'50px'}} onChange={handleStatusChange}/>
                        </td>
                        <td className={classes.desc}>
                        <img style={{width:'18px', marginRight:'5px'}} src={save} onClick={()=>handleSave(info.item_uid,"update")} id="update"></img>
                           <img style={{width:'15px'}} src={del} onClick={()=>handleSave(info.item_uid,"delete")} id="delete"></img>
                        </td>
                        {/* <td className={classes.desc}>{info.quantity} </td>
                        <td className={classes.desc}>$ {info.total_revenue}</td> */}
                      </tr>
                    </tbody>
                  ))}
                  </table>
                  </div>
                </div>
              </Box>
      
              <Box
                style={{
                  width:'850px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1rem',
                  background: '#FFFFFF 0% 0% no-repeat padding-box',
                  borderRadius: '20px',
                  opacity: 1,
                 
                }}
              >
                <Box style={{}}>
                <h2 style={{textAlign:'left',marginLeft:'1rem',color:'#FF8500'}}>Farm profile</h2>
                <Box style={{marginLeft:'1rem',textAlign:'left',width:'45%',float:'left'}}>
                <p>Business Name</p>
                  <input type="text" defaultValue={businessProfile.business_name}></input>
                  <p>Description</p>
                  <textarea  defaultValue={businessProfile.business_desc}></textarea>
                  <p>Business Rep First Name</p>
                  <input type="text" defaultValue={businessProfile.business_contact_first_name}></input>
                  <p>Business Rep Last Name</p>
                  <input type="text" defaultValue={businessProfile.business_contact_last_name}></input>
                  <p>Business Rep Phone Number</p>
                  <input type="text" defaultValue={businessProfile.business_phone_num}></input>
                 
                  <h3>Farm Details</h3>
                  <p>Street</p>
                  <input type="text" defaultValue={businessProfile.business_address}></input>
                  <p>Farm City</p>
                  <input type="text" defaultValue={businessProfile.business_city}></input>
                  <p>State</p>
                  <input type="text" defaultValue={businessProfile.business_state}></input>
                  <p>Zip</p>
                  <input type="text" defaultValue={businessProfile.business_zip}></input>
                  
                  {/* <div>
                    <p>Description</p>
                  <textarea  defaultValue={businessProfile.business_desc}></textarea>
                  </div>
                  <div>
                    <p>Business Rep First Name</p>
                  <input type="text" defaultValue={businessProfile.business_contact_first_name}></input>
                  </div>
                  <div>
                    <p>Business Rep Last Name</p>
                  <input type="text" defaultValue={businessProfile.business_contact_last_name}></input>
                  </div>
                  <div>
                    <p>Business Rep Phone Number</p>
                  <input type="text" defaultValue={businessProfile.business_phone_num}></input>
                  </div>
                  <h3>Farm Details</h3>
                  <div>
                    <p>Street</p>
                  <input type="text" defaultValue={businessProfile.business_address}></input>
                  </div>
                  <div>
                    <p>Farm City</p>
                  <input type="text" defaultValue={businessProfile.business_city}></input>
                  </div>
                  <div>
                    <div style={{float:'left' ,marginRight:'10px'}}>
                    <p>State</p>
                  <input type="text" defaultValue={businessProfile.business_state}></input>
                  </div>
                  <div style={{float:'left'}}>
                    <p>Zip</p>
                  <input type="text" defaultValue={businessProfile.business_zip}></input>
                  </div>
                  </div> */}
                  
                  </Box>
                  <Box style={{marginLeft:'3rem',textAlign:'left',width:'25%',float:'left'}}>

                  <h3>Delivery Zones</h3>
                  <select></select>
                  <h3 style={{color:'#F5841F'}}>Add a Zone</h3>
                  <h3>Days of Delivery</h3>
                  <p>Wednesday (10am to 1pm)</p>
                  <p>Saturday (10 am to 1pm)</p>
                  <h3>Delivery Strategy</h3>
                  <input type="radio"/>Pickup at Farmer’s Market
                  <input type="radio"/>Deliver to Customer
                  <h3>Storage</h3>
                  <input type="radio"/>Reusble<br/>
                  <input type="radio"/>Disposable
                  <h3>Cancellation</h3>
                  <input type="radio"/>Allow cancellation within ordering hours<br/>
                  <input type="radio"/>Cancellations not allowed




                  </Box>
               

                  


                


                

              </Box>
              </Box>
        
      
    </Grid>
    <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
              <DialogTitle>{"Successful!!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Produce has been updated
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button 
                onClick={()=>setDialogOpen(false)}
                        
                        color="primary" autoFocus>
                  Okay
                </Button>
                
              </DialogActions>
            </Dialog>
  </div>
);
}

export default FarmProfiles;