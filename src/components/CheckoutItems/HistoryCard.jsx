import React, { useContext } from 'react';
import clsx from 'clsx';
import {Box,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import appColors from '../../styles/AppColors';
import storeContext from '../Store/storeContext';
import CartItem from './cartItem';


const useStyles = makeStyles((theme) => ({
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
  date: {
    textAlign: 'left',
    fontSize: '16px',
    color: appColors.paragraphText,
    marginBottom: '10px',
  },
  items: {
    paddingLeft: '0',
    paddingRight: '0',
    fontSize: '16px',
  },
  total: { fontWeight: 'bold' },
  savingDetails: { fontSize: '18px', fontWeight: 'regular' },
  section: {
    borderBottom: '1px solid' + appColors.checkoutSectionBorder,
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  buttonCheckout: {
    color: appColors.buttonText,
    // width: '20rem',
    backgroundColor: '#ff8500',
  },
  
}));

function listItem(item) {
  console.log("CartItems calling from history tab")

  
  return (
    <>
      <CartItem
        name={item.name}
        unit={item.unit}
        price={parseFloat(item.price)}
        count={parseInt(item.qty)}
        img={item.img}
        key={item.item_uid}
        business_uid={item.business_uid}
        isCountChangeable={false}
      />
    </>
  );
}

const HistoryCard = (props) => {
  // const { profile } = useContext(storeContext);
  const classes = useStyles();
  const store = useContext(storeContext);

  console.log("history work in order--1",props)
  function reorder() {

    var tempCI = {}
    var tempCIA = {}
    var tempCT = 0
    for (const [key, value] of Object.entries(props.items)){
      

      var farmDaytimeDict = store.farmDaytimeDict
      var dayClicked = store.dayClicked
      var business_uid= value.itm_business_uid

      let  isInDay = false;
      console.log("History calling from checkout Store tab--0",dayClicked)
      // for (const farm in props.itm_business_uid) {
      // console.log("storeitems",props)
      if(business_uid){
        console.log("History calling from checkout Store tab--1",business_uid)
        if (farmDaytimeDict[business_uid] != undefined) {
          console.log("History calling from checkout Store tab--2")
          farmDaytimeDict[business_uid].forEach((daytime) => {
            console.log("History calling from checkout Store tab--3",daytime)
            if (dayClicked === daytime) {
              console.log("History calling from checkout Store tab--4")
              isInDay = true;
            }
              
          });
        }
      }

      tempCIA[value.item_uid] = isInDay
      tempCT = tempCT + value.qty
      tempCI[value.item_uid] = {'count':value.qty}

    }
    console.log("History calling from checkout Store tab--Final",tempCIA,tempCT,tempCI)
    // check if localstorage items exist or not

    var currCartItems2 = JSON.parse(localStorage.getItem('cartItems')|| '{}')
    var currCartTotal2 = parseInt(localStorage.getItem('cartTotal')|| '0')
    var currCartItemsAvail2 = JSON.parse(localStorage.getItem('cartItemsAvail')|| '{}')
    
    if(currCartItems2){
      console.log("History calling from checkout Store tab--loop1 IN",currCartItems2)
      for (const [key, value] of Object.entries(tempCI)){
        console.log("History calling from checkout Store tab--loop2",value)
        if(key in currCartItems2){
          currCartItems2[key] = {'count':currCartItems2[key]['count']+tempCI[key]['count']}
          console.log("History calling from checkout Store tab--loop3")
        }
        else{
          currCartItems2[key] = {'count':tempCI[key]['count']}
        }
      }
      console.log("History calling from checkout Store tab--loop4",currCartItems2)
    }
    else{
      currCartItems2 = tempCI
      console.log("History calling from checkout Store tab--loop5",currCartItems2)
    }


    if(currCartItemsAvail2){
      //console.log("History calling from checkout Store tab--loop1 IN",currCartItems2)
      for (const [key, value] of Object.entries(tempCIA)){
        console.log("History calling from checkout Store tab--loop2",value)
        if(key in currCartItemsAvail2){
          
          //console.log("History calling from checkout Store tab--loop3")
        }
        else{
          currCartItemsAvail2[key] = {'isInDay':tempCIA[key]}
        }
      }
      console.log("History calling from checkout Store tab--loop4",currCartItemsAvail2)
    }
    else{
      currCartItemsAvail2 = tempCIA
      console.log("History calling from checkout Store tab--loop5",currCartItemsAvail2)
    }

    if(currCartTotal2){
      currCartTotal2 = currCartTotal2 + tempCT
    }
    else{
      currCartTotal2 = tempCT
    }
    console.log("History calling from checkout Store tab--loop5",currCartTotal2)

    localStorage.setItem('cartItems',JSON.stringify(currCartItems2))
    localStorage.setItem('cartItemsAvail',JSON.stringify(currCartItemsAvail2))
    localStorage.setItem('cartTotal',currCartTotal2)

    window.location.reload();

  }



  return (
    <Box className={classes.card}>
      
      <Box className={clsx(classes.items)} display="flex">
        Expected Delivery Date:{' '}
        {props.deliveryDate.toLocaleString('default', { month: 'long' })}{' '}
        {props.deliveryDate.toLocaleString('default', { day: 'numeric' })},{' '}
        {props.deliveryDate.getFullYear()}
        <Box flexGrow={1} />
        <Button
              className={classes.buttonCheckout}
              size="small"
              variant="contained"
              color="primary"
              onClick={reorder}
              style={{height:'10%'}}
              
            >
              EZ Order
              </Button>
              
        
      </Box>
      <Box className={classes.date}>
        Purchase Date:{' '}
        {props.purchaseDate.toLocaleString('default', { month: 'long' })}{' '}
        {props.purchaseDate.toLocaleString('default', { day: 'numeric' })},{' '}
        {props.purchaseDate.getFullYear()}
        {' at '}
        {props.purchaseDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </Box>
      <Box className={classes.date}>
        Delivery Address: {props.address}, {props.city}, {props.city}{' '}
        {props.zip}
      </Box>
      <Box className={classes.date}>
        Delivery Instructions:{' '}
        {props.deliveryInstructions === ''
          ? 'None provided.'
          : props.deliveryInstructions}
      </Box>
      <Box className={classes.date}>Order ID: {props.id}</Box>

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
      <Box className={classes.items}>{props.items.map(listItem)}</Box>
      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Subtotal
        <Box flexGrow={1} />${props.subtotal.toFixed(2)}
      </Box>
      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Promo Applied
        <Box flexGrow={1} />
        -${props.savings.toFixed(2)}
      </Box>
      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Delivery Fee
        <Box flexGrow={1} />${props.deliveryFee.toFixed(2)}
      </Box>
      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Service Fee
        <Box flexGrow={1} />${props.serviceFee.toFixed(2)}
      </Box>
      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Driver Tip
        <Box flexGrow={1} />${props.driverTip.toFixed(2)}
      </Box>

      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Taxes
        <Box flexGrow={1} />${props.taxes.toFixed(2)}
      </Box>

      <Box
        className={clsx(classes.items, classes.savingDetails, classes.section)}
        display="flex"
      >
        Ambassador Code
        <Box flexGrow={1} />-${Number(props.amb_code).toFixed(2)}
      </Box>

      <Box
        className={clsx(classes.items, classes.total, classes.section)}
        display="flex"
      >
        You Paid
        <Box flexGrow={1} />${props.amountPaid.toFixed(2)}
      </Box>
    </Box>
  );
};

export default HistoryCard;
