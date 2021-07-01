import React, { useContext, useState, forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import appColors from '../../../styles/AppColors';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const booleanVals = new Set(['taxable', 'favorite']);

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
    marginLeft: '5px',
    marginRight:'5px',
    borderCollapse: 'collapse',
  },
  tr:{
    //borderBottom: '1px solid #0000001A'
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

  
  
}));

const AdminItemAddModel = forwardRef(({ produceDict, ...props }) => {
  console.log('props in add item modal', props);
  const auth = useContext(AuthContext);
  const farmID = "200-000002"
  const [file, setFile] = useState({ obj: undefined, url: '' }); // NOTE: url key is probably useless
  const classes = useStyles();
  const [itemProps, setItemProps] = useState({
    new_item: 'TRUE',
    bus_uid: farmID,
    item_info: '',
    item_name: '',
    item_status: 'Active',
    item_type: '',
    item_desc: '',
    item_unit: '',
    item_price: '',
    bus_price: '',
    item_sizes: '',
    favorite: 'FALSE',
    taxable: 'FALSE',
    item_photo: { obj: undefined, url: '' },
    exp_date: '',
  });

  



  const handleChange = (event) => {
    const { name, value, checked } = event.target;

    let newValue = value;
    if (booleanVals.has(name)) newValue = checked ? 'TRUE' : 'FALSE';
    if (name === 'item_status') newValue = checked ? 'Active' : 'Past';
    console.log('setEditData(props.data): ', name, newValue);
    setItemProps({ ...itemProps, [name]: newValue });
  };

  const onFileChange = (event) => {
    setFile({
      obj: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
    });
    console.log(event.target.files[0].name);
  };

  const insertAPI =
    process.env.REACT_APP_SERVER_BASE_URI + 'addItems_Prime/Insert';

  // NOTE: Which item inputs are optional/required?

  //post new item to endpoint
  const addItem = () => {
    const itemInfo = {
      new_item: 'TRUE',
      item_info: itemProps.item_name,
      bus_uid: farmID,
      item_name: itemProps.item_name,
      item_status: itemProps.item_status,
      item_type: itemProps.item_type,
      item_desc: itemProps.item_desc,
      item_unit: itemProps.item_unit,
      item_price: parseFloat(itemProps.item_price).toFixed(2),
      bus_price: parseFloat(
        auth.authLevel == 2 ? itemProps.business_price : itemProps.item_price
      ).toFixed(2),
      item_sizes: itemProps.item_sizes,
      favorite: itemProps.favorite,
      taxable: itemProps.taxable,
      item_photo: file.obj,
      exp_date: itemProps.exp_date,
      // image_category: "item_images", // NOTE: temporary
    };
    let formData = new FormData();
    Object.entries(itemInfo).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    // console.log(itemInfo);
    axios
      .post(
        insertAPI,
        formData // itemInfo
      )
      .then((response) => {
        // console.log(response);

        // appending new item to the business's items list
        // NOTE: currently getting info by searching through sql string response
        const sqlString = response.data.sql;
        itemInfo.item_uid = sqlString.substring(
          sqlString.indexOf("item_uid = '") + 12,
          sqlString.indexOf("item_uid = '") + 22
        );
        itemInfo.created_at = sqlString.substring(
          sqlString.indexOf("created_at = '") + 14,
          sqlString.indexOf("created_at = '") + 24
        );
        itemInfo.item_photo = sqlString.substring(
          sqlString.indexOf("item_photo = '") + 14,
          sqlString.indexOf("item_photo = '") + 78
        );
        itemInfo.item_price = parseFloat(itemInfo.item_price);
        itemInfo.business_price = parseFloat(itemInfo.business_price);

        //props.setData((prevData) => [...prevData, itemInfo]);

        props.handleClose();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
          <div id="addItm" style={{bottom:"0", position:"absolute", marginLeft:"15%", width:"auto", marginBottom:"1rem"}}>
          <Grid 
          lg={12}
          style={{
            //width: "90%",
            display: 'flex',
            flexDirection: 'row',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
            marginLeft:"5%"
          }}
        >
          
       <div id="inBox"
              style={{
                marginTop: '1rem',
              }}> 
              <table className={classes.table}>
              { produceDict === 'newProduce'?console.log("in new produce"):
              <tbody>
                    
                    <tr className={classes.tr} style={{border:'0px'}}>
                      <td className={classes.usrTitle}>Name</td>
                      <td className={classes.usrTitle}>Photo</td>
                      <td className={classes.usrTitle}>Type</td>
                      <td className={classes.usrTitle}>Description</td>
                      <td className={classes.usrTitle}>Unit </td>
                      <td className={classes.usrTitle}>Item Price</td>
                      <td className={classes.usrTitle}>Size</td>
                      <td className={classes.usrTitle}>Taxable</td>
                      <td className={classes.usrTitle}>Display</td>
                      <td className={classes.usrTitle}>Suppliers</td>
                      <td className={classes.usrTitle}>Primary Farm</td>
                      
                    </tr>
                  
                
        
                    <tr className={classes.tr}>
                        <td className={classes.usrDesc}>{produceDict['item_name']}</td>
                        <td className={classes.usrDesc}>
                          <img src={produceDict['item_photo']}
                                alt="" height="50" width="50">
                          </img>
                        </td>
                        <td className={classes.usrDesc}>{produceDict['item_type']}</td>
                        <td className={classes.usrDesc}>{produceDict['item_desc']}</td>
                        <td className={classes.usrDesc}>{produceDict['item_unit']}</td>
                        <td className={classes.usrDesc}>{produceDict['item_price']}</td>
                        <td className={classes.usrDesc}>{produceDict['item_sizes']}</td>
                        <td className={classes.usrDesc}>{produceDict['taxable']}</td>
                        <td className={classes.usrDesc}>{produceDict['item_display']}</td>
                        <td className={classes.usrDesc} >{produceDict['farms'].length}</td>
                        <td className={classes.usrDesc}>
                            <select style={{border:'0px',textAlign:'center',width:"auto"}}>
                                {produceDict['farms'].map((item,index) => (
                                        <option 
                                        className={index===0? classes.original:classes.replacement} 
                                                    key={index} 
                                                    //value={produceDict[item_uid+","+item[2]+","+String(item[3])}
                                                    >
                                            {item[item.length-1]+", "+item[item.length-2]+", "+item[item.length-3]}
                                        </option>
                                  ))}
                            </select>
                        </td>
                        
                        
                    </tr>
                    
              </tbody>
              }
              </table>
              <div >
                <img
                  width="180px"
                  height="40px"
                  src='/saveButtonText.png'
                  alt="save"
                  //onClick={handleEdit}
                  
                  style={{ marginLeft:"auto",marginRight:"auto",display:"block", marginBottom:"15px",  cursor: 'pointer'  }}
                  id={produceDict['item_uid']}
                  />
              </div>
        </div>

        </Grid>
        </div>
            
  );
});

//styling


//NumberFormatCustomPrice is used to validate user input
function NumberFormatCustomPrice(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

export default AdminItemAddModel;
