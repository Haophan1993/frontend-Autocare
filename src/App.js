
import './App.css';


import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
//import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute.js';
import HomePage from './screens/HomePage/HomePage';
import UserManageScreen from './screens/system/UserManageScreen';
import UserManageRedux from './screens/system/admin/UserManageRedux';
import ManageDoctor from './screens/system/admin/ManageDoctor';
import DoctorDetail from './screens/system/admin/DoctorDetail';
import ManageDoctorSchedule from './screens/system/admin/ManageDoctorSchedule';





function App() {
  return (
    <>

      <div className="App">
        <BrowserRouter>
          {/* <Header /> */}
          <ToastContainer />
          <Routes>

            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />




            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/system/user-manage" element={<UserManageScreen />} />
              <Route path="/system/user-redux" element={<UserManageRedux />} />
              <Route path="/system/manage-doctor" element={<ManageDoctor />} />
              <Route path="/get-doctor-detail/:id" element={<DoctorDetail />} />
              <Route path="/manage-doctor-schedule" element={<ManageDoctorSchedule />} />

            </Route>


          </Routes>
        </BrowserRouter>


      </div>
    </>

  );
}

export default App;
