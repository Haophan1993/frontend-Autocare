import './UserManageRedux.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../../../components/Header';
import { useEffect, useState } from 'react';
import {useGetAllCodesMutation} from '../../../slices/usersApiSlice';
import { useSelector } from 'react-redux';

const UserManageRedux = () => {

    const currentLanguage = useSelector((state) => state.language.currentLanguage);

    const [getAllCodes] = useGetAllCodesMutation();
    const [genderArr, setGenderArr]=useState([]);
    const [positionArr, setPositionArr]=useState([]);
    const [roleIDArr, setRoleIDArr]=useState([]);

    const getAllcodes = async () => {
        try {
            const resGender = await getAllCodes({type:'GENDER'}).unwrap();
            const resPosition = await getAllCodes({type:'POSITION'}).unwrap();
            const resRoleID = await getAllCodes({type:'ROLE'}).unwrap();


            if (resGender) {
                
                console.log('data afer call API : ',resGender);
                setGenderArr(resGender);

            }

            if(resPosition){
                setPositionArr(resPosition);
            }
            if(resRoleID){
                setRoleIDArr(resRoleID);
            }



        } catch (e) {
            console.log('Error get data ', e)
        }

    };

    useEffect(() => {




        console.log('Call API');
        getAllcodes();
    }, [])



    

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
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >Password</label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>First Name</label>
                                        <input type="text" className="form-control"  placeholder="First Name"/>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >Last Name</label>
                                        <input type="text" className="form-control"  placeholder="Last Name"/>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >Phone Number</label>
                                        <input type="text" className="form-control"  placeholder="Phone Number"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label >Address</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                                </div>
                                
                                <div className="form-row">
                                    
                                    <div className="form-group col-md-4">
                                        <label >Gender</label>
                                        <select className="form-control">
                                            {genderArr.allcode && genderArr.allcode.length>0 && genderArr.allcode.map((item, index)=>{
                                                
                                                return(
                                                    <>
                                                        <option key={item._id}>{currentLanguage==='en' ? item.value_en: item.value_vn}</option>
                                                    </>
                                                    

                                                )
                                            })}

                                            
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >Position</label>
                                        <select  className="form-control">
                                            {positionArr.allcode&& positionArr.allcode.length>0&& positionArr.allcode.map((item, index)=>{
                                                return(
                                                    <>
                                                        <option key={item._id}>{currentLanguage==='en' ? item.value_en: item.value_vn}</option>
                                                    </>
                                                )
                                            })}
                                            
                                        </select>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label >RoleID</label>
                                        <select  className="form-control">
                                        {roleIDArr.allcode&& roleIDArr.allcode.length>0&& roleIDArr.allcode.map((item, index)=>{
                                                return(
                                                    <>
                                                        <option key={item._id}>{currentLanguage==='en' ? item.value_en: item.value_vn}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >Image</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn-primary my-3">Save</button>
                            </form>

                        
                    </div>

                </div>

            </div>

        </>

    )
}

export default UserManageRedux