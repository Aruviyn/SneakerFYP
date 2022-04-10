const express = require('express')
const app = express()
const port = 3000

const tf = require('@tensorflow/tfjs')
// import * as tf from '@tensorflow/tfjs';

const MOBILE_NET_INPUT_WIDTH = 224;
const MOBILE_NET_INPUT_HEIGHT = 224;
const STOP_DATA_GATHER = -1;

let mobilenet = undefined;
let gatherDataState = STOP_DATA_GATHER;
let videoPlaying = false;
let trainingDataInputs = [];
let trainingDataOutputs = [];
let examplesCount = [];
let predict = false;


/**
 * Loads the MobileNet model and warms it up so ready for use.
 **/
 async function loadMobileNetFeatureModel() {
  const URL = 
    'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
  
  mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});
  console.log('MobileNet v3 loaded successfully!');
  
  // Warm up the model by passing zeros through it once.
  tf.tidy(function () {
    let answer = mobilenet.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
    console.log(answer.shape);
  });
}

// Call the function immediately to start loading.
loadMobileNetFeatureModel();

app.get('/', (req, res) => {
  

  // Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys, {epochs: 10}).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5], [1, 1])).print();
  // Open the browser devtools to see the output
}); 

res.send('Hello 09091209012!')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






  