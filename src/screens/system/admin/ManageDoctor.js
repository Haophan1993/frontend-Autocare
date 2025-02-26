import './ManageDoctor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';


//import { useSelector } from 'react-redux';
//import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';


import React, { useState, useEffect, useRef } from 'react';
import MarkdownEditor, { getCommands } from '@uiw/react-markdown-editor';
import { useSaveDoctorInforMutation } from '../../../slices/doctorApiSlice';
import axios from 'axios';
//import MarkdownPreview from '@uiw/react-markdown-preview';
import MarkdownIt from 'markdown-it';

import Select from 'react-select';
import { useGetDoctorsMutation } from '../../../slices/doctorApiSlice';
import { useGetAllCodesMutation } from '../../../slices/usersApiSlice';






let doctor = [];
let price=[];
let paymentMethod=[];
let province=[];








const ManageDoctor = () => {

    const [getAllCodes] = useGetAllCodesMutation();
    const mdParser = new MarkdownIt();
    const navigate = useNavigate();
    const [getDoctors] = useGetDoctorsMutation();
    const [content, setContent] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setselectedDoctor] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPrice, setSelectedPrice]=useState('');
    const [selectedPayment, setSelectedPayment]=useState('');
    const [selectedProvince, setSelectedProvince]=useState('');
    const [clinicName, setClinicName]=useState('');
    const [clinicAddress, setClinicAddress]=useState('');
    const [note, setNote]=useState('');

    const editorRef = useRef(null);
    const [doctorListArr, setDoctorListArr] = useState();
    const [priceListArr, setPriceListArr] = useState();
    const [paymentListArr, setPaymentListArr] = useState();
    const [provinceListArr, setProvinceListArr] = useState();

    const [saveDoctorInfor] = useSaveDoctorInforMutation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        

        const fetchData = async () => {

            try {
                const response = await getDoctors().unwrap();
                const resPrice = await getAllCodes({ type: 'PRICE' }).unwrap();
                const resPaymentMethod = await getAllCodes({ type: 'PAYMENT' }).unwrap();
                const resProvince = await getAllCodes({ type: 'PROVINCE' }).unwrap();

                
                



                setDoctorListArr(response.doctorList);
                setPriceListArr(resPrice.allcode);
                setPaymentListArr(resPaymentMethod.allcode);
                setProvinceListArr(resProvince.allcode);
            } catch (e) {
                console.error("Error fetching data:", e);
            } finally {

                setLoading(false);
            }




        }
        fetchData();




    }, []);

    const handleSave = async () => {
        console.log(selectedDoctor.value, description, content, contentHTML, 
            selectedPrice.value, selectedPayment.value, selectedProvince.value, clinicName, clinicAddress, note);



        try {

            const res = await saveDoctorInfor({
                id: selectedDoctor.value,
                description: description,
                content: content,
                contentHTML: contentHTML,
                price: selectedPrice.value,
                payment:selectedPayment.value,
                province:selectedProvince.value,
                clinicName: clinicName,
                clinicAddress: clinicAddress,
                clinicNote: note,
            });



            if (res.data.message === "Markdown saved successfully!") {

                setselectedDoctor('');
                setContent('');
                setContentHTML('')
                setDescription('');


            }
        } catch (error) {
            console.error('Error saving markdown:', error);
        }
    };



    const handleImageUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData(); // ✅ Initialize FormData
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:8000/api/doctor/upload-image', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Get the image URL from the server
                const imageUrl = response.data.url;

                // Insert Markdown image syntax at the cursor position
                const textarea = editorRef.current.querySelector('textarea');
                const startPos = textarea.selectionStart;
                const endPos = textarea.selectionEnd;

                const newContent = content.substring(0, startPos) + `\n![Image](${imageUrl})\n` + content.substring(endPos);

                setContent(newContent);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
        input.click();
    };


    // const handleImageUpload = async () => {
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = 'image/*';
    //     input.onchange = async (event) => {
    //       const file = event.target.files[0];
    //       if (!file) return;

    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => {
    //         const base64String = reader.result;

    //         // Get the current cursor position
    //         const textarea = editorRef.current.querySelector('textarea');
    //         const startPos = textarea.selectionStart;
    //         const endPos = textarea.selectionEnd;

    //         // Ensure proper Base64 format for Markdown
    //         const imageMarkdown = `\n![Uploaded Image](${base64String})\n`;

    //         // Insert image markdown at cursor position
    //         const newContent = content.substring(0, startPos) + imageMarkdown + content.substring(endPos);
    //         setContent(newContent); // ✅ Updates both editor and preview
    //       };
    //       reader.onerror = error => console.error('Error converting image to base64:', error);
    //     };
    //     input.click();
    //   };

    const addImage = {
        name: 'title2',
        keyCommand: 'title2',
        button: { 'aria-label': 'ABC' },
        icon: (
            <span style={{ "backgroundColor": "powderblue" }}>+</span>
        ),
        execute: handleImageUpload,

    };



    const handleSelectDoctorChange = async (selectedDoctor) => {
        setselectedDoctor(selectedDoctor);
        setSelectedPrice('');
        setSelectedPayment('');
        setSelectedProvince('');

        fetch(`http://localhost:8000/api/doctor/get-doctor-detail-by-id?id=${selectedDoctor.value}`).then(res => { return res.json() })
            .then(data => {

                 //console.log('Data from API: ', data);

                // console.log(data.doctorInfo[0].markdowns[0]);

                // if (!data.doctorInfo[0].markdowns[0]) {
                //     setDescription('');
                //     setContent('');

                // } else {
                //     if (data.doctorInfo[0].markdowns[0].description) {
                //         setDescription(data.doctorInfo[0].markdowns[0].description);
                //     } else {
                //         setDescription('');
                //     }

                //     if (data.doctorInfo[0].markdowns[0].content) {
                //         setContent(data.doctorInfo[0].markdowns[0].content);

                //     } else {
                //         setContent('');
                //     }

                // }
                if(data.doctorInfo[0].markdowns[0]){
                    setDescription(data.doctorInfo[0].markdowns[0].description);
                    setContent(data.doctorInfo[0].markdowns[0].content);

                }
                if(data.doctorInfo[0].additionalDoctorinfo[0]){
                    setClinicName(data.doctorInfo[0].additionalDoctorinfo[0].clinicName);
                    setClinicAddress(data.doctorInfo[0].additionalDoctorinfo[0].clinicAddress);
                    setNote(data.doctorInfo[0].additionalDoctorinfo[0].note);
                    
                    const foundPrice = price.find(item=>item.value===data.doctorInfo[0].additionalDoctorinfo[0].priceID);
                    const foundPayment = paymentMethod.find(item=>item.value===data.doctorInfo[0].additionalDoctorinfo[0].paymentID);
                    const foundProvince = province.find(item=>item.value===data.doctorInfo[0].additionalDoctorinfo[0].provinceID);
                    
                    setSelectedPrice(foundPrice);
                    setSelectedPayment(foundPayment);
                    setSelectedProvince(foundProvince);
                    
                }





            });



    }
    const handleSelectedPriceChange=(selectedPrice)=>{
        setSelectedPrice(selectedPrice);
        //console.log('selected Price on Change ', selectedPrice);

    }

    const handleSelectedPaymentChange=(selectedPayment)=>{
        setSelectedPayment(selectedPayment);
    }

    const handleSelectedProvinceChange=(selectedProvince)=>{
        setSelectedProvince(selectedProvince);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);

    }

    const handleClinicNameChange=(e)=>{
        setClinicName(e.target.value);
    }
    const handleClinicAddressChange=(e)=>{
        setClinicAddress(e.target.value);
    }
    const handleNoteChange=(e)=>{
        setNote(e.target.value);
    }


    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        if (doctorListArr) {
            doctor = doctorListArr.map(doctor => ({
                value: doctor._id,
                label: doctor.firstName,
            }));
        }

        if (priceListArr) {
            price = priceListArr.map(item => ({
                value: item.key,
                label: item.value_en,
            }));
        }
        if (paymentListArr) {
            paymentMethod = paymentListArr.map(item => ({
                value: item.key,
                label: item.value_en,
            }));
        }

        if (provinceListArr) {
            province = provinceListArr.map(item => ({
                value: item.key,
                label: item.value_en,
            }));
        }
        
        return (


            <>
                <Header />
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Add new doctor information</div>
                    <div className='more-infor'>
                        <div className='content-left'>

                            <label>Select Doctor</label>
                            <Select
                                value={selectedDoctor}
                                onChange={handleSelectDoctorChange}


                                options={doctor}
                                placeholder="Select a doctor..."
                                isSearchable={true} />
                        </div>

                        <div className='content-right'>
                            <label>Doctor Description</label>
                            <textarea className='form-control' rows='4'
                                value={description}
                                onChange={(e) => handleDescriptionChange(e)}></textarea>
                        </div>



                    </div>
                    <div className='detail-doctor-container'>
                        <div className='detail-doctor-up'>
                            <div className='select-price-container'>
                                <label>Select Price</label>
                                <Select
                                    value={selectedPrice}
                                    onChange={handleSelectedPriceChange}


                                    options={price}
                                    placeholder="Select price..."
                                    isSearchable={true} />

                            </div>
                            <div className='select-payment-container'>
                                <label>Payment Method</label>
                                <Select
                                    value={selectedPayment}
                                    onChange={handleSelectedPaymentChange}


                                    options={paymentMethod}
                                    placeholder="Select payment method..."
                                    isSearchable={true} />

                            </div>
                            <div className='select-province-container'>
                                <label>Province</label>
                                <Select
                                    value={selectedProvince}
                                    onChange={handleSelectedProvinceChange}


                                    options={province}
                                    placeholder="Select province..."
                                    isSearchable={true} />

                            </div>

                        </div>
                        <div className='detail-doctor-down'>
                            <div className='clinic-name'>
                                <label>Clinic Name</label>
                                <input type='text' placeholder='Enter clinic name' value={clinicName}
                                onChange={(e)=>handleClinicNameChange(e)}></input>
                            </div>
                            <div className='clinic-address'>
                                <label>Clinic Address</label>
                                <input type='text' placeholder='Enter clinic Address' value={clinicAddress}
                                onChange={(e)=>handleClinicAddressChange(e)}></input>
                            </div>
                            <div className='note'>
                                <label>Note</label>
                                <input type='text' value={note}
                                onChange={(e)=>handleNoteChange(e)}></input>
                            </div>
                        </div>

                    </div>
                    <div className='manage-doctor-editor'>

                        <h2>Markdown Editor</h2>
                        <div ref={editorRef}>
                            <MarkdownEditor
                                value={content}
                                onChange={(value) => {
                                    setContent(value);
                                    setContentHTML(mdParser.render(value));

                                    //console.log('content ', content, 'contentHTML', contentHTML)
                                }}
                                height="600px"

                                toolbars={[
                                    "bold", "image",
                                ]}
                                commands={[addImage, ...getCommands()]}
                            />
                        </div>
                        <button onClick={handleSave}>Save Markdown</button>

                        {/* <h2>Preview</h2>
                        <MarkdownPreview source={content} 
                         />*/}

                    </div>
                </div>


            </>

        )
    }





}

export default ManageDoctor