import React, { useState, useEffect, useContext } from 'react';
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
  TextField,
  Link,
  FormControl,
  FormLabel,
} from '@material-ui/core';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { RadioGroup } from '@material-ui/core';
import { AdminFarmContext } from './AdminFarmContext';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AuthContext } from '../../auth/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';
import Popover from '@material-ui/core/Popover';
import appColors from '../../styles/AppColors';
import { Radio } from '@material-ui/icons';
import save from '../icon/save.png';
import del from '../icon/delete.png';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
  infoRow: {
    borderBottom: '1px solid #747474',
  },
  desc: {
    textAlign: 'left',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '10px 11px',
  },
  profileHeader: {
    textAlign: 'left',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
  },
  profileInput: {
    width: '200px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #747474',
    padding: '5px',
  },
  profileData: {
    textAlign: 'left',
    font: 'normal normal medium 14px SFProText-Medium',
    letterSpacing: '-0.34px',
    color: '#000000D9',
    opacity: 1,
  },
}));

function fetchBusinessInfo(setselectedBusiness, id, setProfit1) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_order_summary_page/2021-06-20,` +
      id,
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

      let p = 0;
      let q = 0;
      let numItems = selectedB.length;
      for (let i = 0; i < selectedB.length; i++) {
        p = p + selectedB[i]['total_revenue'];
        q = q + selectedB[i]['quantity'];
      }
      console.log(p);
      console.log(q);

      setProfit1({
        profit: p,
        num: numItems,
        quantity: q,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function FarmProfiles() {
  const classes = useStyles();
  const context = useContext(AdminFarmContext);
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
  const [confirmPass, setConfirmPass] = useState('');
  const [saltPack, setSaltPack] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produceDict, setProduceDict] = useState({});
  //use this state below to set up information of middle column
  const [businessAndFarmDetail, setBusFarm] = useState({});
  const [passwordHere, setPass] = useState('');
  //for sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  // const [image,setImage]=useState({});
  const [imageUpload, setImageUpload] = useState({
    file: null,
    path: businessProfile.business_image,
  });
  // Regular Hours for Business
  const [regularHours, setRegularHours] = useState([]);
  const [acceptTime, setAcceptTime] = useState(context.timeChange);
  const [deliveryTime, setDeliveryTime] = useState(context.deliveryTime);

  useEffect(() => {
    console.log(imageUpload);
  }, [imageUpload]);
  useEffect(() => {
    if (businessProfile) {
      setImageUpload({
        file: null,
        path: businessProfile.business_image,
      });
      console.log('test log the email: ', businessProfile.business_email);
      if (businessProfile.business_email === undefined) {
        console.log('true undifined');
      }
      var objEmail = {
        email: businessProfile.business_email,
      };
      objEmail = JSON.stringify(objEmail);
      axios
        .post(
          'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt',
          objEmail
        )
        .then((response) => {
          // console.log(response);
          // console.log("New Test",response.data.code);
          if (response.data.code === 280) {
            let hashAlg = response.data.result[0].password_algorithm;
            let salt = response.data.result[0].password_salt;
            if (hashAlg !== null && salt !== null) {
              if (hashAlg !== '' && salt !== '') {
                switch (hashAlg) {
                  case 'SHA512':
                    hashAlg = 'SHA-512';
                    break;
                  default:
                    console.log('display default falling into');
                    break;
                }
                let newObj = {
                  hashAlg: hashAlg,
                  salt: salt,
                };
                setSaltPack(newObj);
              }
            }
          }
        });
    }
  }, [businessProfile]);

  //get items for each farm
  const fetchProducts = async (id) => {
    setProducts([]);
    await axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/admin_farmer_items/' +
          id
      )
      .then((response) => {
        // console.log(response.data.result.result);
        setProducts(response.data.result.result);
        // setbusinessProfile(response.data.result[0]);
        // console.log(businessProfile);
        // console.log(products)
        const temp_dict = {};
        response.data.result.result.map(
          (item) => (temp_dict[item.item_uid] = item)
        );

        setProduceDict(temp_dict);
        // console.log("dict is",produceDict)
      });
  };

  const handleImgChange = (e) => {
    if (e.target.files > 0)
      setImageUpload({
        file: e.target.files[0],
        path: URL.createObjectURL(e.target.files[0]),
      });
  };

  //item price and status change
  const handleProductChange = (e) => {
    let val = e.target.value;
    let id = e.target.id;
    let idx = e.target.name;
    // console.log(e.target,idx)
    let tmpDic = products;
    tmpDic[idx][id] = val;
    setProducts(tmpDic);

    setSelectedProduct((prevState) => ({ ...prevState, [id]: val }));
    // setProducts(preState => ({}))
    // console.log(selectedProduct);
  };
  const handleChange = (event) => {
    if (event.target.name === 'phone') {
      let holdNumber = event.target.value;
      let createCorrectFormat = holdNumber;
      setBusFarm({
        ...businessAndFarmDetail,
        [event.target.name]: createCorrectFormat,
      });
    } else if (event.target.name === 'password') {
      setPass(event.target.value);
    } else if (event.target.name === 'passwordConfirm') {
      setConfirmPass(event.target.value);
    } else if (event.target.name === 'email') {
    } else {
      setBusFarm({
        ...businessAndFarmDetail,
        [event.target.name]: event.target.value,
      });
    }
  };
  //farm item update
  const handleSave = (id, action) => {
    // console.log(id,action,products[id]);

    axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_farmer_item_admin/' +
          action,
        products[parseInt(id)]
      )
      .then((response) => {
        setDialogOpen(true);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  async function update() {
    var tempoData = { ...businessProfile };

    tempoData.business_name = businessAndFarmDetail.business_name;
    tempoData.business_desc = businessAndFarmDetail.description;

    tempoData.business_contact_first_name = businessAndFarmDetail.firstName;
    tempoData.business_contact_last_name = businessAndFarmDetail.lastName;
    tempoData.business_phone_num = businessAndFarmDetail.phone;
    tempoData.business_address = businessAndFarmDetail.street;
    tempoData.business_city = businessAndFarmDetail.city;
    tempoData.business_state = businessAndFarmDetail.state;
    tempoData.business_zip = businessAndFarmDetail.zip;
    tempoData.business_hours = regularHours;
    tempoData.business_accepting_hours = acceptTime;
    tempoData.business_delivery_hours = deliveryTime;
    tempoData.business_license = businessAndFarmDetail.businessLicense;
    tempoData.business_USDOT = businessAndFarmDetail.businessUsdot;
    tempoData.business_EIN = businessAndFarmDetail.businessEin;
    tempoData.business_WAUBI = businessAndFarmDetail.businessWaubi;
    tempoData.platform_fee = businessAndFarmDetail.platformFee.toString();
    tempoData.transaction_fee = businessAndFarmDetail.transactionFee.toString();
    tempoData.profit_sharing = businessAndFarmDetail.profitSharing.toString();
    tempoData.revenue_sharing = businessAndFarmDetail.revenueSharing.toString();
    // console.log(typeof tempoData.business_hours);

    if (typeof tempoData.business_hours === 'string') {
      tempoData.business_hours = JSON.parse(tempoData.business_hours);
    }

    if (typeof tempoData.business_accepting_hours === 'string') {
      tempoData.business_accepting_hours = JSON.parse(
        tempoData.business_accepting_hours
      );
    }

    if (typeof tempoData.business_delivery_hours === 'string') {
      tempoData.business_delivery_hours = JSON.parse(
        tempoData.business_delivery_hours
      );
    }

    if (typeof tempoData.business_association === 'string') {
      tempoData.business_association = JSON.parse(
        tempoData.business_association
      );
    }

    //third column
    if (deliverStrategy.pickupStatus === true) {
      tempoData.delivery = '0';
    } else {
      tempoData.delivery = '1';
    }

    if (storage.reusable === true) {
      tempoData.reusable = '1';
    } else {
      tempoData.reusable = '0';
    }
    if (cancellation.allowCancel === true) {
      tempoData.can_cancel = '1';
    } else {
      tempoData.can_cancel = '0';
    }

    console.log(JSON.stringify(tempoData));

    axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/Post',
        tempoData
      )
      .then((res) => {
        console.log('success posting check password: ', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //farmProfile update
  const fetchFarmProfile = async (id) => {
    await axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/Get',
        { business_uid: id }
      )
      .then((response) => {
        console.log(response.data.result[0]);
        setbusinessProfile(response.data.result[0]);
        console.log(businessProfile);
      });

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

  const [deliverStrategy, setDeliveryStrategy] = useState({
    pickupStatus: true,
    deliverStatus: false,
  });

  const [storage, setStorage] = useState({
    reusable: true,
    disposable: false,
  });

  const [cancellation, setCancellation] = useState({
    allowCancel: true,
    noAllowCancel: false,
  });
  //this three function is to check/uncheck box and update state
  const handleChangeCancel = (event) => {
    var optionPick = event.target.name;
    var newCancelObj = {};
    if (optionPick === 'allowCancel') {
      newCancelObj = {
        allowCancel: true,
        noAllowCancel: false,
      };
    } else {
      newCancelObj = {
        allowCancel: false,
        noAllowCancel: true,
      };
    }
    setCancellation(newCancelObj);
  };
  const handleChangeStorage = (event) => {
    var optionPick = event.target.name;
    var newStorageObj = {};
    if (optionPick === 'reusable') {
      newStorageObj = {
        reusable: true,
        disposable: false,
      };
    } else {
      newStorageObj = {
        reusable: false,
        disposable: true,
      };
    }
    setStorage(newStorageObj);
  };
  const handleChangeDelivery = (event) => {
    var optionPick = event.target.name;
    var newDeliveryObj = {};
    if (optionPick === 'pickupStatus') {
      newDeliveryObj = {
        pickupStatus: true,
        deliverStatus: false,
      };
    } else {
      newDeliveryObj = {
        pickupStatus: false,
        deliverStatus: true,
      };
    }
    setDeliveryStrategy(newDeliveryObj);
  };

  /*  useEffect(() => {
    fetchFarmProfile();
    // getSaltPassword();
  }, [farmID]); */
  //farmerInfo
  const farmerObj = async () => {
    await axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
      )
      .then((response) => {
        console.log(response);
        setfarmerInfo(
          response.data.result.result.sort(function (a, b) {
            var textA = a.business_name.toUpperCase();
            var textB = b.business_name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
        );
      });
  };

  console.log(profit1);
  console.log(farmerInfo);
  //popover data
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
                  onClick={() => {
                    setBusiSelect(profile);
                    fetchBusinessInfo(
                      setselectedBusiness,
                      profile.business_uid,
                      setProfit1
                    );
                    fetchFarmProfile(profile.business_uid);
                    fetchProducts(profile.business_uid);
                    handleClose();
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
                  <td className={classes.usrDesc}>
                    {profile.business_phone_num}
                  </td>
                  <td>
                    <img
                      style={{ height: '40px' }}
                      src={profile.business_image}
                    ></img>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </Grid>
      );
    }
  };

  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //sorting produce
  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
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
    return stableSort(products, getComparator(order, orderBy));
  };

  //farm stats table head
  const farmHead = [
    { id: 'item_name', label: 'Name' },
    { id: 'item_photo', label: 'Picture' },
    { id: 'item_unit', label: 'Unit' },
    { id: 'business_price', label: 'Business Price' },
    { id: 'item_status', label: 'Status' },
    { id: 'update delete', label: 'Action' },
  ];
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2rem',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
            height: '121px',
          }}
        >
          <div>
            <Box style={{ float: 'left' }}>
              <img
                style={{
                  height: '91px',
                  width: '91px',
                  float: 'left',
                  borderRadius: '11px',
                }}
                src={busiSelect.business_image}
              ></img>
              <div style={{ float: 'left' }}>
                <h2
                  style={{
                    marginLeft: '20px',
                    marginTop: '20px',
                    color: '#1C6D74',
                  }}
                >
                  {busiSelect.business_name}
                </h2>
                <h5
                  style={{
                    marginTop: '5px',
                    marginLeft: '20px',
                    color: '#1C6D74',
                    textDecoration: 'underline',
                  }}
                >
                  Send message
                </h5>
              </div>
            </Box>
            <Box style={{ float: 'left', marginLeft: '20px' }}>
              <IconButton
                aria-describedby={id}
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={{ margin: '15%' }}
              >
                <img src={CustomerSrc} alt="user pic" style={{}} />
              </IconButton>
            </Box>
            <Box>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Revenue from farm</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  $ {profit1.profit}
                </p>
              </div>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Total no. Orders</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  {profit1.num}
                </p>
              </div>

              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Number of items</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  {profit1.quantity}
                </p>
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
        <Grid container spacing={2}>
          <Grid
            item
            xs
            style={{
              display: 'flex',
              marginBottom: '1rem',
              marginRight: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
              minHeight: '80vh',
              height: 'auto',
              overflowY: 'hidden',
            }}
          >
            <div style={{ marginLeft: '1rem', textAlign: 'left' }}>
              
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
                <img src='/add.png' id='newProduce' height="20" width="20" style={{ marginLeft:"10px",cursor:"pointer"}}
                //  onClick={()=> {setSelectedUID("newProduce");handleEdit()}} 
                 />

              </div>
              
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
                    {farmsSort().map((info, index) => (
                      <TableRow
                        key={info.business_uid}
                        className={classes.infoRow}
                        onClick={() => setSelectedProduct(info)}
                      >
                        <TableCell className={classes.desc}>
                          {info.item_name}
                        </TableCell>
                        <TableCell className={classes.desc}>
                          <img
                            style={{
                              width: '52px',
                              height: '42px',
                              borderRadius: '10px',
                            }}
                            src={info.item_photo}
                          ></img>
                        </TableCell>
                        <TableCell className={classes.desc}>
                          {info.item_unit}
                        </TableCell>
                        <TableCell className={classes.desc}>
                          <TextField
                            id="business_price"
                            name={index}
                            value={info['business_price']}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: '50px', textAlign: 'center' }}
                            onChange={handleProductChange}
                          />
                        </TableCell>
                        <TableCell className={classes.desc}>
                          <TextField
                            id="item_status"
                            name={index}
                            value={info['item_status']}
                            style={{ width: '60px' }}
                            onChange={handleProductChange}
                          />
                        </TableCell>
                        <TableCell className={classes.desc}>
                          <img
                            style={{ width: '18px', marginRight: '5px' }}
                            src={save}
                            onClick={() => handleSave(index, 'update')}
                            id="update"
                          ></img>
                          <img
                            style={{ width: '15px' }}
                            src={del}
                            onClick={() => handleSave(index, 'delete')}
                            id="delete"
                          ></img>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs
            style={{
              display: 'flex',
              marginBottom: '1rem',
              marginRight: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
              minHeight: '80vh',
              height: 'auto',
              overflowY: 'hidden',
            }}
          >
            <Box style={{}}>
              <h2
                style={{
                  textAlign: 'left',
                  marginLeft: '1rem',
                  color: '#FF8500',
                }}
              >
                Farm profile
              </h2>
              <Box
                style={{
                  marginLeft: '1rem',
                  textAlign: 'left',
                  width: '40%',
                  float: 'left',
                }}
              >
                <p className={classes.profileHeader}>Business Name</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_name}
                ></input>
                <p className={classes.profileHeader}>Description</p>
                <textarea
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_desc}
                ></textarea>
                <p className={classes.profileHeader}>Business Rep First Name</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_contact_first_name}
                ></input>
                <p className={classes.profileHeader}>Business Rep Last Name</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_contact_last_name}
                ></input>
                <p className={classes.profileHeader}>
                  Business Rep Phone Number
                </p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_phone_num}
                ></input>

                <h3>Farm Details</h3>
                <hr></hr>
                <p className={classes.profileHeader}>Street</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_address}
                ></input>
                <p className={classes.profileHeader}>Farm City</p>
                <input
                  type="text"
                  defaultValue={businessProfile.business_city}
                ></input>
                <p className={classes.profileHeader}>State</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_state}
                ></input>
                <p className={classes.profileHeader}>Zip</p>
                <input
                  type="text"
                  className={classes.profileInput}
                  defaultValue={businessProfile.business_zip}
                ></input>
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
              <Box
                style={{
                  textAlign: 'left',
                  width: '50%',
                  float: 'left',
                  borderLeft: '1px solid #F5841F',
                  padding: '1rem',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  <img
                    src={busiSelect.business_image}
                    style={{
                      width: '163px',
                      height: '163px',
                      borderRadius: '11px',
                    }}
                  />

                  <Link
                    size="small"
                    color="primary"
                    component="label"
                    fullWidth
                    style={{
                      textAlign: 'center',
                      borderColor: appColors.border,
                      backgroundColor: 'white',
                      width: '200px',
                      paddingTop: '70px',
                      verticalAlign: 'middle',
                    }}
                  >
                    Upload File
                    <input
                      style={{ display: 'none' }}
                      onChange={handleImgChange}
                      type="file"
                      accept="image/*"
                    />
                  </Link>
                </Box>
                <h3 className={classes.profileHeader}>Delivery Zones</h3>
                <select></select>
                <h3 style={{ color: '#F5841F' }}>Add a Zone</h3>
                <p className={classes.profileHeader}>Days of Delivery</p>
                <p className={classes.profileData}>Wednesday (10am to 1pm)</p>
                <p className={classes.profileData}>Saturday (10 am to 1pm)</p>
                <p className={classes.profileHeader}>Delivery Strategy</p>
                {/*  <input type="radio" className={classes.profileData} />
                Pickup at Farmer’s Market <br />
                <input type="radio" className={classes.profileData} />
                Deliver to Customer*/}
                <p className={classes.profileHeader}>Storage</p>
                {/* <input type="radio" className={classes.profileData} />
                Reusble
                <br />
                <input type="radio" className={classes.profileData} />
                Disposable*/}
                <p className={classes.profileHeader}>Cancellation</p>
                {/* <input type="radio" className={classes.profileData} />
                Allow cancellation within ordering hours
                <br />
                <input type="radio" className={classes.profileData} />
                Cancellations not allowed */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{'Successful!!'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Produce has been updated</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FarmProfiles;
