import React, { useContext, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import { AuthContext } from '../../../auth/AuthContext';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';

import {
  Grid,
  Typography,
  Box,
  Avatar,
  Paper,
  Button,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { fade } from '@material-ui/core/styles';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CustomerSrc from '../../../sf-svg-icons/Polygon1.svg';
import { AdminFarmContext } from '../AdminFarmContext';
import appColors from '../../../styles/AppColors';
import Delivered from '../../../sf-svg-icons/delivered.svg';
import couponUnavaliable from '../../../images/couponUnavaliable.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BCCDCE',
    padding: '2rem',
  },
  search: {
    position: 'relative',
    width: '100%',
  },
  inputRoot: {
    color: '#1C6D74',
  },
  inputInput: {
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #1C6D74',
    borderRadius: ' 8px',
    opacity: 1,
    width: '189px',
    height: '25px',
    padding: '5px',
  },
  usrInfo: {
    display: 'flex',
    backgroundClip: 'context-box',
    backgroundColor: '#E8D1BD',
    borderRadius: '20px',
    width: 'auto',
    height: '500px',
    overflowY: 'auto',
    boxShadow:
      ' -30px 20px 70px -30px rgba(51, 51, 51, 0.7), 0 50px 100px 0 rgba(51, 51, 51, 0.2)',
  },
  currUserPic: {
    margin: '5px',
    width: theme.spacing(5),
    height: theme.spacing(5),
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
    borderBottom: '1px solid #747474',
  },
  usrDesc: {
    textAlign: 'center',
    fontSize: '0.9rem',
    letterSpacing: '-0.48px',
    opacity: 1,
    alignItems: 'center',
    padding: '10px',
  },
  infoTable: {
    marginLeft: '20px',
    borderCollapse: 'collapse',
    backgroundColor: 'transparent',
  },
  infoRow: {
    color: '#1C6D74',
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1C6D74',
      color: 'white',
    },
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
    padding: '5px 5px',
    fontSize: '14px',
  },
  desc: {
    textAlign: 'center',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '5px 16px',
    fontSize: '14px',
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
    textAlign: 'center',
    fontSize: '14px',
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
    cursor: 'pointer',
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1C6D74',
      borderColor: '#005cbf',
      color: 'white',
    },
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
    marginTop: '20px',
    marginBottom: '20px',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    textAlign: 'left',
    fontSize: '16px',
    color: appColors.paragraphText,
    marginBottom: '10px',
  },
  delivered: {
    textAlign: 'left',
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
    fontSize: '14px',
    padding: '10px',
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
  },
  total: { fontWeight: 'bold' },
  savingDetails: {
    fontSize: '14px',
    font: 'SFProText-Medium',
  },
  section: {
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  sectionHeader: {
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
    paddingTop: '10px',
    paddingBottom: '10px',
    textSlign: 'left',
    font: 'normal normal 600 14px SF Pro Text',
    fontSize: '14px',
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
  },
  sectionItem: {
    textAlign: 'left',
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
  },
  buttonRight: {
    textAlign: 'left',
    font: 'normal normal bold 20px/28px SF Pro Text',
    letterSpacing: ' 0px',
    color: '#F5841F',
    opacity: 1,
    textTransform: 'none',
  },
  couponInput: {
    border: '1px solid' + appColors.checkoutSectionBorder,
    width: '8rem',
    height: '2rem',
    padding: '3px',
    fontSize: '14px',
    borderRadius: '6px',
    '&:focus': {
      outline: 'none',
    },
  },
  btn: {
    background: ' #FF8500 0% 0% no-repeat padding-box',
    borderRadius: '8px',
    opacity: 1,
    color: 'white',
    marginBottom: '20px',
    width: '157px',
  },
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: '#F5841F',
    '& > span': {
      maxWidth: 80,
      width: '100%',
      backgroundColor: '#F5841F',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#F5841F',
    opacity: 1,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(10),
  },
}))((props) => <Tab disableRipple {...props} />);

function fetchCustomers(setPayments, id) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/payment_profit_customer/${id}`,
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
      const payment_reverse = json.result;
      const payments = payment_reverse.reverse();
      setPayments(payments);
    })
    .catch((error) => {
      console.error(error);
    });
}
function fetchCustomerInfo(setSelectedCustomer, id) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/adminCustomerInfo/${id}`,
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
      const selectedCustomer = json.result;
      setSelectedCustomer(selectedCustomer);
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchHistory(setHistory, id) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/history/${id}`,
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
      const history = json.result;
      setHistory(history);

      console.log('History', history);
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchFarm(setFarms, id) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farms_supported/${id},all`,
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
      const farms = json.result;
      setFarms(farms);
    })
    .catch((error) => {
      console.error(error);
    });
}
function fetchProduce(setProduceOrdered, id) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/produce_ordered/${id},all`,
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
      const produceOrdered = json.result;
      setProduceOrdered(produceOrdered);
    })
    .catch((error) => {
      console.error(error);
    });
}
function fetchCoupons(setCoupons, custEmail) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/available_Coupons/${custEmail}`,
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
      const coupons = json.result;
      setCoupons(coupons);
    })
    .catch((error) => {
      console.error(error);
    });
}

function Customers() {
  const classes = useStyles();

  const Auth = useContext(AuthContext);
  const { custList } = useContext(AdminFarmContext);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [searchID, setSearchID] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [payments, setPayments] = useState([]);
  const [history, setHistory] = useState([]);
  const [farms, setFarms] = useState([]);
  const [purchaseID, setPurchaseID] = useState([]);
  const [email, setEmail] = useState('');
  const [rightTabChosen, setRightTabChosen] = useState(0);
  const [produceOrdered, setProduceOrdered] = useState([]);
  const [coupons, setCoupons] = useState([]);
  console.log('Selected Customer: ', email);
  const customerlist = () => {
    if (Auth.authLevel >= 2) {
      return (
        <Grid lg={12} className={classes.usrInfo}>
          <table className={classes.infoTable}>
            <thead>
              <tr>
                <td className={classes.infoRow}> Search by</td>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    className={classes.inputInput}
                    onChange={(event) => {
                      setSearchName(event.target.value);
                    }}
                  />
                </td>
                <td></td>
                <td>
                  <input
                    type="text"
                    placeholder="Address"
                    className={classes.inputInput}
                    onChange={(event) => {
                      setSearchAddress(event.target.value);
                    }}
                  />
                </td>
                <td></td>
                <td>
                  <input
                    type="text"
                    placeholder="Purchase ID"
                    className={classes.inputInput}
                    onChange={(event) => {
                      setSearchID(event.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr className={classes.infoRow}>
                <td className={classes.usrTitle}>Customer Name</td>
                <td className={classes.usrTitle}>Email ID</td>
                <td className={classes.usrTitle}>Purchase ID</td>
                <td className={classes.usrTitle}>Last Order(date) </td>
                <td className={classes.usrTitle}>Customer Since</td>
                <td className={classes.usrTitle}>Address</td>
                <td className={classes.usrTitle}>Delivery Zone</td>
                <td className={classes.usrTitle}>Zip Code</td>
                <td className={classes.usrTitle}>Phone</td>
              </tr>
            </thead>
            {custList
              .filter((val) => {
                if (searchName === '') {
                  return val;
                } else if (
                  val.customer_first_name
                    .toLowerCase()
                    .includes(searchName.toLowerCase())
                ) {
                  return val;
                }
              })
              .filter((val) => {
                if (searchAddress === '') {
                  return val;
                } else if (
                  val.customer_address
                    .toLowerCase()
                    .includes(searchAddress.toLowerCase())
                ) {
                  return val;
                }
              })
              .filter((val) => {
                if (searchID === '') {
                  return val;
                } else if (
                  val.purchase_id.toLowerCase().includes(searchID.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((profile) => (
                <tbody>
                  <tr
                    key={profile.customer_uid}
                    className={classes.infoRow}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      fetchCustomers(setPayments, profile.customer_uid);
                      fetchHistory(setHistory, profile.customer_uid);
                      fetchCustomerInfo(
                        setSelectedCustomer,
                        profile.customer_uid
                      );
                      fetchFarm(setFarms, profile.customer_uid);
                      fetchProduce(setProduceOrdered, profile.customer_uid);
                      fetchCoupons(setCoupons, profile.customer_email);
                      setEmail(profile.customer_email);
                      handleClose();
                      setSearchName('');
                      setSearchAddress('');
                      setSearchID('');
                    }}
                  >
                    <td className={classes.usrDesc}>
                      {profile.customer_first_name}&nbsp;
                      {profile.customer_last_name}
                    </td>
                    <td className={classes.usrDesc}>
                      {profile.customer_email}
                    </td>
                    <td className={classes.usrDesc}>
                      #{profile.purchase_id.substring(4)}
                    </td>
                    <td className={classes.usrDesc}>
                      {moment(profile.last_order_date).format('LL')}
                    </td>
                    <td className={classes.usrDesc}>
                      {moment(profile.customer_created_at).format('LL')}
                    </td>
                    <td className={classes.usrDesc}>
                      {profile.customer_address},&nbsp;
                      <br /> {profile.customer_city},&nbsp;{' '}
                      {profile.customer_state}
                    </td>
                    <td className={classes.usrDesc}>{profile.zone}</td>
                    <td className={classes.usrDesc}>{profile.customer_zip}</td>
                    <td className={classes.usrDesc}>
                      {profile.customer_phone_num}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </Grid>
      );
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (setPurchaseID, event) => {
    const purchaseID = [];
    setPurchaseID(purchaseID);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChange = (event, newValue) => {
    setRightTabChosen(newValue);
  };
  const filterOnClick = (setPurchaseID, pid) => {
    const purchaseID = pid;
    setPurchaseID(purchaseID);
  };

  const historyView =
    purchaseID.length === 0
      ? history
      : history.filter((hist) => hist.purchase_id == purchaseID);

  const url =
    'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_Coupons/create';
  const [createCoupon, setCreateCoupon] = useState({
    coupon_id: '',
    valid: '',
    threshold: '',
    discount_percent: '',
    discount_amount: '',
    discount_shipping: '',
    expire_date: '',
    limits: '',
    coupon_title: '',
    notes: '',
    num_used: '0',
    recurring: 'T',
    email_id: 'xyz@gmail.com',
    cup_business_uid: '200-000002',
  });

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        coupon_id: createCoupon.coupon_id,
        valid: createCoupon.valid,
        threshold: createCoupon.threshold,
        discount_percent: createCoupon.discount_percent,
        discount_amount: createCoupon.discount_amount,
        discount_shipping: createCoupon.discount_shipping,
        expire_date: createCoupon.expire_date,
        limits: createCoupon.limits,
        coupon_title: createCoupon.coupon_title,
        notes: createCoupon.notes,
        num_used: createCoupon.num_used,
        recurring: createCoupon.recurring,
        email_id: createCoupon.email_id,
        cup_business_uid: createCoupon.cup_business_uid,
      })
      .then((response) => {
        console.log(response.data);
      });
  }
  function handle(e) {
    const newCoupon = { ...createCoupon };
    newCoupon[e.target.id] = e.target.value;
    setCreateCoupon(newCoupon);

    console.log(newCoupon);
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '3rem',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          <div>
            <Box className={classes.currUserInf}>
              <Avatar src={'no-link'} className={classes.currUserPic}>
                {selectedCustomer.map((info) => (
                  <Typography style={{ fontSize: '30px' }}>
                    {info.customer_first_name || info.customer_last_name
                      ? `${info.customer_first_name[0]}${info.customer_last_name[0]}`
                      : 'JD'}
                  </Typography>
                ))}
              </Avatar>
              <Box>
                <Box>
                  {selectedCustomer.map((info) => (
                    <Typography
                      variant="caption"
                      style={{
                        textAlign: 'left',
                        font: 'normal normal 600 20px SF Pro Display',
                        color: '#1C6D74',
                        opacity: 1,
                      }}
                    >
                      {info.customer_first_name} {info.customer_last_name}
                    </Typography>
                  ))}
                  <IconButton
                    aria-describedby={id}
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      handleClick(setPurchaseID, e);
                    }}
                  >
                    <img src={CustomerSrc} alt="user pic" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 700, left: 1000 }}
                    anchorOrigin={{
                      vertical: 'center',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    style={{
                      backgroundClip: 'context-box',
                      borderRadius: '20px',
                    }}
                  >
                    {customerlist()}
                  </Popover>
                </Box>
                <Typography
                  variant="title"
                  style={{
                    textTransform: 'none',
                    textDecorationColor: 'none',
                    letterSpacing: '0.25px',
                    color: ' #1C6D74',
                    opacity: 1,
                  }}
                >
                  <a>Send Message</a>&nbsp;
                  <a>Issue Coupon</a>
                </Typography>
              </Box>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginLeft: '6rem',
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <td className={classes.infoTitle}>Phone Number</td>
                      <td className={classes.infoTitle}>Delivery Address </td>
                      <td className={classes.infoTitle}>Delivery Zone</td>
                      <td className={classes.infoTitle}>Last Order Received</td>
                      <td className={classes.infoTitle}>Total no. of Orders</td>
                      <td className={classes.infoTitle}>Total Revenue</td>
                    </tr>
                  </thead>
                  {selectedCustomer.map((info) => (
                    <tbody>
                      <tr>
                        <td className={classes.desc}>
                          {info.customer_phone_num}
                        </td>
                        <td className={classes.desc}>
                          {info.customer_address},&nbsp;
                          <br /> {info.customer_city},&nbsp;{' '}
                          {info.customer_state}&nbsp; {info.customer_zip}
                        </td>
                        <td className={classes.desc}>{info.zone}</td>
                        <td className={classes.desc}>
                          {moment(info.last_order_date).format('LL')}
                        </td>
                        <td className={classes.desc}>{info.total_orders} </td>
                        <td className={classes.desc}>{info.total_revenue}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
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
          <Typography className={classes.header}>Payment History</Typography>
          {historyView.map((history) => (
            <Box className={classes.card}>
              <Box className={classes.delivered}>
                <img src={Delivered} alt="user pic" />
                &nbsp; Order Delivered
              </Box>
              <Box className={classes.date}>
                {moment(history.start_delivery_date).format('LL')} at{' '}
                {moment(history.start_delivery_date).format('LT')} <br></br>
                Purchase ID: #{history.purchase_id.substring(4)}
              </Box>

              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
                style={{
                  fontSize: '16px',
                  font: 'normal normal bold 20px/22px SF Pro Text',
                }}
              >
                Subtotal
                <Box flexGrow={1} />${history.subtotal.toFixed(2)}
              </Box>
              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
                style={{
                  color: '#136274',
                }}
              >
                Coupon Applied
                <Box flexGrow={1} />
                -${history.amount_discount.toFixed(2)}
              </Box>
              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
              >
                Delivery Fee
                <Box flexGrow={1} />${history.delivery_fee.toFixed(2)}
              </Box>
              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
              >
                Service Fee
                <Box flexGrow={1} />${history.service_fee.toFixed(2)}
              </Box>
              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
              >
                Driver Tip
                <Box flexGrow={1} />${history.driver_tip.toFixed(2)}
              </Box>

              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
              >
                Taxes
                <Box flexGrow={1} />${history.taxes.toFixed(2)}
              </Box>

              <Box
                className={clsx(
                  classes.items,
                  classes.savingDetails,
                  classes.section
                )}
                display="flex"
              >
                Ambassador Code
                <Box flexGrow={1} />
                -${history.ambassador_code}
              </Box>
              <Box
                className={clsx(classes.items, classes.total, classes.section)}
                display="flex"
                style={{
                  fontSize: '18px',
                  font: 'normal normal bold 20px/22px SF Pro Text',
                }}
              >
                Total
                <Box flexGrow={1} />${history.amount_paid.toFixed(2)}
              </Box>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            marginRight: '1rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          <Typography className={classes.header}>Payment Made</Typography>
          <table className={classes.paymentTable}>
            <thead>
              <tr className={classes.paymentHeader}>
                <td className={classes.td}>Payment ID</td>
                <td className={classes.td}>Purchase ID</td>
                <td className={classes.td}>Delivery Date</td>
                <td className={classes.td}>COGS</td>
                <td className={classes.td}>Tip</td>
                <td className={classes.td}>Taxes</td>
                <td className={classes.td}>Profit</td>
                <td className={classes.td}>Payment</td>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  className={classes.paymentInfo}
                  onClick={() => {
                    filterOnClick(setPurchaseID, payment.purchase_id);
                  }}
                >
                  <td className={classes.td}>
                    #{payment.payment_id.substring(4)}
                  </td>
                  <td className={classes.td}>
                    #{payment.purchase_id.substring(4)}{' '}
                  </td>
                  <td className={classes.td}>
                    {moment(payment.start_delivery_date).format('LL')}
                  </td>
                  <td className={classes.td}>${payment.subtotal.toFixed(2)}</td>
                  <td className={classes.td}>
                    ${payment.driver_tip.toFixed(2)}{' '}
                  </td>
                  <td className={classes.td}>${payment.taxes.toFixed(2)}</td>
                  <td className={classes.td}>${payment.profit.toFixed(2)}</td>
                  <td className={classes.td}>
                    ${payment.amount_paid.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
            overflow: 'hidden',
          }}
        >
          <Paper elevation={0}>
            <StyledTabs
              value={rightTabChosen}
              onChange={handleChange}
              indicatorColor="#F5841F"
              textColor="#F5841F"
              aria-label="styled tabs example"
              centered
            >
              <StyledTab
                label="Produce"
                style={{ fontSize: '16px', fontWeight: '700', minWidth: 100 }}
              />

              <StyledTab
                label="Coupon"
                style={{ fontSize: '16px', fontWeight: '700', minWidth: 100 }}
              />

              <StyledTab
                label="Stats"
                style={{ fontSize: '16px', fontWeight: '700', minWidth: 100 }}
              />
            </StyledTabs>

            <Paper
              elevation={0}
              style={{
                marginTop: 10,
                minHeight: '80vh',
                maxHeight: '92%',
                overflow: 'hidden',
              }}
            >
              <Box hidden={rightTabChosen !== 0}>
                {historyView.map((history) => (
                  <Box className={classes.card}>
                    <Box className={classes.delivered}>
                      <img src={Delivered} alt="user pic" />
                      &nbsp; Order Delivered
                    </Box>
                    <Box className={classes.date}>
                      {moment(history.start_delivery_date).format('LL')} at{' '}
                      {moment(history.start_delivery_date).format('LT')}{' '}
                      <br></br>
                      Purchase ID: #{history.purchase_id.substring(4)}
                    </Box>
                    <Box className={classes.sectionHeader} display="flex">
                      <Box width="60%" textAlign="left">
                        Name
                      </Box>
                      <Box width="20%" textAlign="center">
                        Quantity
                      </Box>
                      <Box width="22%" textAlign="right">
                        Price
                      </Box>
                    </Box>
                    <Box className={classes.items}>
                      {JSON.parse(history['items']).map((item) => {
                        return (
                          <Box display="flex" justifyContent="start">
                            <Box
                              width="60%"
                              textAlign="left"
                              display="inline-block"
                            >
                              <img
                                src={item['img']}
                                alt=""
                                height="50"
                                width="50"
                                style={{
                                  borderRadius: '10px',
                                  marginRight: '5px',
                                  verticalAlign: 'middle',
                                }}
                              />
                              {item['name']}
                            </Box>
                            <Box
                              width="20%"
                              textAlign="center"
                              paddingTop="10px"
                            >
                              {item['qty']}
                            </Box>
                            <Box
                              width="20%"
                              textAlign="right"
                              paddingTop="10px"
                            >
                              {item['price']}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box id="coupon" hidden={rightTabChosen !== 1}>
                <Box
                  style={{
                    borderBottom: '3px solid #BCCDCE ',
                    marginBottom: '20px',
                  }}
                >
                  <form onSubmit={(e) => submit(e)}>
                    <Box display="flex" mb={1}>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Coupon Title
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="coupon_title"
                          onChange={(e) => handle(e)}
                          value={createCoupon.coupon_title}
                          style={{ margin: 6 }}
                        />
                      </Box>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Threshold
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="threshold"
                          onChange={(e) => handle(e)}
                          value={createCoupon.threshold}
                          style={{ margin: 6 }}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Coupon ID
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="coupon_id"
                          onChange={(e) => handle(e)}
                          value={createCoupon.coupon_id}
                          style={{ margin: 6 }}
                        />
                      </Box>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Discount Percentage
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="discount_percent"
                          onChange={(e) => handle(e)}
                          value={createCoupon.discount_percent}
                          style={{ margin: 6 }}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Valid
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="valid"
                          onChange={(e) => handle(e)}
                          value={createCoupon.valid}
                          style={{ margin: 6 }}
                        />
                      </Box>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Discount Amount
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="discount_amount"
                          onChange={(e) => handle(e)}
                          value={createCoupon.discount_amount}
                          style={{ margin: 6 }}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Expiration Date
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="date"
                          id="expire_date"
                          onChange={(e) => handle(e)}
                          value={createCoupon.expire_date}
                          style={{ margin: 6 }}
                        />
                      </Box>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Discount Shipping
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="discount_shipping"
                          onChange={(e) => handle(e)}
                          value={createCoupon.discount_shipping}
                          style={{ margin: 6 }}
                        />
                      </Box>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Limits
                        </Typography>
                        <input
                          className={classes.couponInput}
                          type="text"
                          id="limits"
                          onChange={(e) => handle(e)}
                          value={createCoupon.limits}
                          style={{ margin: 6 }}
                        />
                      </Box>
                      <Box width="50%">
                        <Typography className={classes.paymentHeader}>
                          Notes
                        </Typography>
                        <textarea
                          className={classes.couponInput}
                          type="text"
                          id="notes"
                          onChange={(e) => handle(e)}
                          value={createCoupon.notes}
                          rows={4}
                          style={{ margin: 6 }}
                        />
                      </Box>
                    </Box>
                    <Button className={classes.btn}>Submit</Button>
                  </form>
                </Box>

                <Box
                  className={classes.card}
                  component="div"
                  overflow="scroll"
                  height="600px"
                >
                  <Box display="flex" justifyContent="space-between">
                    <Box width="60%" className={classes.header}>
                      Current Coupons
                    </Box>
                    <Box width="10%">%</Box>
                    <Box width="10%">$</Box>
                    <Box width="20%">Shipping</Box>
                  </Box>

                  {coupons.map((coupon) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      padding="10px 0px"
                      borderBottom="0.5px solid #747474"
                    >
                      <Box
                        style={{
                          width: '212px',
                          height: '115px',
                          backgroundImage: `url(${couponUnavaliable})`,
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center center',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          justifyContent="center"
                          marginLeft="1rem"
                        >
                          <Box
                            fontSize="14px"
                            pr={1}
                            fontWeight="bold"
                            marginTop="1.5rem"
                          >
                            {coupon.coupon_title}
                          </Box>
                          <Box fontSize="10px">{coupon.notes}</Box>
                          <Box fontSize="10px">
                            Spend $ {coupon.threshold} more to use
                          </Box>
                          <Box fontSize="10px">
                            Expires: {moment(coupon.expire_date).format('LL')}
                          </Box>

                          <Box fontSize="10px" fontWeight="bold">
                            Non Eligible
                          </Box>
                        </Box>
                      </Box>

                      <Box width="10%" display="flex" marginLeft="30px">
                        {coupon.discount_percent}
                      </Box>
                      <Box width="10%">{coupon.discount_amount}</Box>
                      <Box width="20%">{coupon.discount_shipping}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box hidden={rightTabChosen !== 2}>
                <Box className={classes.card}>
                  <Typography className={classes.header}>
                    Farms Supported
                  </Typography>
                  <Box className={classes.sectionHeader} display="flex">
                    <Box width="60%" textAlign="left">
                      Farm Name
                    </Box>
                    <Box width="20%" textAlign="center">
                      No. of Orders
                    </Box>
                    <Box width="20%" textAlign="right">
                      Revenue
                    </Box>
                  </Box>
                  <Box className={classes.items}>
                    {farms.map((farm) => (
                      <Box display="flex" justifyContent="start">
                        <Box
                          width="60%"
                          textAlign="left"
                          display="flex"
                          paddingTop="10px"
                        >
                          <img
                            src={farm.business_image}
                            alt=""
                            height="50"
                            width="50"
                            style={{
                              borderRadius: '10px',
                              marginRight: '5px',
                            }}
                          />
                          <Typography>{farm.business_name}</Typography>
                        </Box>
                        <Box width="20%" paddingTop="10px">
                          {farm.total_orders}
                        </Box>
                        <Box width="20%" paddingTop="10px">
                          {farm.Revenue}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box className={classes.card}>
                  <Typography className={classes.header}>
                    Produce Ordered
                  </Typography>
                  <Box className={classes.sectionHeader} display="flex">
                    <Box width="60%" textAlign="left">
                      Produce Name
                    </Box>
                    <Box width="20%" textAlign="center">
                      Quantity
                    </Box>
                    <Box width="22%" textAlign="right">
                      Revenue
                    </Box>
                  </Box>
                  <Box className={classes.items}>
                    {produceOrdered.map((produce) => (
                      <Box display="flex" justifyContent="start">
                        <Box
                          width="60%"
                          display="inline-block"
                          textAlign="left"
                        >
                          <img
                            src={produce.img}
                            alt=""
                            height="50"
                            width="50"
                            style={{
                              borderRadius: '10px',
                              marginRight: '5px',
                              verticalAlign: 'middle',
                            }}
                          />

                          {produce.name}
                        </Box>
                        <Box width="20%" textAlign="center" paddingTop="10px">
                          {produce.quantity}
                        </Box>
                        <Box width="20%" textAlign="right" paddingTop="10px">
                          {produce.revenue}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customers;
