

import './Header.scss';

import AdminNavbar from './AdminNavbar';
import { useSelector } from 'react-redux';
import DoctorNavbar from './DoctorNavbar';



const Header = () => {
    //const currentLanguage = useSelector((state) => state);
    const userRoleId = useSelector((state) => state.auth.userInfo.roleID);

    console.log('Check state: ', userRoleId);

    if(userRoleId==='R1'){
        return (
        
            <header>
                    
                <AdminNavbar/>
    
            </header>
        )

    }
    if(userRoleId==='R2'){
        return (
        
            <header>
                    
                <DoctorNavbar/>
    
            </header>
        )
    }
    

}

export default Header;