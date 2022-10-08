import { sneaker_classes } from '/sneaker_classes.js'; 

console.log('hello from app.js')
// console.log(tf); 

const model = await tf.loadLayersModel('/tfjs-full-no-rescale-model/model.json');

// console.log(model)

// let classes = {
//     0: 'Jordan 1 Low Black Toe', 
//     1: 'Jordan 12 Retro Gym Red', 
//     2: 'Jordan 4 Retro Kaws', 
//     3: 'Jordan 8 Retro OVO Black'
// }; 

const classes = sneaker_classes; 

console.log('classes keys length: ', Object.keys(classes).length);

// const test_img = new Image(); 
// test_img.src = '/ovoblack.jpeg'; 

(function () {
    let fileInput = document.querySelector('#fileInput');
    let displayImageWrapper = document.querySelector('#displayImageWrapper');
    let imageElement = document.querySelector('#imageElement');

    fileInput.addEventListener('change', async function (event) {
        console.log('file input changed');
        console.log(this.files, event);

        let uploadedFile = this.files[0];

        // let img = document.createElement("IMG");

        let reader = new FileReader();
        reader.onload = function () {
            imageElement.src = reader.result;

            imageElement.onload = async () => {
                console.log('width & height', imageElement.width, imageElement.height ); 
                await prediction(imageElement); 
            }; 
        };
        reader.readAsDataURL(uploadedFile);

    });
})(); 

// const test_img = new Image();
// test_img.src = '/kaws.jpeg'; 

// test_img.onload = async () => {
//     // let tensor = tf.browser.fromPixels(test_img)
//     // .resizeNearestNeighbor([180,180])
//     // .toFloat()
//     // .div(tf.scalar(255.0))
//     // .expandDims(); 

//     // let predictions = await model.predict(tensor).data(); 
//     // console.log(predictions); 

//     // let top5 = Array.from(predictions).map((p, i) => {
//     //     return {
//     //         probability: p, 
//     //         className: classes[i], 
//     //     };
//     // }).sort((a, b) => {
//     //     return b.probability - a.probability; 
//     // }).slice(0, 2); 

//     // console.log(top5);

// };  

async function prediction (imageObject) {
    console.log('in the prediction method', imageObject); 
    let tensor = tf.browser.fromPixels(imageObject)
        .resizeNearestNeighbor([180, 180])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    let predictions = await model.predict(tensor).data();
    console.log(predictions);

    let top5 = Array.from(predictions).map(function(p, i) {
        return {
            probability: p,
            className: classes[i],
        };
    }).sort(function(a, b) {
        return b.probability - a.probability;
    }).slice(0, 2);

    console.log(top5);

    let predictionsText = document.querySelector('#predictionsText'); 
    predictionsText.innerText = 'Predictions: ' + top5.map(item => item.className).join(' or '); 
}
