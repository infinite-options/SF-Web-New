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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';


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

  input: {
    width: "10%",
  },
  
}));

function OrderSummary() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [farm, setFarm] = useState();
  const [allProduce, setAllProduce] = useState([]);
  const [produceDict, setProduceDict] = useState({});


  useEffect(() => {
      fetchProduceInfo();
      
  }, []);

  
  const fetchProduceInfo = () => {
    axios
      .get('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/admin_items')
      .then((res) => {
        setAllProduce(res.data.result)
        const temp_dict = {}
        res.data.result.map((item) => (
            temp_dict[item.item_uid] = String(item.farms[0][2])+","+String(item.farms[0][3])
          )
              
        )

      setProduceDict(temp_dict)
      console.log("dict is ",temp_dict)
        
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };
 
  const handleFarmChange = (e) => {
    
    let prodUID = e.target.value.split(",")[0]
    let prodPriceStatus = e.target.value.split(",")[1]+","+e.target.value.split(",")[2]
    setProduceDict(prevState => ({
      ...prevState,
      [prodUID]: prodPriceStatus
  }))
    
  };
  
  
  return (
        <div className={classes.root}>
          <Grid container >
            

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
                Produce Offered
                  
                  
              </div>
              <div
              style={{
                marginTop: '1rem',
              }}> 
              <table className={classes.table}>
                
              <tbody>
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle}>Name</td>
                      <td className={classes.usrTitle}>Photo</td>
                      {/* <td className={classes.usrTitle}>Info</td> */}
                      <td className={classes.usrTitle}>Type</td>
                      <td className={classes.usrTitle}>Description</td>
                      <td className={classes.usrTitle}>Unit </td>
                      <td className={classes.usrTitle}>Item Price</td>
                      <td className={classes.usrTitle}>Size</td>
                      <td className={classes.usrTitle}>Taxable</td>
                      <td className={classes.usrTitle}>Display</td>
                      <td className={classes.usrTitle}>Suppliers</td>
                      <td className={classes.usrTitle}>Primary Farm</td>
                      <td className={classes.usrTitle}>Farm Price</td>
                      <td className={classes.usrTitle}>Status</td>
                      <td className={classes.usrTitle}>Actions</td>
                    </tr>

                  { allProduce.map((produceVal) => (
        
                      <tr className={classes.tr}>
                        
                        <td><input type="text" id="fname" name="fname" style={{width:"80%"}} value={produceVal.item_name}/></td>
                        <td className={classes.usrDesc}>
                            <img src={produceVal.item_photo} 
                                 alt="" height="50" width="50">
                           </img>
                        </td>
                        {/* <td><input type="text" id="fname" name="fname"  value={produceVal.item_info}/></td> */}
                        <td><input type="text" id="fname" name="fname" style={{width:"80%"}} defaultValue={produceVal.item_type} /></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"50%"}} defaultValue={produceVal.item_desc}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"50%"}} defaultValue={produceVal.item_unit}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"40%"}} defaultValue={"$"+String(produceVal.item_price)}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"50%"}} defaultValue={produceVal.item_sizes}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"50%"}} defaultValue={produceVal.taxable}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"40%"}} defaultValue={produceVal.item_display}/></td>
                        <td className={classes.usrDesc}>{produceVal.farms.length}</td>
                        
                        <td className={classes.usrDesc}>

                          <select style={{border:'0px',textAlign:'center',width:"auto"}} 
                                  onChange={handleFarmChange}
                                  >
                            {produceVal.farms.map((item,index) => (
                                    
                                      <option 
                                      // selected = {item===produceVal.business_name?"selected":""}
                                      // className={item===produceVal.business_name? classes.original:classes.replacement} 
                                                key={index} 
                                                value={produceVal.item_uid+","+item[2]+","+String(item[3])}
                                                >
                                        {item[item.length-1]}
                                    </option>
                                          
                            ))}
                          </select>
                        </td>
                        <td><input type="text" id="fname" name="fname" style={{width:"40%"}} defaultValue={produceDict[produceVal.item_uid]?"$"+produceDict[produceVal.item_uid].split(",")[0]:""}/></td>
                        <td><input type="text" id="fname" name="fname" style={{width:"50%"}} defaultValue={produceDict[produceVal.item_uid]?produceDict[produceVal.item_uid].split(",")[1]:""}/></td>
                
                        
                      </tr>
                      ))}
                    
              </tbody>
              
              </table>
              </div>
            </Grid>
          
          </Grid>
          
            </div> 
       
      );
    }
  

export default OrderSummary;
