import React, { useState, useEffect } from 'react';
// import storeContext from '../Store/storeContext';
// import { Box, IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import appColors from '../../styles/AppColors';
// import ProductSelectContext from '../ProductSelectionPage/ProdSelectContext';
// import { ContactsOutlined } from '@material-ui/icons';

// function useForceUpdate() {
//   const [dummy, setDummy] = useState(0);
//   return () => setDummy(dummy => dummy + 1); // updating dummy variable to force a re-render.
// }

const CartItem = (props) => {
  console.log('CartItems props',props);
  // const store = useContext(storeContext);
  // const products = props.products;
  // const productSelect = useContext(ProductSelectContext);
  var itemPrice = parseFloat(props.price);
  var totalPrice = itemPrice * props.count;
  const currCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
  // const currCartTotal = parseInt(localStorage.getItem('cartTotal') || '0');
  // const [dummy, setDummy] = useState(false);
  console.log('CartItems c',currCartItems);
  // const forceUpdate = useForceUpdate();

 
  function decrease() {
    const currCartItems2 = JSON.parse(localStorage.getItem('cartItems')|| '{}')
    const currCartTotal2 = parseInt(localStorage.getItem('cartTotal')|| '0')
    if (props.id in currCartItems2) {

      const itemCount = currCartItems2[props.id]['count'];
      // const itemCount = store.cartItems[props.id]['count'];
      console.log("@456qw In decrease 1 ",itemCount)
      if (itemCount > 0) {
        if (itemCount === 1) {
          let clone = Object.assign({}, currCartItems2);
          delete clone[props.id];
          localStorage.setItem('cartItems', JSON.stringify(clone));
          props.setCartItems(clone);
          console.log("@456qw In decrease 2 --- deleted")
        } else {
          const item = {
            
            count: currCartItems2[props.id]['count'] - 1,
          };
          localStorage.setItem('cartItems', JSON.stringify({
            ...currCartItems2,
            [props.id]: item,
          }));

          props.setCartItems({
            ...currCartItems2,
            [props.id]: item,
          });
        }
        localStorage.setItem('cartTotal', currCartTotal2 - 1);
        props.setCartTotal(currCartTotal2 - 1);
      }
    }
  }
  
  function increase() {
    const currCartItems2 = JSON.parse(localStorage.getItem('cartItems')|| '{}')
    const currCartTotal2 = parseInt(localStorage.getItem('cartTotal')|| '0')
    
    const item =
      props.id in currCartItems2
        ? { count: currCartItems2[props.id]['count'] + 1 }
        : {  count: 1 };
    
    const newCartItems = {
      ... currCartItems2,
      [props.id]: item,
    };

    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('cartTotal', `${currCartTotal2 + 1}`);
    // store.cartItems[props.id] = item;
    props.setCartItems(newCartItems);
    props.setCartTotal(currCartTotal2 + 1);
  }

  // const {
  //   setIsInDay,
  //  } = useContext(storeContext);

  const [isInDay, setIsInDay] = useState(true);
  // const [dummy, setDummy] = useState(false);

  // useEffect(() => {
  
  //   window.addEventListener('storage', () => {
  //     console.log('In cart item with id: ', props.id);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log('props id', props.id);
  // }, [store.cartItems[props.id]['count']]);

  useEffect(() => {
    let  isInDay = false;

    // for (const farm in props.itm_business_uid) {
    console.log("storeitems",props)
    if(props.business_uid){
      if (props.farmDaytimeDict[props.business_uid] != undefined) {
        props.farmDaytimeDict[props.business_uid].forEach((daytime) => {
          if (props.dayClicked === daytime) isInDay = true;
        });
      }
    }
    
    // }

    setIsInDay(isInDay);
    console.log('props name', props.name, isInDay);
  }, [
    props.dayClicked,
    props.farmsClicked,
    props.categoriesClicked,
   // props.cartItems,
    props.products,
   // store.cartTotal
  ]);

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      mb={2}
      py={1}
      style={{ borderBottom: '1px solid' + appColors.border }}
    >
      <Box
        className="center-cropped"
        style={{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${props.img})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 15,
          marginTop: 35,
        }}
      />
      <Box display="flex" flexGrow={1} py={4.5}>
        {/* <p>{store.dayClicked}</p>
        <p>{isInDay.toString()}</p> */}
        {props.isCountChangeable ? (
          <Box
            width="50%"
            display="flex"
            flex="2"
            ml={2}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
              textDecorationLine: isInDay ? '' : 'line-through',
              textDecorationStyle: 'solid',
            }}
          >
            <Box>{props.name} </Box>

            {props.unit !== undefined && props.unit !== ''
              ? '($' +
                itemPrice.toFixed(2) +
                ' ' +
                (props.unit === 'each' ? '' : '/ ') +
                props.unit +
                ')'
              : ''}
          </Box>
        ) : (
          <Box
            width="50%"
            display="flex"
            flex="2"
            ml={2}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
            }}
          >
            <Box>{props.name} </Box>

            {props.unit !== undefined && props.unit !== ''
              ? '($' +
                itemPrice.toFixed(2) +
                ' ' +
                (props.unit === 'each' ? '' : '/ ') +
                props.unit +
                ')'
              : ''}
          </Box>
        )}

        <Box width="30%" flex="0.5" display="flex" justifyContent="center">
          {props.isCountChangeable && (
            <Box>
              {isInDay ? (
                <RemoveIcon
                  fontSize="small"
                  cursor="pointer"
                  color="primary"
                  onClick={decrease}
                  style={{ backgroundColor: '#136D74', borderRadius: '5px' }}
                />
              ) : (
                ' '
              )}
            </Box>
          )}
          <Box mx={1} color="#000000" fontWeight="500" fontSize="14px">
            {isInDay && props.id in currCartItems ? currCartItems[props.id]['count'] : ' '}
          </Box>
          {props.isCountChangeable && (
            <Box>
              {isInDay ? (
                <AddIcon
                  fontSize="small"
                  cursor="pointer"
                  color="primary"
                  onClick={increase}
                  style={{ backgroundColor: '#136D74', borderRadius: '5px' }}
                />
              ) : (
                ' '
              )}
            </Box>
          )}
        </Box>

        <Box
          textAlign="right"
          width="20%"
          flex="2"
          display="flex"
          flexDirection="column"
        >
          {props.isCountChangeable ? (
            <Box>
              <Box
                style={{
                  textDecorationLine: isInDay ? '' : 'line-through',
                  textDecorationStyle: 'solid',
                }}
              >
                ${totalPrice.toFixed(2)}
              </Box>
              <Box
                style={{
                  fontSize: '10px',
                  textAlign: 'left',
                  color: '#ff8500',
                }}
                hidden={isInDay}
              >
                Item not avaliable on this day
              </Box>
            </Box>
          ) : (
            <Box>
              <Box>${totalPrice.toFixed(2)}</Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(CartItem, (prevProps, nextProps) => {
  if (prevProps.name === 'Beets - Golden')
  {
    console.log(
      '----------------------\nCartItem\n',
      `PrevProps info: count = ${prevProps.count}`,
      ` nextProps info: count = ${nextProps.count}`
    );
  }

  if (prevProps.count != nextProps.count) {
    return false;
  }

  return true;
  }
);
