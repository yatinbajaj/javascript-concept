// function constructor

// object created using object literal.
var John = {
    name: 'John',
    yearOfBirth: 1990,
    jobTitle: 'Teacher'
};

// Person function constructor used to create a objects i.e instance of Person
var Person = function (name, yearOfBirth, jobTitle) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.jobTitle = jobTitle;
}

//////////////////////////////// INHERITANCE ////////////////////////////////
// constructor prototype property
Person.prototype.calculateAge = function () {
    console.log(2021 - this.yearOfBirth);
};

// 1. First Empty Object is created and then Function is called, with the this variable not 
//    pointing to global object but to new object created here i.e empty first and then to john variable.

// 2. Method is now not any more in to the constructor but we can still Because it's in the  
//    prototype property of our Person constrctor
var john = new Person('John', 1990, 'Teacher');
var jane=new Person('Jane',1995, 'Designer');
var mark = new Person('Mark', 2000, 'retired');


////////////////// Object.create method to create an object
var personProto = {
    calculateAge: function () {
        console.log(2021 - this.yearOfBirth);
    }
};
var john = Object.create(personProto);
john.name='John';
john.yearOfBirth = 1990;
john.jobTitle = 'Teacher';

var jane = Object.create(personProto,{
    name: { value: 'jane' },
    yearOfBirth: { value: 1995 },
    jobTitle: { value: 'designer' },
});

// Object.create builds an object that inherit directly from the one that we passed into the first argument
// while, on the other hand function constructor the newly created object inherit from constructor prototype property

////////////////// 
// primitive vs objects


// Primitive
// Each variable hold its own copy of the data they do'nt reference anything
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);


// Objects
// We did not create a new object, No copy was created All we did here is a new reference which points to the first object
// Now both hold refernce that points to the exact same object in the memory
var obj1 = {
    name: 'Yatin',
    age:21
};

var obj2 = obj1;
obj1.name = 'VK';
obj2.name = "bajaj";
console.log(obj1);
console.log(obj2);

// Functions
var age = 27;
var obj3 = {
    name: 'Jonas',
    city: 'New york'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
};
// we donot pass object into function but we pass reference that point to an object
change(age, obj3);
console.log(age);
console.log(obj3.city);


//////////////////
// Passing a function as arguments

var years = [1990, 1965, 1937, 2005, 1998];

// its an generic function that will loop over on array i.e passed as first argument
// and then pass each element to an function that is passed as second argument in the function
// callback functions. And return new array every time.   (like lamba and map function in python)

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2021 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHearth(el) {
    if (el >= 18 && el <= 88) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHearth);

console.log(years);
console.log(ages);
console.log(fullAges);
console.log(rates);

// Function returning Functions

function interviewQuestions(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name+', can you pls explain what UX desigen is ?');
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log('What subject do you teach '+name + ' ?');
        }
    } else {
        return function (name) {
            console.log('Hello '+name + ', What do you do ?');
        }
    }
}

var teacherQuestion = interviewQuestions('teacher');
var designerQuestion = interviewQuestions('designer');
teacherQuestion('Jane');
designerQuestion('Josan');

interviewQuestions('teacher')('Mark');

////////////////////////////////
// Immediately invoked function expression (IIFE)
// Used for data privacy.[expression inside an paranthesis not statement]
(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (gamePoint) {
    var score = Math.random() * 10;
    console.log(score >= gamePoint);
})(5);

// simple function
function fun() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
fun();

//////////////////
// CLOSURES : An inner function has always access to the variables and parameters of its 
// outer function, even after an outer function has returned
 
function retirement(retirementAge) {
    var a = ' Years left until retirement.';
    return function (yearOfBirth) {
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}
var retirementUS = retirement(66);
var retirementGermany = retirement(67);
var retirementIceland = retirement(65);

retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);


// same function that we have created earlier without CLOSURES in which we create different to return according to job jobTitle
// But now we have created with the help of CLOSURES it return one function instead of returning different functions
// for different job title.
function interviewQuestions(job) {
    return function (name) {
        if (job === 'designer') {
            console.log(name+', can you pls explain what UX desigen is ?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach '+name + ' ?');
        } else {
            console.log('Hello '+name + ', What do you do ?');
        }
    }
}
