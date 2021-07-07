// falsy values : undefined ,null, 0, ' ', NaN
// truthy values: NOT falsy values

var height='';
if (height) {
    console.log("variable is defined");
} else {
    console.log("variable is not defined");
}
height = 23;
// equality operator
if (height == '23') {
    console.log('The == operator does type coercion!');
}

if (height === '23') {
    console.log('The == operator does type coercion!');
} else {
    console.log('The === operator does type coercion!');
}

// space cover space in memory it does not return true
// ' ' the space btw empty string return true not false