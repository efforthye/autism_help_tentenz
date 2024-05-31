import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    try {
      console.log({ prompt });
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          inputs: prompt,
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Ensure this key is set in your environment variables
            'Content-Type': 'application/json',
            'Accept': 'image/jpeg', // 응답을 이미지로 받기 위한 Accept 헤더 추가
          },
          responseType: 'arraybuffer', // 바이너리 데이터를 받기 위해 responseType을 arraybuffer로 설정
        }
      );
      console.log({ response });

      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);

      setImageUrl(imageUrl);
    } catch (error: any) {
      console.error('Error generating image:', error);
      setError('Error generating image: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
