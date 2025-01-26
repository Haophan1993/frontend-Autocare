import './UserManageScreen.scss';
import { useGetAlluserMutation } from '../../slices/usersApiSlice';
import { useState, useEffect } from 'react';
import plusIcon from './images/plus-solid.svg';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { useDeleteUserMutation } from '../../slices/usersApiSlice';
import Header from '../../components/Header';

const UserManageScreen = () => {
    const [getAlluser] = useGetAlluserMutation();
    const [userList, setUserList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [EditModal, setEditModal] = useState(false);
    const [userIsCreated, setUserIsCreated] = useState(false);
    const [editUser, setEditUser] = useState('')
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const [deleteApiCall] = useDeleteUserMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const getData = async () => {
        try {
            const res = await getAlluser().unwrap();


            if (res) {
                setUserList(res.allUserslist);
            }



        } catch (e) {
            console.log('Error get data ', e)
        }

    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteApiCall({ id }).unwrap();
            setUserIsCreated(!userIsCreated);


        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {




        console.log('Call API');
        getData();
    }, [userIsCreated])

    const handleAddnewUser = () => {
        setOpenModal(true);
    }

    const parentToggle = () => setOpenModal(!openModal);

    const handleReRenderPage = () => setUserIsCreated(!userIsCreated);

    const parentToggleEditModal = () => {
        setEditModal(!EditModal);
        setEditUser('');
    };

    const handleEditUser = (user) => {

        console.log('user in manage page ', user);
        setEditUser(user);
        setEditModal(true)

    }



    return (
        <>
            <Header />

            <div className="users-container">
                <div className="title text-center"><h1>Manage user</h1></div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3 mb-2' onClick={handleAddnewUser}><img className='plus-icon' src={plusIcon}></img>Add new user</button>
                </div>
                <div>
                    <table id="customers">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {
                            userList.map((item, index) => {

                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td><button className='btn btn-primary px-3 mx-3' onClick={() => handleEditUser(item)}>Edit</button>
                                                <button className='btn btn-primary px-3' onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }




                    </table>
                </div>
                <>{openModal && <ModalUser modalOpen={openModal} parentToggle={parentToggle} handleReRenderPage={handleReRenderPage} />
                }           </>

                <>
                    {EditModal &&
                        <ModalEditUser EditModal={EditModal} parentToggle={parentToggleEditModal} editUser={editUser} handleReRenderPage={handleReRenderPage} />
                    }</>
            </div>
        </>

    )
}

export default UserManageScreen