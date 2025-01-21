import './UserManageScreen.scss';
import { useGetAlluserMutation } from '../../slices/usersApiSlice';
import { useState, useEffect } from 'react';

const UserManageScreen = () => {
    const [getAlluser] = useGetAlluserMutation();
    const [userList, setUserList] = useState([]);

    const getData = async () => {
        try {
            const res = await getAlluser().unwrap();
            
            
            if(res){
                setUserList(res.allUserslist);
            }
            
            
            
        } catch (e) {
            console.log('Error get data ', e)
        }

    };


    useEffect( () => {

        
        
        
        console.log('Call API');
        getData();
    },[])


    


    return (

        
        <div className="users-container">
            <div className="title text-center">Manage user</div>
            <div>
                <table id="customers">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                    
                        {
                            userList.map((item, index)=>{
                                return(
                                    <>
                                        <tr key={item._id}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                        
                    
                    

                </table>
            </div>
            
        </div>
    )
}

export default UserManageScreen