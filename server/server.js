const express = require('express'); const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []

//The client.js file has a variable called Zuzu (my dog's name), 
//and if true the console logs will show.

// Here's a wonderful place to make some routes:

// FUNCTIONS
// This function takes in an uncalculated object (not containing result)
// It then calculates based on the operator, and
// returns the result
function calculate(uncalculatedObject) {
  let numOne = uncalculatedObject.numOne;
  let numTwo = uncalculatedObject.numTwo;
  let operator = uncalculatedObject.operator;
  let result;
  if (operator === '+'){
    result = numOne + numTwo}
    else if (operator === '-'){
      result = numOne - numTwo}
    else if (operator === '*'){
      result = numOne * numTwo}
    else if (operator === '/'){
      result = numOne / numTwo}
  uncalculatedObject.result = result;
  return uncalculatedObject;
  // console.log(uncalculatedObject);
}

// GET /calculations

// This function returns a history of calculations to the client
app.get('/calculations', (req, res) => {
  console.log('GET /interests received a request!')
  res.send(calculations)
})

// POST /calculations

//This post route receives uncalculated objects
app.post('/calculations', (req, res) => {
  console.log('POST /calculations received a request:' )
  console.log('req.body', req.body)
  let uncalculatedObject = req.body;
  // console.log(uncalculatedObject);
  calculate(uncalculatedObject);
  console.log(uncalculatedObject);
  calculations.push(uncalculatedObject);
  res.sendStatus(201)
})

//This delete route deletes the calculations history
app.delete('/calculations', (req, res) => {
  calculations = [];
  res.sendStatus(200);
})


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
