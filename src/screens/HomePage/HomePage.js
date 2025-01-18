import React from 'react';
import HomeHeader from './HomeHeader';
import './HomePage.scss';

import Specialty from '../../components/section/Specialty';
import MedicalFacility from '../../components/section/MedicalFacility';
import OutstandingDoctor from '../../components/section/OutstandingDoctor';
import Handbook from '../../components/section/Handbook';
import About from '../../components/section/About';
import Homefooter from '../../components/section/Homefooter';




const HomePage = ()=> {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        
        
      };

    
        return(
            <div className='home-page'>
            <HomeHeader/>
            <Specialty settings={settings}/>
            <MedicalFacility settings={settings}/>
            <OutstandingDoctor settings={settings}/>
            <Handbook settings={settings}/> 
            <About/>
            <Homefooter/>
            </div>
        )
    

}

export default HomePage;