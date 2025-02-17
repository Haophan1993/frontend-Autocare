import './UserManageRedux.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';
import { useEffect, useState } from 'react';
import { useGetAllCodesMutation } from '../../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRegisterWImageMutation } from '../../../slices/usersApiSlice';
import { useRegisterMutation } from '../../../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';




const UserManageRedux = () => {

    const currentLanguage = useSelector((state) => state.language.currentLanguage);
    const [registerWimage] = useRegisterWImageMutation();
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const [getAllCodes] = useGetAllCodesMutation();
    const [genderArr, setGenderArr] = useState([]);
    const [positionArr, setPositionArr] = useState([]);
    const [roleIDArr, setRoleIDArr] = useState([]);

    


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [genderID, setGenderID] = useState('M');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [positionID, setPositionID] = useState('P2');
    const [roleID, setRoleID] = useState('R2');
    const [image, setImage] = useState(null);

    


    useEffect(() => {




        const getAllcodes = async () => {
            try {
                const resGender = await getAllCodes({ type: 'GENDER' }).unwrap();
                const resPosition = await getAllCodes({ type: 'POSITION' }).unwrap();
                const resRoleID = await getAllCodes({ type: 'ROLE' }).unwrap();


                if (resGender) {

                    //console.log('data afer call API : ', resGender);
                    setGenderArr(resGender);

                }

                if (resPosition) {
                    setPositionArr(resPosition);
                }
                if (resRoleID) {
                    setRoleIDArr(resRoleID);
                }



            } catch (e) {
                console.log('Error get data ', e)
            }

        };
        getAllcodes();

    }, [email, firstName, lastName, image])

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        // if(file){
        //     let base64 = await getBase64(file);
        //     setImage(base64);

        // }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const size = 300; // Target size

                // Set canvas size
                canvas.width = size;
                canvas.height = size;

                // Draw the resized image on the canvas
                ctx.drawImage(img, 0, 0, size, size);

                // Convert canvas to Base64 in PNG format
                const resizedBase64 = canvas.toDataURL('image/png');

                setImage(resizedBase64);




            };



        }

    }
        const handleSaveUser = async (e) => {
            e.preventDefault();
            try {

                const res = await registerWimage({
                    firstName, lastName, email, password, address,
                    phoneNumber, roleID, genderID, positionID, image
                }).unwrap();


                navigate('/system/user-manage');
            } catch (err) {
                console.log(err);
            }
        }







        return (


            <>
                <Header />

                <div className='user-redux-container'>
                    <div className='title'>
                        <h1>User redux Manage</h1>
                    </div>
                    <div className='user-redux-body'>
                        <div className='container'>

                            <form>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label >Email</label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value
                                        )} />
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >Phone Number</label>
                                        <input type="text" className="form-control" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label >Address</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                                        value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div className="form-row">

                                    <div className="form-group col-md-4">
                                        <label >Gender</label>
                                        <select className="form-control" value={genderID} onChange={(e) => setGenderID(e.target.value)}>

                                            {genderArr.allcode && genderArr.allcode.length > 0 && genderArr.allcode.map((item, index) => {

                                                return (
                                                    <>
                                                        <option value={item.key} key={item._id}>{currentLanguage === 'en' ? item.value_en : item.value_vn}</option>
                                                    </>


                                                )
                                            })}


                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >Position</label>
                                        <select className="form-control"
                                            value={positionID} onChange={(e) => setPositionID(e.target.value)}>
                                            {positionArr.allcode && positionArr.allcode.length > 0 && positionArr.allcode.map((item, index) => {
                                                return (
                                                    <>
                                                        <option value={item.key} key={item._id}>{currentLanguage === 'en' ? item.value_en : item.value_vn}</option>
                                                    </>
                                                )
                                            })}

                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >RoleID</label>
                                        <select className="form-control" value={roleID} onChange={(e) => setRoleID(e.target.value)}>
                                            {roleIDArr.allcode && roleIDArr.allcode.length > 0 && roleIDArr.allcode.map((item, index) => {
                                                return (
                                                    <>
                                                        <option value={item.key} key={item._id}>{currentLanguage === 'en' ? item.value_en : item.value_vn}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >Image</label>
                                        <div>
                                            <input type="file"
                                                className="form-control"
                                                accept="image/*"
                                                onChange={handleImageChange} />


                                            <div className='preview-image' >
                                                <img className='img' src={image}
                                                    alt="Preview"></img>
                                            </div>



                                        </div>


                                    </div>
                                </div>

                                <button className="btn btn-primary my-3" onClick={handleSaveUser}>Save</button>
                            </form>


                        </div>

                    </div>

                </div>

            </>

        )
    }

    export default UserManageRedux