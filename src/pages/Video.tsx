import React, { useEffect, useRef,useState } from 'react';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@mui/joy/Button';

const expressionMapping: any = {
  neutral: '무표정인 것 같아 보여요!',
  happy: '행복하거나 기뻐 보여요!',
  sad: '좀 슬퍼 보이네요...',
  angry: '좀 화나 보여요!',
  fearful: '좀 두려워 보여요..',
  disgusted: '좀 혐오스러워 하는 것 같아요!',
  surprised: '좀 놀라 보여요!'
};


interface VideoComponentProps {
  countdown: number;
}

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expressionsRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [countdown, setCountdown] = useState(20);


  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        console.log('Loading models...');
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models: ', error);
        throw error;
      }
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              const playPromise = videoRef.current?.play();
              if (playPromise !== undefined) {
                playPromise.then(() => {
                  console.log('Video playback started');
                }).catch(error => {
                  console.error('Error playing video:', error);
                });
              }
            };
          }
        })
        .catch(err => console.error('Error accessing webcam:', err));
    };

    // const speak = async (text: string) => {
    //   const apiKey = 'YOUR_OPENAI_API_KEY'; // 여기에 자신의 OpenAI API 키를 입력하세요.
    //   const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    //   try {
    //     const response = await axios.post(url, {
    //       prompt: text,
    //       max_tokens: 100
    //     }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${apiKey}`
    //       }
    //     });

    //     const audio = new Audio(`data:audio/wav;base64,${response.data.choices[0].text}`);
    //     audio.play();
    //   } catch (error) {
    //     console.error('Error generating speech:', error);
    //   }
    // };

    const handleVideoPlay = () => {
      const intervalId = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
          if (displaySize.width === 0 || displaySize.height === 0) {
            return;
          }
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          faceapi.matchDimensions(canvasRef.current, displaySize);
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const context = canvasRef.current.getContext('2d');
          if (context) {
            context.clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          }

          if (expressionsRef.current && detections.length > 0) {
            const { expressions }: any = detections[0];
            const maxExpression = Object.keys(expressions).reduce((a: any, b: any) => expressions[a] > expressions[b] ? a : b);
            const translatedExpression = expressionMapping[maxExpression] || maxExpression;
            expressionsRef.current.innerText = `지금은 ${translatedExpression}`;

            // 이전에 진행 중인 음성 재생이 있다면 취소
            if (speechRef.current) {
              window.speechSynthesis.cancel();
            }

            // 새로운 음성 재생
            const utterance = new SpeechSynthesisUtterance(translatedExpression);
            window.speechSynthesis.speak(utterance);
            speechRef.current = utterance;
          }
        }
      }, 3000); // 3초마다 분석

      return () => clearInterval(intervalId);
    };

    const initializeApp = async () => {
      await loadModels();
      startVideo();
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener('play', handleVideoPlay);
      }
    };

    initializeApp();

    return () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
      }
    };
  }, []);

  return (
    <Container>
      <Header>
        <div className="wrapper">
          <a>X</a>
          <div>
            <div className="badge">CHAPTER.2</div>
            <div className="bar"></div>
            <p>표정 짓기</p>
          </div>
        </div>
      </Header>
      <BodyWrapper>
        <VideoContainer>
          <StyledVideo ref={videoRef} autoPlay muted />
          <StyledCanvas ref={canvasRef} />
          <ExpressionWrapper>
            <ExpressionDiv ref={expressionsRef} />
          </ExpressionWrapper>
        </VideoContainer>
        <CountdownContainer>
          <p>{countdown}</p>
        </CountdownContainer>
      </BodyWrapper>
      <FooterWrapper>
        <Button
           color="primary"
           onClick={function(){}}
           size="lg"
           variant="soft"
        >건너뛰기</Button> 
        <div className="question">
          <span>행복한 표정</span>을 지어볼까요? (제한시간 20초)
        </div>
        <Button
          color="primary"
          onClick={function(){}}
          size="lg"
          variant="solid"
        >다음으로</Button> 
      </FooterWrapper>
      
    </Container>
  );
};

export default VideoComponent;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Header = styled.div`
  display: block;
  width: 100%;
  height: 68px;
  position: fixed;
  top: 0;
  > .wrapper{
    display: grid;
    align-items: center;
    grid-template-columns: 24px 1fr;
    gap: 19px;
    height: 100%;
    padding: 0 30px;
    > div{
      display: flex;
      align-items: center;
      height: 100%;
      gap: 10px;
      .badge{
        padding: 8px 11px;
        border-radius: 32px;
        border: 2px solid #4F5256;
        background: #272A2C;
        color: #EDF0F2;
        text-align: center;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: 13px; /* 130% */
      }
      .bar{
        width: 1px;
        height: 25px;
        background: #D9D9D9;
      }
      > p{
        color: #4F5256;
        font-size: 15px;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
  
`;

const BodyWrapper = styled.div`
  width: 855px;
  height: 402px;
  border-radius: 27px;
  overflow: hidden;
  position: relative;
`

const VideoContainer = styled.div`
  position: relative;
  width: 101%;
  height: 161%;
  margin-top: -60px;
  box-shadow: 1px 1px 80px #7d80853b;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const ExpressionWrapper = styled.div`
  position: fixed;
  width: 400px;
  height: 44px;
  padding: 10px 20px;
  bottom: 158px;
  left: calc( 50% - 200px );
  box-sizing: border-box;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0px 5px 20px 0px var(--Shadows-300, rgba(0, 0, 0, 0.15));
  backdrop-filter: blur(40px);
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const ExpressionDiv = styled.div`
  text-align: center;
  color: white;
  font-size: 15px;
  font-weight: 500;
  line-height: 120%; /* 18px */
  
`;

const CountdownContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid #fff;
  right: 16px;
  bottom: 14px;
  width: 48px;
  height: 48px;
  text-align: center;
  line-height: 18px;
  background: #00000014;
  p{
    color: #fff;
    font-size: 15px;
    font-weight: 500;
  }
`

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 27px 42px;
  box-sizing: border-box;
  > .question{
    border-radius: 60px;
    background: #243686;
    color: #fff;
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    span{
      font-weight: 800;
    }
  }
`;