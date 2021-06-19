import React, { useContext, useState } from 'react';
import moment from 'moment';
import { AuthContext } from '../../../auth/AuthContext';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerSrc from '../../../sf-svg-icons/Polygon1.svg';
import { AdminFarmContext } from '../AdminFarmContext';
import CustomerInfo from './CustomerInfo';
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
    marginLeft: '40px',
    borderCollapse: 'collapse',
  },
  tr: {
    borderBottom: '1px solid #747474',
  },
}));

function Customers() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);
  const { custID, custList, setCustList } = useContext(AdminFarmContext);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  /* const fetchCustInfo = async () => {
    const res = await fetch(
      'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/adminCustomerInfo'
    );
    const json = await res.json();
    return json.result;
  };
  useEffect(() => {
    fetchCustInfo().then((custList) => {
      setCustList(custList);
      console.log(custList);
    });
  }, []); */
  function deletequestion(questionid) {
    const searchParams = new URLSearchParams();
    searchParams.append('action', 'deletequestion');
    searchParams.append('questionid', questionid);
    alert(`clicked delete question with id ${questionid}`);
    setSelectedCustomer(questionid);
  }

  const customerlist = () => {
    if (Auth.authLevel >= 2) {
      return (
        <Grid lg={12} className={classes.usrInfo}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.tr}>
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
                  className={classes.tr}
                  style={{ cursor: 'pointer' }}
                  //onClick={() => deletequestion(profile.customer_uid)}
                  onClick={() =>
                    setSelectedCustomer({
                      selectedCustomer: profile.customer_uid,
                    })
                  }
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
      <Grid container>
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
          <div>
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
          </div>
          {/* <CustomerInfo val={setSelectedCustomer} /> */}
        </Grid>

        <Grid
          lg={3}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            marginRight: '3rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          Payment History
        </Grid>
        <Grid
          lg={5}
          style={{
            display: 'flex',
            marginBottom: '1rem',
            marginRight: '3rem',
            flexDirection: 'column',
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            borderRadius: '20px',
            opacity: 1,
          }}
        >
          Payment Made
        </Grid>
        <Grid lg={3}>
          <Grid
            style={{
              display: 'flex',
              marginBottom: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
            }}
          >
            Farms Supported
          </Grid>
          <Grid
            style={{
              display: 'flex',
              marginBottom: '1rem',
              flexDirection: 'column',
              background: '#FFFFFF 0% 0% no-repeat padding-box',
              borderRadius: '20px',
              opacity: 1,
            }}
          >
            Produce Ordered
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Customers;
