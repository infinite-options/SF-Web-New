import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { PayPalButton } from 'react-paypal-button-v2';
import { useHistory } from 'react-router-dom';
import { onPurchaseComplete } from '../PurchaseComplete/onPurchaseComplete';
import checkoutContext from '../CheckoutPage/CheckoutContext';
import storeContext from '../Store/storeContext';
import { AuthContext } from 'auth/AuthContext';

const cookies = new Cookies();

const PayPal = ({ value, deliveryInstructions }) => {
  const store = useContext(storeContext);
  const checkout = useContext(checkoutContext);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { paymentDetails, chosenCoupon, chosenCode, ambDis } = useContext(checkoutContext);
  const { profile, startDeliveryDate} = useContext(storeContext);
  //[{"qty": "3", "name": "Opo Gourd", "price": "0.5", "item_uid": "310-000087", "itm_business_uid": "200-000005"}]

  // DONE: Add unit (bunch), desc (cOrganic)
  const items = localStorage.getItem('cartItems') ? Object.entries(JSON.parse(localStorage.getItem('cartItems'))).map(([key,vals]) => {
    var itemVals = {}
    for (const valsInProduct in store.products){
      
      if(store.products[valsInProduct]['item_uid']===key){
        
        itemVals = store.products[valsInProduct]
        itemVals['count'] = vals['count']
      }
    } 
    return {
      qty: itemVals.count,
      name: itemVals.item_name,
      unit: itemVals.item_unit,
      price: itemVals.item_price,
      business_price: itemVals.business_price,
      item_uid: itemVals.item_uid,
      itm_business_uid: itemVals.itm_business_uid,
      description: itemVals.item_desc,
      img: itemVals.item_photo,
    };
  })
  :
  {}

  const CLIENT = {
    sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_TESTING,
    production: process.env.REACT_APP_PAYPAL_CLIENT_ID_LIVE,
  };

  const [CLIENT_ID, setCLIENT_ID] = useState(
    process.env.NODE_ENV === 'production' ? CLIENT.production : CLIENT.sandbox
  );

  var couponIds = ''
  
  if(chosenCoupon==='' && chosenCode===''){
    couponIds = ''
  }
  else if (chosenCoupon!='' && chosenCode!=''){
    couponIds = chosenCoupon+','+chosenCode
  }
  else{
    if(chosenCoupon==='' ){
      couponIds = chosenCode
    }
    else{
      couponIds = chosenCoupon
    }
  } 


  useEffect(() => {
    if (deliveryInstructions === 'SFTEST') {
      if (CLIENT_ID !== CLIENT.sandbox) {
        setCLIENT_ID(CLIENT.sandbox);
      }
    } else if (
      CLIENT_ID !== CLIENT.production &&
      process.env.NODE_ENV === 'production'
    ) {
      setCLIENT_ID(CLIENT.production);
    }
  }, [deliveryInstructions, CLIENT.production, CLIENT.sandbox, CLIENT_ID]);

  //TODO: PayPal cart doesn't clear
  return (
    <div>
      <PayPalButton
        amount={value}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          const dataSending = {
            pur_customer_uid: auth.isAuth
              ? cookies.get('customer_uid')
              : 'GUEST',
            pur_business_uid: 'WEB',
            items,
            order_instructions: 'fast',
            delivery_instructions: deliveryInstructions,
            order_type: 'produce',
            delivery_first_name: profile.firstName,
            delivery_last_name: profile.lastName,
            delivery_phone_num: profile.phoneNum,
            delivery_email: profile.email,
            delivery_address: profile.address,
            delivery_unit: profile.unit,
            delivery_city: profile.city,
            delivery_state: profile.state,
            delivery_zip: profile.zip,
            delivery_latitude: profile.latitude,
            delivery_longitude: profile.longitude,
            purchase_notes: 'purchase_notes',
            start_delivery_date: startDeliveryDate,
            pay_coupon_id: couponIds,
            amount_due: paymentDetails.amountDue.toString(),
            amount_discount: paymentDetails.discount.toString(),
            amount_paid: paymentDetails.amountDue.toString(),
            info_is_Addon: 'FALSE',
            cc_num: 'NULL',
            cc_exp_date: 'NULL',
            cc_cvv: 'NULL',
            cc_zip: 'NULL',
            charge_id: 'NULL',
            payment_type: 'PAYPAL',
            delivery_status: 'FALSE',
            subtotal: paymentDetails.subtotal.toString(),
            service_fee: paymentDetails.serviceFee.toString(),
            delivery_fee: paymentDetails.deliveryFee.toString(),
            driver_tip: paymentDetails.driverTip.toString(),
            taxes: paymentDetails.taxes.toString(),
            ambassador_code:ambDis.toString(),
          };
          console.log('data sending: ', dataSending);
          axios
            .post(
              process.env.REACT_APP_SERVER_BASE_URI + 'purchase_Data_SF',
              dataSending
            )
            .then(() => {
              onPurchaseComplete({
                store: store,
                checkout: checkout,
              });
              store.setOrderConfirmation(true);
              history.push({
                pathname: '/store',
                state: { rightTabChosen: 2 },
              });
            });
        }}
        options={{
          clientId: CLIENT_ID,
        }}
      />
    </div>
  );
};

export default PayPal;
