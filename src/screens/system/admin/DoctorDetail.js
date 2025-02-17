import './DoctorDetail.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

import HomeHeader from '../../HomePage/HomeHeader';
import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
import ReactMarkdown from 'react-markdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllCodesMutation } from '../../../slices/usersApiSlice';
//import {useGetScheduleDetailByDoctorIDMutation} from '../../../slices/doctorApiSlice';
import { toast } from 'react-toastify';
import { useCreateBulkScheduleMutation } from '../../../slices/doctorApiSlice';









const DoctorDetail = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [allScheduleTime, setAllScheduleTime] = useState([]);
    const { id } = useParams();
    const [data, setData] = useState('');
    let image64;
    let doctorID = id;

    const NoChangeSchedule = useRef(null);
    //console.log('check id at Doctor Detail page: ', doctorID);
    const [getAllCodes] = useGetAllCodesMutation();

    //const [getScheduleDetails] = useGetScheduleDetailByDoctorIDMutation();
    const [createBulkAppoinment] = useCreateBulkScheduleMutation();

    useEffect(() => {

        const fetchData = async () => {

            fetch(`http://localhost:8000/api/doctor/get-doctor-detail-by-id?id=${id}`).then(res => { return res.json() })
                .then(resData => {

                    //console.log(data.doctor[0]);
                    setData(resData.doctor[0]);
                    //console.log('Data: ', data);




                });

            const resTIME = await getAllCodes({ type: 'TIME' }).unwrap();
            if (resTIME) {

                let scheduleTimeData = resTIME.allcode.map(item => ({ ...item, isSelected: false }));


                setAllScheduleTime(scheduleTimeData);
                NoChangeSchedule.current = scheduleTimeData;



            }



        };
        fetchData();



    }, [])

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

                        console.log(resData);
                        existingTime = resData.existingTime;
                        console.log('existing Time of the doctor ', existingTime);
                        console.log('All schedule Time: ', allScheduleTime);

                        // const currentSchedule = allScheduleTime.map((item, index)=>{


                        //     if(existingTime.includes(item.key)){

                        //     return {...item, isSelected : true} ;
                        //     }else{
                        //     return {...item};
                        //     }

                        //     })


                        // only return the availabe appointment
                        console.log('No change Schedule ', NoChangeSchedule.current)

                        let currentSchedule = NoChangeSchedule.current.filter((item, index) => {


                            if (!existingTime.includes(item.key)) {

                                return { ...item };
                            }

                        })

                        // const currentSchedule = allScheduleTime.map((item) => ({


                        //     ...item,
                        //     isSelected: existingTime.includes(item.key) // Directly assign the boolean result
                        // }));

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


    }



    //console.log(data);

    const handleSave = async () => {

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
        //  }finally{
        //     console.log('response from server: ', res)
        //  }
    }


    if (data.image) {
        image64 = new Buffer(data.image, 'base64').toString('binary');


    }
    if (image64) {

        return (
            <>

                <HomeHeader isShowBanner={false} />





                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <img className="doctor-img" src={image64} alt="doctor-picture"></img>
                        </div>
                        <div className='content-right'>
                            <h2>{data.lastName} {data.firstName}</h2>
                            <p>{data.markdowns[0].description}</p>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
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
                            {allScheduleTime && allScheduleTime.length > 0 && allScheduleTime.map((item, index) => {


                                return (


                                    <button className={item.isSelected === true ? "time-button selected" : "time-button"} key={item._id} onClick={() => handleOnclickTime(item)}>{item.value_vn}</button>

                                )
                            })}
                        </div>
                        <button className='btn btn-primary' onClick={handleSave}>Book Appointment</button>

                    </div>
                    <div className='detail-infor'>
                        <ReactMarkdown>{data.markdowns[0].content}</ReactMarkdown>
                    </div>
                    <div className='comment'></div>
                </div>
            </>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }













}

export default DoctorDetail