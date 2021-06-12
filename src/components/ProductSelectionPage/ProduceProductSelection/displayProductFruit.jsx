import React, { useContext, useEffect, useState } from 'react';
import Entry from './Entry';
import ProdSelectContext from '../ProdSelectContext';
import storeContext from '../../Store/storeContext';
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import appColors from '../../../styles/AppColors';
import { set } from 'js-cookie';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import ItemCategory from '../../FilterProductSelection/ItemCategory';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GridList from '@material-ui/core/GridList';

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
      marginLeft: '6rem',
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

  function createProduct3(product) {
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


  function DisplayProductFruit() {
    const classes = useStyles();
  
    const productSelect = useContext(ProdSelectContext);
    const store = useContext(storeContext);

    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

    useEffect(() => {
      window.addEventListener('resize', updateWindowHeight);
      return () => window.removeEventListener('resize', updateWindowHeight);
    });
  
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    if (!store.productsLoading && !productSelect.itemError) {
        return (
          <>

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
            </div>
          </div>
          <Box
            className="responsive-display-produce"
            // width="100%"
        //    hidden={!FruitDisplayType}
            height={windowHeight - 165}
            // ml={2}
            // p={3}
            // pb={5}
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
                  {store.productsFruit.map(createProduct3)}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        </>
         );
        } 
        else {
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

export default DisplayProductFruit;
