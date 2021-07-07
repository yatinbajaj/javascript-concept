function calculateAge(birthYear) {
    return 2021 - birthYear;
}

function yearsUntilRetirement(birthYear,firstName) {
    var age = calculateAge(birthYear);
    var retirement=65-age;
    if (retirement > 0) {
        console.log(firstName + ' retires in ' +retirement+ ' years');
    } else {
        console.log(firstName + ' Already retired');
    }
}
yearsUntilRetirement(1990, 'Mike');
yearsUntilRetirement(1948, 'Jon');
yearsUntilRetirement(2000, 'John');

// function calculateAge(birthYear) {}; function declaration
// var calculateAge = function(birthYear); function expression

var WhatDoYouDo = function (firstName, jobName) {
    switch (jobName) {
        case 'teacher':
            return firstName +' teaches kids how to code';
        case 'driver':
            return firstName +' drives a cab in us';
        case 'designer':
            return firstName + ' design a website';
        default:
            return "does something else";
    }
}

console.log(WhatDoYouDo('john','teacher'));


// function expression produce an immediate result while function declaration donot.
// statement donot return ant thing but expression always.