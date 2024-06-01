import React,{useState} from 'react';
import styled from 'styled-components';

import Button from '@mui/joy/Button';

const Container = styled.div<{ quizIndex: number; }>`
    display: ${ props => props.quizIndex === 1 ? "flex": "none"};
    width: 100%;
    height: calc(100% - 60px);
    align-items: center;
    justify-content: center;
    .wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        h2{
            margin: 0;
        }
        > .image{
            border-radius: 20px;
            width: 400px;
            height: 400px;
            overflow: hidden;
            > .img{
                width: 400px;
                height: 400px;
                background: red;
            }
        }
        > .answer{
            display: flex;
            gap: 17px;
            > button{
                flex: 1;
            }
        }
    }
`;

interface QuizProps {
    quizIndex: number;
    activeIndex: number;
}

const QuizPickOne: React.FC<{ quizIndex: number; setQuizIndex: React.Dispatch<React.SetStateAction<number>>, isSelected: boolean; setIsSelected: React.Dispatch<React.SetStateAction<boolean>> }> = ({ quizIndex, setQuizIndex, isSelected, setIsSelected }) => {

    const [activeBtnIndex, setActiveBtnIndex] = useState( 0 );


    return (
    <Container quizIndex={quizIndex}>
        <div className="wrapper">
            <div className="question">
                <h2>지금 이 표정은 어떤 표정일까요?</h2>
            </div>
            <div className="image">
                <div className="img"></div>
            </div>
            <div className="answer">
                <Button
                    color={activeBtnIndex === 1 ? "primary":"neutral"}
                    onClick={function(){
                        setIsSelected(true);
                        setActiveBtnIndex(1);
                    }}
                    size="lg"
                    variant="outlined">행복해요</Button>
                <Button
                    color={activeBtnIndex === 2 ? "primary":"neutral"}
                    onClick={function(e){
                        setIsSelected(true);
                        setActiveBtnIndex(2);
                    }}
                    size="lg"
                    variant="outlined"
                    >슬퍼요</Button>
            </div>
        </div>
    </Container>
  );
};

export default QuizPickOne;
