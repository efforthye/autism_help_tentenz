import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import QuizComponent from './Quiz';
import VideoComponent from './Video';
import LangchainComponent from './LangchainTest';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

// 감정 표현 텍스트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  
  & > div.wrapper{
    max-width: 1000px;
    width: 100%;
    height: 800px;
    > .swiper{
      width: 100%;
      height: 800px;
      .swiper-slide{
        .slide-wrapper{
            width: 600px;
            position: absolute;
            left: calc( 50% - 300px );
            top: calc( 50% - 300px );
            height: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
      }
    }
  }
  
`;




const SubPage: React.FC = () => {
  return (
    <Container>
      <div className="wrapper">
      <Swiper
          className="swiper"
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          pagination={true} 
          modules={[Pagination]} 
        >
          <SwiperSlide className="swiper-slide">
            <div className="slide-wrapper">
              <h1>안녕하세요</h1>
              <h2>소개글입니다</h2>
              <p>소개를 열심히 하도록 하겠습니다 아자아자</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="slide-wrapper">
              <h1>퀴즈가 있어요</h1>
              <p>챕터별로 다양한 감정에 대해 알아봐요 !</p>
              <p>매번 새로운 이미지의 퀴즈를 만날 수 있어요 !</p>
              <p>내 표정과 직접 대조해서 확인할 수 있어요 !</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="slide-wrapper">
              <Link to="quiz">
                <button>
                  퀴즈
                </button>
              </Link>
            </div>
          </SwiperSlide>
          ...
        </Swiper>

        {/* <nav>
          <ul> */}
            {/* <li><Link to="video">비디오 분석</Link></li> */}
            {/* <li></li> */}
            {/* <li><Link to="test">랭체인 관련(일단 무시하세여)</Link></li> */}
          {/* </ul>
        </nav> */}
      </div>
      <Routes>
        <Route path="video" element={<VideoComponent />} />
        <Route path="quiz" element={<QuizComponent />} />
        <Route path="test" element={<LangchainComponent />} />
      </Routes>
    </Container>
  );
};

export default SubPage;
