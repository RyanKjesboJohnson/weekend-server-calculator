
console.log('client.js is sourced!');

//Client side functions go here

//VARIABLES
//************************************************ */
//These are global variables:

let currentOperator;
let calculationHistory = [];
// console.log(currentOperator);
let zuzu = true;

//FUNCTIONS
//************************************************ */
//These are the client side functions (in order alphabetically)

//This function sets data input fields to empty
function clearFormFields() {
    if(zuzu){console.log("this is the clearFormFields function")};
    inactivateOperators();
    document.getElementById("firstNum").value = '';
    document.getElementById("secondNum").value = '';
}

function getCaculations(){
        axios({
            url: '/calculations',
            method: 'GET'
        }).then((response) => {console.log('response data:', response.data)
        calculationHistory = response.data;
        renderCalculationsResponse();
    })
    }


//This function removes the active class from any operator.
//This function appears in functions: selectThisOperator, onReady
function inactivateOperators() {
    if(zuzu){console.log("this is the inactivateOperators function")};
    document.getElementById('plus').classList.remove("active");
    document.getElementById('minus').classList.remove("active");
    document.getElementById('times').classList.remove("active");
    document.getElementById('divide').classList.remove("active");
}

//This function runs when the page is loaded.
function onReady() {
    if(zuzu){console.log("this is the startup function of the client side server")};
    inactivateOperators();
}

//This function is onclick of the equals sign
//it takes values from the form and posts to server
function postCalcObject(event){
    if(zuzu){console.log("this is the postCalcObject function");}
    event.preventDefault();
    let firstNum = Number(document.getElementById('firstNum').value);
    let secondNum = Number(document.getElementById('secondNum').value);
    let uncalculatedObject = {
        numOne: firstNum,
        numTwo: secondNum,
        operator: currentOperator
    }
    if(zuzu){console.log("This is the uncalculated item being sent to server:", uncalculatedObject)};
    axios({
        method: 'POST',
        url: '/calculations',
        data: uncalculatedObject
    }).then((response) => {
        console.log('the server got my calculation')
        clearFormFields();
        getCaculations();
    }
    )
}

function renderCalculationsResponse() {
    let recentResult = calculationHistory[calculationHistory.length - 1];
    // console.log(recentResult);
} 

//This function will run when someone clicks on an operator, it will
// run the unclick function first to remove active from any operator,
// then will apply the active css class to the button pressed.
function selectThisOperator(event){
    event.preventDefault();
    if(zuzu){console.log("this is the selectthisoperator function")};
    // console.log(event.target.classList);
    inactivateOperators(event);
    // console.log(list);
    event.target.classList.value = "active";
    // console.log(event.target.textContent);
    currentOperator = event.target.textContent;
    // console.log(uncalculatedObject);
}



//RUN ON STARTUP
//************************************************ */
//Functions to run on startup
onReady();