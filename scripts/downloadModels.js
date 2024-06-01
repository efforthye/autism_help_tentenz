const fs = require('fs');
const path = require('path');
const https = require('https');

const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

const files = [
  'age_gender_model-shard1',
  'age_gender_model-weights_manifest.json',
  'face_expression_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_tiny_model-shard1',
  'face_landmark_68_tiny_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  'face_recognition_model-weights_manifest.json',
  'mtcnn_model-shard1',
  'mtcnn_model-weights_manifest.json',
  'ssd_mobilenetv1_model-shard1',
  'ssd_mobilenetv1_model-shard2',
  'ssd_mobilenetv1_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-shard2',
  'tiny_face_detector_model-weights_manifest.json'
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(`Failed to get '${url}' (${response.statusCode})`);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
};

const downloadModels = async () => {
  if (!fs.existsSync('./public/models')) {
    fs.mkdirSync('./public/models', { recursive: true });
  }

  for (const file of files) {
    const url = `${MODEL_URL}${file}`;
    const dest = path.resolve('./public/models', file);
    console.log(`Downloading ${file} from ${url} to ${dest}...`);
    try {
      await downloadFile(url, dest);
      console.log({url, dest});
      console.log(`${file} downloaded successfully.`);
    } catch (err) {
      console.error(`Error downloading ${file}: ${err}`);
    }
  }
};

downloadModels();
