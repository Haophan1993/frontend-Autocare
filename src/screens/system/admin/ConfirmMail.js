import './ConfirmMail.scss';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useVerifyEmailMutation } from '../../../slices/patientApiSlice';
import HomeHeader from '../../HomePage/HomeHeader';


const ConfirmMail = () => {
    const [searchParams] = useSearchParams();
    const [verify] = useVerifyEmailMutation();

    // Extract token and doctorID from URL
    const token = searchParams.get("token");
    const doctorID = searchParams.get("doctorID");

    // Store them in the component state
    const [emailToken, setEmailToken] = useState(null);
    const [emailDoctorID, setEmailDoctorID] = useState(null);
    const [verifyStatus, setVerifyStatus]=useState(false);

    useEffect(() => {
        if (token && doctorID) {
            setEmailToken(token);
            setEmailDoctorID(doctorID);
        }
    }, [token, doctorID]); // Dependency array ensures it runs when token/doctorID changes

    // Step 2: Fetch data when state updates
    useEffect(() => {

        const  fetchData= async()=>{

            if (emailToken && emailDoctorID) {
                let clientData = { token: emailToken, doctorID: emailDoctorID };
                //console.log("Check data:", clientData);
                let result = await verify(clientData); // Now it will have the correct values

    
                //console.log('Verify Status: ', result.data);
                if(result.data==='Confirm an existing appointment successfull!')
                {
                    setVerifyStatus(true);
                }
            }

        }
        fetchData();
        
    }, [emailToken, emailDoctorID]);



    return (
        <>

            <HomeHeader isShowBanner={false} />

            <div className='confrim-container'>
                <h2>Email Confirmation</h2>
                {verifyStatus?<p>Thank you for your confirmation</p>: <p>Something is wrong, please try again</p>}
                
            </div>
        </>

    )

}

export default ConfirmMail;