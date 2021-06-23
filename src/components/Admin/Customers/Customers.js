import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { AuthContext } from '../../../auth/AuthContext';
import storeContext from '../../Store/storeContext';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Paper,
} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CustomerSrc from '../../../sf-svg-icons/Polygon1.svg';
import { AdminFarmContext } from '../AdminFarmContext';
import CartItem from '../../CheckoutItems/cartItem';
import appColors from '../../../styles/AppColors';
import Delivered from '../../../sf-svg-icons/delivered.svg';
import HistoryTab from '../../Tabs/HistoryTab';
import RefundTab from '../../Tabs/RefundTab';
import CheckoutTab from '../../Tabs/CheckoutStoreTab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#BCCDCE',
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
  infoTable: {
    marginLeft: '30px',
    borderCollapse: 'collapse',
  },
  infoRow: {
    borderBottom: '1px solid #747474',
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
    padding: '10px 16px',
  },
  desc: {
    textAlign: 'center',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '10px 16px',
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
    color: 'var(--unnamed-color-000000)',
    textAlign: 'center',
    fontSize: '16px',
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
    opacity: 1,
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
    marginBottom: '50px',
    paddingBottom: '20px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  title: {
    textAlign: 'left',
    fontSize: '22px',
    color: appColors.paragraphText,
    marginBottom: '10px',
  },
  delivered: {
    textAlign: 'left',
    fontSize: '16px',
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
    fontSize: '16px',
  },
  total: { fontWeight: 'bold' },
  savingDetails: {
    fontSize: '16px',
    font: 'SFProText-Medium',
  },
  section: {
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  buttonRight: {
    textAlign: 'left',
    font: 'normal normal bold 20px/28px SF Pro Text',
    letterSpacing: ' 0px',
    color: '#F5841F',
    opacity: 1,
    textTransform: 'none',
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
    fontSize: theme.typography.pxToRem(15),
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
    })
    .catch((error) => {
      console.error(error);
    });
}
/* 
function getPurchaseID(setPurchaseID, id) {
  purchaseID = id;
  setPurchaseID(purchaseID);
} */
function Customers(props) {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  const { custList } = useContext(AdminFarmContext);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [payments, setPayments] = useState([]);
  const [history, setHistory] = useState([]);
  const [purchaseID, setPurchaseID] = useState([]);
  const [rightTabChosen, setRightTabChosen] = useState(0);
  console.log('purchase id', purchaseID);

  const handleChange = (event, newValue) => {
    setRightTabChosen(newValue);
  };

  const customerlist = () => {
    if (Auth.authLevel >= 2) {
      return (
        <Grid lg={12} className={classes.usrInfo}>
          <table className={classes.infoTable}>
            <thead>
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
            {custList.map((profile) => (
              <tbody>
                <tr
                  key={profile.customer_uid}
                  className={classes.infoRow}
                  style={{ cursor: 'pointer' }}
                  //onClick={() => deletequestion(profile.customer_uid)}
                  onClick={() => {
                    fetchCustomers(setPayments, profile.customer_uid);
                    fetchHistory(setHistory, profile.customer_uid);
                    fetchCustomerInfo(
                      setSelectedCustomer,
                      profile.customer_uid
                    );
                  }}
                >
                  <td className={classes.usrDesc}>
                    {profile.customer_first_name}&nbsp;
                    {profile.customer_last_name}
                  </td>
                  <td className={classes.usrDesc}>{profile.customer_email}</td>
                  <td className={classes.usrDesc}>{profile.purchase_id}</td>
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
                  <Typography style={{ fontSize: '38px' }}>
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
                        font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 24px/29px SF Pro Display',
                        textAlign: 'left',
                        font: 'normal normal 600 24px/29px SF Pro Display',
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
                    onClick={handleClick}
                  >
                    <img src={CustomerSrc} alt="user pic" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 600, left: 1000 }}
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
            height: '80vh',
            overflowY: 'scroll',
          }}
        >
          <Typography className={classes.header}>Payment History</Typography>
          {history.map((history) => (
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
                  fontSize: '20px',
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
                  fontSize: '20px',
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
                    setPurchaseID(payment.purchase_id);
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
                  <td className={classes.td}>{payment.subtotal}</td>
                  <td className={classes.td}>{payment.driver_tip} </td>
                  <td className={classes.td}>{payment.taxes}</td>
                  <td className={classes.td}>{payment.profit}</td>
                  <td className={classes.td}>{payment.amount_paid}</td>
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
                style={{ fontSize: '20px', fontWeight: '700', minWidth: 100 }}
              />

              <StyledTab
                label="Coupon"
                style={{ fontSize: '20px', fontWeight: '700', minWidth: 100 }}
              />

              <StyledTab
                label="Stats"
                style={{ fontSize: '20px', fontWeight: '700', minWidth: 100 }}
              />
            </StyledTabs>

            <Paper
              elevation={0}
              style={{
                marginTop: 10,
                maxHeight: '92%',
                overflow: 'auto',
              }}
            >
              <Box hidden={rightTabChosen !== 0}>
                {history.map((history) => (
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
                    <Box className={classes.section} display="flex">
                      <Box width="50%" textAlign="left">
                        Name
                      </Box>
                      <Box width="20%" textAlign="center">
                        Quantity
                      </Box>
                      <Box width="22%" textAlign="right">
                        Price
                      </Box>
                    </Box>
                    <Box className={classes.items}></Box>
                    {/*   {history.items.map((product) => {
                      return (
                        <div key={product.item_uid}>
                          <p>{product.name}</p>
                          <p>{product.qty}</p>
                        </div>
                      );
                    })} */}
                  </Box>
                ))}
              </Box>
              <Box hidden={rightTabChosen !== 1}>Coupon</Box>
              <Box hidden={rightTabChosen !== 2}>
                <Typography className={classes.header}>
                  Farms Supported
                </Typography>

                <Typography className={classes.header}>
                  Produce Ordered
                </Typography>
              </Box>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customers;
