import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import appColors from '../../styles/AppColors';
import { AuthContext } from '../../auth/AuthContext';
import storeContext from '../Store/storeContext';
import checkoutContext from '../CheckoutPage/CheckoutContext';
import HistoryCard from '../CheckoutItems/HistoryCard';

const cookies = new Cookies();


// TODO: headers for item values
// TODO: Give individual price for items
// TODO: Add delivery date
const HistoryTab = () => {
  const { isAuth } = useContext(AuthContext);
  const { profile } = useContext(storeContext);
  const { purchaseMade } = useContext(checkoutContext);
  const [historyList, setHistoryList] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [flag, setFlag] = useState(0);
  console.log('check flag in tab',flag)
  const CreateHistoryCard = (props) => {
    return (
      <HistoryCard
        id={props.purchase_uid}
        items={JSON.parse(props.items)}
        purchaseDate={new Date(props.purchase_date + '  UTC')}
        deliveryDate={new Date(props.start_delivery_date)}
        subtotal={props.subtotal}
        amountPaid={props.amount_paid}
        savings={props.amount_discount}
        driverTip={props.driver_tip}
        serviceFee={props.service_fee}
        deliveryFee={props.delivery_fee}
        taxes={props.taxes}
        address={props.delivery_address}
        unit={props.delivery_unit}
        city={props.delivery_city}
        state={props.delivery_state}
        zip={props.delivery_zip}
        paymentMethod={props.payment_type}
        deliveryInstructions={props.delivery_instructions}
        key={props.purchase_uid}
        amb_code={props.ambassador_code}
        feedback_rating={props.feedback_rating}
        useForceUpdate = {useForceUpdate()}
      />
    );
  };

  function useForceUpdate(){
    return () => setFlag(flag => flag + 1); // update the state to force render
}
  
  function loadHistory(setHistoryList, setHistoryLoading) {
    var uid = null
    if(cookies.get('customer_uid')!=null){
      var CryptoJS = require("crypto-js");
      var bytes = CryptoJS.AES.decrypt(cookies.get('customer_uid'), process.env.REACT_APP_UID_ENCRYPT_CODE);
      uid = bytes.toString(CryptoJS.enc.Utf8);
      console.log("working on encryption",uid)
  
    }
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URI +
          'history/' +
          uid
      )
      .then((res) => {
        console.log('in history tab',res.data)
        if (res && res.data && res.data.result) {
          setHistoryList(res.data.result);
        }
        setHistoryLoading(false);
      });
  }

  useEffect(() => {
    var uid = null
    if(cookies.get('customer_uid')!=null){
      var CryptoJS = require("crypto-js");
      var bytes = CryptoJS.AES.decrypt(cookies.get('customer_uid'), process.env.REACT_APP_UID_ENCRYPT_CODE);
      uid = bytes.toString(CryptoJS.enc.Utf8);
      console.log("working on encryption",uid)
  
    }
    if (uid !== '')
      loadHistory(setHistoryList, setHistoryLoading);
  }, [profile.email, purchaseMade,flag]);

  useEffect(() => {
    if (isAuth) {
      if (historyList.length > 0) {
        setMessage('');
      } else {
        if (historyLoading) setMessage('History is Loading...');
        else setMessage('No purchases have been made.');
      }
    } else {
      setMessage('Sign up to keep track of your purchases.');
    }
  }, [historyLoading, historyList]);

  return (
    <Box pt={5} px={10}>
      <Box mb={1} color={appColors.paragraphText} fontSize={20}>
        <Box mb={1} color={appColors.paragraphText} fontSize={20}>
          <label> {message} </label>
        </Box>
        {historyList.map(CreateHistoryCard)}
      </Box>
    </Box>
  );
};

export default HistoryTab;
