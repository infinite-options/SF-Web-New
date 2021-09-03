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
} from '@material-ui/core';
import { AuthContext } from '../../auth/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';
import Popover from '@material-ui/core/Popover';
import appColors from '../../styles/AppColors';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Cookies from 'universal-cookie';

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
    paddingLeft: '0px',
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
  tableRow: {
    borderBottom: '1px solid black',
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

function fetchBusinessInfo(setselectedBusiness, id, setProfit1, day) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_order_summary_page/` +
      day +
      `,` +
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
      console.log(' in endpoint lets dance ', json);
      let flag = 0;
      if (json.code != 280 || json.result.length === 0) {
        flag = 1;
        json = {
          message: 'Successfully executed SQL query.',
          code: 280,
          result: [
            {
              name: 'No Data for this delivery date',
              img: 'https://servingfresh.s3.us-west-1.amazonaws.com/sf_logo.png',
              unit: 'null',
              business_name: "Alberto's Farms",
              business_price: '0',
              price: '0',
              profit: 0,
              quantity: 0,
              total_revenue: 0,
              total_profit: 0,
              farms: "Alberto's Farms,1",
            },
          ],
        };
      }
      console.log(json);
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

      if (flag == 1) {
        numItems = 0;
      }

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

function fetchBusinessPackingInfo(setPacking, id, day) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_packing_data/` +
      id +
      `,` +
      day +
      `,NF`,
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
    .then((response) => {
      console.log('response is ---------', response);
      if (response === 'no data') {
        response = [
          {
            Name: 'No Data for this delivery date',
            Unit: 'Null',
            Img: 'https://servingfresh.s3.us-west-1.amazonaws.com/sf_logo.png',
            Packing: '0',
          },
        ];
      }
      setPacking(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

function FarmOrders() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  useEffect(() => {
    farmerObj();
  }, []);

  let [farmerInfo, setfarmerInfo] = useState([]);
  let [busiSelect, setBusiSelect] = useState([]);
  let [SelectedBusiness, setselectedBusiness] = useState([]);
  let [profit1, setProfit1] = useState([]);
  let [packing, setPacking] = useState([]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const cookies = new Cookies();

  const [deliveryDate, setDeliveryDate] = useState(() => {
    if(cookies.get('admin_delivery_date')!=null){
      return cookies.get('admin_delivery_date')
    }
    else{
    let currDate = moment().format('YYYY-MM-DD');
    let wedDate = moment().isoWeekday(3).format('YYYY-MM-DD');
    let sunDate = moment()
      .clone()
      .add(1, 'weeks')
      .startOf('week')
      .format('YYYY-MM-DD');
    let resDate = '';
    if (currDate > wedDate) {
      resDate = sunDate;
    } else {
      resDate = wedDate;
    }
    return resDate;
  }
  });

  const handleDeliveryDate = (day) => {
    let tmp_ip_day = day.toLocaleDateString().split('/');
    let ip_day = [tmp_ip_day[2], tmp_ip_day[0], tmp_ip_day[1]];
    let res_day = '';
    let i = 0;
    for (i = 0; i < ip_day.length; i++) {
      if (ip_day[i].length === 1) {
        res_day += '0' + ip_day[i] + '-';
      } else {
        res_day += ip_day[i] + '-';
      }
    }
    //console.log(res_day);
    res_day = res_day.slice(0, -1);
    cookies.set('admin_delivery_date',res_day)
    setDeliveryDate(res_day);
    //console.log(ip_day);
  };

  useEffect(() => {
    fetchBusinessInfo(
      setselectedBusiness,
      busiSelect.business_uid,
      setProfit1,
      deliveryDate
    );
    fetchBusinessPackingInfo(setPacking, busiSelect.business_uid, deliveryDate);
  }, [deliveryDate]);

  const farmerObj = () => {
    axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
      )
      .then((response) => {
        console.log(response);
        console.log('gotcha');
        setfarmerInfo(response.data.result.result);
        if(cookies.get('admin_business_uid')!=null){
          console.log("I'm called--1.2",cookies.get('admin_business_uid'))


          setBusiSelect(response.data.result.result[cookies.get('admin_business_uid')]);
          fetchBusinessInfo(
            setselectedBusiness,
            response.data.result.result[cookies.get('admin_business_uid')].business_uid,
            setProfit1,
            deliveryDate
          );
          fetchBusinessPackingInfo(
            setPacking,
            response.data.result.result[cookies.get('admin_business_uid')].business_uid,
            deliveryDate
          );
        }
        else{
          cookies.set('admin_business_uid',0)
          setBusiSelect(response.data.result.result[0]);
          fetchBusinessInfo(
            setselectedBusiness,
            response.data.result.result[0].business_uid,
            setProfit1,
            deliveryDate
          );
          fetchBusinessPackingInfo(
            setPacking,
            response.data.result.result[0].business_uid,
            deliveryDate
          );
        }
        
        

        interObj();
      });
  };

  const interObj = () => {
    console.log('happy hacking ', farmerInfo);
    console.log(farmerInfo[1]);
  };

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
            {farmerInfo.map((profile,i) => (
              <tbody>
                <tr
                  key={profile.business_uid}
                  className={classes.tr}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    cookies.set('admin_business_uid',i)
                    setBusiSelect(profile);
                    fetchBusinessInfo(
                      setselectedBusiness,
                      profile.business_uid,
                      setProfit1,
                      deliveryDate
                    );
                    fetchBusinessPackingInfo(
                      setPacking,
                      profile.business_uid,
                      deliveryDate
                    );
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

  // sorting logic
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
    return stableSort(SelectedBusiness, getComparator(order, orderBy));
  };

  //farm stats table head
  const farmHead = [
    { id: 'name', label: 'Name' },
    { id: 'img', label: 'Picture' },
    { id: 'unit', label: 'Unit' },
    { id: 'business_price', label: 'Business Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'total_revenue', label: 'Farm Revenue' },
    { id: 'packing', label: 'Packing Order' },
  ];

  const farmHeadRight = [
    { id: 'Name', label: 'Name' },
    { id: 'Img', label: 'Picture' },
    { id: 'Unit', label: 'Unit' },
    { id: 'Packing', label: 'Packing Order' },
  ];

  const farmsSortRight = () => {
    return stableSort(packing, getComparator(order, orderBy));
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
                  marginRight: '7rem',
                  color: '#1C6D74',
                }}
              >
                <h5>Select Delivery Date</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  <DayPickerInput
                    placeholder={deliveryDate}
                    value={deliveryDate}
                    format="MM/DD/YYYY"
                    onDayChange={handleDeliveryDate}
                  />
                </p>
              </div>

              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Revenue for Farm</h5>
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
                <h5>No. of Items</h5>
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

              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Distinct Items</h5>
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
            xs={12}
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
              <h2 style={{ color: '#F5841F' }}>Upcoming Revenue</h2>
              <div>
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      {farmHead.map((headCell) => (
                        <TableCell
                          className={classes.usrTitle}
                          // style={{
                          //   fontWeight: 'bold',
                          //   textAlign:'center',
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
                              style={{ marginLeft: '0px' }}
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
                      <TableRow key={info.name} className={classes.tr}>
                        <TableCell className={classes.usrDesc}>
                          {info.name}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          <img
                            style={{
                              width: '52px',
                              height: '42px',
                              borderRadius: '10px',
                            }}
                            src={info.img}
                          ></img>
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          {info.unit}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          $ {Number(info.business_price).toFixed(2)}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          {info.quantity}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          $ {Number(info.total_revenue).toFixed(2)}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          {info.packing}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </div>
            </div>
          </Grid>
          {/* <Grid
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
            <h2 style={{ color: '#F5841F' }}>Upcoming Packing</h2>
            <div>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    {farmHeadRight.map((headCell) => (
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          textAlign:'center',
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
                  {farmsSortRight().map((info, index) => (
                    <TableRow
                      key={info.name}
                      className={classes.infoRow}
                    >
                      <TableCell className={classes.desc}>
                        {info.Name}
                      </TableCell>
                      <TableCell className={classes.desc}>
                        <img
                          style={{
                            width: '52px',
                            height: '42px',
                            borderRadius: '10px',
                          }}
                          src={info.Img}
                        ></img>
                      </TableCell>
                      <TableCell className={classes.desc}>
                        {info.Unit}
                      </TableCell>
                      
                      <TableCell className={classes.desc}>
                        {info.Packing}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </div> 
          </div>
        </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default FarmOrders;
