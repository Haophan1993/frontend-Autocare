import './OutstandingDoctor.scss'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chay from './images/chay.JPG';
import {useNavigate } from 'react-router-dom';

const OutstandingDoctor = ({settings})=>{
    const navigate = useNavigate();
   
    return(
        <div className="outstanding-doctor-section">
            <div className="text-outstanding-doctor">Bac Sy noi bat tuan qua</div>
            <div className="find-doctor-button-container">               
                <button className="find-doctor-button">Tim Kiem</button>
            </div>
            <div className="outstanding-doctor-section-container">
                <Slider {...settings}> 

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac Sy 1</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac Sy 2</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac sy 3</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac Sy 4</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac Sy 5</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac sy 6</a>
                    </div>

                    <div className="doctor-img-customize">
                        <div className="doctor-img-container">
                            <img className="doctor-img" src={chay} alt="chay-picture"></img>

                        </div>
                        
                        <a className='doctor-name' href="./">Bac Sy 7</a>
                    </div>
                    

                    
                    


                </Slider>

            </div>
            
        </div>
        
    );
    
    
}
export default OutstandingDoctor;