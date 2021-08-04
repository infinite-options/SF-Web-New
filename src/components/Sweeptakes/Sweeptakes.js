import React from 'react';
import LandingNavBar from '../LandingNavBar/LandingNavBar';
// import AdminLogin from '../LogIn/AdminLogin';
import Footer from "../Footer/Footer";
import './Sweeptakes.css';
// import Card from '@material-ui/core/Card';
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
// import bg from '../../icon/bg.svg';
import { useHistory } from 'react-router-dom';

function beforeClick1() {
    console.log("Hello WOrld!")
    return(
        <div>Hello World</div>
    )
}




const Sweeptakes = () => {
    const history = useHistory();
    return(
        <Box
            id="beforeClick"
            style={{
            paddingLeft: 0,
            paddingRight: 0,
            backgroundAttachment: "fixed",
            backgroundImage: `url(${'fruits-and-vegetables2.png'})`,
            backgroundRepeat: "no-repeat",
            width: '100%',
        }}>
            <div className="contentWrap">
                <LandingNavBar/>
                <div>
                    <p className="FreeFF">Free Fresh Food!</p>
                    <p className="Enter">Enter now to win $50 worth of fresh produce, <div>delivered free of charge to your door.</div></p>
                </div>
                <Container className="container">
                    <button className="Card1"> <p className="text">Customizable box of fresh produce worth <div className="value1">$20</div></p></button>
                    <button className="Card2"> <p className="text">Customizable box of fresh produce <div>worth</div> <div className="value">$50</div></p></button>
                    <button className="Card3"> <p className="text">Customizable box of fresh produce worth <div className="value1">$30</div></p></button>
                </Container>
                <div>
                    <p className="FreeFF">Submit entry to win!</p>
                    <input className="input" type="text" placeholder="Enter Name"/>
                    <br/>
                    <input className="input" type="text" placeholder="Email Address"/>
                    <br/>
                    <input className="input" type="text" placeholder="Zip Code"/>
                    <br/>
                    <input className="input" type="text" placeholder="Phone (optional)"/>
                    <p className="Enter">If you were referred</p>
                    <input className="input" type="text" placeholder="Name of referrer"/>
                    <br/>
                    <input className="input" type="text" placeholder="Email ID of the referrer"/>
                    <br/>
                    <button className="button" type="button" onClick={() => history.push("/Sweeptakes2")}>Submit Entry</button>
                </div>
                <div className="footer">
                    <Footer/>
                </div>

            </div>
        </Box>

    )
}


export default Sweeptakes;
