import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import MainComponent from './pages/Main';
import OnboardingComponent from './pages/Onboarding';
import SigninComponent from './pages/Signin';
import VideoComponent from './pages/Video';
import QuizComponent from './pages/Quiz';
import LangchainComponent from './pages/LangchainTest';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingComponent />} />
        <Route path="/signin" element={<SigninComponent />} />
        <Route path="/video" element={<VideoComponent />} />
        <Route path="/quiz" element={<QuizComponent />} />
        <Route path="/test" element={<LangchainComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
