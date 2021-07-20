import React, {useState,useEffect } from 'react';
import { Grid, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import 'react-day-picker/lib/style.css';
import AdminItemAddModel from './AdminItemAddModel';
import axios from 'axios';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
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
    const [farmData, setFarmData] = useState([])

    
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
    const [allFarms,setAllFarms] = useState([])


    const farmFetch = () => {
      // console.log("in farmfetch")
      
  
      axios
          .get('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/all_businesses')
          .then((res) => {
            
            var tempArr = []
            res.data.result.map((item) => (
                tempArr.push([item.business_uid,item.business_name])
              )
            )
          setFarmData(tempArr)
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response);
            }
            console.log(err);
          });
    };

    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };

    function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      
      stabilizedThis.sort((a, b) => {
        // console.log("stabilizer",a,b);
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      // console.log("final stab",stabilizedThis)
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
      // console.log(order, orderBy)
      return stableSort(allProduce, getComparator(order, orderBy));
    };
  
    useEffect(() => {
        fetchProduceInfo();
        farmFetch();
    }, []);

    useEffect(() => {
      fetchProduceInfo();
      fetchFarms();
      console.log("all farms",allFarms)
      
  }, [openModel]);
  
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

    const fetchFarms = () => {
      axios
        .get('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/all_businesses')
        .then((res) => {
          setAllFarms(res.data.result)
          
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
          console.log(err);
        });
    };
   
    const handleEdit = (e) => {
        console.log("in handle edit of admin items", selectedUID)
        setOpenModel(true)
        
    };

    const closeModel = () => {setOpenModel(false); 
                                setOpen(true)}
  
    const modelBody = (
      <div>
        <AdminItemAddModel produceDict={selectedUID==='newProduce'?selectedUID:produceDict[selectedUID]} allFarms = {allFarms} handleClose={closeModel} farmData={farmData}/>
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
              
              <div>

              <TableContainer>
                    <TableHead>
                      <TableRow>
                        {farmHead.map((headCell) => (
                          <TableCell
                            className={classes.usrTitle}
                            // style={{
                            //   fontWeight: 'bold',
                            // }}
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
                        <TableRow 
                          className={classes.tr}
                          style={{ cursor: 'pointer' }} 
                          onClick={()=>{setSelectedUID(produceVal.item_uid);handleEdit();}}>
                          <TableCell
                            className={classes.usrDesc}
                          >
                            {produceVal.item_name}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
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
                            className={classes.usrDesc}
                          >
                            {produceVal.item_type}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.item_desc}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.item_unit}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.item_price}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.item_sizes}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.taxable}
                          </TableCell>
                          <TableCell className={classes.usrDesc}>
                            {produceVal.item_display}
                          </TableCell>
                          <TableCell className={classes.usrDesc} >
                            {produceVal.farms.length}
                          </TableCell>
                          <TableCell className={classes.usrDesc} onClick={e => e.stopPropagation()}>
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
