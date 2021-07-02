import React, {useState,useEffect } from 'react';
import { Grid, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AdminItemAddModel from './AdminItemAddModel';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';



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
    marginLeft: '5px',
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

function AdminItems() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [allProduce, setAllProduce] = useState([]);
    const [produceDict, setProduceDict] = useState({});
    const [openModel, setOpenModel] = useState(false);
    const [selectedUID, setSelectedUID] = useState()

    const [farms, setFarms] = useState([]);
    const farmHead = [
      { id: 'item_name', label: 'Name' },
      { id: 'item_photo', label: 'Photo' },
      { id: 'item_type', label: 'Type' },
      { id: 'item_desc', label: 'Description' },
      { id: 'item_unit', label: 'Unit' },
      { id: 'item_price', label: 'Item Price' },
      { id: 'item_sizes', label: 'Size' },
      { id: 'taxable', label: 'Taxable' },
      { id: 'item_display', label: 'Display' },
      { id: 'Suppliers', label: 'Suppliers' },
      { id: 'Primary Farm', label: 'Primary Farm' },
    ];

    const [orderBy, setOrderBy] = useState();
    const [order, setOrder] = useState();

    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      
      stabilizedThis.sort((a, b) => {
        console.log("stabilizer",a,b);
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      console.log("final stab",stabilizedThis)
      return stabilizedThis.map((el) => el[0]);
    }
  
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
  
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
  
    const farmsSort = () => {
      console.log(order, orderBy)
      return stableSort(allProduce, getComparator(order, orderBy));
    };
  
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
    
    const handleEdit = (e) => {
        console.log("in handle edit", selectedUID)
        if (selectedUID === 'newProduce'){
          setOpenModel(true)
        }
        else{
          setOpenModel(true)
        }
        
    };

    const closeModel = () => {setOpenModel(false);}
  
    const modelBody = (
      <div>
        <AdminItemAddModel produceDict={selectedUID==='newProduce'?selectedUID:produceDict[selectedUID]} handleClose={closeModel} />
      </div>
    );
  
  return (
    <div id="top" >
        <div id="mainDiv" className={classes.root}>
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
                <img src='/add.png' id='newProduce' height="20" width="20" style={{ marginLeft:"10px",cursor:"pointer"}} onClick={()=> {setSelectedUID("newProduce");
                                                                                                                                    handleEdit()}} />

              </div>
              {/* 
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
                      
                    </tr>
                  
                { allProduce.map((produceVal) => (
        
                    <tr className={classes.tr} style={{ cursor: 'pointer' }} onClick={()=>{setSelectedUID(produceVal.item_uid);handleEdit();}}>
                        <td className={classes.usrDesc}>{produceVal.item_name}</td>
                        <td className={classes.usrDesc}>
                          <img src={produceVal.item_photo} 
                                alt="" height="50" width="50">
                          </img>
                        </td>
                        <td className={classes.usrDesc}>{produceVal.item_type}</td>
                        <td className={classes.usrDesc}>{produceVal.item_desc}</td>
                        <td className={classes.usrDesc}>{produceVal.item_unit}</td>
                        <td className={classes.usrDesc}>{produceVal.item_price}</td>
                        <td className={classes.usrDesc}>{produceVal.item_sizes}</td>
                        <td className={classes.usrDesc}>{produceVal.taxable}</td>
                        <td className={classes.usrDesc}>{produceVal.item_display}</td>
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
                        
                    </tr>
                ))}
                        
                        
              </tbody>
              </table>
              
              </div> 
              */}

              <div>

              <TableContainer>
                    <TableHead>
                      <TableRow>
                        {farmHead.map((headCell) => (
                          <TableCell
                            style={{
                              fontWeight: 'bold',
                            }}
                            padding="none"
                            key={headCell.id}
                            sortDirection={
                              orderBy === headCell.id ? order : false
                            }
                          >
                            {headCell.disableSorting ? (
                              headCell.label
                            ) : (
                              <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                  orderBy === headCell.id ? order : 'asc'
                                }
                                onClick={() => {
                                  handleSortRequest(headCell.id);
                                }}
                              >
                                {headCell.label}
                              </TableSortLabel>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {farmsSort().map((produceVal) => (
                        <TableRow style={{ cursor: 'pointer' }} onClick={()=>{setSelectedUID(produceVal.item_uid);handleEdit();}}>
                          <TableCell
                            padding="none"
                            align="left"
                            style={{ paddingRight: '20px' }}
                          >
                            {produceVal.item_name}
                          </TableCell>
                          <TableCell padding="none">
                            <img
                              src={produceVal.item_photo}
                              alt=""
                              height="50"
                              width="50"
                              style={{
                                borderRadius: '10px',
                                marginRight: '5px',
                              }}
                            />
                          </TableCell>
                          <TableCell
                            padding="none"
                            align="left"
                            style={{ paddingRight: '20px' }}
                          >
                            {produceVal.item_type}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.item_desc}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.item_unit}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.item_price}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.item_sizes}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.taxable}
                          </TableCell>
                          <TableCell padding="none">
                            {produceVal.item_display}
                          </TableCell>
                          <TableCell padding="none" >
                            {produceVal.farms.length}
                          </TableCell>
                          <TableCell padding="none" onClick={e => e.stopPropagation()}>
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableContainer>

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
        
        <div id="boxInMain">
        <Modal open={openModel}  onClose={()=>setOpenModel(false)} >
            {modelBody}
        </Modal>
      </div>
      </div>
      );
    }
  

export default AdminItems;
