import './Handbook.scss'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chay from './images/chay.JPG';

import {useNavigate } from 'react-router-dom';


    
const Handbook = ({settings})=>{
    const navigate = useNavigate();
    return(
        <div className="handbook-section">
            <div className="text-handbook">Cam nang</div>
            <div className="handbook-button-container">               
                <button className="hanbook-button">Xem Them</button>
            </div>
            <div className="Specialty-section-container">
                <Slider {...settings}> 

                <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    <div className="img-customize">
                        <div className="img-container">
                            <img className="img" src={chay} alt="chay-picture"></img>

                        </div>

                        <a onClick={() => { navigate('/') }}>Home</a>
                    </div>

                    
                    


                </Slider>

            </div>
            
        </div>
        
    );
    
    
}
export default Handbook;