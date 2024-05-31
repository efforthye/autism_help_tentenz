import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import SigninComponent from './Signin';
import QuizComponent from './Quiz';
import VideoComponent from './Video';
import LangchainComponent from './LangchainTest';
import styled from 'styled-components';

import Button from '@mui/joy/Button';


// 감정 표현 텍스트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #F3F1F2;
  
  & > div.wrapper{
    max-width: 1000px;
    width: 100%;
    height: 800px;

    display: flex;
    align-items: center;
    justify-content: center;
    .onBoarding{
      width: 330px;
      height: 282px;
      text-align: center;
      > img{
        width: 100%;
      }
      h2{
        color: #3E3F41;
        font-size: 20px;
        font-weight: 300;
        line-height: 150%; /* 30px */
        margin: 0;
      }
      button{
        margin-top: 70px;
        width: 100%;
      }
    }
  }
  
`;


const SubPage: React.FC = () => {
  return (
    <Container>
      <div className="wrapper">
      <div className="onBoarding">
        <img src="/images/logo_rainbow.png" alt="" />
        <h2>
          레인보우를 시작하고<br/>
        더 이상 두려워하지 말아요 
        </h2>
        <Link to="signin">
          <Button
            color="primary"
            disabled={false}
            loading={false}
            onClick={function(){}}
            size="lg"
            variant="soft"
          >시작할게요</Button>
        </Link>
      </div>
        {/* <nav>
          <ul> */}
            {/* <li><Link to="video">비디오 분석</Link></li> */}
            {/* <li></li> */}
            {/* <li><Link to="test">랭체인 관련(일단 무시하세여)</Link></li> */}
          {/* </ul>
        </nav> */}
      </div>
      <Routes>
        <Route path="signin" element={<SigninComponent />} />
        <Route path="video" element={<VideoComponent />} />
        <Route path="quiz" element={<QuizComponent />} />
        <Route path="test" element={<LangchainComponent />} />
      </Routes>
    </Container>
  );
};

export default SubPage;
