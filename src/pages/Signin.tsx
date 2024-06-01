import React, {useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import QuizComponent from './Quiz';
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
    width: 3000px;
    transform: translateX(${props => props.slideIndex * -1000}px );
    transition: transform 0.5s ease;
    .swiper-slide{
      height: 100%;
      width: 1000px;
      display: flex;
      align-items: center;
      justify-content: center;
      .slide{
        height: 100%;
        width: 100%;;
        max-width: ${props => props.slideIndex === 0 ? '300px':'370px'};
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        gap: 15px;
        img{
          width: 48px;
        }
        input{
          text-align: center;
        }
        h2{
          color: #272A2C;
          text-align: center;
          font-size: 35px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%; /* 52.5px */
          margin: 0;
        }

        ${props => props.slideIndex === 1 ? `
        h2{
          position: absolute;
          top: 50%;
          opacity: 0;
          &:nth-child( 1 ){
            animation: slidein 1.2s;
          }
          &:nth-child( 2 ){
            animation: slidein 1s 1.2s forwards;
          }
        }
        
        `:''};

        @keyframes slidein {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          90%{
            transform: translateY(-14px);
            opacity: 1;
          }
          100%{
            transform: translateY(-14px);
            opacity: 1;
          }
        }
        
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
  let navigate = useNavigate();

  const handleNextButton = () => {
    if( slideIndex === 0 ){
      setSlideIndex(prevIndex => (prevIndex + 1) % 2);
    }else{
      navigate('/quiz');
    }
  };

  return (
    <Container>
      <div className="wrapper">
        <Swiper slideIndex={slideIndex} >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="slide">
                <img src="/images/Signin_01.png" alt="" />
                <h2>어떻게 불러드릴까요?</h2>
                <Input
                  color="neutral"
                  disabled={false}
                  placeholder="닉네임을 입력해주세요"
                  size="lg"
                  variant="soft"
                  fullWidth
                />
              </div>
            </div>
            <div className="swiper-slide" >
                <div className="slide">
                  <h2>반가워요 휘정님,</h2>
                  <h2>오늘의 학습을 시작할까요?</h2>
                </div>
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
        <Route path="quiz" element={<QuizComponent />} />
      </Routes>
    </Container>
  );
};

export default SubPage;
