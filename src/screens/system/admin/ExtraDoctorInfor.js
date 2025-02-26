import './ExtraDoctorInfor.scss';

import React, { useEffect, useState, useRef } from 'react';


const ExtraDoctorInfor = (props)=>{
    let doctorID = props.pdoctorID;
    const[price, setPrice]=useState('');
    const [clinicName, setClinicName] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [province, setProvince]=useState('');
    const [payment, setPayment]=useState('');
    const [note, setNote]=useState('');
    const [isShowMoreDetails, setIsShowMoreDetails]=useState(false);


    useEffect(()=>{
        const fetchData = async () => {
            fetch(`http://localhost:8000/api/doctor/get-extra-detail-by-doctorID?id=${doctorID}`).then(res => { return res.json() })
                .then(resData => {
                    console.log('respone full ', resData[0].additionalDoctorinfo[0]);
                    if(resData[0].additionalDoctorinfo[0]){
                        setPrice(resData[0].additionalDoctorinfo[0].priceInfo[0].value_en);
                        setProvince(resData[0].additionalDoctorinfo[0].provinceInfo[0].value_en);
                        setPayment(resData[0].additionalDoctorinfo[0].paymentInfo[0].value_en);
                        setClinicName(resData[0].additionalDoctorinfo[0].clinicName);
                        setClinicAddress(resData[0].additionalDoctorinfo[0].clinicAddress);
                        setNote(resData[0].additionalDoctorinfo[0].note);
                        

                    }




                });
        };
        fetchData();
    },[]);

    const handleShowMoreDetails=()=>{
        setIsShowMoreDetails(!isShowMoreDetails);
    }

    return(
        <div className='extra_doctor-infor'>
            <h2>Clinic Information</h2>
            Clinic Name: {clinicName} <br></br>
            Clinic Address: {clinicAddress} <br></br>
            Province: {province} <br></br>
            {!isShowMoreDetails?<div>
                Price: ${price} <span className='see-more-label' onClick={handleShowMoreDetails} >More details</span><br></br>

            </div>:<div>
                Price: ${price} <br></br>
                Payment Method: {payment} <br></br>
                Note: {note} <br></br>
            <span className='see-more-label' onClick={handleShowMoreDetails} >Hide details</span></div>}
            

            
        </div>
    )


}

export default ExtraDoctorInfor;