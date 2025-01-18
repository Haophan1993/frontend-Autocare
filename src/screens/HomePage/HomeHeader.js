import React, { Component } from 'react';
import './HomeHeader.scss';
import bars from './images/bars-solid.svg'
import question from './images/circle-question-solid.svg'
import searchIcon from './images/magnifying-glass-solid.svg'
import logoIcon from './images/Logo.png';
import homeheaderBackgroup from './images/header-backgroup.jpg';
import iconChuyenKhoa from './images/iconkham-chuyen-khoa.png';
import iconKhamtuxa from './images/iconkham-tu-xa.png';
import iconKhamtongquan from  './images/iconkham-tong-quan.png';
import iconXetnghiem from './images/conxet-nghiem-y-hoc.png';
import iconSuckhoetinhthan from './images/iconsuc-khoe-tinh-than.png';
import iconKhamnhakhoa from './images/iconkham-nha-khoa.png';
import useTranslation from '../../hooks/useTranslation.js';

import { useDispatch, useSelector } from 'react-redux';
//import { setLanguage } from '../../store/languageSlice';

import { setLanguage } from '../../slices/languageSlice'


const HomeHeader= ()=> {
    const t = useTranslation();
    const dispatch = useDispatch();
    
    const currentLanguage = useSelector((state) => state.language.currentLanguage);

    
        return(
            <>
            <div className='home-header'>
                <div className='header-left-section'>
                    <div className='bar-container'>
                        <img className='bar-icon' src={bars} alt='bar-icon'></img>
                        

                    </div>

                    <div className='logo-container'>
                        <img className='logo-icon' src={logoIcon} alt='logo-icon'></img>
                    </div>
                </div>

                <div className='header-center-section'>
                    <div className='center-content'>
                        <div className='title'>{t.homepage.Specialty}</div>
                        <div className='sub-title'>Tim bac sy chuyen khoa</div>
                    </div>
                    <div className='center-content'>
                        <div className='title'>Co so Y Te</div>
                        <div className='sub-title'>Chon benh vien phong kham</div>
                    </div>
                    <div className='center-content'>
                        <div className='title'>Bac sy</div>
                        <div className='sub-title'>Chon bac sy gioi</div>
                    </div>
                    <div className='center-content'>
                        <div className='title'> Goi Kham</div>
                        <div className='sub-title'>Kham suc khoe tong quat</div>
                    </div>
                </div>
                <div className='header-right-section'>
                    <div className='question-icon-container'>
                        <img className='question-icon' src={question} alt='question-icon'></img>
                    </div>
                    <div className='support-text'>Ho tro</div>
                    <div className='change-language-button-container'>
                        <div className='EN-button-container'>
                            <button onClick={() => dispatch(setLanguage('en'))} disabled={currentLanguage === 'en'}>EN</button>
                        </div>
                        <div className='VN-button-container'>
                            <button onClick={() => dispatch(setLanguage('vn'))} disabled={currentLanguage === 'vn'}>VN</button>
                        </div>
                    </div>
                </div>

            </div>

            
            <div className='home-header-down'>
                <div className='home-header-picture-container'>
                    <div className='above-options-container'>
                        <img className='home-header-picture' src={homeheaderBackgroup}></img>
                        <div className='title1'>NEN TANG Y TE</div>
                        <div className='title2'>CHAM SOC SUC KHOE TOAN DIEN</div>
                        
                        <div className='search-bar'>
                            <div className='search-icon-container'>
                                <img className='search-icon' src={searchIcon}></img>
                            </div>
                            <div className='input-text-container'>
                                <input className='input-text' type='text' placeholder='Tim phong kham'></input>
                            </div>
                        </div>
                    </div>

                    <div className='options-container'>
                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconChuyenKhoa} alt='icon-chuyen-khoa'></img>

                            <div className='option-text'>Kham Chuyen Khoa</div>
                        </div>
                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconKhamtuxa} alt='icon-khamtuxa'></img>
                            <div className='option-text'>Kham tu xa</div>
                            
                        </div>
                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconKhamtongquan} alt='icon-khamtongquan'></img>
                            <div className='option-text'>Kham tong quan</div>
                            
                        </div>

                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconXetnghiem} alt='icon-xet-nghiem'></img>
                            <div className='option-text'>Xet nghiem y hoc</div>
                            
                        </div>

                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconSuckhoetinhthan} alt='icon-suc-khoe-tinhthan'></img>
                            <div className='option-text'>Suc khoe tinh than</div>
                            
                        </div>
                        
                        <div className='icon-option-container'>
                            <img className='icon-option' src={iconKhamnhakhoa} alt='icon-nha-khoa'></img>
                            <div className='option-text'>Kham nha khoa</div>
                            
                        </div>
                        
                       
                    </div>
                </div>


            </div>
            


            </>
            
            
        )
    

}

export default HomeHeader;