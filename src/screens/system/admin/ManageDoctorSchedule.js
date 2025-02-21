import './ManageDoctorSchedule.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';

import Select from 'react-select';
import { useGetDoctorsMutation } from '../../../slices/doctorApiSlice';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllCodesMutation } from '../../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {useCreateBulkScheduleMutation} from '../../../slices/doctorApiSlice';













const ManageDoctorSchedule = () => {
    const [selectedDoctor, setselectedDoctor] = useState('');
    let Doctor = [];
    const [doctorListArr, setDoctorListArr] = useState();
    const [getDoctors] = useGetDoctorsMutation();
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [getAllCodes] = useGetAllCodesMutation();
    const [allScheduleTime, setAllScheduleTime]= useState([]);
    const [createBulkAppoinment] = useCreateBulkScheduleMutation();


    const handleSelectDoctorChange =  (selectedDoctor) => {
        
        setselectedDoctor(selectedDoctor);

        //console.log('select doctor Id: ', selectedDoctor.value);



    }

    const handleSelectDateChange = (selectedDate)=>{
        setSelectedDate(selectedDate.toDateString());
        //console.log('check picked date: ', selectedDate);

    }

    useEffect(() => {


        const fetchData = async () => {

            try {
                const response = await getDoctors().unwrap();
                const resTIME = await getAllCodes({ type: 'TIME' }).unwrap();
                if(resTIME){
                    
                let scheduleTimeData= resTIME.allcode.map(item=>({...item, isSelected: false}));

                
                setAllScheduleTime(scheduleTimeData);
                    
                }



                setDoctorListArr(response.doctorList);
            } catch (e) {
                console.error("Error fetching data:", e);
            } finally {

                setLoading(false);
            }




        }
        fetchData();




    }, []);

    const handleOnclickTime = (dataTime)=>{
        
        //console.log('Check onClick Event: ', dataTime);

        let newAllScheduleTime;
        //console.log('newAllScheduleTime before process ', newAllScheduleTime);
        
        if(allScheduleTime && allScheduleTime.length>0){
             newAllScheduleTime = allScheduleTime.map(

                item=>item._id === dataTime._id ? { ...item, isSelected: !item.isSelected } : item
                 
             )
            
         }


        //console.log('new All Schedule Time after process ', newAllScheduleTime);
        setAllScheduleTime(newAllScheduleTime);

        
    }

    const handleSave = async()=>{
        if(!selectedDate){
            toast.error('invalid Date');
            return;
        }

        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid Doctor');
            return;
        }


        let inputData=[];
        

        let selectedScheduleTime;
        
        
        if(allScheduleTime && allScheduleTime.length>0){
            selectedScheduleTime = allScheduleTime.filter(
                    item=> item.isSelected===true
                
                 
             );
            
         }

         //console.log('Select Time :', selectedScheduleTime);

         if(selectedScheduleTime && selectedScheduleTime.length>0){

            selectedScheduleTime.map(time=>{
                let object = {};
                object.doctorID= selectedDoctor.value;
                object.date= selectedDate;
                object.time= time.key;

                inputData.push(object);
            })

         }else{
            toast.error('Invalid Time')
         }
         
         let res={};
         console.log('input Data: ', inputData); 

         try{
            res = await createBulkAppoinment({arraySche: inputData});
            console.log('response from server: ', res)

         }catch(e){
            console.log(e)}
        //  }finally{
        //     console.log('response from server: ', res)
        //  }
    }


    
    
    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        if (doctorListArr) {
            Doctor = doctorListArr.map(doctor => ({
                value: doctor._id,
                label: doctor.firstName,
            }));
        }

        //console.log('All Schedule time before render ', allScheduleTime);
        return (
            <>
                <Header />
                <div className='manage-doctor-schedule-container'>
                    <div className='title'>Manage Doctor Schedule</div>
                    <div className='up-content'>
                        <div className='select-dotor-container'>
                            <label>Select Doctor</label>
                            <Select
                                className='select-dropdown'
                                value={selectedDoctor}
                                onChange={handleSelectDoctorChange}


                                options={Doctor}
                                placeholder="Select a doctor..."
                                isSearchable={true} />
                        </div>
                        <div className='select-date-container'>
                            <label>Select Date</label>
                            <div className="date-picker-content">
                                
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleSelectDateChange}
                                    minDate={new Date()} // Prevents selecting past dates
                                    dateFormat="yyyy-MM-dd"
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>

                    </div>

                    <div className='down-content'>
                    <label className='pick-time-label'>Pick Time</label>
                        <div className='pick-hour-container'>
                            
                            {allScheduleTime&& allScheduleTime.length>0&&allScheduleTime.map((item, index)=>{
                                //console.log(item.isSelected);
                                return(

                                    
                                    <button className={item.isSelected===true? "time-button selected": "time-button"} key={item._id} onClick={()=>handleOnclickTime(item) }>{item.value_vn}</button>
                                    
                                )
                            })}
                        </div>
                    </div>
                    <button className='btn btn-primary' onClick={handleSave}>Save</button>
                </div>
            </>

        )
    }










}

export default ManageDoctorSchedule