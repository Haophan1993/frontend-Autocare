import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



import { useRegisterMutation } from '../../slices/usersApiSlice';




const ModalUser=({modalOpen, parentToggle, handleReRenderPage})=> {
  
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register] = useRegisterMutation();

   
    

    const toggle = () => {parentToggle()};
    const callParentReRenderPage = ()=>{handleReRenderPage()};

    const handleAddNew=async()=>{

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
          } else {
            try {
              const res = await register({ firstName, lastName, email, password, address }).unwrap();
              
              navigate('/system/user-manage');
            } catch (err) {
              toast.error(err?.data?.message || err.error);
            }
          }


        
        setfirstName('');
        setlastName('');
        setEmail('');
        setAddress('');
        setPassword('');
        setConfirmPassword('');
        callParentReRenderPage();
        toggle();


    }
    

  return (
    
    <div>
      

      <Modal isOpen={modalOpen} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Create a new user</ModalHeader>
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
                <Form.Group className='my-2' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                

            </Form>
            
        </FormContainer>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddNew}>
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

export default ModalUser;