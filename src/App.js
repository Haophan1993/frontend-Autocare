
import './App.css';


import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute.js';
import HomePage from './screens/HomePage/HomePage';
import UserManageScreen from './screens/system/UserManageScreen';




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
            <Route path="/user-manage" element={<UserManageScreen />} />
            
            

            <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path="/home" element={<HomePage />} />
            </Route>


          </Routes>
        </BrowserRouter>


      </div>
    </>

  );
}

export default App;
