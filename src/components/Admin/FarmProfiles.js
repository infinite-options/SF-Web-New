import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Button,
  TextField,
  Link,
  FormControl,
  Radio,
  Modal,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { AdminFarmContext } from './AdminFarmContext';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AuthContext } from '../../auth/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import CustomerSrc from '../../sf-svg-icons/Polygon1.svg';
import Popover from '@material-ui/core/Popover';
import appColors from '../../styles/AppColors';
import save from '../icon/save.png';
import del from '../icon/delete.png';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import blankImg from '../../images/blank_img.svg';
import styles from './farmprofile.module.css';
import FarmProfileItems from './FarmProfileItems';


const BUSINESS_DETAILS_URL =
  'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/';
const API_URL =
  'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/';
const GreenRadio = withStyles({
  root: {
    color: appColors.primary,
    '&$checked': {
      color: appColors.primary,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
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
  infoRow: {
    borderBottom: '1px solid #747474',
  },
  desc: {
    textAlign: 'left',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.48px',
    color: '#000000D9',
    opacity: 1,
    alignItems: 'center',
    padding: '10px 11px',
  },
  profileContainer: {
    display: 'flex',
  },
  profileSection: {
    flex: '1 1 auto',
  },
  profileSection1: {
    width: '100%',
  },
  profileSection2: {
    width: '50%',
  },
  profileHeader: {
    textAlign: 'left',
    font: 'normal normal 600 16px SF Pro Text',
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
    padding: '3px',
  },
  profileInput: {
    width: 'calc(100% - 20px)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #747474',
    margin: '3px',
  },
  profileData: {
    textAlign: 'left',
    font: 'normal normal medium 14px SFProText-Medium',
    letterSpacing: '-0.34px',
    color: '#000000D9',
    opacity: 1,
    textTransform: 'none',
  },
}));

const newFarmBusiSelect = {
  business_uid: "",
  business_created_at: "",
  business_name: "New Farm",
  business_type: "",
  business_desc: "",
  business_association: "[]",
  business_contact_first_name: "",
  business_contact_last_name: "",
  business_phone_num: "",
  business_phone_num2: "",
  business_email: "",
  business_hours: "{\"Friday\": [\"08:00\", \"17:00\"], \"Monday\": [\"08:00\", \"17:00\"], \"Sunday\": [\"08:00\", \"17:00\"], \"Tuesday\": [\"08:00\", \"17:00\"], \"Saturday\": [\"08:00\", \"17:00\"], \"Thursday\": [\"08:00\", \"17:00\"], \"Wednesday\": [\"08:00\", \"17:00\"]}",
  business_accepting_hours: "{\"Friday\": [\"00:00:00\", \"23:59\"], \"Monday\": [\"00:00:00\", \"23:59\"], \"Sunday\": [\"08:00:00\", \"23:59\"], \"Tuesday\": [\"00:00:00\", \"13:00\"], \"Saturday\": [\"00:00:00\", \"13:00\"], \"Thursday\": [\"00:00:00\", \"23:59\"], \"Wednesday\": [\"00:00\", \"23:59\"]}",
  business_delivery_hours: "{\"Friday\": [\"00:00:00\", \"00:00:00\"], \"Monday\": [\"00:00:00\", \"00:00:00\"], \"Sunday\": [\"10:00:00\", \"12:59:00\"], \"Tuesday\": [\"00:00:00\", \"00:00:00\"], \"Saturday\": [\"00:00:00\", \"00:00:00\"], \"Thursday\": [\"00:00:00\", \"00:00:00\"], \"Wednesday\": [\"10:00:00\", \"12:59:00\"]}",
  business_address: "",
  business_unit: "",
  business_city: "",
  business_state: "",
  business_zip: "",
  business_longitude: "",
  business_latitude: "",
  business_EIN: "",
  business_WAUBI: "",
  business_license: "",
  business_USDOT: "",
  bus_notification_approval: "",
  can_cancel: 1,
  delivery: 1,
  reusable: 1,
  business_image: "https://s3-us-west-1.amazonaws.com/servingnow/kitchen_imgs/472d893494184904a5281e39fe918053",
  business_password: "",
  bus_guid_device_id_notification: "null",
  platform_fee: 0,
  transaction_fee: 0,
  revenue_sharing: 0,
  profit_sharing: 0,
  business_links: "{\"other\": \"\", \"website\": \"\", \"facebook\": \"\", \"instagram\": \"\"}",
  business_status: "ACTIVE"
};

const newFarmDetail = {
  business_name: 'New Farm',
  business_type: '',
  description: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  phone2: '',
  street: '',
  unit: '',
  city: '',
  state: '',
  zip: '',
};

function fetchBusinessInfo(setselectedBusiness, id, setProfit1) {
  fetch(
    `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farmer_order_summary_page/2021-06-20,` +
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
// function fetchDeliveryDetails(setDeliveryDetails, id) {
//   fetch(
//     `https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_delivery_details/` +
//       id,
//     {
//       method: 'GET',
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw response;
//       }
//       return response.json();
//     })
//     .then((json) => {
//       const deliveryDetails = json.result;
//       setDeliveryDetails(deliveryDetails);
//       console.log('Delivery Details:', deliveryDetails);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

function FarmProfiles() {
  const classes = useStyles();
  const context = useContext(AdminFarmContext);
  const Auth = useContext(AuthContext);
  const [settings, setSettings] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [farmerInfo, setfarmerInfo] = useState([]);
  const [busiSelect, setBusiSelect] = useState([]);
  
  const [SelectedBusiness, setselectedBusiness] = useState([]);
  const [profit1, setProfit1] = useState([]);
  const [products, setProducts] = useState([]);
  // const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [allZones, setAllZones] = useState([]);
  const [businessZones, setBusinessZones] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [confirmPass, setConfirmPass] = useState('');
  // const [saltPack, setSaltPack] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [produceDict, setProduceDict] = useState({});
  //use this state below to set up information of middle column
  const [businessAndFarmDetail, setBusFarm] = useState({});
  const [passwordHere, setPass] = useState('');
  //for sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  // const [image,setImage]=useState({});
  const [imageUpload, setImageUpload] = useState({
    file: null,
    path: settings ? settings.business_image : '',
  });
  // Regular Hours for Business
  const [regularHours, setRegularHours] = useState([]);
  const [acceptTime, setAcceptTime] = useState(context.timeChange);
  const [deliveryTime, setDeliveryTime] = useState(context.deliveryTime);
  const [farmerID, setFarmerID] = useState('');

  // To determine if editing farm or creating new farm
  const [newFarm, setNewFarm] = useState(false);

  useEffect(() => {
    farmerObj();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, []);

  // Get list of zones for adding business
  useEffect(() => {
    axios
      .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_zones/get',{})
      .then((res) => {
        // console.log('zones',res.data.result);
        setAllZones(res.data.result);
      })
      .catch((err) => {
        if(err.response) {
          console.log(err.response);
        }
        console.log(err);
      })
  },[])

  const handleImgChange = (e) => {
    const files = e.target.files;
    if (files.length > 0)
      setImageUpload({
        file: files[0],
        path: URL.createObjectURL(files[0]),
      });
  };

  //item price and status change
  const handleProductChange = (e) => {
    let val = e.target.value;
    let id = e.target.id;
    let idx = e.target.name;
    // console.log(e.target,idx)
    let tmpDic = products;
    tmpDic.map((items,index)=>{
      if (items['item_uid'] === idx){
        tmpDic[index][id] = val;
      }
    })
    
    setProducts(tmpDic);

    setSelectedProduct((prevState) => ({ ...prevState, [id]: val }));
    
  };
  //farm item update
  
  const handleSave = (id, action) => {
    console.log("test 123",selectedProduct)
    axios
      .post(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_farmer_item_admin/' +
          action,
          selectedProduct
        // {
        //   "supply_uid": id,
        // }
      )
      .then((response) => {
        setDialogOpen(true);
      })
      .catch((er) => {
        console.log(er);
      });
      setOpenDiag(true)
  };

  // useEffect(() => {
  //   console.log(imageUpload);
  // }, [imageUpload]);

  //get items for each farm
  const fetchProducts = (id) => {
    if(id !== '' ) {
    setProducts([]);
    axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/admin_farmer_items/' +
          id
      )
      .then((response) => {
        setProducts(response.data.result.result);
        
        

        const temp_dict = {};
        response.data.result.result.map(
          (item) => (temp_dict[item.item_uid] = item)
        );
        setProduceDict(temp_dict);
      });
    };
  };

  const createFarm = (imageUrl) => {
    axios
    .get('https://dev.virtualearth.net/REST/v1/Locations/', {
      params: {
        CountryRegion: 'US',
        adminDistrict: businessAndFarmDetail.state,
        locality: businessAndFarmDetail.city,
        postalCode: businessAndFarmDetail.zip,
        addressLine: businessAndFarmDetail.street,
        key: process.env.REACT_APP_BING_LOCATION_KEY,
      },
    })
    // Successfully got long and lat
    .then((res) => {
      let locationApiResult = res.data;
      if (locationApiResult.statusCode === 200) {
        let locations = locationApiResult.resourceSets[0].resources;
        /* Possible improvement: choose better location in case first one not desired
         */
        let location = locations[0];
        let lat = location.geocodePoints[0].coordinates[0];
        let long = location.geocodePoints[0].coordinates[1];
        if (location.geocodePoints.length === 2) {
          lat = location.geocodePoints[1].coordinates[0];
          long = location.geocodePoints[1].coordinates[1];
        }
        var tempoData = {};
        tempoData.business_name = businessAndFarmDetail.business_name;
        tempoData.business_type = businessAndFarmDetail.business_type;
        tempoData.business_desc = businessAndFarmDetail.description;
        tempoData.business_contact_first_name = businessAndFarmDetail.firstName;
        tempoData.business_contact_last_name = businessAndFarmDetail.lastName;
        tempoData.business_phone_num = businessAndFarmDetail.phone;
        tempoData.business_phone_num2 = businessAndFarmDetail.phone2;
        tempoData.business_email = businessAndFarmDetail.email;
        tempoData.business_address = businessAndFarmDetail.street;
        tempoData.business_unit = businessAndFarmDetail.unit;
        tempoData.business_city = businessAndFarmDetail.city;
        tempoData.business_state = businessAndFarmDetail.state;
        tempoData.business_zip = businessAndFarmDetail.zip;
        tempoData.business_longitude = long.toString();
        tempoData.business_latitude = lat.toString();
        tempoData.business_EIN = '';
        tempoData.business_WAUBI = '';
        tempoData.business_license = '';
        tempoData.business_USDOT = '';
        tempoData.bus_notification_approval = '';
        if (cancellation.allowCancel === true) {
          tempoData.can_cancel = '1';
        } else {
          tempoData.can_cancel = '0';
        }
        if (deliverStrategy.pickupStatus === true) {
          tempoData.delivery = '0';
        } else {
          tempoData.delivery = '1';
        }
        if (storage.reusable === true) {
          tempoData.reusable = '1';
        } else {
          tempoData.reusable = '0';
        }
        tempoData.business_image = imageUrl;
        tempoData.business_password = 'pbkdf2:sha256:150000$zMHfn0jt$29cef351d84456b5f6b665bc2bbab8ae3c6e42bd0e4a4e896xxxxxxxxxxx';
        tempoData.platform_fee = '0';
        tempoData.transaction_fee = '0';
        tempoData.revenue_sharing = '0';
        tempoData.profit_sharing = '0';
        if (status.ACTIVE === true) {
          tempoData.business_status = 'ACTIVE';
        } else {
          tempoData.business_status = 'INACTIVE';
        }
        console.log('create business object', tempoData)
        axios
          .post(
            'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/Create',
            tempoData
          )
          .then((res) => {
            const newId = res.data.uid;
            const updateZoneObject = {
              bus_uid: newId,
              zone_uid: businessZones,
            }
            axios
              .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/add_business_to_zone', updateZoneObject)
              .then((res) => {
                if(res.data.code === 200) {
                  farmerObj();
                }
              })
              .catch((err) => {
                if(err.response) {
                  console.log(err.response);
                }
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    // Error for getting long and lat
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    })
  }

  const updateFarm = (imageUrl) => {
    axios
    .get('https://dev.virtualearth.net/REST/v1/Locations/', {
      params: {
        CountryRegion: 'US',
        adminDistrict: businessAndFarmDetail.state,
        locality: businessAndFarmDetail.city,
        postalCode: businessAndFarmDetail.zip,
        addressLine: businessAndFarmDetail.street,
        key: process.env.REACT_APP_BING_LOCATION_KEY,
      },
    })
    // Successfully got long and lat
    .then((res) => {
      let locationApiResult = res.data;
      if (locationApiResult.statusCode === 200) {
        let locations = locationApiResult.resourceSets[0].resources;
        /* Possible improvement: choose better location in case first one not desired
         */
        let location = locations[0];
        let lat = location.geocodePoints[0].coordinates[0];
        let long = location.geocodePoints[0].coordinates[1];
        if (location.geocodePoints.length === 2) {
          lat = location.geocodePoints[1].coordinates[0];
          long = location.geocodePoints[1].coordinates[1];
        }
        // Update current farm
        var tempoData = { ...settings };

        tempoData.business_name = businessAndFarmDetail.business_name;
        tempoData.business_type = businessAndFarmDetail.business_type;
        tempoData.business_desc = businessAndFarmDetail.description;

        tempoData.business_contact_first_name = businessAndFarmDetail.firstName;
        tempoData.business_contact_last_name = businessAndFarmDetail.lastName;
        tempoData.business_phone_num = businessAndFarmDetail.phone;
        tempoData.business_phone_num2 = businessAndFarmDetail.phone2;
        tempoData.business_email = businessAndFarmDetail.email;
        tempoData.business_address = businessAndFarmDetail.street;
        tempoData.business_unit = businessAndFarmDetail.unit;
        tempoData.business_city = businessAndFarmDetail.city;
        tempoData.business_state = businessAndFarmDetail.state;
        tempoData.business_zip = businessAndFarmDetail.zip;
        tempoData.business_longitude = long.toString();
        tempoData.business_latitude = lat.toString();
        tempoData.business_EIN = businessAndFarmDetail.businessEin;
        tempoData.business_WAUBI = businessAndFarmDetail.businessWaubi;
        tempoData.business_license = businessAndFarmDetail.businessLicense;
        tempoData.business_USDOT = businessAndFarmDetail.businessUsdot;

        tempoData.business_hours = regularHours;
        tempoData.business_accepting_hours = acceptTime;
        tempoData.business_delivery_hours = deliveryTime;
        
        
        
        
        tempoData.platform_fee = businessAndFarmDetail.platformFee.toString();
        tempoData.transaction_fee = businessAndFarmDetail.transactionFee.toString();
        tempoData.profit_sharing = businessAndFarmDetail.profitSharing.toString();
        tempoData.revenue_sharing = businessAndFarmDetail.revenueSharing.toString();
        // console.log(typeof tempoData.business_hours);

        if (typeof tempoData.business_hours === 'string' && tempoData.business_hours !== '') {
          tempoData.business_hours = JSON.parse(tempoData.business_hours);
        }

        if (typeof tempoData.business_accepting_hours === 'string' && tempoData.business_accepting_hours !== '') {
          tempoData.business_accepting_hours = JSON.parse(
            tempoData.business_accepting_hours
          );
        }

        if (typeof tempoData.business_delivery_hours === 'string' && tempoData.business_delivery_hours !== '') {
          tempoData.business_delivery_hours = JSON.parse(
            tempoData.business_delivery_hours
          );
        }

        if (typeof tempoData.business_association === 'string' && tempoData.business_association !== '') {
          tempoData.business_association = JSON.parse(
            tempoData.business_association
          );
        } else {
          tempoData.business_association = [];
        }

        //third column
        if (deliverStrategy.pickupStatus === true) {
          tempoData.delivery = '0';
        } else {
          tempoData.delivery = '1';
        }

        if (storage.reusable === true) {
          tempoData.reusable = '1';
        } else {
          tempoData.reusable = '0';
        }
        if (cancellation.allowCancel === true) {
          tempoData.can_cancel = '1';
        } else {
          tempoData.can_cancel = '0';
        }
        tempoData.business_image = imageUrl;
        if (status.ACTIVE === true) {
          tempoData.business_status = 'ACTIVE';
        } else {
          tempoData.business_status = 'INACTIVE';
        }

        console.log(JSON.stringify(tempoData));
        axios
          .post(
            'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_details_update/Post',
            tempoData
          )
          .then((res) => {
            // console.log(res.data)
            const updateZoneObject = {
              bus_uid: farmerID,
              zone_uid: businessZones,
            }
            axios
              .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/add_business_to_zone', updateZoneObject)
              .then((res) => {
                if(res.data.code === 200) {
                  farmerObj();
                }
              })
              .catch((err) => {
                if(err.response) {
                  console.log(err.response);
                }
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    })
    // Error for getting long and lat
    .catch((err) => {
      console.log(err);
      if (err.response) {
        console.log(err.response);
      }
    })
  }

  async function update() {
    if (!newFarm) {
      if(imageUpload.file) {
        const formData = new FormData();
        formData.append('bus_photo', imageUpload.file);
        axios
          .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/new_business_image_upload', formData)
          .then((res) => {
            console.log(res)
            const image_url = res.data;
            updateFarm(image_url);
          })
          .catch((err) => {
            if(err.response) {
              console.log(err.response);
            }
            console.log(err);
          })
      } else {
        updateFarm(imageUpload.path)
      }
    } else {
      // Create new farm
      if(imageUpload.file) {
        console.log("in image upload if",imageUpload.path)
        const formData = new FormData();
        formData.append('bus_photo', imageUpload.file);
        axios
          .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/new_business_image_upload', formData)
          .then((res) => {
            console.log(res)
            const image_url = res.data;
            createFarm(image_url);
          })
          .catch((err) => {
            if(err.response) {
              console.log(err.response);
            }
            console.log(err);
          })
      } else {
        console.log("in image upload else",imageUpload.path)
        createFarm(imageUpload.path);
      }
    }
  }

  const handleChange = (event) => {
    if (event.target.name === 'phone') {
      let holdNumber = event.target.value;
      let createCorrectFormat = holdNumber;
      setBusFarm({
        ...businessAndFarmDetail,
        [event.target.name]: createCorrectFormat,
      });
    } else if (event.target.name === 'password') {
      setPass(event.target.value);
    } else if (event.target.name === 'passwordConfirm') {
      setConfirmPass(event.target.value);
    } else {
      setBusFarm({
        ...businessAndFarmDetail,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [deliverStrategy, setDeliveryStrategy] = useState({
    pickupStatus: true,
    deliverStatus: false,
  });

  const [storage, setStorage] = useState({
    reusable: true,
    disposable: false,
  });

  const [cancellation, setCancellation] = useState({
    allowCancel: true,
    noAllowCancel: false,
  });

  const [status, setStatus] = useState({
    ACTIVE: true,
    INACTIVE: false,
  });
  //this three function is to check/uncheck box and update state
  const handleChangeCancel = (event) => {
    var optionPick = event.target.name;
    var newCancelObj = {};
    if (optionPick === 'allowCancel') {
      newCancelObj = {
        allowCancel: true,
        noAllowCancel: false,
      };
    } else {
      newCancelObj = {
        allowCancel: false,
        noAllowCancel: true,
      };
    }
    setCancellation(newCancelObj);
  };
  const handleStatusChange = (event) => {
    var optionPick = event.target.name;
    var newCancelObj = {};
    if (optionPick === 'ACTIVE') {
      newCancelObj = {
        ACTIVE: true,
        INACTIVE: false,
      };
    } else {
      newCancelObj = {
        ACTIVE: false,
        INACTIVE: true,
      };
    }
    setStatus(newCancelObj);
  };
  const handleChangeStorage = (event) => {
    var optionPick = event.target.name;
    var newStorageObj = {};
    if (optionPick === 'reusable') {
      newStorageObj = {
        reusable: true,
        disposable: false,
      };
    } else {
      newStorageObj = {
        reusable: false,
        disposable: true,
      };
    }
    setStorage(newStorageObj);
  };
  const handleChangeDelivery = (event) => {
    var optionPick = event.target.name;
    var newDeliveryObj = {};
    if (optionPick === 'pickupStatus') {
      newDeliveryObj = {
        pickupStatus: true,
        deliverStatus: false,
      };
    } else {
      newDeliveryObj = {
        pickupStatus: false,
        deliverStatus: true,
      };
    }
    setDeliveryStrategy(newDeliveryObj);
    console.log(newDeliveryObj);
  };
  // useEffect(() => {
  //   getFarmSettings();
  //   // getSaltPassword();
  // }, [farmerID]);

  // useEffect(() => {
  //   if (settings) {
  //     setImageUpload({
  //       file: null,
  //       path: settings.business_image,
  //     });
  //     console.log('test log the email: ', settings.business_email);
  //     if (settings.business_email === undefined) {
  //       console.log('true undifined');
  //     }
  //     var objEmail = {
  //       email: settings.business_email,
  //     };
  //     objEmail = JSON.stringify(objEmail);
  //     axios.post(API_URL + 'AccountSalt', objEmail).then((response) => {
  //       if (response.data.code === 280) {
  //         let hashAlg = response.data.result[0].password_algorithm;
  //         let salt = response.data.result[0].password_salt;
  //         if (hashAlg !== null && salt !== null) {
  //           if (hashAlg !== '' && salt !== '') {
  //             switch (hashAlg) {
  //               case 'SHA512':
  //                 hashAlg = 'SHA-512';
  //                 break;
  //               default:
  //                 console.log('display default falling into');
  //                 break;
  //             }
  //             let newObj = {
  //               hashAlg: hashAlg,
  //               salt: salt,
  //             };
  //             setSaltPack(newObj);
  //           }
  //         }
  //       }
  //     });
  //   }
  // }, [settings]);

  const getFarmSettings = (business_uid) => {
    axios
      .post(BUSINESS_DETAILS_URL + 'Get', { business_uid: business_uid })
      .then((response) => {
        console.log('Settings:', response.data.result[0]);
        setSettings(response.data.result[0]);
        // context.setTimeChange(
        //   JSON.parse(response.data.result[0].business_accepting_hours)
        // );
        // context.setDeliveryTime(
        //   JSON.parse(response.data.result[0].business_delivery_hours)
        // );
        setRegularHours(JSON.parse(response.data.result[0].business_hours));
        var holdData = response.data.result[0];
        console.log('farm profile',holdData)
        // Convert null values to empty string
        let keys = Object.keys(holdData);
        for (const key of keys) {
          if (holdData[key] === null) {
            holdData[key] = '';
          }
        }
        // console.log(holdData);
        var BusAndFarmObj = {
          business_name: holdData.business_name,
          business_type: holdData.business_type,
          description: holdData.business_desc,
          businessAssociation: holdData.business_association,
          firstName: holdData.business_contact_first_name,
          lastName: holdData.business_contact_last_name,
          phone: holdData.business_phone_num,
          phone2: holdData.business_phone_num2,
          email: holdData.business_email,
          street: holdData.business_address,
          unit: holdData.business_unit,
          city: holdData.business_city,
          state: holdData.business_state,
          zip: holdData.business_zip,
          businessLicense: holdData.business_license || '',
          businessUsdot: holdData.business_USDOT || '',
          businessEin: holdData.business_EIN || '',
          businessWaubi: holdData.business_WAUBI || '',
          businessNotiApprov: holdData.business_notification_approval || '',
          platformFee: holdData.platform_fee,
          transactionFee: holdData.transaction_fee,
          revenueSharing: holdData.revenue_sharing,
          profitSharing: holdData.profit_sharing,
          password: holdData.business_password,
          // madeUpPassword:"test123"
        };
        if (holdData.delivery === 0) {
          setDeliveryStrategy({
            pickupStatus: true,
            deliverStatus: false,
          });
        } else {
          setDeliveryStrategy({
            pickupStatus: false,
            deliverStatus: true,
          });
        }

        if (holdData.can_cancel === 0) {
          setCancellation({
            allowCancel: false,
            noAllowCancel: true,
          });
        } else {
          setCancellation({
            allowCancel: true,
            noAllowCancel: false,
          });
        }

        if (holdData.reusable === 0) {
          setStorage({
            reusable: false,
            disposable: true,
          });
        } else {
          setStorage({
            reusable: true,
            disposable: false,
          });
        }
        if (holdData.business_status === 'ACTIVE') {
          setStatus({
            ACTIVE:true,
            INACTIVE:false,
          })
          
        } else {
          setStatus({
            ACTIVE:false,
            INACTIVE:true,
          })
        }
        setImageUpload({
          file: null,
          path: holdData.business_image,
        });
        setBusFarm(BusAndFarmObj);
        setLoaded(true);
        if(response.data.result[0].business_accepting_hours !== '') {
        context.setTimeChange(
          JSON.parse(response.data.result[0].business_accepting_hours)
        );
        }
        if(response.data.result[0].business_delivery_hours !== '') {
        context.setDeliveryTime(
          JSON.parse(response.data.result[0].business_delivery_hours)
        );
        }
      })
      .catch((err) => {
        console.log(err.response || err);
        setError(true);
      });
  };
  const farmerObj = () => {
    axios
      .get(
        'https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/businesses'
      )
      .then((response) => {
        
        setfarmerInfo(response.data.result.result)
        setFarmerID(response.data.result.result[0].business_uid);
        setBusiSelect(response.data.result.result[0]);
        setNewFarm(false);
        fetchBusinessInfo(
          setselectedBusiness,
          response.data.result.result[0].business_uid,
          setProfit1
        );
        getFarmSettings(response.data.result.result[0].business_uid);
        fetchProducts(response.data.result.result[0].business_uid);
        // fetchDeliveryDetails(
        //   setDeliveryDetails,
        //   response.data.result.result[0].business_uid
        // );
        fetchBusinessZones(response.data.result.result[0].business_uid);
      });
  };

  
  //popover data
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
            {farmerInfo.map((profile) => (
              <tbody>
                <tr
                  key={profile.business_uid}
                  className={classes.tr}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setFarmerID(profile.business_uid);
                    setBusiSelect(profile);
                    fetchBusinessInfo(
                      setselectedBusiness,
                      profile.business_uid,
                      setProfit1
                    );
                    getFarmSettings(profile.business_uid);
                    fetchProducts(profile.business_uid);
                    // fetchDeliveryDetails(
                    //   setDeliveryDetails,
                    //   profile.business_uid
                    // );
                    fetchBusinessZones(profile.business_uid);
                    setNewFarm(false);
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

  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //sorting produce

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
    return stableSort(products, getComparator(order, orderBy));
  };

  //farm stats table head
  const farmHead = [
    { id: 'item_name', label: 'Name' },
    { id: 'item_photo', label: 'Picture' },
    { id: 'item_unit', label: 'Unit' },
    { id: 'business_price', label: 'Business Price' },
    { id: 'item_status', label: 'Status' },
    { id: 'update delete', label: 'Action' },
  ];

  const [selectedClient, setSelectedClient] = useState([]);

  function handleChangeZone(event) {
    setSelectedClient(event.target.value);
  }

  // modal related objects
  
  const [openDiag, setOpenDiag] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [produceDictModal, setProduceDictModal] = useState({});
  
  useEffect(() => {
    if (openModel === false){
      fetchProducts(farmerID)
    }
    fetchProduceItems()
    
  }, [openModel]);

  const fetchProduceItems = () => {
    axios
          .get('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/getDistinctItems')
          .then((json) => {
            setProduceDictModal(json.data.result)
          })
            .catch((err) => {
            if (err.response) {
              console.log(err.response);
            }
            console.log(err);
          });
  
}

  const handleEdit = (e) => {
    setOpenModel(true)
  };

  const closeModel = () => {
    setOpenModel(false); 
    setOpenDiag(true);
  }

  const closeDiag = () => {
    setOpenDiag(false);
    fetchProducts(farmerID);
  }

  const modelBody = (
    <div>
      <FarmProfileItems produceDict={produceDictModal} id = {farmerID} handleClose={closeModel}/>
    </div>
  );

  // Initialize zone selection when loading page or changing farms
  const fetchBusinessZones = (business_uid) => {
    axios
      .get(`https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/business_delivery_details/${business_uid}`)
      .then((res) => {
        const newBusinessZones = res.data.result.map((elt) => elt.zone_uid);
        // console.log('test1',newBusinessZones);
        setBusinessZones(newBusinessZones)
      })
      .catch((err) => {
        if(err.response) {
          console.log(err.response);
        }
        console.log(err);
      })
  }

  // Determine if a zone is checked
  const zoneIsSelected = (zone_uid) => {
    return businessZones.indexOf(zone_uid) !== -1
  }

  // To update when zone is added/deleted
  const updateZoneSelection = (checked, zone_uid) => {
    if(checked) {
      const newBusinessZones = [...businessZones];
      newBusinessZones.push(zone_uid);
      setBusinessZones(newBusinessZones)
    } else {
      const newBusinessZones = businessZones.filter((elt) => elt !== zone_uid);
      setBusinessZones(newBusinessZones)
    }
  }

  // console.log("selected business ",busiSelect)
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
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Revenue from farm</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  {newFarm ? '-' : `$ ${profit1.profit}`}
                </p>
              </div>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Total no. Orders</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  {newFarm ? '-' : `$ ${profit1.num}`}
                </p>
              </div>

              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  color: '#1C6D74',
                }}
              >
                <h5>Number of items</h5>
                <p
                  style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    fontSize: '25px',
                  }}
                >
                  {newFarm ? '-' : `$ ${profit1.quantity}`}
                </p>
              </div>
              <div
                style={{
                  float: 'right',
                  marginRight: '20px',
                  paddingTop: '25px',
                }}
                onClick={() => {
                  setNewFarm(true);
                  setBusiSelect(newFarmBusiSelect);
                  setProducts([]);
                  setBusFarm(newFarmDetail)
                  setBusinessZones([]);
                }}
              >
                <button
                  style={{
                    backgroundColor: '#1C6D74',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 15px',
                  }}
                >
                  Add New Farm +
                </button>
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
              
            <div
              style={{
                fontSize: '1.5rem',
                textAlign: 'left',
                fontWeight: 'bold',
                letterSpacing: '0.32px',
                color: '#F5841F',
                opacity: 1,
                margin: '1rem',
              }}> 
                Produce Offered
                <img src='/add.png' id='newProduce' height="20" width="20" style={{ marginLeft:"10px",cursor:"pointer"}}
                      onClick={()=> {handleEdit()}}
                 />

              </div>
              
              <div>
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      {farmHead.map((headCell) => (
                        <TableCell
                        className={classes.usrTitle}
                          // style={{
                          //   fontWeight: 'bold',
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
                            >
                              {headCell.label}
                            </TableSortLabel>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {farmsSort().map((info) => (
                      <TableRow
                        key={info.business_uid}
                        className={classes.tr}
                        onClick={() => setSelectedProduct(info)}
                      >
                        <TableCell className={classes.usrDesc}>
                          {info.item_name}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          <img
                            style={{
                              width: '52px',
                              height: '42px',
                              borderRadius: '10px',
                            }}
                            src={info.item_photo}
                          ></img>
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          {info.item_unit}
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          <TextField
                            id="business_price"
                            // name={index}
                            name = {info['item_uid']}
                            value={info['business_price']}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            style={{ width: '50px', textAlign: 'center' }}
                            onChange={handleProductChange}
                          />
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                         
                          <select style={{border:'0px',textAlign:'center',width:"auto"}}
                                        onChange={handleProductChange}
                                        id = 'item_status'
                                        name = {info['item_uid']}
                                        value = {info['item_status']}
                                        >
                                        <option id = 'item_status' value='Active'> Active </option>
                                        <option id = 'item_status' value='Past'> Past </option>
                                            
                          </select>
                        </TableCell>
                        <TableCell className={classes.usrDesc}>
                          <img
                            style={{ width: '18px', marginRight: '5px', cursor: 'pointer' }}
                            src={save}
                            onClick={() => handleSave(info.supply_uid, 'update')}
                            id="update"
                          ></img>
                          <img
                            style={{ width: '15px', cursor: 'pointer' }}
                            src={del}
                            onClick={() => handleSave(info.supply_uid, 'delete')}
                            id="delete"
                          ></img>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContainer>
              </div>
            </div>
          </Grid>
          <Grid
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
            <Box>
              <h2
                style={{
                  textAlign: 'left',
                  marginLeft: '1rem',
                  color: '#FF8500',
                }}
              >
                Farm profile
              </h2>
              <Box
                style={{
                  textAlign: 'left',
                  width: '50%',
                  float: 'left',
                }}
              >
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Business Name </div>
                    <TextField
                      value={businessAndFarmDetail.business_name}
                      className={classes.profileInput}
                      InputProps={{ disableUnderline: true }}
                      name="business_name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Business Type </div>
                    <Select
                      value={businessAndFarmDetail.business_type}
                      className={classes.profileInput}
                      name="business_type"
                      onChange={handleChange}
                    >
                      <MenuItem value={''} hidden>
                        Choose Business Type
                      </MenuItem>
                      <MenuItem value={'Farm'}>
                        Farm
                      </MenuItem>
                      <MenuItem value={'Farmers Market'}>
                        Farmers Market
                      </MenuItem>
                      <MenuItem value={'Store'}>
                        Store
                      </MenuItem>
                      <MenuItem value={'Gift Card'}>
                        Gift Card
                      </MenuItem>
                    </Select>
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Description </div>
                    <TextField
                      value={businessAndFarmDetail.description}
                      className={classes.profileInput}
                      name="description"
                      multiline="true"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader}> Business Rep First Name </div>
                    <TextField
                      value={businessAndFarmDetail.firstName}
                      className={classes.profileInput}
                      name="firstName"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader}> Business Rep Last Name </div>
                    <TextField
                      value={businessAndFarmDetail.lastName}
                      className={classes.profileInput}
                      name="lastName"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Business Rep Phone Number </div>
                    <TextField
                      value={businessAndFarmDetail.phone}
                      className={classes.profileInput}
                      name="phone"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Business Rep Mobile Number </div>
                    <TextField
                      value={businessAndFarmDetail.phone2}
                      className={classes.profileInput}
                      name="phone2"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Business Email ID </div>
                    <TextField
                      value={businessAndFarmDetail.email}
                      className={classes.profileInput}
                      name="email"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <h3>Farm Details</h3>
                <hr></hr>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader}>Street</div>
                    <TextField
                      value={businessAndFarmDetail.street}
                      className={classes.profileInput}
                      name="street"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>  
                    <div className={classes.profileHeader}> Unit </div>
                    <TextField
                      value={businessAndFarmDetail.unit}
                      className={classes.profileInput}
                      name="unit"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`}>
                    <div className={classes.profileHeader}> Farm City </div>
                    <TextField
                      value={businessAndFarmDetail.city}
                      className={classes.profileInput}
                      name="city"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader}> State </div>
                    <TextField
                      value={businessAndFarmDetail.state}
                      className={classes.profileInput}
                      name="state"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader}> Zip </div>
                    <TextField
                      value={businessAndFarmDetail.zip}
                      className={classes.profileInput}
                      name="zip"
                      InputProps={{ disableUnderline: true }}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  textAlign: 'left',
                  width: '45%',
                  float: 'left',
                  borderLeft: '1px solid #F5841F',
                  paddingLeft: '1rem',
                }}
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  <img
                    src={imageUpload.path || blankImg}
                    style={{
                      width: '163px',
                      height: '163px',
                      borderRadius: '11px',
                    }}
                  />

                  <Link
                    size="small"
                    color="primary"
                    component="label"
                    fullWidth
                    style={{
                      textAlign: 'center',
                      borderColor: appColors.border,
                      backgroundColor: 'white',
                      width: '200px',
                      paddingTop: '70px',
                      verticalAlign: 'middle',
                    }}
                  >
                    Upload File
                    <input
                      style={{ display: 'none' }}
                      onChange={handleImgChange}
                      type="file"
                      accept="image/*"
                    />
                  </Link>
                </Box>
                {/* <Box>
                  <h3 className={classes.profileHeader}>Delivery Zones</h3>
                  <select
                    onChange={handleChangeZone}
                    className={styles.dropdown}
                    style={{
                      maxWidth: '98%',
                      margin: '1%',
                      float: 'left',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderColor: '#CED4DA',
                      borderRadius: '.25rem',
                      padding: '.375rem .75rem',
                      color: '#495057',
                      height: 'calc(1.5em + .75rem + 2px)',
                      lineHeight: '1.5',
                      fontSize: '1rem',
                      fontWeight: '400',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {deliveryDetails.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.zone_name}
                          onChange={handleChangeZone}
                        >
                          {item.zone_name.substring(
                            item.zone_name.lastIndexOf('-') + 1
                          )}
                        </option>
                      );
                    })}
                  </select>
                </Box>

                <Box
                  display="flex"
                  justifyContent="start"
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  <h3 style={{ color: '#F5841F' }}>Add a Zone</h3>
                  <img
                    src="/add.png"
                    id="newProduce"
                    height="20"
                    width="20"
                    style={{
                      marginLeft: '10px',
                      cursor: 'pointer',
                      paddingTop: '20px',
                    }}
                  />
                </Box>

                <p className={classes.profileHeader}>Days of Delivery</p>
                {deliveryDetails.map((item, index) => {
                  return selectedClient === item.zone_name ? (
                    <p className={classes.profileData}>
                      {item.z_delivery_day}( {item.z_delivery_time})
                    </p>
                  ) : null;
                })} */}
                <Box>
                  <div>
                    <h3 className={classes.profileHeader}
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      Delivery Zones
                    </h3>
                    <button
                      style={{
                        display: 'inline-block',
                        border: 'none',
                        backgroundColor: 'inherit',
                        float: 'right',
                        margin: '16px 0',
                        padding: '3px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}
                    >
                      &#x025BE;
                    </button>
                  </div>
                  <div>
                    {allZones.map(elt => {
                      let id = elt.zone_uid;
                      let name = elt.zone_name.substring(
                        elt.zone_name.lastIndexOf('-') + 1
                      );
                      let weekDay = elt.z_accepting_day.toLowerCase();
                      let formattedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
                      return (
                        <div
                          key={id}
                        >
                          <input
                            type="checkbox"
                            id={id}
                            name="businessZones"
                            value={id}
                            checked={zoneIsSelected(id)}
                            onChange={(e) => {
                              updateZoneSelection(e.target.checked, id);
                            }}
                          />
                          <label for={id}>{`${name}, ${formattedWeekDay}`}</label>
                        </div>
                      )
                    })}
                  </div>
                </Box>
                <FormControl component="fieldset">
                  <p className={classes.profileHeader}>Delivery Strategy</p>
                  {/* <FormLabel component="legend">Delivery Strategy</FormLabel> */}
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={deliverStrategy.pickupStatus}
                          onChange={handleChangeDelivery}
                          name="pickupStatus"
                        />
                      }
                      label="Pickup at Farmer's Market"
                    />
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={deliverStrategy.deliverStatus}
                          onChange={handleChangeDelivery}
                          name="deliverStatus"
                        />
                      }
                      label="Deliver to Customer"
                    />
                  </FormGroup>

                  <FormGroup>
                    <p className={classes.profileHeader}>Storage</p>
                    {/* <FormLabel component="legend">Storage</FormLabel> */}
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={storage.reusable}
                          onChange={handleChangeStorage}
                          name="reusable"
                        />
                      }
                      label="Reusable"
                    />
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={storage.disposable}
                          onChange={handleChangeStorage}
                          name="disposable"
                        />
                      }
                      label="Disposable"
                    />
                  </FormGroup>

                  <FormGroup>
                    <p className={classes.profileHeader}>Cancellation</p>
                    {/* <FormLabel component="legend">Cancellation</FormLabel> */}
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={cancellation.allowCancel}
                          onChange={handleChangeCancel}
                          name="allowCancel"
                        />
                      }
                      label="Allow cancellation within ordering hours"
                    />
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={cancellation.noAllowCancel}
                          onChange={handleChangeCancel}
                          name="noAllowCancel"
                        />
                      }
                      label="Cancellations not allowed"
                    />
                  </FormGroup>

                  
                  <FormGroup>
                    <p className={classes.profileHeader}>Business Status</p>
                    {/* <FormLabel component="legend">Storage</FormLabel> */}
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={status.ACTIVE}
                          onChange={handleStatusChange}
                          name="ACTIVE"
                        />
                      }
                      label="ACTIVE"
                    />
                    <FormControlLabel
                      control={
                        <GreenRadio
                          checked={status.INACTIVE}
                          onChange={handleStatusChange}
                          name="INACTIVE"
                        />
                      }
                      label="INACTIVE"
                    />
                  </FormGroup>

                </FormControl>
              </Box>
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={update}
              style={{
                backgroundColor: appColors.primary,
                color: 'white',
                height: '30px',
                marginTop: '35px',
                marginLeft: '35px',
                width: '500px',
              }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <div>
            <Dialog open={openDiag} onClose={closeDiag}>
              <DialogTitle>{"Successful!!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Produce has been updated
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button 
                onClick={closeDiag}
                        
                        color="primary" autoFocus>
                  Okay
                </Button>
                
              </DialogActions>
            </Dialog>
          </div>

          <div id="boxInMain">
        <Modal open={openModel}  onClose={()=>setOpenModel(false)} >
            {modelBody}
        </Modal>
      </div>
    
    </div>
  );
}

export default FarmProfiles;
