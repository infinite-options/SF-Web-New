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
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { ContactsOutlined } from '@material-ui/icons';

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

var responsive = {
  superLargeDesktop: {
    breakpoint: { max: 40, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
    marginLeft: '6rem',
  },

  entryContainer: {
    display: 'grid',
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
function createProduct2(product, index, setCartTotal, cartItems, setCartItems, products, dayClicked, farmDaytimeDict, categoriesClicked) {
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
      cartItems= {cartItems}
      setCartItems= {setCartItems}
      cartTotal = {parseInt(localStorage.getItem('cartTotal') || '0')}
      setCartTotal = {setCartTotal}
      itemCount = {
        product.item_uid in cartItems ?
        cartItems[product.item_uid]['count'] : 0
      }
      products = {products}
      dayClicked = {dayClicked}
      farmDaytimeDict = {farmDaytimeDict}
      categoriesClicked = {categoriesClicked}
      index = {index}
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
  // console.log('productCategoriesDict = ', store.productCategoriesDict);
  
  const [FruitDisplayType, setFruitDisplayType] = useState(false);
  const [OtherDisplayType, setOtherDisplayType] = useState(false);
  const [VegetableDisplayType, setVegetableDisplayType] = useState(false);
  const [giftDisplayType, setGiftDisplayType] = useState(false);

  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
  // console.log("@456qw in displayProduct ",store)
  useEffect(() => {
    // console.log('useEffect2 in DP');
    window.addEventListener('resize', updateWindowHeight);
    return () => window.removeEventListener('resize', updateWindowHeight);
  });

  const updateWindowHeight = () => {
    // console.log('setting window height');
    setWindowHeight(window.innerHeight);
  };

  const [displayMessage, setDisplayMessage] = useState('');

  // DONE: add date to expected delivery
  // DONE: clear out expected delivery if unclicked
  useEffect(() => {
    // console.log('useEffect1 in DP');
    let message = '';
    if (store.dayClicked === '') {
      message = 'Start by selecting a delivery date and time.';

      if (store.cartTotal > 0) {
        message = 'Here are the items currently in your cart';
      }
    } else {
      message = 'Produce available for delivery on ' + store.expectedDelivery;
    }
    if (store.products.length === 0 && !store.productsLoading) {
      message =
        'Sorry, we could not find any produce that can be delivered to your provided address';
    }
    setDisplayMessage(message);
    // console.log('in use effect: prodCatDict = ', store.productCategoriesDict);
  }, [
    store.dayClicked,
    store.products,
    store.productsLoading,
    store.cartTotal,
    store.productCategoriesDict
  ]);

  function handleClickOther() {
    setOtherDisplayType(!OtherDisplayType);
  }

  function handleClickFruit() {
    setFruitDisplayType(!FruitDisplayType);
  }

  function handleClickVegetable() {
    setVegetableDisplayType(!VegetableDisplayType);
  }

  function handleClickGift() {
    setGiftDisplayType(!giftDisplayType);
  }

  if (store.productCategoriesDict && !store.productsLoading && !productSelect.itemError) {
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
                style={{ color: '#ff8500' }}
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
          <Box hidden={VegetableDisplayType}>
            <Carousel
              itemClass={classes.imageItem}
              centerMode={true}
              responsive={responsive}
              autoPlay = {true}
              autoPlaySpeed = {2000}
              infinite = {true}
              slidesToSlide = {2}
            >
              {store.productCategoriesDict['vegetable'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['vegetable'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
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
                  {store.productCategoriesDict['vegetable'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['vegetable'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box marginLeft = '1rem' marginRight = '.2rem' style={{ backgroundColor: appColors.componentBg }}>
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
              <Button style={{color:"#ff8500"}}  onClick = {handleClickFruit}> See all Fruits </Button>
              <Box  style={{
                width: '1rem',
                height: '1rem',
                marginTop:'2rem',
                backgroundSize:'1rem',
                backgroundImage: FruitDisplayType? `url(${
                  './store_img/seeAllUp.png' })` : `url(${
                    './store_img/seeAllDown.png'
                })`,}}
              >
              </Box>
            </div>
          </div>
          <Box hidden={FruitDisplayType}>
            <Carousel
              itemClass={classes.imageItem}
              centerMode={true}
              responsive={responsive}
              autoPlay = {true}
              autoPlaySpeed = {2000}
              infinite = {true}
              slidesToSlide = {2}
            >
              {store.productCategoriesDict['fruit'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['fruit'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))} 
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
                  {store.productCategoriesDict['fruit'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['fruit'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        <Box marginLeft = '1rem' marginRight = '.2rem' style={{ backgroundColor: appColors.componentBg }}>
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
              <Button style={{color:"#ff8500"}}  onClick = {handleClickOther}> See all Others </Button>
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
          <Box hidden={ OtherDisplayType  }>

            <Carousel
              itemClass={classes.imageItem}
              centerMode={true} 
              responsive={responsive}
              autoPlay = {true}
              autoPlaySpeed = {2000}
              infinite = {true}
              slidesToSlide = {2}
            >
              {store.productCategoriesDict['dessert'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['dessert'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))} 
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
                  {store.productCategoriesDict['dessert'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['dessert'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      
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
              Gift Cards
            </h1>
            <div style={{ display: 'flex' }}>
              <Button
                varient="text"
                style={{ color: '#ff8500' }}
                onClick={handleClickGift}
              >
                See all Gift Cards
              </Button>
              <Box
                style={{
                  width: '1rem',
                  height: '1rem',
                  marginTop: '2rem',
                  backgroundSize: '1rem',
                  backgroundImage: giftDisplayType
                    ? `url(${'./store_img/seeAllUp.png'})`
                    : `url(${'./store_img/seeAllDown.png'})`,
                }}
              ></Box>
            </div>
          </div>
          <Box hidden={giftDisplayType}>
            <Carousel
              itemClass={classes.imageItem}
              centerMode={true}
              responsive={responsive}
              autoPlay = {true}
              autoPlaySpeed = {2000}
              infinite = {true}
              slidesToSlide = {2}
            >
              {store.productCategoriesDict['gift-card'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['gift-card'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
            </Carousel>
          </Box>
          <Box
            className="responsive-display-produce"
            hidden={!giftDisplayType}
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
                  {store.productCategoriesDict['gift-card'].map((product, index) => createProduct2(product, index, store.setCartTotal, store.cartItems, store.setCartItems, store.productCategoriesDict['gift-card'], store.dayClicked, store.farmDaytimeDict, productSelect.categoriesClicked))}
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
