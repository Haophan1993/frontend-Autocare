import './OutstandingDoctor.scss'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chay from './images/chay.JPG';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

import { useGetDoctorsMutation } from '../../slices/doctorApiSlice';

import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../slices/languageSlice';
import useTranslation from '../../hooks/useTranslation.js';


const OutstandingDoctor = ({ settings }) => {

    const t = useTranslation();
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentLanguage = useSelector((state) => state.language.currentLanguage);

    const [getDoctors] = useGetDoctorsMutation();
    const [doctorListArr, setDoctorListArr] = useState();
    const [reload, setReload] =useState('');

    // const getBase64=(file)=>{
    //     return new Promise((resolve, reject)=>{
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = ()=>resolve(reader.result);
    //         reader.onerror = error => reject(error);
    //     })
    // }



    useEffect(() => {
        const fetchData =  async ()=> {

            const response = await getDoctors().unwrap();
            // response.doctorList.map(async(item, index)=>{
            //     if(item.image){
            //         let base64 = await getBase64(item.image);
            //         item.image=base64; 
            //     }
            // })
            

            setDoctorListArr(response.doctorList);

        }
        fetchData();

    }, [reload]);

    const handleDetailDoctor=(doctorInfor)=>{
        console.log('Doctor Infor at OutStanding Doctor page : ', doctorInfor);
        navigate(`/get-doctor-detail/${doctorInfor._id}`);

    }

    return (

        <div className="outstanding-doctor-section">
            <div className="text-outstanding-doctor">{t.homepage.OutStandingDoctorTitle}</div>
            <div className="find-doctor-button-container">
                <button className="find-doctor-button">{t.homepage.find}</button>
            </div>
            <div className="outstanding-doctor-section-container">


                <Slider {...settings}>
                

                     {
                        
                        doctorListArr ? 

                            doctorListArr.map((item, index) => {
                                let name='';
                                if(currentLanguage==='vn'){
                                    name= `${item.positionDetails.value_vn} ${item.roleDetails.value_vn}`;

                                }else{
                                    name= `${item.positionDetails.value_en} ${item.roleDetails.value_en}`;
                                }
                                
                                let image64;
                                
                                const uniqueKey = item._id ? item._id.toString() : `fallback-${index}`;
                                if(item.image){
                                    

                                    
                                    image64= new Buffer(item.image, 'base64').toString('binary');

                                }
                                else{
                                    image64=''
                                }
                                
                                
                                return (
                                    
                                        <div className="doctor-img-customize" key={uniqueKey}>
                                            <div className="doctor-img-container">
                                                <img className="doctor-img" src={image64} alt="chay-picture"></img>

                                            </div>

                                            <a className='doctor-name' onClick={()=>handleDetailDoctor(item)}>{item.firstName + ' '+ item.lastName}</a>
                                            <p>{name}</p>
                                        </div>
                                    

                                )
                            })

                         : ''} 


                    





                </Slider>

            </div>

        </div>

    );


}
export default OutstandingDoctor;