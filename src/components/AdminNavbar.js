
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

import { setLanguage } from '../slices/languageSlice';


const AdminNavbar = () => {
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

    const handleCRUDUser = () => {
        navigate('/system/user-manage');
    }
    const handleCRUDRedux = () => {
        navigate('/system/user-redux');
    }

    const handleOption3 = () => {
        alert('Option3');
    }
    const handleOption4 = () => {
        alert('Option4');
    }
    const titleName = `Welcome ${userInfo.firstName}`;


    return (


        <>

            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>













                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-left'>


                            <NavDropdown title="System" id='username'>

                                <NavDropdown.Item onClick={handleCRUDUser}>
                                    CRUD User
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCRUDRedux}>
                                    CRUD Redux
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={handleOption3}>
                                    Manage Doctor
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleOption4}>
                                    Manage Admin
                                </NavDropdown.Item>

                                <NavDropdown.Item onClick={handleOption4}>
                                    Manage Doctor Appointment
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='ms-left'>

                                    {userInfo ? (<>
                                        <NavDropdown title="Phong Kham" id='username'>

                                            <NavDropdown.Item onClick={handleOption3} active>
                                                Quang Ly Phong kham
                                            </NavDropdown.Item>

                                        </NavDropdown>


                                    </>) : (<>

                                    </>
                                    )}







                                </Nav>
                            </Navbar.Collapse>
                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='ms-left'>

                                    {userInfo ? (<>
                                        <NavDropdown title="Chuyen Khoa" id='username'>

                                            <NavDropdown.Item onClick={handleOption3}>
                                                Quang ly chyen khoa
                                            </NavDropdown.Item>

                                        </NavDropdown>


                                    </>) : (<>

                                    </>
                                    )}







                                </Nav>
                            </Navbar.Collapse>

                            <Navbar.Collapse id='basic-navbar-nav'>
                                <Nav className='ms-left'>

                                    {userInfo ? (<>
                                        <NavDropdown title="Cam nang" id='username'>

                                            <NavDropdown.Item onClick={handleOption3}>
                                                Quang ly cam nang
                                            </NavDropdown.Item>

                                        </NavDropdown>


                                    </>) : (<>

                                    </>
                                    )}







                                </Nav>
                            </Navbar.Collapse>



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

export default AdminNavbar;

