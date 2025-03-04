
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import { setLanguage } from '../slices/languageSlice';
import './Header.scss';


const DoctorNavbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const currentLanguage = useSelector((state) => state.language.currentLanguage);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    

    const handleManageDoctor = () => {
        navigate('/system/manage-doctor');
    }
    const handleManageDoctorSchedule = () => {
        navigate('/manage-doctor-schedule')
    }
    const titleName = `Welcome ${userInfo.firstName}`;


    return (


        <>

            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className="custom-navbar-height">
                <Container>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-left'>


                            <NavDropdown title="System" id='username'>

                              

                                <NavDropdown.Item onClick={handleManageDoctor}>
                                    Manage Doctor
                                </NavDropdown.Item>
                                

                                <NavDropdown.Item onClick={handleManageDoctorSchedule}>
                                    Manage Doctor Appointment
                                </NavDropdown.Item>
                            </NavDropdown>

                            



                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='ms-auto'>



                                    <NavDropdown title="Languge" id='username'>

                                        <NavDropdown.Item onClick={() => dispatch(setLanguage('en'))} disabled={currentLanguage === 'en'}>
                                            EN
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => dispatch(setLanguage('vn'))} disabled={currentLanguage === 'vn'}>
                                            VN
                                        </NavDropdown.Item>

                                    </NavDropdown>





                                </Nav>
                            </Navbar.Collapse>

                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='ms-auto'>

                                    {userInfo ? (<>
                                        <NavDropdown title={titleName} id='username'>

                                            <NavDropdown.Item onClick={logoutHandler}>
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>


                                    </>) : (<>
                                        <Nav.Link onClick={() => { navigate('/login') }}>
                                            <FaSignInAlt /> Sign In
                                        </Nav.Link>


                                        <Nav.Link onClick={() => { navigate('/register') }}>
                                            <FaSignOutAlt /> Sign Up
                                        </Nav.Link>
                                    </>




                                    )}







                                </Nav>
                            </Navbar.Collapse>









                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )

}

export default DoctorNavbar;

