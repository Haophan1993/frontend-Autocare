import { Container, Card, Button } from 'react-bootstrap';

import {  useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-info w-75'>
          <h1 className='text-center mb-4'>Booking Care Login</h1>
          <p className='text-center mb-4'>
            Welcome to Booking Care 
          </p>
          <div className='d-flex'>
            <Button variant='primary' className='me-3' onClick={()=>{navigate('/login')}}>
              Sign In
            </Button>
            <Button variant='secondary' onClick={()=>{navigate('/register')}} >
            Register
               
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
