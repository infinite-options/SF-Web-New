import React, { useState} from 'react';
import axios from 'axios';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';


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

  up_arrow: {
    display: 'inline-block',
    content: " ",
    marginLeft: '4px',
    marginBottom: '4px',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid black',
  },
  
  down_arrow: {
    display: 'inline-block',
    content: " ",
    marginLeft: '4px',
    marginBottom: '4px',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid black',
  },
  
  

  
  
}));

function AdminItemAddModel (props){
  
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
  
  
  
  const distinctVals = props.distinctVals
  console.log("distinct values ",distinctVals['item_type'],inProduceDict['item_type'])
  const handleChange = (event) => {
    const { id, value} = event.target;
    console.log("in handle change ", id,value)
    setInProduceDict(prevState => ({...prevState, [id]: value }))
    
  };

  const handleSave = () => {
    if(props.produceDict==='newProduce'){

      const res = {}
      for (let [key, value] of Object.entries(inProduceDict)) {
        console.log(value)
        if(!value){
          res[key] = "NULL"
        }
        else{
          res[key] = value
        }
        
      }
      
      let formData = new FormData();
      Object.entries(res).forEach((entry) => {
        
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
      
      const res = {}
      for (let [key, value] of Object.entries(inProduceDict)) {
        console.log(value)
        if(!value){
          console.log("in")
          res[key] = "NULL"
        }
        else{
          res[key] = value
        }
        
      }
      setInProduceDict(res)
    axios
    .post(
      'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_item_admin/update',
      res
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
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'item_type'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['item_type'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                  <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'item_desc'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['item_desc'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select> 
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                  <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'item_unit'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['item_unit'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    <TextField id="item_price"  onChange={handleChange} 
                                    InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    ),
                                  }}/> 
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                  <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'item_sizes'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['item_sizes'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                  <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'taxable'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['taxable'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                  <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                          onChange={handleChange}
                                          id = 'item_display'
                                          >
                                            <option disabled selected>Select an option</option>
                                            {distinctVals['item_display'].map((item,index) => {
                                                return (<option id = {item} value={item}
                                                        // selected = {index===0?"selected":""}
                                                > 
                                                {item} 
                                                </option>)
                                            })}
                                      </select> 
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
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_type'
                                        
                                        >
                                          {distinctVals['item_type'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['item_type']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
                                    </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    {/* <TextField id="item_desc" value={inProduceDict['item_desc']} onChange={handleChange}/>  */}
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_desc'
                                        
                                        >
                                          {distinctVals['item_desc'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['item_desc']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
                                    </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    {/* <TextField id="item_unit" value={inProduceDict['item_unit']} onChange={handleChange}/>  */}
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_unit'
                                        
                                        >
                                          {distinctVals['item_unit'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['item_unit']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
                                    </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    <TextField id="item_price" value={inProduceDict['item_price']} onChange={handleChange}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            $
                                          </InputAdornment>
                                        ),
                                      }}/> 
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    {/* <TextField id="item_sizes" value={inProduceDict['item_sizes']} onChange={handleChange}/>  */}
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_sizes'
                                        
                                        >
                                          {distinctVals['item_sizes'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['item_sizes']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
                                    </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    {/* <TextField id="taxable" value={inProduceDict['taxable']} onChange={handleChange}/>  */}
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'taxable'
                                        
                                        >
                                          {distinctVals['taxable'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['taxable']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
                                    </select>
                                  </td>
                                  
                                  <td className={classes.usrDesc}>
                                    {/* <TextField id="item_display" value={inProduceDict['item_display']} onChange={handleChange}/>  */}
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_display'
                                        
                                        >
                                          {distinctVals['item_display'].map((item) => {
                                              return (<option id = {item} value={item}
                                                      selected = {item===inProduceDict['item_display']?"selected":""}
                                              > 
                                              {item} 
                                              </option>)
                                          })}
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

export default AdminItemAddModel;
