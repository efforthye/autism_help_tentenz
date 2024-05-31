import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import QuizComponent from './Quiz';
import VideoComponent from './Video';
import LangchainComponent from './LangchainTest';

const SubPage: React.FC = () => {
  return (
    <div>
      <h1>온보딩...</h1>
      <nav>
        <ul>
          <li><Link to="video">비디오 분석</Link></li>
          <li><Link to="quiz">퀴즈</Link></li>
          <li><Link to="test">랭체인 관련(일단 무시하세여)</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="video" element={<VideoComponent />} />
        <Route path="quiz" element={<QuizComponent />} />
        <Route path="test" element={<LangchainComponent />} />
      </Routes>
    </div>
  );
};

export default SubPage;
