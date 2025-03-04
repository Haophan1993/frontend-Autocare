import './UserManageScreen.scss';
import { useGetAlluserMutation } from '../../slices/usersApiSlice';
import { useState, useEffect } from 'react';
//import plusIcon from './images/plus-solid.svg';
import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../../slices/usersApiSlice';
// import { useDispatch } from 'react-redux';
//import { logout } from '../../slices/authSlice';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { useDeleteUserMutation } from '../../slices/usersApiSlice';
import Header from '../../components/Header';
import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';

const UserManageScreen = () => {
    const [getAlluser] = useGetAlluserMutation();
    const [userList, setUserList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [EditModal, setEditModal] = useState(false);
    const [userIsCreated, setUserIsCreated] = useState(false);
    const [editUser, setEditUser] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    // const dispatch = useDispatch();
    // const [logoutApiCall] = useLogoutMutation();

    const [deleteApiCall] = useDeleteUserMutation();



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




    useEffect(() => {





        const fetchData = async () => {

            try {
                getData()
            } catch (e) {
                console.log(e);
            } finally {

                setLoading(false);
            }

        };

        fetchData();

    }, [userIsCreated])

    // const logoutHandler = async () => {
    //     try {
    //         await logoutApiCall().unwrap();
    //         dispatch(logout());
    //         navigate('/');
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            await deleteApiCall({ id }).unwrap();
            setUserIsCreated(!userIsCreated);


        } catch (e) {
            console.log(e);
        }
    }

    // const handleAddnewUser = () => {
    //     setOpenModal(true);
    //     getData();
    // }

    const parentToggle = () => setOpenModal(!openModal);

    const handleReRenderPage = () => setUserIsCreated(!userIsCreated);

    const parentToggleEditModal = () => {
        setEditModal(!EditModal);
        setEditUser('');
    };

    const handleEditUser = (user) => {

        console.log('user in manage page ', user);
        let img = user.image;
        let image64 = '';
        let newUser = {};

        if (img) {

            image64 = new Buffer(img, 'base64').toString('binary');
            newUser = { ...user, image: image64 };
            setEditUser(newUser);

            setEditModal(true);

        } else {
            setEditUser(user);
            setEditModal(true)

        }

        getData();

    }



    const userRoleId = useSelector((state) => state.auth.userInfo.roleID);
    // console.log('Before Render User List: ', userList );
    // console.log('Check state: ', userRoleId);
    // console.log('Loading variable: ', loading);



    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {

        if (userList.length > 0) {

            if (userRoleId === 'R1') {

                return (
                    <>
                        <Header />

                        <div className="users-container">
                            <div className="title text-center"><h1>Manage user</h1></div>
                            {/* <div className='mx-1'>
                                <button className='btn btn-primary px-3 mb-2' onClick={handleAddnewUser}><img className='plus-icon' src={plusIcon}></img>Add new user</button>
                            </div> */}
                            <div>
                                <table id="customers">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        userList.map((item, index) => {

                                            
                                            return (
                                                
                                                    <>

                                                        <tr key={item._id}>
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
                                    </tbody>




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
            if (userRoleId === 'R2') {
                navigate('/system/manage-doctor');
            }

        }

    }



    
}

export default UserManageScreen