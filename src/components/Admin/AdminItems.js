import React, {useState,useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
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

function AdminItems() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
            temp_dict[item.item_uid] = item
          )
              
        )

      setProduceDict(temp_dict)
      //console.log("dict is ",temp_dict)
        
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };
 
  const handleProduceChange = (e) => {
    //console.log(e.target.name)
    if (e.target.type === 'file'){
      let uid = e.target.id.split(",")[1];
      const formData = new FormData();
      formData.append("item_photo", e.target.files[0]); 
      formData.append("uid",uid); 
      //console.log(e.target,"call endpoint")
      axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/upload_image_admin',
        formData
      )
      .then((response) => {
        //console.log(response.data)
        let val = response.data
        let tempDict = produceDict[uid]
        tempDict["item_photo"] = val
        setProduceDict(prevState => ({...prevState, [uid]: tempDict }))
      })
      .catch((er) => {
        console.log(er);
      });
    } 
    else{
        let uid = e.target.id
        let val = e.target.value
        let propty = e.target.name
        let tempDict = produceDict[uid]
        tempDict[propty] = val
        setProduceDict(prevState => ({...prevState, [uid]: tempDict }))
    }
    //console.log("after update",produceDict)
  };

  const handleSave = (e) => {
      let action = e.target.id.split(",")[1]==='save'?'update':'delete'
      let uid = e.target.id.split(",")[0];
      axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_item_admin/'+action,
        produceDict[uid]
      )
      .then((response) => {
        setOpen(true)
      })
      .catch((er) => {
        console.log(er);
      });
    
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
                      <td className={classes.usrTitle}>Type</td>
                      <td className={classes.usrTitle}>Description</td>
                      <td className={classes.usrTitle}>Unit </td>
                      <td className={classes.usrTitle}>Item Price</td>
                      <td className={classes.usrTitle}>Size</td>
                      <td className={classes.usrTitle}>Taxable</td>
                      <td className={classes.usrTitle}>Display</td>
                      <td className={classes.usrTitle}>Suppliers</td>
                      <td className={classes.usrTitle}>Primary Farm</td>
                      <td className={classes.usrTitle}>Actions</td>
                    </tr>

                  { allProduce.map((produceVal) => (
        
                      <tr className={classes.tr}>
                        
                        <td><input type="text" id={produceVal.item_uid} name="item_name" style={{width:"80%"}} defaultValue={produceVal.item_name} onChange={handleProduceChange}/></td>
                        <td className={classes.usrDesc}>
                          <div style={{display:"flex"}}>
                            <img src={produceVal.item_photo} 
                                 alt="produce" height="50" width="50" style={{border:"1px solid #E8E8E8",borderRadius:"5px"}}>
                            </img>
                            <label htmlFor={'upload-button'+','+produceVal.item_uid}>
                                <img src='/editIcon.png' 
                                alt="edit" height="15" width="15"  style={{ marginLeft:"3px",marginTop:"20px" }}/>
                            </label>
                            <input
                              type="file"
                              id={'upload-button'+','+produceVal.item_uid}
                              style={{ display: "none" }}
                              onChange={handleProduceChange}
                            />
                          </div>
                        </td>
                        <td><input type="text" id={produceVal.item_uid} name="item_type" style={{width:"70%"}} defaultValue={produceVal.item_type} onChange={handleProduceChange}/></td>
                        <td><input type="text" id={produceVal.item_uid} name="item_desc" style={{width:"50%"}} defaultValue={produceVal.item_desc} onChange={handleProduceChange}/></td>
                        <td><input type="text" id={produceVal.item_uid} name="item_unit" style={{width:"50%"}} defaultValue={produceVal.item_unit} onChange={handleProduceChange}/></td>
                        <td>$<input type="text" id={produceVal.item_uid} name="item_price" style={{width:"35%"}} defaultValue={produceVal.item_price} onChange={handleProduceChange}/></td>
                        <td><input type="text" id={produceVal.item_uid} name="item_sizes" style={{width:"40%"}} defaultValue={produceVal.item_sizes} onChange={handleProduceChange}/></td>
                        <td><input type="text" id={produceVal.item_uid} name="taxable" style={{width:"42%"}} defaultValue={produceVal.taxable} onChange={handleProduceChange}/></td>
                        <td><input type="text" id={produceVal.item_uid} name="item_display" style={{width:"42%"}} defaultValue={produceVal.item_display} onChange={handleProduceChange}/></td>
                        <td className={classes.usrDesc} >{produceVal.farms.length}</td>
                        
                        <td className={classes.usrDesc}>

                          <select style={{border:'0px',textAlign:'center',width:"auto"}}>
                            {produceVal.farms.map((item,index) => (
                                    <option 
                                      className={index===0? classes.original:classes.replacement} 
                                                key={index} 
                                                value={produceVal.item_uid+","+item[2]+","+String(item[3])}
                                                >
                                        {item[item.length-1]+", "+item[item.length-2]+", "+item[item.length-3]}
                                    </option>
                                          
                            ))}
                          </select>
                        </td>
                              <td>< img
                                    width="20"
                                    height="20"
                                    src='/saveButton.png'
                                    alt="save"
                                    onClick={handleSave}
                                    style={{ marginRight:"10px" }}
                                    id={String(produceVal.item_uid)+","+"save"}
                                  />
                                  < img
                                    width="20"
                                    height="20"
                                    src='/deleteButton.png'
                                    alt="delete"
                                    onClick={handleSave}
                                    id={String(produceVal.item_uid)+","+"delete"}
                                  />
                              </td>
                        
                      </tr>
                      ))}
                    
              </tbody>
              
              </table>
              </div>
            </Grid>
          
          </Grid>

          <div>
            <Dialog open={open} onClose={()=>setOpen(false)}>
              <DialogTitle>{"Successful!!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Produce has been updated
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button 
                onClick={()=>setOpen(false)}
                        
                        color="primary" autoFocus>
                  Okay
                </Button>
                
              </DialogActions>
            </Dialog>
          </div>
          
            </div> 
       
      );
    }
  

export default AdminItems;
