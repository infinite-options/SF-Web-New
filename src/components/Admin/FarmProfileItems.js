import React, {useState} from 'react';
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

function FarmProfileItems (props){
  
    const classes = useStyles();
    const [selectedProduce,setSelectedProduce] = useState({
        "itm_uid":'',
        "item_name":'',
        "item_photo":'',
        "item_unit":'',
        "bus_price":'',
        "item_status":'',
        "bus_uid":props.id
    });


    const handleSave = () => {
       
        let formData = new FormData();
        Object.entries(selectedProduce).forEach((entry) => {
            formData.append(entry[0], entry[1]);
            
          });
          formData.append('new_item','FALSE')
          
          
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
            props.handleClose()
    }

    const handleSelection = (event) => {
        event.persist();
        const idx = event.target.value
        console.log("key is", event.target.id)
        const tmpDict = {
            "itm_uid":props.produceDict[idx]['item_uid'],
            "item_name":props.produceDict[idx]['item_name'],
            "item_photo":props.produceDict[idx]['item_photo'],
            "item_unit":props.produceDict[idx]['item_unit'],
            "bus_price":'',
            "item_status":'',
            "bus_uid":props.id
        }
        setSelectedProduce(tmpDict)
        
    }

    const handleChange = (event) => {
        console.log("in change", event.target)
        console.log("in change", event.target.id)
        console.log("in change", event.target.value)
        event.persist();
        setSelectedProduce(prevState => ({...prevState, [event.target.id]: event.target.value }))
        console.log("new dict ",selectedProduce)
        }

  
    return (
        
        <div id="addItm" style={{bottom:"0", position:"absolute", marginLeft:"14%", width:"41%", marginBottom:"1rem"}}>
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
                            
                        
                        <tbody>
                                
                                <tr className={classes.tr} style={{border:'0px'}}>
                                <td className={classes.usrTitle}>Name</td>
                                <td className={classes.usrTitle}>Photo</td>
                                <td className={classes.usrTitle}>Unit </td>
                                <td className={classes.usrTitle}>Business Price</td>
                                <td className={classes.usrTitle}>Status</td>
                                
                                </tr>
                                
                                <tr className={classes.tr}>
                                <td className={classes.usrDesc}>
                                        <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleSelection}
                                        >
                                        
                                            {props.produceDict.map((item,index) => (
                                                    <option 
                                                    selected={index===0 ? "selected":"nothing"} 
                                                                
                                                                name = {item['item_uid']}
                                                                value={index}
                                                                
                                                                >
                                                        {item['item_name']}
                                                    </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className={classes.usrDesc}>
                                    <div>
                                        <img 
                                            src={selectedProduce['item_photo']===''?'/fruits-and-vegetables.png':selectedProduce['item_photo']}
                                            alt="" height="50" width="50">
                                        </img>
                                        
                                    </div>
                                    </td> 
                                    
                                    <td className={classes.usrDesc}>
                                    <TextField id="item_unit"  value = {selectedProduce['item_unit']}/> 
                                    </td>
                                    <td className={classes.usrDesc}>
                                    {/* <TextField id="business_price"  onChange={handleChange}/>  */}
                                    <TextField
                                        id="bus_price"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ),
                                        }}
                                        
                                        onChange={handleChange}
                                    />
                                    </td>
                                    <td className={classes.usrDesc}>
                                    <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleChange}
                                        id = 'item_status'
                                        >
                                        <option id = 'item_status' value='Active'> Active </option>
                                        <option id = 'item_status' value='Past'> Past </option>
                                            
                                        </select>
                                       
                                    </td>
                                    
                                    
                                </tr>
                                
                        </tbody>
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



export default FarmProfileItems;
