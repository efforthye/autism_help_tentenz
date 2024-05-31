import React, {useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import QuizComponent from './Quiz';
import VideoComponent from './Video';
import LangchainComponent from './LangchainTest';
import styled from 'styled-components';

import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';



interface SwiperProps {
  slideIndex: number;
}

// 감정 표현 텍스트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #F3F1F2;
  
  & > div.wrapper{
    max-width: 1000px;
    width: 100%;
    height: calc(100vh - 78px);

    display: flex;
    align-items: center;
    justify-content: center;
   
  }  
  `;


const Swiper = styled.div<SwiperProps>`
  width: 100vw;
  overflow: hidden;
  > .swiper-wrapper{
    display: flex;
    height: 195px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    width: 300vw;
    transform: translateX(${props => props.slideIndex * -100}vw );
    .swiper-slide{
      height: 100%;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      .slide{
          background: green;
          height: 100%;
          min-width: 300px;
      }
    }
  }
`;


const Footer = styled.div`
  position: fixed;
  width: 100vw;
  bottom: 0;
  padding: 16px 50px;
  box-sizing: border-box;
  border-top: 2px solid #E7E9EC;
  display: flex;
  justify-content: space-between;
`;

const SubPage: React.FC = () => {
  
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextButton = () => {
    setSlideIndex(prevIndex => (prevIndex + 1) % 3);
  };

  return (
    <Container>
      <div className="wrapper">
        <Swiper slideIndex={slideIndex} >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="slide">1</div>
            </div>
            <div className="swiper-slide">
                <div className="slide">2</div>
            </div>
            <div className="swiper-slide">
              <div className="slide">3</div>
            </div>
          </div>
        </Swiper>
        <Footer>
            <Button
              color="primary"
              size="lg"
              variant="soft">건너뛰기</Button>
            <Button
            color="primary"
            size="lg"
            onClick={handleNextButton}
            variant="solid">다음으로</Button>
        </Footer>
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
