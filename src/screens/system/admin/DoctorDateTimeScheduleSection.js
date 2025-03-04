import './DoctorDateTimeScheduleSection.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";


import React, { useEffect, useState, useRef } from 'react';

import { useCreateBulkScheduleMutation } from '../../../slices/doctorApiSlice';

import "react-datepicker/dist/react-datepicker.css";


import { toast } from 'react-toastify';
import BookingModal from './BookingModal';



const DoctorDateTimeScheduleSection = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [appointmentIsCreated, setAppointmentIsCreated] = useState(false);
    let NoChangeSchedule = useRef(null);

    NoChangeSchedule = props.defaultSchedule;

    let doctorID = props.pdoctorID;
    const [timeSelected, setTimeSelected]=useState();

    const [selectedDate, setSelectedDate] = useState(null);
    const [allScheduleTime, setAllScheduleTime] = useState([]);

    const [data, setData] = useState('');

    const [createBulkAppoinment] = useCreateBulkScheduleMutation();



    console.log('check id at Doctor Detail page: ', doctorID);

    const parentToggle = () => setOpenModal(!openModal);

    const handleReRenderPage = () => handleSelectDateChange(selectedDate);





    const handleSelectDateChange = async (selectedDate) => {
        setSelectedDate(selectedDate);
        console.log('select Date: ', selectedDate.toDateString());
        console.log('Selected DoctorID ', doctorID);
        let existingTime = [];


        if (selectedDate && doctorID) {
            try {
                // const res = await getScheduleDetails({selectedDate: selectedDate
                //      });
                // console.log('response from server: ', res)

                fetch(`http://localhost:8000/api/doctor/get-schedule-detail-by-doctorID?doctorID=${doctorID}&selectedDate=${selectedDate.toDateString()}`)
                    .then(res => { return res.json() })
                    .then(resData => {

                        console.log('Respone Data: ', resData);
                        existingTime = resData.existingTime;
                        console.log('existing Time of the doctor ', existingTime);
                        //console.log('All schedule Time: ', allScheduleTime);

                        // const currentSchedule = allScheduleTime.map((item, index)=>{


                        //     if(existingTime.includes(item.key)){

                        //     return {...item, isSelected : true} ;
                        //     }else{
                        //     return {...item};
                        //     }

                        //     })


                        // only return the availabe appointment
                        console.log('No change Schedule ', NoChangeSchedule)

                        let currentSchedule = NoChangeSchedule.filter((item, index) => {


                            if (!existingTime.includes(item.key)) {

                                return { ...item };
                            }

                        })



                        console.log('after process ', currentSchedule);
                        setAllScheduleTime(currentSchedule);





                    });
            } catch (e) {
                console.log(e);
            }
        }



    }

    const handleOnclickTime = (dataTime) => {



        let newAllScheduleTime;
        //console.log('newAllScheduleTime before process ', newAllScheduleTime);

        if (allScheduleTime && allScheduleTime.length > 0) {
            newAllScheduleTime = allScheduleTime.map(

                item => item._id === dataTime._id ? { ...item, isSelected: !item.isSelected } : item

            )

        }


        console.log('new All Schedule Time after process ', newAllScheduleTime);
        setAllScheduleTime(newAllScheduleTime);

        let time= newAllScheduleTime.filter((item)=>{
            if(item.isSelected===true){
                return item
            }
        })
        if(time){
            console.log('Selected time ', time);
            setTimeSelected(time);}

        
        
        setOpenModal(true);


    }





    const handleSave = async () => {
        //setOpenModal(true);

        // console.log('select Date: ', selectedDate.toDateString());
        // console.log('Selected DoctorID ', doctorID);
        if (!selectedDate) {
            toast.error('invalid Date');
            return;
        }




        let inputData = [];


        let selectedScheduleTime;


        if (allScheduleTime && allScheduleTime.length > 0) {
            selectedScheduleTime = allScheduleTime.filter(
                item => item.isSelected === true


            );

        }

        //console.log('Select Time :', selectedScheduleTime);

        if (selectedScheduleTime && selectedScheduleTime.length > 0) {

            selectedScheduleTime.map(time => {
                let object = {};
                object.doctorID = doctorID;
                object.date = selectedDate.toDateString();
                object.time = time.key;

                inputData.push(object);
            })

        } else {
            toast.error('Invalid Time')
        }

        let res = {};
        console.log('input Data: ', inputData);

        try {
            res = await createBulkAppoinment({ arraySche: inputData });
            console.log('response from server: ', res)
            if (res.data.message === 'Save Appointments successfull') {
                toast.success('Save Appointments successfull');
            }

        } catch (e) {
            console.log(e)
        }
       
    }





    return (






        <div className='schedule-doctor'>

            <div className='left-content'>
                <div className='select_date-container'>
                    <label className='select-date-label'>Select Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleSelectDateChange}
                        minDate={new Date()} // Prevents selecting past dates
                        dateFormat="yyyy-MM-dd"
                        className="border p-2 rounded w-full"
                    />

                    <label className='display-selected-date'>{selectedDate ? selectedDate.toDateString() : ''}</label>





                </div>


                <div className='select_time-container'>



                    {allScheduleTime && allScheduleTime.length > 0 ? (
                        <div className='select-time-container-left'>
                            {allScheduleTime.map((item, index) => {
                                return (
                                    <div key={item._id} className='button-container'>
                                        <button
                                            className={item.isSelected === true ? "time-button selected" : "time-button"}  onClick={() => handleOnclickTime(item)}>{item.value_vn}
                                        </button></div>)
                            })}
                        </div>
                    ) : (
                        <div>No availabe appointment for this date</div>
                    )}

                    <>{openModal && 
                    <BookingModal modalOpen={openModal} 
                    parentToggle={parentToggle} 
                    handleReRenderPage={handleReRenderPage} 
                    doctorID={doctorID} 
                    timeSelected={timeSelected}
                    selectedDate={selectedDate} />
                    }           </>





                </div>

                {/* <button className='btn btn-primary' onClick={handleSave}>Book Appointment</button> */}

            </div>






        </div>



    )





}

export default DoctorDateTimeScheduleSection;