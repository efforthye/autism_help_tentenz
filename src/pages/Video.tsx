import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import '@tensorflow/tfjs-backend-webgl';
import styled from 'styled-components';
import axios from 'axios';

const expressionMapping: any = {
  neutral: '무표정인 것 같아 보여요!',
  happy: '행복하거나 기뻐 보여요!',
  sad: '좀 슬퍼 보이네요...',
  angry: '좀 화나 보여요!',
  fearful: '좀 두려워 보여요..',
  disgusted: '좀 혐오스러워 하는 것 같아요!',
  surprised: '좀 놀라 보여요!'
};

const VideoComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const expressionsRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

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
      <VideoContainer>
        <StyledVideo ref={videoRef} autoPlay muted />
        <StyledCanvas ref={canvasRef} />
        <ExpressionDiv ref={expressionsRef} />
      </VideoContainer>
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

const VideoContainer = styled.div`
  position: relative;
  width: 720px;
  height: 560px;
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

const ExpressionDiv = styled.div`
  position: absolute;
  top: -35px;
  left: 10px;
  color: white;
  background-color: rgb(255, 186, 10);
  padding: 5px;
  border-radius: 5px;
  font-size: large;
`;
