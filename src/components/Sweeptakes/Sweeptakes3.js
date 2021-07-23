import React, { useContext, useState, useEffect, useRef } from 'react';
import LandingNavBar from '../LandingNavBar/LandingNavBar';
import AdminLogin from '../LogIn/AdminLogin';
import Footer from "../Footer/Footer";
import './Sweeptakes.css';
import Card from '@material-ui/core/Card';
import Box from "@material-ui/core/Box";
import {ButtonGroup, Container} from "@material-ui/core";
import bg from '../../icon/bg.svg';
import Apple from '../../images/Mask Group 1.png'
import Google from '../../images/en_badge_web_generic.png'
import { useHistory } from 'react-router-dom';

function beforeClick1() {
    console.log("Hello WOrld!")
    return(
        <div>Hello World</div>
    )
}


const Sweeptakes3 = () => {
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
                    <p className="FreeFF">Free Fresh food!</p>
                    <p className="SW2Text">Thank you so much for submission!
                        <div>We will announce the winners on August 25,2021.</div>
                        <div>Be on the look out for that email</div>
                    </p>
                </div>

                <div>
                    <p className="FreeFF">Until then...</p>
                    <p className="SW2Text">New customers are eligible for free delivery and
                        <div>existing customers always get free deliveries on all </div>
                        <div>orders above $30</div>
                    </p>
                </div>

                <Box className="Box2">
                    <div className="row">
                        <div className="column">
                            <p className="downloadText">Download the app</p>
                            <a href="https://apps.apple.com/us/app/serving-fresh/id1488267727" target="_blank"><img src={Apple}/></a>

                            <div>
                                <a href="https://play.google.com/store/apps/details?id=com.servingfresh" target="_blank"><img src={Google}/></a>
                            </div>
                        </div>
                        <div className="column"><p className="OrVisitText">Or visit us on <div className="FreeFF">ServingFresh.me</div></p></div>
                    </div>
                </Box>

                <p className="SW2Text">You can also refer a friend and be eligible for an
                    <div>additional $10 prize.</div>

                </p>
                <input className="input" type="text" placeholder="Name of referrer"/>
                <br/>
                <input className="input" type="text" placeholder="Email ID of the referrer"/>
                <br/>
                <button className="button" type="button" onClick={() => history.push("/Sweeptakes4")}>Submit Entry</button>

                <div>
                    <button className="referButton" type="button" onClick={() => history.push("/Sweeptakes3")}>Refer a friend+</button>
                </div>


                <div className="footer">
                    <Footer/>
                </div>

            </div>
        </Box>

    )
}


export default Sweeptakes3;
