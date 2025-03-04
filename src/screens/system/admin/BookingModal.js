import './BookingModal.scss';
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import { Buffer } from 'buffer';
import { useGetAllCodesMutation } from '../../../slices/usersApiSlice';
import { useBookAppointmentMutation } from '../../../slices/patientApiSlice';
import { useSendConfirmEmailMutation } from '../../../slices/patientApiSlice';


// const BookingModal = ({ modalOpen, parentToggle, handleReRenderPage, doctorID, timeSelected, selectedDate}) => {
const BookingModal = (props) => {
    const toggle = () => { props.parentToggle() };
    const callParentReRenderPage = () => { props.handleReRenderPage() };

    const [bookingPerson, setBookingPerson] = useState('yourself');
    const [gender, setGender] = useState('unknown');
    const [price, setPrice] = useState('');
    const [data, setData] = useState('');
    let image64;
    const [getAllCodes] = useGetAllCodesMutation();
    const [bookApp] = useBookAppointmentMutation();
    const [sendConfirmEmail] = useSendConfirmEmailMutation();
    const [provinceArr, setProvinceArr] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState('');
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientPhoneNumber, setPatientPhoneNumber] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientAge, setPatientAge] = useState();



    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8000/api/doctor/get-extra-detail-by-doctorID?id=${props.doctorID}`).then(res => { return res.json() })
                .then(resData => {
                    console.log('respone full ', resData[0].additionalDoctorinfo[0]);
                    if (resData[0].additionalDoctorinfo[0]) {
                        setPrice(resData[0].additionalDoctorinfo[0].priceInfo[0].value_en);



                    }




                });

            fetch(`http://localhost:8000/api/doctor/get-doctor-detail-by-id?id=${props.doctorID}`).then(res => { return res.json() })
                .then(resData => {
                    //console.log('respone full ', resData.doctorInfo);
                    //console.log(resData.doctorInfo[0]);
                    setData(resData.doctorInfo[0]);
                    console.log('Data: ', data);




                });
            const resProvince = await getAllCodes({ type: 'PROVINCE' }).unwrap();
            console.log('Province Response ', resProvince)
            if (resProvince) {
                setProvinceArr(resProvince.allcode);
                console.log('Province Array ', provinceArr)
            }
        };
        fetchData();
    }, []);

    const handleBookingPersonOnchange = (e) => {
        setBookingPerson(e.target.id === 'bookForYourselfOption' ? 'yourself' : 'someone');
    }

    const handleGenderOnchange = (e) => {
        setGender(e.target.id === 'maleOption' ? 'male' : 'female');
    }
    if (data.image) {
        image64 = new Buffer(data.image, 'base64').toString('binary');


    }
    const handleBookAppointment = async () => {
        // console.log('Doctor ID in Booking Modal ', props.doctorID);
        // console.log('Select time in Booking Modal ', props.timeSelected[0].key);
        // console.log('Select date in Booking Modal ', props.selectedDate.toDateString());
        // console.log('Who books: ', bookingPerson);
        // console.log('Gender: ', gender);
        // console.log('Province: ', provinceSelected);
        // console.log('Patient First Name: ', patientFirstName);
        // console.log('Patient Last Name: ', patientLastName);
        // console.log('Patient Phone Number: ', patientPhoneNumber);
        // console.log('Patient Email Address: ', patientEmail);
        let currentYear = new Date().getFullYear();
        const bookingData = {
            doctorId: props.doctorID,
            time: props.timeSelected[0]?.key, // Use optional chaining to prevent errors if timeSelected is empty
            date: props.selectedDate?.toDateString(), // Use optional chaining to prevent errors if selectedDate is null/undefined
            bookingPerson: bookingPerson,
            gender: gender && gender === 'male' ? 'M' : 'F',
            province: provinceSelected,
            patientFirstName: patientFirstName,
            patientLastName: patientLastName,
            patientPhoneNumber: patientPhoneNumber,
            patientEmail: patientEmail,
            patientAge: currentYear - parseInt(patientAge)
        };
        console.log('Booking Data:', bookingData);
        let bookingResult=await bookApp(bookingData);
        console.log(bookingResult);



        const emailDetails = {
            to: 'mphan120193@gmail.com',
            subject: 'Test Email from Front End',
            message: "Hello",
            bookingDa: bookingData,
            bookingResult: bookingResult.data.result,
        }


        sendConfirmEmail(emailDetails);
        callParentReRenderPage();
        toggle();



    }

    return (
        <div>


            <Modal isOpen={props.modalOpen} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Create a new appointment</ModalHeader>
                <ModalBody>
                    <div className='booking-container'>
                        <div className='doctor-infor'>
                            <div className='dotor-detail'>
                                <div className='content-left'>
                                    <img className="doctor-img" src={image64} alt="doctor-picture"></img>
                                </div>
                                <div className='content-right'>
                                    <h2>{data.lastName} {data.firstName}</h2>

                                </div>

                            </div>

                            <div className='appointment-info'>
                                {props.timeSelected[0] ? props.timeSelected[0].value_en : 'No time is selected'}. {props.selectedDate.toDateString()}<br></br>
                                Alway free booking...
                            </div>
                            <div className='doctor-price'></div>
                            Price: ${price}

                        </div>
                        <FormContainer>


                            <Form onChange={handleBookingPersonOnchange}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Book for yourself"
                                    name="inlineRadioOptions"
                                    id="bookForYourselfOption"
                                    checked={bookingPerson === 'yourself'}
                                    onChange={handleBookingPersonOnchange}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Book for someone"
                                    name="inlineRadioOptions"
                                    id="bookForSomeoneOption"
                                    checked={bookingPerson === 'someone'}
                                    onChange={handleBookingPersonOnchange}
                                />

                            </Form>

                            <Form onChange={handleGenderOnchange}>
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Male"
                                    name="inlineRadioOptions"
                                    id="maleOption"
                                    checked={gender === 'male'}
                                    onChange={handleGenderOnchange}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Female"
                                    name="inlineRadioOptions"
                                    id="femaleOption"
                                    checked={gender === 'female'}
                                    onChange={handleGenderOnchange}
                                />

                            </Form>

                            <Form>
                                <Form.Group className='my-2'>

                                    <Form.Control
                                        type='text'
                                        placeholder='Enter patient first name (required)'
                                        value={patientFirstName}
                                        onChange={(e) => setPatientFirstName(e.target.value)}

                                    ></Form.Control>
                                    {/* <Form.Control
                                        type='text'
                                        placeholder='Enter patient last name (required)'
                                        value={patientLastName}
                                        onChange={(e)=>setPatientLastName(e.target.value)}

                                    ></Form.Control> */}

                                    <Form.Control
                                        type='text'
                                        placeholder='Phone Number (required)'
                                        value={patientPhoneNumber}
                                        onChange={(e) => setPatientPhoneNumber(e.target.value)}


                                    ></Form.Control>
                                    <Form.Control
                                        type='email'
                                        placeholder='Email address (required)'
                                        value={patientEmail}
                                        onChange={(e) => setPatientEmail(e.target.value)}

                                    ></Form.Control>
                                    <Form.Control
                                        type='text'
                                        placeholder='Year of born (required)'
                                        value={patientAge}
                                        onChange={(e) => setPatientAge(e.target.value)}

                                    ></Form.Control>
                                    <Form.Control as="select" value={provinceSelected} onChange={(e) => setProvinceSelected(e.target.value)}>
                                        <option value="">Select Province..</option>
                                        {provinceArr && provinceArr.length > 0 && provinceArr.map((item, index) => {
                                            return (

                                                <option key={index} value={item.key}>{item.value_en}</option>

                                            )
                                        })}

                                    </Form.Control>

                                </Form.Group>




                            </Form>

                        </FormContainer>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleBookAppointment}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>

    );

}

export default BookingModal;