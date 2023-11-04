
console.log('client.js is sourced!');

//Client side functions go here

//These are the client side functions (in order alphabetically

//This function removes the active class from any operator.
//This function appears in functions: selectThisOperator, onReady
function inactivateOperators() {
    console.log("this is the inactivateOperators function");
    document.getElementById('plus').classList.remove("active");
    document.getElementById('minus').classList.remove("active");
    document.getElementById('times').classList.remove("active");
    document.getElementById('divide').classList.remove("active");
}

//This function will run when someone clicks on an operator, it will
// run the unclick function first to remove active from any operator,
// then will apply the active css class to the button pressed.
function selectThisOperator(event){
    event.preventDefault();
    console.log("this is the selectthisoperator function");
    // console.log(event.target.classList);
    inactivateOperators(event);
    const list = event.target.classList;
    // console.log(list);
    event.target.classList.value = "active";
}


