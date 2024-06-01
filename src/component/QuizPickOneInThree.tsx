import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Button from '@mui/joy/Button';

const Container = styled.div<{ quizIndex: number; }>`
    display: ${props => props.quizIndex === 3 ? "flex" : "none"};
    width: 100%;
    height: calc(100% - 60px);
    align-items: center;
    justify-content: center;
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        h2 {
            margin: 0;
            text-align: center;
        }
        .img-wrapper{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            max-width: 820px;
            width: 1000px;
            height: 264px;
            gap: 20px;
            > .image {
                border-radius: 20px;
                width: 100%;
                height: auto;
                overflow: hidden;
                > .img {
                    width: 400px;
                    height: 400px;
                    background: red;
                }
            }
        }
        > .answer {
            display: flex;
            gap: 17px;
            > button {
                flex: 1;
            }
        }
    }
`;

interface QuizProps {
    quizIndex: number;
    activeIndex: number;
    correctAnswer: string;
    activeBtnIndex: number;
}



const QuizPickOneInThree: React.FC<{ 
    quizIndex: number; setQuizIndex: React.Dispatch<React.SetStateAction<number>>, 
    isSelected: boolean; setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    activeBtnIndex: number; setActiveBtnIndex: React.Dispatch<React.SetStateAction<number>>,
    correctAnswer: string; setCorrectAnswer: React.Dispatch<React.SetStateAction<string>>  }> = ({ quizIndex, setQuizIndex, isSelected, setIsSelected,correctAnswer, setCorrectAnswer,activeBtnIndex, setActiveBtnIndex }) => {
    
    const [image, setImage] = useState<string | null>(null);
    const hasGeneratedImage = useRef(false);

    useEffect(() => {
        if (!hasGeneratedImage.current) {
            hasGeneratedImage.current = true;
            generateImage();
        }
    }, []); // 빈 배열을 의존성 배열로 전달하여 처음 렌더링될 때만 호출되도록 설정

    const chapterOne = ['happy', 'sad', 'happy', 'sad'];
    const chapterThree = [
        'happy', 'sad', 'angry', 'surprised', 'confused', 'excited',
        'bored', 'scared', 'amused', 'annoyed'
    ];

    const generateImage = async () => {
        console.log('퀴즈에서 이미지 생성 시작!!');
        const key = process.env.REACT_APP_OPENAI_KEY;
        const randomExpression = getRandomExpression();
        console.log({ randomExpression });
        setCorrectAnswer(randomExpression);


        const makeRequest = async (expression: string, attempt = 0): Promise<string | null> => {
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/images/generations',
                    {
                        "prompt": `a portrait of a beautiful korean girl looking ${expression}`,
                        "n": 1,
                        "size": "1024x1024"
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${key}`,
                        }
                    }
                );
                return response?.data?.data[0]?.url || null;
            } catch (error) {
                if (attempt < 3) {
                    console.error(`Error generating image (attempt ${attempt + 1}):`, error);
                    await sleep(7000); // 7초 지연
                    return makeRequest(expression, attempt + 1);
                } else {
                    console.error(`Failed to generate image after ${attempt + 1} attempts:`, error);
                    return null;
                }
            }
        };

        try {
            const imageUrl = await makeRequest(randomExpression);
            console.log({ imageUrl });
            setImage(imageUrl);
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    };

    const getRandomExpression = () => {
        const shuffled = chapterOne.sort(() => 0.5 - Math.random());
        return shuffled[0];
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <Container quizIndex={quizIndex}>
            <div className="wrapper">
                <div className="question">
                    <h2>다음 중 행복한 표정을 찾아주세요</h2>
                </div>
                <div className="img-wrapper">
                    <div className="image">
                        {image ? (
                            <img src={image} alt="Generated" style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="image">
                        {image ? (
                            <img src={image} alt="Generated" style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="image">
                        {image ? (
                            <img src={image} alt="Generated" style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                </div>
            </div>
        </Container>
    );
};

export default QuizPickOneInThree;
