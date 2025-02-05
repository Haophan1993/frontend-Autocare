import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





import { useEditUserMutation } from '../../slices/usersApiSlice';




const ModalEditUser = ({ EditModal, parentToggle, editUser, handleReRenderPage }) => {


  const [firstName, setfirstName] = useState(editUser.firstName);
  const [lastName, setlastName] = useState(editUser.lastName);
  const [email, setEmail] = useState(editUser.email);
  const [image, setImage] = useState(editUser.image);



  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit] = useEditUserMutation();

  //const { userInfo } = useSelector((state) => state.auth);

  const callParentReRenderPage = () => { handleReRenderPage() };

  const toggle = () => {
    parentToggle();
    setfirstName('');
    setlastName('');
    setEmail('');
  };
  //const callParentReRenderPage = ()=>{handleReRenderPage()};

  const handleEdit = async () => {

    const id = editUser._id;
    try {
      console.log('Edit user id: ', id);
      const res = await edit({ id, firstName, lastName, email, image }).unwrap();
      
      navigate('/system/user-manage');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }




    setfirstName('');
    setlastName('');
    setEmail('');

    callParentReRenderPage();
    toggle();


  }

  const getBase64=(file)=>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

  const handleImageChange = async (e) => {
    
    const file = e.target.files[0];
        if(file){
            let base64 = await getBase64(file);
            setImage(base64);
            
        }
    
    
    
};

const handleShowImage = ()=>{
  const newTab = window.open();
  newTab.document.write(`<img src="${image}" alt="Image Preview"/>`);
}

  useEffect(() => {
    
    

    
  }, [firstName, lastName, email])

  return (



    <div>


      <Modal isOpen={EditModal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Edit user</ModalHeader>
        <ModalBody>
          <div className='container'>
            <FormContainer>

              <Form>
                <Form.Group className='my-2' controlId='firstname'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='lastname'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control

                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}



                  ></Form.Control>

                  <div className='preview-image' onClick={handleShowImage}>
                    <img className='img' src={image}
                      alt="Preview"></img>
                  </div>

                </Form.Group>




              </Form>

            </FormContainer>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>
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

export default ModalEditUser;