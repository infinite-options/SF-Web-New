import React, { useState, useEffect } from 'react';
// import storeContext from '../../Store/storeContext';
import {
  Box,
  Button,
  Card,
  Grid,
  Icon,
  IconButton,
  Typography,
  SvgIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import appColors from '../../../styles/AppColors';
// import ProduceSelectContext from '../ProdSelectContext';

import { ReactComponent as AddIcon } from '../../../sf-svg-icons/sfcolored-plus.svg';
import { ReactComponent as RemoveIcon } from '../../../sf-svg-icons/sfcolored-minus.svg';

import FavoriteSrc from '../../../sf-svg-icons/heart-whitebackground.svg';
import FavoriteBorderedSrc from '../../../sf-svg-icons/heart-whitebackground-bordered.svg';
import InfoSrc from '../../../sf-svg-icons/info-whitebackground.svg';

import ReactCardFlip from 'react-card-flip';

const useStyles = makeStyles((theme) => ({
  button: {
    border: '1px solid' + appColors.border,
    borderRadius: 5,
    backgroundColor: 'white',
    color: appColors.primary,
    opacity: 0.9,
  },

  foodGridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    opacity: (props) => (props.isInDay ? '1' : '.6'),
  },

  foodNameTypography: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    fontSize: '14px',
  },

  itemCountAndPrice: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: 'grid',
    alignItems: 'flex-end',
    gridTemplateColumns: '1fr 2fr',
    flexGrow: 1,
    flexBasis: 1,
    paddingBottom: theme.spacing(1),
  },

  itemCount: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '1fr 1fr 1fr',
  },

  itemCountBtn: {
    color: '#E88330',
    background: '#397D87',
    width: '60px',
    height: '40px',
    variant: 'contained',
    borderRadius: '0px',
  },

  itemCountTypog: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },

  itemPrice: {
    fontWeight: 'bold',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'end',
  },

  test: {
    backgroundColor: '#397D87',
    color: '#E88330',
    fontSize: '2em',
  },

  checkoutInfo: {
    borderRadius: '12px',
    border: '1px solid #e8cfba',
    width: '250px',
    height: '78px',
    display: 'flex',
    flexDirection: 'column',
    background: (props) => (props.id !== 0 ? '#F4860933' : 'white'),
  },

  itemInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  itemInfoCard: {
    width: '60px',
    height: '60px',
    borderRadius: '10px',
  },
}));
// console.log("in entry")
// Defining our own hook to force a re-render
function useForceUpdate() {
  const [dummy, setDummy] = useState(0);
  return () => setDummy(dummy => dummy + 1);
}

function Entry(props) {
  // console.log('entry')
  const [hearted, setHearted] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isInDay, setIsInDay] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const forceUpdate = useForceUpdate();

  // const store = useContext(storeContext);
  const currCartItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
  const currCartTotal = parseInt(localStorage.getItem('cartTotal') || '0');
  // console.log("@456qw In entry 1",currCartItems)
  // console.log("@456qw In entry 2",currCartTotal)
  // const stylesProps = {
  //   id: props.id in store.cartItems ? store.cartItems[props.id]['count'] : 0,
  //   hearted: hearted,
  //   isInDay: isInDay,
  // };

  const stylesProps = {
    id: props.id in currCartItems ? currCartItems[props.id]['count'] : 0,
    hearted: hearted,
    isInDay: isInDay,
  };

  const classes = useStyles(stylesProps);

  //const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let isInDay = false;
    let isInCategory = false;

    const isFavoritedAndInFavorites =
      props.categoriesClicked.has('favorite') &&
      props.favorite == 'TRUE';

    if (props.favorite === 'TRUE') {
      setHearted(true);
    }

    for (const farm in props.business_uids) {
      props.farmDaytimeDict[farm].forEach((daytime) => {
        if (props.dayClicked === daytime) isInDay = true;
      });
    }

    if (props.categoriesClicked.has(props.type)) isInCategory = true;

    setIsShown(
      props.categoriesClicked.size == 0 ||
        isInCategory ||
        isFavoritedAndInFavorites
    );
    setIsInDay(isInDay);
  }, [
    props.dayClicked,
    props.farmsClicked,
    props.categoriesClicked,
    props.business_uids,
    props.favorite,
    props.type,
    props.farmDaytimeDict,
  //  store.cartItems,
  //  store.products

  ]);

  function decrease() {
    const currCartItems2 = JSON.parse(localStorage.getItem('cartItems')|| '{}')
    const currCartTotal2 = parseInt(localStorage.getItem('cartTotal')|| '0')
    if (props.id in currCartItems2) {

      const itemCount = currCartItems2[props.id]['count'];
      // const itemCount = store.cartItems[props.id]['count'];
      // console.log("@456qw In decrease 1 ",itemCount)
      if (itemCount > 0) {
        if (itemCount === 1) {
          let clone = Object.assign({}, currCartItems2);
          delete clone[props.id];
          localStorage.setItem('cartItems', JSON.stringify(clone));
          // console.log("@456qw In decrease 2 --- deleted")
          delete props.cartItems[props.id];
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

          // store.cartItems[props.id] = item;
        }
        localStorage.setItem('cartTotal', currCartTotal2 - 1);
        props.setCartTotal(currCartTotal2 - 1); 
        forceUpdate();
      }
    }
  }

  function increase() {
    const currCartItems2 = JSON.parse(localStorage.getItem('cartItems')|| '{}')
    const currCartTotal2 = parseInt(localStorage.getItem('cartTotal')|| '0')
    // console.log("@456qw in increase 0 ",currCartItems2)
    const item =
      props.id in currCartItems2
        ? {  count: currCartItems2[props.id]['count'] + 1 }
        : {  count: 1 };
    
    // console.log("@456qw in increase 1 ",item)
    // console.log("@123 before updating ",localStorage.getItem('cartItems'))
    const newCartItems = {
      ... currCartItems2,
      [props.id]: item,
    };
    // console.log("@123 after updating ",localStorage.getItem('cartItems'))
    // console.log("@456qw in increase 2 ",newCartItems)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('cartTotal', `${currCartTotal2 + 1}`);
    // store.cartItems[props.id] = item;
    props.setCartItems(newCartItems);
    props.setCartTotal(currCartTotal2 + 1);
    // forceUpdate();
  }

  const toggleHearted = () => {
    console.log('Heart');
    if (props.name == 'Beets - Golden')
      console.log('props.item_index = ', props.item_index);
    props.products[props.index].favorite =
          props.favorite == 'FALSE' ? 'TRUE' : 'FALSE';
    setHearted(!hearted);
  };

  function flipped() {
    setIsFlipped(true);
  }

  function notFlipped() {
    setIsFlipped(false);
  }

  return isShown ? (
    <Grid xs={6} md={4} lg={3} item className={classes.foodGridItem}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card
          style={{
            borderRadius: '12px',
            backgroundImage: `url("${props.img.replace(' ', '%20')}")`,
            height: '200px',
            width: '250px',
            backgroundSize: '250px 200px',
            display: 'flex',
            flexDirection: 'column',
          }}
          backgroundImage={`url("${props.img.replace(' ', '%20')}")`}
        >
          <Box className={classes.itemInfo}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Button
                className={classes.itemInfoBtn}
                onClick={(toggleHearted)}
                disabled={!isInDay}
              >
                <img src={hearted ? FavoriteSrc : FavoriteBorderedSrc} alt = {''} />
              </Button>
            </Box>

            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                className={classes.itemInfoBtn}
                onClick={flipped}
                disabled={!isInDay}
              >
                <img src={InfoSrc} alt = {''} />
              </Button>
            </Box>
          </Box>
          <Box style={{ flexGrow: '1' }}>
            <Typography hidden={isInDay} style={{ fontWeight: 'bold' }}>
              {props.dayClicked
                ? `Product unavailable on
             ${props.dayClicked.split('&')[0]}
            ${props.dayClicked.split('&')[1]}`
                : `Date not selected`}
            </Typography>
          </Box>
        </Card>

        <Box>
          <Box className={classes.itemInfo}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Button onClick={toggleHearted} disabled={!isInDay}>
                <img src={hearted ? FavoriteSrc : FavoriteBorderedSrc} alt = {''} />
              </Button>
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                className={classes.itemInfoBtn}
                onClick={notFlipped}
                disabled={!isInDay}
              >
                <img src={InfoSrc} alt = {''} />
              </Button>
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '142px',
              width: '250px',
              backgroundSize: '250px 200px',
            }}
          >
            <Typography>{props.info}</Typography>
          </Box>
        </Box>
      </ReactCardFlip>

      <Card className={classes.checkoutInfo}>
        <Typography className={classes.foodNameTypography}>
          {props.name}
        </Typography>

        <Box className={classes.itemCountAndPrice}>
          <Box className={classes.itemCount}>
            <IconButton
              style={{
                padding: '0px',
              }}
              disabled={!isInDay}
              onClick={decrease}
            >
              <SvgIcon component={RemoveIcon} fontSize="large" />
            </IconButton>

            <Typography className={classes.itemCountTypog}>
              {props.id in currCartItems ?
                currCartItems[props.id]['count']
                : 0}
            </Typography>

            <IconButton
              onClick={increase}
              style={{ padding: '0px' }}
              disabled={!isInDay}
            >
              <SvgIcon component={AddIcon} fontSize="large" />
            </IconButton>
          </Box>

          <Typography className={classes.itemPrice}>
            {`$${props.price.toFixed(2)} ${
              props.unit === 'each' ? '(' + props.unit + ')' : '/ ' + props.unit
            }`}
          </Typography>
         
        </Box>
      </Card>
    </Grid>
  ) : (
    ''
  );
}

const set_equality = (set1, set2) => {
  if (set1.size !== set2.size)
    return false;
  
  for (const e1 of set1)
  {
    if (!set2.has(e1))
      return false;
  }

  return true;
};

export default React.memo(Entry, (prevProps, nextProps) => {
  if (prevProps.itemCount != nextProps.itemCount || !set_equality(prevProps.categoriesClicked, nextProps.categoriesClicked)) {
    return false;
  }

  return true;
}
);
