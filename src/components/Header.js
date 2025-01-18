import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';


const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

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
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>

                    <Navbar.Brand onClick={() => { navigate('/') }}>MERN Auth</Navbar.Brand>




                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>

                            {userInfo ? (<>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item onClick={() => { navigate('/profile') }}>Profile</NavDropdown.Item>
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
                </Container>
            </Navbar>

        </header>
    )

}

export default Header;