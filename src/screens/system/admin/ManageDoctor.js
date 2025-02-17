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






let Doctor=[]








const ManageDoctor = () => {

    
    const mdParser = new MarkdownIt();
    const navigate = useNavigate();
    const [getDoctors] = useGetDoctorsMutation();
    const [content, setContent] = useState('');
    const [contentHTML, setContentHTML]= useState('');
    const [selectedDoctor, setselectedDoctor]= useState('');
    const [description, setDescription]= useState('');
    const editorRef = useRef(null);
    const [doctorListArr, setDoctorListArr] = useState();

    const [saveDoctorInfor] = useSaveDoctorInforMutation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios.get('http://localhost:5000/content')
        //   .then(response => {
        //     if (response.data) {
        //       setContent(response.data.content);
        //     }
        //   })
        //   .catch(error => console.error('Error fetching markdown:', error));
        
        const fetchData =  async ()=> {

            try{
                const response = await getDoctors().unwrap();
            
            

            setDoctorListArr(response.doctorList);
            }catch(e){
                console.error("Error fetching data:", e);
            }finally {
                
                setLoading(false);
      }
            
            
            

        }
        fetchData();
        
        
        
        
    }, []);

      const handleSave = async () => {
       console.log(selectedDoctor.value, description, content, contentHTML);
       

       
        try {

          const res= await saveDoctorInfor({
            id:selectedDoctor.value, 
            description: description,
            content: content,
            contentHTML: contentHTML });

            
            
            if(res.data.message==="Markdown saved successfully!"){

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



    const handleSelectDoctorChange = async (selectedDoctor)=>{
        setselectedDoctor(selectedDoctor);
        
        fetch(`http://localhost:8000/api/doctor/get-doctor-detail-by-id?id=${selectedDoctor.value}`).then(res=>{return res.json()})
        .then(data=>{
            
            console.log(data.doctor[0].markdowns[0]);

            if(!data.doctor[0].markdowns[0]){
                setDescription('');
                setContent('');

            }else{
            if(data.doctor[0].markdowns[0].description){
                setDescription(data.doctor[0].markdowns[0].description);
            }else{
                setDescription('');
            }

            if(data.doctor[0].markdowns[0].content){
                setContent(data.doctor[0].markdowns[0].content);

            }else{
                setContent('');
            }

            }

            
            
            

        });
        
        
        
    }

    const handleDescriptionChange = (e)=>{
            setDescription(e.target.value);
            
    }


    if(loading){
        return(
            <div>Loading...</div>
        )
    }else{
        if(doctorListArr){
            Doctor = doctorListArr.map(doctor => ({
                value: doctor._id, 
                label: doctor.firstName,
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
                            
    
                            options={Doctor}
                            placeholder="Select a doctor..."
                            isSearchable={true}/>
                        </div>
    
                        <div className='content-right'>
                        <label>Doctor Description</label>
                            <textarea className='form-control' rows='4' 
                            value={description}
                            onChange={(e)=>handleDescriptionChange(e)}></textarea>
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