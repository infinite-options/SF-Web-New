import React, { useContext, useState, forwardRef, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { AuthContext } from '../../../auth/AuthContext';
import axios from 'axios';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



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

function AdminItemAddModel (props){
  
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const [inProduceDict, setInProduceDict] = useState(props.produceDict != 'newProduce'?
                                                      {
                                                        "item_uid":props.produceDict["item_uid"],
                                                        "item_name":props.produceDict["item_name"],
                                                        "item_photo":props.produceDict["item_photo"],
                                                        "item_type":props.produceDict["item_type"],
                                                        "item_desc":props.produceDict["item_desc"],
                                                        "item_unit":props.produceDict["item_unit"],
                                                        "item_price":props.produceDict["item_price"],
                                                        "item_sizes":props.produceDict["item_sizes"],
                                                        "taxable":props.produceDict["taxable"],
                                                        "item_display":props.produceDict["item_display"],
                                                        "farms":props.produceDict["farms"]
                                                      }:
                                                      {
                                                        "item_uid":'',
                                                        "item_name":'',
                                                        "item_photo":'',
                                                        "item_type":'',
                                                        "item_desc":'',
                                                        "item_unit":'',
                                                        "item_price":'',
                                                        "item_sizes":'',
                                                        "taxable":'',
                                                        "item_display":'',
                                                        "farms":[],
                                                        "business_price":'',
                                                        "business_uid":'200-000002',
                                                        "item_status":''
                                                      }
                                                    )
  const handleChange = (event) => {
    const { id, value} = event.target;
    setInProduceDict(prevState => ({...prevState, [id]: value }))
    
  };

  const handleFarmSelection = (event) => {
    event.persist();
    
    if(event.target!='null'){
      // console.log( event.target.value,event.target)
      setInProduceDict(prevState => ({...prevState, ['business_uid']: event.target.value }))
      
    }
    // console.log(inProduceDict)
  };

  const handleSave = () => {
    if(props.produceDict==='newProduce'){
      
      let formData = new FormData();
      Object.entries(inProduceDict).forEach((entry) => {
        formData.append(entry[0], entry[1]);
      
    });
    formData.append('new_item','TRUE')
    
      axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/addItems_Prime/Insert',
        formData // itemInfo
      )
      .then((response) => {
        console.log(response);

      })
      .catch((er) => {
        console.log(er);
      });
  
    }
    else{
    axios
    .post(
      'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_item_admin/update',
      inProduceDict
    )
    .then((response) => {
      console.log("produce saved")
     
      
    })
    .catch((er) => {
      console.log(er);
    });}
    props.handleClose()
  
};

  const onFileChange = (e) => {
    const formData = new FormData();
        formData.append("item_photo", e.target.files[0]); 
        formData.append("uid",inProduceDict['item_uid']); 
        
        axios
        .post(
          'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/upload_image_admin',
          formData
        )
        .then((response) => {
          //console.log(response.data)
          let val = response.data
          setInProduceDict(prevState => ({...prevState, ['item_photo']: val }))
        })
        .catch((er) => {
          console.log(er);
        });
  };

  const insertAPI =
    process.env.REACT_APP_SERVER_BASE_URI + 'addItems_Prime/Insert';

  

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
            // marginLeft:"5%"
          }}
        >
      
       <div id="inBox"
              style={{
                marginTop: '1rem',
              }}> 
              <table className={classes.table}>
                {/* {console.log("hello there",inProduceDict,props.produceDict)} */}
                {/* {farmFetch()} */}
              { props.produceDict === 'newProduce' || inProduceDict['item_uid'] === '' ?
              
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
                      <td className={classes.usrTitle}>Business Price</td>
                      <td className={classes.usrTitle}>Primary Farm</td>
                      <td className={classes.usrTitle}>Item Status</td>
                      
                    </tr>
                    
                    <tr className={classes.tr}>
                        <td className={classes.usrDesc}>
                          <TextField id="item_name" onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <div>
                            <img 
                                  src={inProduceDict['item_photo']===""?'/fruits-and-vegetables.png':inProduceDict['item_photo']}
                                  alt="" height="50" width="50">
                            </img>
                            <label htmlFor="upload-button">
                            <img src='/editIcon.png' alt="dummy" width="15" height="15" />
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={onFileChange}
                              />
                          </div>
                        </td> 
                        <td className={classes.usrDesc}>
                          <TextField id="item_type"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_desc"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_unit"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_price"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_sizes"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="taxable"  onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_display"  onChange={handleChange}/> 
                        </td>
                        
                        <td className={classes.usrDesc}>
                          <TextField id="business_price"  onChange={handleChange}/> 
                        </td>
                        
                        <td className={classes.usrDesc}>
                            <select style={{border:'0px',textAlign:'center',width:"auto"}}
                            onChange={handleFarmSelection}>
                              
                                {props.farmData.map((item,index) => (
                                        <option 
                                         selected={index===0 || item[0]===inProduceDict['business_uid'] ? "selected":"nothing"} 
                                                    key={item[0]} 
                                                    value={item[0]}
                                                    
                                                    >
                                            {item[1]}
                                        </option>
                                  ))}
                            </select>
                        </td>

                        <td className={classes.usrDesc}>
                          <TextField id="item_status"  onChange={handleChange}/> 
                        </td>
                        
                         
                    </tr>
                    
              </tbody>
            
              :
              
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
                        <td className={classes.usrDesc}>
                          <TextField id="item_name" value={inProduceDict['item_name']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <div>
                            <img src={inProduceDict['item_photo']}
                                  alt="" height="50" width="50">
                            </img>
                            <label htmlFor="upload-button">
                            <img src='/editIcon.png' alt="dummy" width="15" height="15" />
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={onFileChange}
                              />
                          </div>
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_type" value={inProduceDict['item_type']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_desc" value={inProduceDict['item_desc']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_unit" value={inProduceDict['item_unit']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_price" value={inProduceDict['item_price']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_sizes" value={inProduceDict['item_sizes']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="taxable" value={inProduceDict['taxable']} onChange={handleChange}/> 
                        </td>
                        <td className={classes.usrDesc}>
                          <TextField id="item_display" value={inProduceDict['item_display']} onChange={handleChange}/> 
                        </td>
                        
                        <td className={classes.usrDesc} >{inProduceDict['farms'].length}</td>
                        
                        <td className={classes.usrDesc}>
                            <select style={{border:'0px',textAlign:'center',width:"auto"}}>
                                {inProduceDict['farms'].map((item,index) => (
                                        <option 
                                        className={index===0? classes.original:classes.replacement} 
                                                    key={index} 
                                                    //value={inProduceDict[item_uid+","+item[2]+","+String(item[3])}
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
                  onClick={handleSave}
                  
                  style={{ marginLeft:"auto",marginRight:"auto",display:"block", marginBottom:"15px",  cursor: 'pointer'  }}
                  
                  />
              </div>
        </div>


        </Grid>

        
        </div>
            
  );
};

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
