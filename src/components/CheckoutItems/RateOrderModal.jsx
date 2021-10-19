import React, {useState} from 'react';
import axios from 'axios';
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

function RateOrderModal (props){
  
    const [starSelectedFirst,setStarSelectedFirst] = useState(0);
    const [starSelectedSecond,setStarSelectedSecond] = useState(0);
    const [starSelectedThird,setStarSelectedThird] = useState(0);
    const [comment,setComment] = useState('');

    const handleSubmit = () => {
            console.log('star sele',starSelectedFirst,starSelectedSecond,starSelectedThird,comment);
            axios
            .post('https://tsx3rnuidi.execute-api.us-west-1.amazonaws.com/dev/api/v2/rate_order', {
                
                "rating":"["+starSelectedFirst+","+starSelectedSecond+","+starSelectedThird+"]",
                "comment":comment,
                "purchase_uid":props.purchaseID
            })
            .then((response) => {
                console.log('frr',response);
                props.setRatingNum(starSelectedFirst)
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

    const handleStar = (event) => {
        const idx = event.target.id
        var review = idx.split('_')[0]
        var num = parseInt(idx.split('_')[1])

        if (review == 'first'){
            setStarSelectedFirst(num)
        }

        if (review == 'second'){
            setStarSelectedSecond(num)
        }

        if (review == 'third'){
            setStarSelectedThird(num)
        }
        
        
        console.log('star selection',num,comment)
    }

    return (
        <div id="mainDiv"
            style={{
            height: "55%",
            width: "23%",
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
                fontWeight:'bold',
                fontSize:'20px',
                letterSpacing: '0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'5%'}}>
                    <div style={{}}>
                    How was your overall experience?
                    </div>
                    
                    <div style={{marginTop:'2%'}}>
                        
                        <img src={starSelectedFirst > 0?'/starIconFilled.svg':'/starIcon.svg'} id='first_1' height="10%" width="10%" style={{cursor:"pointer"}}
                            onClick={(event)=> {handleStar(event)}}
                        />
                            
                        <img src={starSelectedFirst > 1?'/starIconFilled.svg':'/starIcon.svg'} id='first_2' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedFirst > 2?'/starIconFilled.svg':'/starIcon.svg'} id='first_3' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedFirst > 3?'/starIconFilled.svg':'/starIcon.svg'} id='first_4' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedFirst > 4?'/starIconFilled.svg':'/starIcon.svg'} id='first_5' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                    </div>
            </div>

             <div style={{
                alignItems:'center',
                fontWeight:'bold',
                fontSize:'20px',
                letterSpacing: '0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'5%'}}>
                    <div>
                    How was the freshness of your produce?
                    </div>
                    
                    <div style={{marginTop:'2%'}}>
                        
                        <img src={starSelectedSecond > 0?'/starIconFilled.svg':'/starIcon.svg'} id='second_1' height="10%" width="10%" style={{cursor:"pointer"}}
                            onClick={(event)=> {handleStar(event)}}
                        />
                            
                        <img src={starSelectedSecond > 1?'/starIconFilled.svg':'/starIcon.svg'} id='second_2' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedSecond > 2?'/starIconFilled.svg':'/starIcon.svg'} id='second_3' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedSecond > 3?'/starIconFilled.svg':'/starIcon.svg'} id='second_4' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedSecond > 4?'/starIconFilled.svg':'/starIcon.svg'} id='second_5' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                    </div>
            </div>

             <div style={{
                alignItems:'center',
                fontWeight:'bold',
                fontSize:'20px',
                letterSpacing: '0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'5%'}}>
                    <div>
                    How was the delivery?
                    </div>
                    <div style={{marginTop:'2%'}}>
                        
                        <img src={starSelectedThird > 0?'/starIconFilled.svg':'/starIcon.svg'} id='third_1' height="10%" width="10%" style={{cursor:"pointer"}}
                            onClick={(event)=> {handleStar(event)}}
                        />
                            
                        <img src={starSelectedThird > 1?'/starIconFilled.svg':'/starIcon.svg'} id='third_2' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedThird > 2?'/starIconFilled.svg':'/starIcon.svg'} id='third_3' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedThird > 3?'/starIconFilled.svg':'/starIcon.svg'} id='third_4' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                        <img src={starSelectedThird > 4?'/starIconFilled.svg':'/starIcon.svg'} id='third_5' height="10%" width="10%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleStar(event)}}
                        />
                    </div>
            </div>

            <div style={{
                alignItems:'center',
                fontWeight:'bold',
                fontSize:'20px',
                letterSpacing: '0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'5%'}}>
                    <div>
                    Comments or feedback? (Optional)
                    </div>
                    <div style={{marginTop:'2%'}}>
                    <form class="ui form">
                        <textarea  rows="3" style={{width:'70%'}} onChange={(event) => setComment(event.target.value)}>
                        </textarea>
                    </form>
                    </div>
                </div>
            
                <div style={{
                alignItems:'center',
                fontWeight:'bold',
                fontSize:'20px',
                letterSpacing: '0.43px',
                color: '#2F787F',
                textAlign:'center',
                marginTop:'5%',
                marginRight: '5%'}}>
                    <div>
                    <img src='SecondModalPics/starSaveButton.png' id='second_5' height="70%" width="70%" style={{cursor:"pointer", marginLeft:'5%'}}
                                onClick={(event)=> {handleSubmit(event)}}/>
                    </div>
                </div>
        </div>
            
  );
};
export default RateOrderModal;
