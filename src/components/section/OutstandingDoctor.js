import './OutstandingDoctor.scss'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chay from './images/chay.JPG';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

import { useGetDoctorsMutation } from '../../slices/usersApiSlice'

const OutstandingDoctor = ({ settings }) => {
    const navigate = useNavigate();
    const [getDoctors] = useGetDoctorsMutation();
    const [doctorListArr, setDoctorListArr] = useState();
    const [reload, setReload] =useState('');



    useEffect(() => {
        const fetchData =  async ()=> {

            const response = await getDoctors().unwrap();
           
            

            setDoctorListArr(response.doctorList);

        }
        fetchData();

    }, [reload]);

    return (

        <div className="outstanding-doctor-section">
            <div className="text-outstanding-doctor">Bac Sy noi bat tuan qua</div>
            <div className="find-doctor-button-container">
                <button className="find-doctor-button">Tim Kiem</button>
            </div>
            <div className="outstanding-doctor-section-container">


                <Slider {...settings}>
                

                    {
                        
                        doctorListArr ? (
                            doctorListArr.map((item, index) => {
                                let name= `${item.positionDetails.value_vn} ${item.roleDetails.value_vn}`;
                                let image64;
                                if(item.image){
                                    image64= new Buffer(item.image, 'base64').toString('binary');

                                }
                                else{
                                    image64=''
                                }
                                
                                return (
                                    <>
                                        <div key={index} className="doctor-img-customize">
                                            <div className="doctor-img-container">
                                                <img className="doctor-img" src={image64} alt="chay-picture"></img>

                                            </div>

                                            <a className='doctor-name' onClick={() => { navigate('/') }}>{item.firstName}</a>
                                            <p>{name}</p>
                                        </div>
                                    </>

                                )
                            })

                        ) : (<>

                        </>)}








                </Slider>

            </div>

        </div>

    );


}
export default OutstandingDoctor;