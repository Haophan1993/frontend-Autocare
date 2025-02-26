import './BookingModal.scss';
import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import { Buffer } from 'buffer';


// const BookingModal = ({ modalOpen, parentToggle, handleReRenderPage, doctorID, timeSelected, selectedDate}) => {
const BookingModal = (props) => {
    const toggle = () => { props.parentToggle() };
    const callParentReRenderPage = () => { props.handleReRenderPage() };
    console.log('Doctor ID in Booking Modal ', props.doctorID);
    console.log('Select time in Booking Modal ', props.timeSelected);
    console.log('Select date in Booking Modal ', props.selectedDate.toDateString());
    const [bookingPerson, setBookingPerson] = useState('yourself');
    const [gender, setGender] = useState('unknown');
    const [price, setPrice] = useState('');
    const [data, setData] = useState('');
    let image64;


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
                                <Form.Group className='my-2' controlId='firstname'>
                                    {/* <Form.Label>First Name</Form.Label> */}
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter patient name (required)'

                                    ></Form.Control>

                                    <Form.Control
                                        type='text'
                                        placeholder='Phone Number (required)'

                                    ></Form.Control>
                                    <Form.Control
                                        type='text'
                                        placeholder='Year of born (required)'

                                    ></Form.Control>
                                </Form.Group>




                            </Form>

                        </FormContainer>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" >
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