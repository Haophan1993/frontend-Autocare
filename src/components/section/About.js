import './About.scss'
import React from "react";


const About = ()=>{
   
    return(
        <div className="about-section">
            
            <div className='about-section-header'>
                Truyen Thong noi ve website cua chung toi
            </div>
            <div className='about-section-content'>
                <div className='left-content'>
                    <iframe width="100%" height="100%" 
                    src="https://www.youtube.com/embed/147SkAVXEqM?si=sYOPSOlATmUaTiA3&amp;start=0" 
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className='right-content'>
                    <p>Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn dang dở, 
                        để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend và react để tạo dữ liệu thật cho trang home design này.

                        Cụ thể và chi tiết các bạn cùng xem video nhé. Demo nhanh sản phẩm đạt được khi kết thúc video, các bạn xem tại</p>
                </div>

            </div>

        </div>
        
    );
    
    
}
export default About;