import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

function AfterRateModal (props){

    if(props.mode != 1){

        return (

            <div id="mainDiv"
            style={{
            height: "26%",
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

            <div style={{
                alignItems:'center',
                font: 'normal normal bold 22px/32px SF Pro Text',
                letterSpacing: '-0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'8%'}}>
                    
                    
                    <div style={{marginTop:'5%', fontSize:'140%'}}>
                        <u>Rating Submitted </u>
                    </div>
                    <div style={{marginTop:'5%', color:'#000000'}}>
                        Thank you for your feedback.<br/>
                        We appreciate you supporting<br/>
                        local farmers.
                    </div>
                    <div>
                    <img src='SecondModalPics/historyButton.svg' id='second_5' height="60%" width="60%" style={{cursor:"pointer", marginLeft:'3%',marginTop:'5%'}}
                                onClick={()=> {props.handleClose("yes")}}/>
                    </div>
            </div>

        
        </div>
        
        )

    }
    else{
        return(

            <div id="mainDiv"
            style={{
            height: "28%",
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
            
            <div style={{display:'block',float:'right',paddingRight:'2%',paddingTop:'2%'}}>
                <img src='SecondModalPics/closeLogo.svg' id='second_5' height="100%" width="100%" style={{cursor:"pointer",marginTop:'5%'}}
                            onClick={()=> {props.handleClose("yes")}}/>
                
            </div>
            <br/>
            <div style={{
                alignItems:'center',
                font: 'normal normal bold 22px/32px SF Pro Text',
                letterSpacing: '-0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'8%'}}>
                    
                    
                    <div style={{marginTop:'5%', fontSize:'140%'}}>
                        <u>Rating Submitted </u>
                    </div>
                    <div style={{marginTop:'5%', color:'#000000'}}>
                        Thank you for your feedback.<br/>
                        Please leave us a review on:
                    </div>
                    <div>
                        <a href="https://g.page/r/CWwV02OoSKgzEAg/review" target="_blank">
                            <img src='SecondModalPics/googleLogo.svg' id='second_5' height="15%" width="15%" style={{cursor:"pointer",marginTop:'5%'}}
                                    />
                        </a>
                    </div>
            </div>

        
        </div>
       

        )
    }
  
    
   
            
  
};
export default AfterRateModal;
