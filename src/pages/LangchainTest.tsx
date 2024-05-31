import React, { useState, useEffect } from 'react';
import axios from 'axios';

let i = 0;

const ImageGenerator: React.FC = () => {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    selectRandomEmotions();
  }, []);

  const selectRandomEmotions = () => {
    const emotions = [
      `A cute disney girl person with a joyful smile, eyes crinkled and mouth wide open, showing teeth (${i})`, 
      `A cute disney girl person with tears streaming down their face, eyebrows slanted upwards, and a frown (${i})`, 
      `A cute disney girl person with furrowed brows, eyes glaring, and mouth in a snarl, showing clenched teeth (${i})`, 
      `A cute disney girl person with wide eyes and mouth open in a rounded "O", eyebrows raised high (${i})`, 
      `A cute disney girl person with nose wrinkled, mouth slightly open in a grimace, and eyebrows furrowed (${i})`, 
      `A cute disney girl person with wide eyes, pupils dilated, mouth slightly open, and eyebrows raised (${i})`
    ];
    const shuffledEmotions = emotions.sort(() => 0.5 - Math.random());
    const chosenEmotions = shuffledEmotions.slice(0, 3);
    setSelectedEmotions(chosenEmotions);
  };

  const generateImages = async () => {
    setLoading(true);
    setError('');
    setImages([]);
    selectRandomEmotions(); // 새로운 감정을 선택

    const uniqueQuery = `cacheBuster=${new Date().getTime()}`;

    try {
      i = i + 1;
      selectRandomEmotions();
      console.log({ selectedEmotions });
      
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      const imageUrls = [];

      for (let i = 0; i < selectedEmotions.length; i++) {
        await delay(3000); // 각 요청에 지연 시간 추가
        const response = await axios.post(
          `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2?${uniqueQuery}`,
          {
            inputs: selectedEmotions[i],
          },
          {
            headers: {
              Authorization: `Bearer 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`, // 환경 변수에 설정된 키를 사용
              'Content-Type': 'application/json',
              'Accept': 'image/jpeg',
            },
            responseType: 'arraybuffer',
          }
        );

        const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
        console.log({imageBlob});
        imageUrls.push(URL.createObjectURL(imageBlob));
      }

      setImages(imageUrls);
    } catch (error: any) {
      console.error('Error generating images:', error);
      setError('Error generating images: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Emotion Image Quiz</h1>
      <button onClick={generateImages} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Images'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Generated emotion ${index}`} style={{ width: '200px', height: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;
