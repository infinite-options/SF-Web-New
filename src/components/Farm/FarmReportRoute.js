import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import FarmerReport from './FarmerReport';



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
  
  usrTitle: {
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    letterSpacing: '0.25px',
    color: '#00000',
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
    marginLeft: '5px',
    marginRight:'5px',
    borderCollapse: 'collapse',
  },
  tr:{
    //borderBottom: '1px solid #0000001A'
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
    
    letterSpacing: '-0.34px',
    color: '#000000',
    opacity: 1,
    padding: '3px',
  },
  
  

  
  
}));

function FarmerReportRoute (props){
  
    const classes = useStyles();
    console.log("working on farmreportroute")
    const [allSelect,setAllSelect] = useState(0);
    const [zones,setZones] = useState([]);
    const [market,setMarket] = useState([]);
    const [checkedZone,setCheckedZone] = useState([]);
    const [checkedMarket,setCheckedMarket] = useState('');
    
    const handleSave = () => {
            console.log('frr in save',market[checkedMarket]);
            axios
            .post('https://rqiber37a4.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetRoutes', {
                
                "farm_address":market[checkedMarket]['address'],
                "farm_city":market[checkedMarket]['city'],
                "farm_state":market[checkedMarket]['state'],
                "farm_zip":market[checkedMarket]['zipcode'],
                "delivery_date": props.deliveryDay + " 10:00:00",
                "db":"sf",
                "zones":checkedZone
            
            })
            .then((response) => {
                console.log('frr',response);
                props.handleClose("yes")
            })
            .catch((err) => {
                console.log(err.response || err);
                props.handleClose("no")
            });
    }

    const handleCloseModal = () => {
       
        
        props.handleClose("no")
    }

    const handleSelection = (event) => {
        const idx = event.target.value
        console.log('frr',market[idx])
        setCheckedMarket(idx)
    }

    const handleCategorySelection = (event) => {
        const idx = event.target.value
        if(idx==="0"){
            getZone("North")
        }
        else{
            getZone("South")
        }
        setCheckedZone([])
        
    }

    const handleCheck = (event) => {
        const idx = event.target.value
        if(checkedZone.includes(idx)){
            var arr = checkedZone.filter(item => item !== idx)
            setCheckedZone(arr)
            
        }
        else{
            var arr = checkedZone
            arr.push(idx)
            setCheckedZone(arr)
        }
        console.log('frr',arr)
    }

    useEffect(() => {
        
        getMarketAddress()
    },[])

    const handleSelectAll = () => {
        if(allSelect===0){
            document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = true );
            setAllSelect(1)
            var arr = []
            for (const element of zones) {
                arr.push(element['uid'])
              }
            setCheckedZone(arr)
            console.log("frr select all",arr)

        }
        else{
            document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
            setAllSelect(0)
            setCheckedZone([])
        }
        

    }

    const getZone = (part) => {
        document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
        axios
        .post(`https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/update_zones/get_admin`, {"category":part})
        .then((response) => {
            const zoneApiResult = response.data.result;
            // Convert property values to string and nulls to empty string
            var tempZone = []
            for(let index = 0; index < zoneApiResult.length; index++) {
                if(props.weekDay===zoneApiResult[index]['z_delivery_day']){
                    var tempDict = {}
                    tempDict['uid'] = zoneApiResult[index]['zone_uid']
                    tempDict['name'] = zoneApiResult[index]['zone_name']+' - '+zoneApiResult[index]['z_delivery_day']
                    
                    // tempDict[zoneApiResult[index]['zone_uid']] = zoneApiResult[index]['zone_name']+' - '+zoneApiResult[index]['z_delivery_day']
                    tempZone.push(tempDict)
                }
            }
            setZones(tempZone)
        })
        .catch((err) => {
            if (err.response) {
            // eslint-disable-next-line no-console
            console.log(err.response);
            }
            // eslint-disable-next-line no-console
            console.log(err);
        });
    }

    const getMarketAddress = () => {
    axios
        .get(`https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/farm_market_address`)
        .then((response) => {
        const zoneApiResult = response.data.result;
        // Convert property values to string and nulls to empty string
        var tempAddress = []
        for(let index = 0; index < zoneApiResult.length; index++) {
            var tempDict = {}
            tempDict['uid'] = zoneApiResult[index]['business_uid']
            tempDict['name'] = zoneApiResult[index]['business_name']
            tempDict['address'] = zoneApiResult[index]['business_address']
            tempDict['unit'] = zoneApiResult[index]['business_unit']
            tempDict['city'] = zoneApiResult[index]['business_city']
            tempDict['state'] = zoneApiResult[index]['business_state']
            tempDict['zipcode'] = zoneApiResult[index]['business_zip']
            // tempDict[zoneApiResult[index]['zone_uid']] = zoneApiResult[index]['zone_name']+' - '+zoneApiResult[index]['z_delivery_day']
            tempAddress.push(tempDict)
            
        }
        setMarket(tempAddress)
        console.log("working on frr",tempAddress)
        })
        .catch((err) => {
        if (err.response) {
            // eslint-disable-next-line no-console
            console.log(err.response);
        }
        // eslint-disable-next-line no-console
        console.log(err);
        });
    }
    return (
        
        <div id="mainDiv"
            style={{
            height: "50%",
            width: "20%",
            zIndex: "99999",
            marginLeft: "35%",
            marginTop: "10%",
            overflow: "auto",
            position: "fixed",
            display: "block",
            backgroundColor: '#d3dcdc',
            borderRadius:'20px'
          }}>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"10%",marginTop:"5%", color:"#1C6D74", fontSize:"2rem"}}>
                    Create Route
                    </div>
                    
                  </div>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>  
                    <div className={classes.profileHeader} style={{float:"right",marginRight:"10%",marginTop:"5%", color:"#1C6D74", fontSize:"2rem"}}>
                        <img src='/removeIconAdminOrderS.png' id='newProduce' height="100%" width="100%" style={{ marginTop:'15%',cursor:"pointer"}}
                            onClick={()=> {handleCloseModal()}}
                    />
                    </div>
                   
                  </div>
            </div>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"5%", color:"#F5841F", fontSize:"2rem"}}>
                    Delivery Date:
                    </div>
                  </div>
            </div>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"1%", fontSize:"1.5rem"}}>
                    {props.deliveryDay}
                    </div>
                  </div>
            </div>

            
            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"5%", color:"#F5841F", fontSize:"2rem"}}>
                    Select Zones Location:
                    </div>
                  </div>
            </div>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"1%", color:"#F5841F", fontSize:"2rem"}}>
                    <select style={{border:'solid 2px',textAlign:'center',width:"100%", height:"30px"}}
                                        onChange={handleCategorySelection}
                                        >
                        <option disabled selected style={{fontSize:'120%'}}>Select an option</option>
                        
                            <option 
                                name = "North"
                                value={0}
                                style={{fontSize:'120%'}}
                            >
                                North
                            </option>
                            <option 
                                name = "South"
                                value={1}
                                style={{fontSize:'120%'}}
                            >
                                South
                            </option>
                        
                    </select>
                    </div>
                  </div>
            </div>
            
            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"5%", color:"#F5841F", fontSize:"2rem"}}>
                    Select Starting Location:
                    </div>
                  </div>
            </div>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"1%", color:"#F5841F", fontSize:"2rem"}}>
                    <select style={{border:'solid 2px',textAlign:'center',width:"100%", height:"30px"}}
                                        onChange={handleSelection}
                                        >
                        <option disabled selected style={{fontSize:'120%'}}>Select an option</option>
                        {market.map((item,index)=>(
                            <option 
                                name = {item['uid']}
                                value={index}
                                style={{fontSize:'120%'}}
                            >
                                {item['name']}
                            </option>
                        ))}
                    </select>
                    </div>
                  </div>
            </div>

            <div className={classes.profileContainer}>
                  <div className={`${classes.profileSection} ${classes.profileSection2}`}>
                    <div className={classes.profileHeader} style={{float:"left",marginLeft:"5%",marginTop:"5%", color:"#F5841F", fontSize:"2rem"}}>
                    Select zones for route:
                    </div>
                  </div>
            </div>

            <div className={classes.profileContainer} style={{postion:'relative'}}>
                  <div className={`${classes.profileSection} ${classes.profileSection1}`} style={{marginLeft:'5%',marginTop:'2%'}}>
                    <input type="checkbox" id="selectAll" name="selectAll" value="selectAll" 
                                        style={{width:'20px',height:'20px'}} 
                                        onClick={handleSelectAll}
                        />
                    <label for="selectAll" style={{fontSize:'120%'}}> Select All</label>
                       
                        <br/>
                        {zones.map((item,index) => (
                            
                            <>
                            <input type="checkbox" id={index} name={item['uid']} value={item['uid']} 
                                    style={{width:'20px',height:'20px'}} 
                                    onClick={handleCheck}
                                    
                            />
                            <label for={item['uid']} style={{fontSize:'120%'}}> {item['name']}</label>
                            <br/>
                            </>
                            
                        ))}
                        {/* <img src='/createRouteButton.png' id='newProduce' height="50px" width="150px" style={{marginLeft:'20%',marginTop:'5%',cursor:"pointer", paddingBottom:'2%'}}
                        onClick={()=> {handleSave()}}/> */}
                        <Button
                          size="medium"
                          variant="contained"
                          style={{marginLeft:'20%',marginTop:'5%',cursor:"pointer",marginBottom:'3%', backgroundColor:'#FF8500', color:'white', borderRadius:'10px'}}
                          onClick={()=> {handleSave()}}
                        >
                          Create Route
                        </Button>
                    
                        
                            
                  </div>
                  </div>
                  
        </div>
            
  );
};



export default FarmerReportRoute;
