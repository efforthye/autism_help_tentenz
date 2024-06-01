import React,{useState} from 'react';
import styled from 'styled-components';
import QuizInrto from '../component/QuizIntro'
import QuizPickOne from '../component/QuizPickOne'

import Button from '@mui/joy/Button';


const Container = styled.div<{ quizIndex: number;}>`
  height: 100vh;
  > .header{
    display: ${ props => props.quizIndex !== 0 ? "block": "none"};;
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
  }
  > .body{
    height: 100%;
    overflow: hidden;
  }
  > .footer{
    display: ${ props => props.quizIndex !== 0 ? "block": "none"};;
    border-top: 2px solid #E7E9EC;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    > .wrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      height: 100%;
      img{
        width: 48px;
        height: 48px;
      }
      .left{
        display: flex;
        align-items: center;
        > div{
          gap: 13px;
          display: none;
          
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 18px; /* 100% */
        }
      }
    }
    &.success{
      border-top: 2px solid #E7E9EC;
      background: rgba(66, 198, 47, 0.20);
      div.success{
        display: flex;
        color: #489D26;
      }
      .right > button{
        border: 1px solid #489D26;
        background: #42C62F;
      }
    }
    &.fail{
      border-top: 2px solid #E7E9EC;
      background: rgba(247, 40, 89, 0.20);
      div.fail{
        display: flex;
        color: #F72859;
      }
      .right > button{
        border: 1px solid #EE282D;
        background: #F72859;
      }
    }
  }
  
`;

interface QuizProps {
  quizIndex: number;
  isSelected: boolean;
  isCorrect: number;
}

const QuizComponent: React.FC = () => {

  const [quizIndex, setQuizIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(0);


  return (
    <Container quizIndex={quizIndex}>
      <div className="header">
        <div className="wrapper">
          <a>X</a>
          <div>
            <div className="badge">CHAPTER.{quizIndex}</div>
            <div className="bar"></div>
            <p>
              {quizIndex === 1 ? "표정 고르기" : quizIndex === 2 ? "표정 짓기" : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="body">
        <QuizInrto quizIndex={quizIndex} setQuizIndex={setQuizIndex}></QuizInrto>
        <QuizPickOne quizIndex={quizIndex} setQuizIndex={setQuizIndex} isSelected={isSelected} setIsSelected={setIsSelected}></QuizPickOne>
      </div>
      <div className={isCorrect === 0 ? "footer" : isCorrect === 1 ? "footer success" :  "footer fail"  }>
        <div className="wrapper">
          <div className="left">
            <div className="success">
              <img src="/images/quiz_03_correct.svg" />
              <p>훌륭해요! 정답입니다</p>
            </div>
            <div className="fail">
            <img src="/images/quiz_04_fail.svg"/>
              <p>아쉬워요. 정답은 행복해요 입니다.</p>
            </div>
          </div>
          <div className="right">
            <Button 
              onClick={ ()=>{
                if( isCorrect === 0 ){
                  setIsCorrect(2);
                }else if( isCorrect === 2 ){
                  setIsCorrect(1);
                }else{
                  setIsCorrect(0);
                  setQuizIndex( (prevIndex) => prevIndex+1 );
                }
              } }
              disabled={!isSelected}>
              {isCorrect === 0 ? "선택하기" : "계속" }
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default QuizComponent;
