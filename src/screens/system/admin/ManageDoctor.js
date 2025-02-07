import './ManageDoctor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';


//import { useSelector } from 'react-redux';
//import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';


import React, { useState, useEffect, useRef } from 'react';
import MarkdownEditor, { getCommands } from '@uiw/react-markdown-editor';
import { useSaveMarkdownMutation } from '../../../slices/doctorApiSlice';
import axios from 'axios';













const ManageDoctor = () => {



    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    const [saveMarkdown] = useSaveMarkdownMutation();

    //   useEffect(() => {
    //     axios.get('http://localhost:5000/content')
    //       .then(response => {
    //         if (response.data) {
    //           setContent(response.data.content);
    //         }
    //       })
    //       .catch(error => console.error('Error fetching markdown:', error));
    //   }, []);

    //   const handleSave = async () => {

    //     try {

    //       const res= await saveMarkdown({content});
    //       if(res){

    //         alert(res);

    //       }

    //     } catch (error) {
    //       console.error('Error saving markdown:', error);
    //     }
    //   };

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/api/doctor/save', { content });
            alert('Markdown saved successfully!');
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
                const response = await axios.post('http://localhost:5000/api/doctor/upload-image', formData, {
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


    const addImage = {
        name: 'title2',
        keyCommand: 'title2',
        button: { 'aria-label': 'ABC' },
        icon: (
            <span>+</span>
        ),
        execute: handleImageUpload,

    };












    return (


        <>
            <Header />
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Add new doctor information</div>

                <div className='manage-doctor-editor'>

                    <h2>Markdown Editor</h2>
                    <div ref={editorRef}>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            height="800px"
                            toolbars={[
                                "bold", "italic", "underline", "link", addImage,
                            ]}
                        />
                    </div>
                    <button onClick={handleSave}>Save Markdown</button>

                </div>
            </div>


        </>

    )
}

export default ManageDoctor