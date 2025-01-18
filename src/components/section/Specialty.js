import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Specialty.scss'
import chay from './images/chay.JPG';
import {useNavigate } from 'react-router-dom';

const Specialty = ({settings})=>{
    const navigate = useNavigate();
    
    return(
        <div className="Specialty-section">
            <div className="text-specialty">Chuyen Khoa Pho Bien</div>
            <div className="view-more-specialty-button-container">               
                <button className="view-more-specialty-button">Xem Them</button>
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
export default Specialty;