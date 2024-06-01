import React,{useState} from 'react';
import styled from 'styled-components';

import Button from '@mui/joy/Button';

const Container = styled.div<{ quizIndex: number; }>`
    display: ${ props => props.quizIndex === 0 ? "flex": "none"};
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        background: url("/images/quiz_bg.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: -1;
        opacity: 0;
        animation: fadein 1.2s 2s forwards;  
    }
    > .wrapper{
        width: 853px;
        height: 360px;
        background:rgba(255, 255, 255, 0.50);
        border-radius: 40px;
        padding: 30px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        position: relative;
        margin-top: -100px;
        h2{
            color: #272A2C;
            font-size: 30px;
            font-weight: 800;
            line-height: normal;
            margin: 0;
            padding-bottom: 22px;
            padding-top: 14px;
            opacity: 0;

            animation: slidein 1.2s forwards;  
        }
        h3{
            color: #4F5256;
            font-size: 20px;
            font-weight: 500;
            margin: 0;
            opacity: 0;
            animation: slidein 1.2s .4s forwards;
        }
        img{
            width: 120px;
            margin-bottom: 17px;
            opacity: 0;
            animation: slidein 1.2s .8s forwards;
        }
        div.hashtag-wrapper{
            color: #4F5256;
            font-size: 13px;
            font-weight: 400;
            line-height: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            opacity: 0;
            animation: fadein 1.2s 2s forwards;  
            span{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
                &::before{
                    content: "";
                    display: block;
                    width: 13px;
                    height: 13px;
                    background-image: url("/images/quiz_02.svg");
                }
            }
        }
        > button{
            position: absolute;
            width: 115px;
            height: 52px;
            border-radius: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            left: calc( 50% - 52px );
            bottom: -71px;
            opacity: 0;
            animation: fadein 1.2s 2s forwards;  
        }
    }

    @keyframes fadein {
        0% {
        opacity: 0;
        }
        90%{
        opacity: 1;
        }
        100%{
        opacity: 1;
        }
    }

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
`;


const QuizIntro: React.FC<{ quizIndex: number; setQuizIndex: React.Dispatch<React.SetStateAction<number>> }> = ({ quizIndex, setQuizIndex }) => {
    return (
    <Container quizIndex={quizIndex}>
        <div className="wrapper">
            <div>
                <h2>지금 이 표정은?</h2>
                <h3>이 표정은 어떤 표정일까요?</h3>
            </div>
            <div>
                <img src="/images/quiz_01.png" alt="" />
                <div className="hashtag-wrapper">
                    <span>미소</span><span>웃음</span><span>즐거움</span>
                </div>
            </div>
            <Button onClick={()=>{ setQuizIndex( quizIndex => (quizIndex + 1))} }>학습 시작</Button>
        </div>
    </Container>
  );
};

export default QuizIntro;
