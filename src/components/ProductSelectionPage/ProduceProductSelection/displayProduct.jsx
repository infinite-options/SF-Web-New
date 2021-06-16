import React, { useContext, useEffect, useState } from 'react';
import Entry from './Entry';
import ProdSelectContext from '../ProdSelectContext';
import storeContext from '../../Store/storeContext';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import appColors from '../../../styles/AppColors';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import { Carousel } from 'react-responsive-carousel';

const theme2 = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      size550: 550,
      sm: 600,
      size880: 880,
      md: 960,
      size1140: 1140,
      lg: 1280,
      size1315: 1315,
      size1720: 1720,
      xl: 1920,
      size2100: 2100,
      size2490: 2490,
      size2880: 2880,
      size3270: 3270,
      size3660: 3660,
      size4050: 4050,

      size0: 640,
      size1: 770,
      size3: 1500,
      size5: 2300,
      size6: 2700,
    },
  },
});

console.log('Theme2 = ', theme2.breakpoints);

const useStyles = makeStyles((theme) => ({
  itemDisplayContainer: {
    backgroundColor: '#F1F4F4',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },

  productsPaperContainer: {
    backgroundColor: appColors.componentBg,
    marginTop: theme.spacing(2),
  },

  imageItem: {
    borderRadius: 10,
    paddingLeft: '6rem',
  },

  entryContainer: {
    display: 'grid',
    // gridTemplateColumns: '1fr 1fr 1fr',
    justifyItems: 'center',

    [theme2.breakpoints.up('xs')]: {
      gridTemplateColumns: '1fr',
    },
    [theme2.breakpoints.up('size550')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme2.breakpoints.up('size880')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme2.breakpoints.up('size1140')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme2.breakpoints.up('size1720')]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    [theme2.breakpoints.up('size2100')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
    [theme2.breakpoints.up('size2490')]: {
      gridTemplateColumns: 'repeat(6, 1fr)',
    },
    [theme2.breakpoints.up('size2880')]: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
    [theme2.breakpoints.up('size3270')]: {
      gridTemplateColumns: 'repeat(8, 1fr)',
    },
    [theme2.breakpoints.up('size3660')]: {
      gridTemplateColumns: 'repeat(9, 1fr)',
    },
    [theme2.breakpoints.up('size4050')]: {
      gridTemplateColumns: 'repeat(10, 1fr)',
    },
  },
}));

// DONE: add unit, each is as is, anything else is '/' or 'per'
function createProduct2(product) {
  //  console.warn(product);
  return (
    <Entry
      favorite={product.favorite}
      name={product.item_name}
      desc={product.item_desc}
      price={product.item_price}
      businessPrice={product.business_price}
      img={product.item_photo}
      type={product.item_type}
      unit={product.item_unit}
      isTaxable={product.taxable === 'TRUE'}
      business_uids={product.business_uids} // This is not from the database and not used, it is parsed in store within the last part of the getBusinesses method
      business_uid={product.lowest_price_business_uid} // This is the business ID with the lowest price, also parsed from the getBusinesses method
      id={product.item_uid}
      key={product.item_uid}
      info={product.item_info}
    />
  );
}

// TEST: We are considering matching on item_name, item_desc and item_price.
// If they are identical we should choose the one with the lowest business_price.
// If Identical still then we should select the one with the earliest created_at date

function DisplayProduct() {
  const classes = useStyles();

  const productSelect = useContext(ProdSelectContext);
  const store = useContext(storeContext);

  const [FruitDisplayType, setFruitDisplayType] = useState(false);
  const [OtherDisplayType, setOtherDisplayType] = useState(false);
  const [VegetableDisplayType, setVegetableDisplayType] = useState(false);
  const [GiftCardDisplayType, setGiftCardDisplayType] = useState(false);


  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', updateWindowHeight);
    return () => window.removeEventListener('resize', updateWindowHeight);
  });

  const updateWindowHeight = () => {
    setWindowHeight(window.innerHeight);
  };

  const [displayMessage, setDisplayMessage] = useState('');

  // console.warn(store);

  // DONE: add date to expected delivery
  // DONE: clear out expected delivery if unclicked
  useEffect(() => {
    let message = '';
    if (store.dayClicked === '') {
      message = 'Start by selecting a delivery date and time.';

      if (store.cartTotal > 0) {
        message = 'Here are the items currently in your cart';
      }
    } else {
      message = 'Produce available for delivery on ' + store.expectedDelivery;
    }
    //   console.log("store length",store.products.length)
    if (store.products.length === 0 && !store.productsLoading) {
      message =
        'Sorry, we could not find any produce that can be delivered to your provided address';
    }
    setDisplayMessage(message);
  }, [
    store.dayClicked,
    store.products,
    store.productsLoading,
    store.cartTotal,
    store.expectedDelivery,
  ]);

  function handleClickOther() {
    setOtherDisplayType(!OtherDisplayType);
  }

  function handleClickGiftCard() {
    setGiftCardDisplayType(!GiftCardDisplayType);
  }

  function handleClickFruit() {
    setFruitDisplayType(!FruitDisplayType);
  }

  function handleClickVegetable() {
    setVegetableDisplayType(!VegetableDisplayType);
  }

  if (!store.productsLoading && !productSelect.itemError) {
    return (
      <>
        <Box marginLeft="1rem" marginRight="0.2rem">
          <Box fontSize={22} color={appColors.paragraphText}>
            {displayMessage}
          </Box>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1
              style={{
                textDecoration: 'underline',
                color: appColors.secondary,
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              Vegetables
            </h1>
            <div style={{ display: 'flex' }}>
              <Button
                varient="text"
                size="small"
                style={{ color: '#ff8500', backgroundColor:'#ffffff',
      
              }}
                onClick={handleClickVegetable}
              >
                See all Vegetables
              </Button>
              <Box
                style={{
                  width: '1rem',
                  height: '1rem',
                  marginTop: '2rem',
                  backgroundSize: '1rem',
                  backgroundImage: VegetableDisplayType
                    ? `url(${'./store_img/seeAllUp.png'})`
                    : `url(${'./store_img/seeAllDown.png'})`,
                }}
              ></Box>
            </div>
          </div>

          <Box  width={window.innerWidth < 1200 ? window.innerWidth : window.innerWidth - 500}  hidden={VegetableDisplayType}>
            <Carousel
               itemClass={classes.imageItem}
               showArrows={true}
               autoPlay={true}
               interval ={2000}
               showIndicators={false}
               centerMode={true}
               swipeable={false}
               infiniteLoop={true}
               centerSlidePercentage={
                 window.innerWidth < 1200 ?
                 window.innerWidth < 600 ? 100 : 40 : 30
              }
              width= "100%"
            >
              {store.productsVegetable.map(createProduct2)}
            </Carousel> 
          </Box>
          
          <Box
            className="responsive-display-produce"
            hidden={!VegetableDisplayType}
            height={windowHeight - 165}
            mb={2}
            style={{
              backgroundColor: appColors.componentBg,
              borderRadius: 10,
              paddingBottom: '95px',
            }}
          >
            <Box mt={2} />

            <Paper
              elevation={0}
              style={{
                backgroundColor: appColors.componentBg,
                maxHeight: '100%',
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Box width="97%" justifyContent="center">
                <Box
                  className={classes.entryContainer}
                >
                  {store.productsVegetable.map(createProduct2)}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box style={{ backgroundColor: appColors.componentBg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1
              style={{
                textDecoration: 'underline',
                color: appColors.secondary,
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              {' '}
              Fruits{' '}
            </h1>
            <div style={{ display: 'flex' }}>
              <Button   varient="text"
                size="small"
                style={{ color: '#ff8500', backgroundColor:'#ffffff',}}  onClick = {handleClickFruit}> See all Fruits </Button>
            <Box  style={{
            width: '1rem',
            height: '1rem',
            marginTop:'2rem',
            backgroundSize:'1rem',
            backgroundImage: FruitDisplayType? `url(${
              './store_img/seeAllUp.png' })` : `url(${
                './store_img/seeAllDown.png'
            })`,}}>

          </Box>
            </div>
          </div>
          <Box  width={window.innerWidth < 1200 ? window.innerWidth : window.innerWidth - 500} hidden={FruitDisplayType}>
            <Carousel
               itemClass={classes.imageItem}
               showArrows={true}
               autoPlay={true}
               interval ={2000}
               showIndicators={false}
               centerMode={true}
               swipeable={false}
               infiniteLoop={true}
               centerSlidePercentage={
                 window.innerWidth < 1200 ?
                 window.innerWidth < 600 ? 100 : 40 : 30
              }
              width= "100%"
            >
              {store.productsFruit.map(createProduct2)}
            </Carousel> 
          </Box>
          
          <Box
            className="responsive-display-produce"
            hidden={!FruitDisplayType}
            height={windowHeight - 165}
            mb={2}
            style={{
              backgroundColor: appColors.componentBg,
              borderRadius: 10,
              paddingBottom: '95px',
            }}
          >
            <Box mt={2} />

            <Paper
              elevation={0}
              style={{
                backgroundColor: appColors.componentBg,
                maxHeight: '100%',
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Box width="97%" justifyContent="center">
                <Box className={classes.entryContainer}>
                  {store.productsFruit.map(createProduct2)}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box style={{ backgroundColor: appColors.componentBg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1
              style={{
                textDecoration: 'underline',
                color: appColors.secondary,
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              {' '}
              GiftCards{' '}
            </h1>
            <div style={{ display: 'flex' }}>
              <Button   varient="text"
                size="small"
                style={{ color: '#ff8500', backgroundColor:'#ffffff',}}  onClick = {handleClickGiftCard}> See all GiftCards </Button>
            <Box  style={{
            width: '1rem',
            height: '1rem',
            marginTop:'2rem',
            backgroundSize:'1rem',
            backgroundImage: GiftCardDisplayType? `url(${
              './store_img/seeAllUp.png' })` : `url(${
                './store_img/seeAllDown.png'
            })`,}}>
          </Box>
            </div>
          </div>
          <Box  width={window.innerWidth < 1200 ? window.innerWidth : window.innerWidth - 500}  hidden={GiftCardDisplayType}>
            <Carousel
               itemClass={classes.imageItem}
               showArrows={true}
               autoPlay={true}
               interval ={2000}
               showIndicators={false}
               centerMode={true}
               swipeable={false}
               infiniteLoop={true}
               centerSlidePercentage={
                 window.innerWidth < 1200 ?
                 window.innerWidth < 600 ? 100 : 40 : 30
              }
              width= "100%"
            >
              {store.productsGiftCard.map(createProduct2)}
            </Carousel> 
          </Box>
          <Box
            className="responsive-display-produce"
            hidden={!GiftCardDisplayType}
            height={windowHeight - 165}
            mb={2}
            style={{
              backgroundColor: appColors.componentBg,
              borderRadius: 10,
              paddingBottom: '95px',
            }}
          >
            <Box mt={2} />

            <Paper
              elevation={0}
              style={{
                backgroundColor: appColors.componentBg,
                maxHeight: '100%',
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Box width="97%" justifyContent="center">
                <Box className={classes.entryContainer}>
                  {store.productsGiftCard.map(createProduct2)}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box style={{ backgroundColor: appColors.componentBg }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1
              style={{
                textDecoration: 'underline',
                color: appColors.secondary,
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              {' '}
              Others{' '}
            </h1>
            <div style={{ display: 'flex' }}>
              <Button  varient="text"
                size="small"
                style={{ color: '#ff8500', backgroundColor:'#ffffff',}}  onClick = {handleClickOther}> See all Others </Button>
            <Box  style={{
            width: '1rem',
            height: '1rem',
            marginTop:'2rem',
            backgroundSize:'1rem',
            backgroundImage: OtherDisplayType? `url(${
              './store_img/seeAllUp.png' })` : `url(${
                './store_img/seeAllDown.png'
            })`,}}>
          </Box>
            </div>
          </div>
          <Box  width={window.innerWidth < 1200 ? window.innerWidth : window.innerWidth - 500}  hidden={OtherDisplayType}>
            <Carousel
               itemClass={classes.imageItem}
               showArrows={true}
               autoPlay={true}
               interval ={2000}
               showIndicators={false}
               centerMode={true}
               swipeable={false}
               infiniteLoop={true}
               centerSlidePercentage={
                 window.innerWidth < 1200 ?
                 window.innerWidth < 600 ? 100 : 40 : 30
              }
              width= "100%"
            >
              {store.productsDessert.map(createProduct2)}
            </Carousel> 
          </Box>
          <Box
            className="responsive-display-produce"
            hidden={!OtherDisplayType}
            height={windowHeight - 165}
            mb={2}
            style={{
              backgroundColor: appColors.componentBg,
              borderRadius: 10,
              paddingBottom: '95px',
            }}
          >
            <Box mt={2} />

            <Paper
              elevation={0}
              style={{
                backgroundColor: appColors.componentBg,
                maxHeight: '100%',
                width: '100%',
                overflow: 'auto',
              }}
            >
              <Box width="97%" justifyContent="center">
                <Box className={classes.entryContainer}>
                  {store.productsDessert.map(createProduct2)}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <Box
        p={2}
        style={{
          display: 'flex',
          backgroundColor: appColors.componentBg,
          borderRadius: 10,
        }}
      >
        <Typography>
          Thank you for waiting, we are loading the products for you.
        </Typography>
      </Box>
    );
  }
}

export default DisplayProduct;
