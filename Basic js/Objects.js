/**
 * var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    job: 'Desigener',
    isMarried: false,
    famiilyMembers: ['jane', 'Mark', 'Bob', 'Emily']

};

console.log(john);
console.log(john.firstName);
console.log(john['lastName']);
var x = 'birthYear';
console.log(john[x]);

// mutate the object
john.job = 'teacher';
john['isMarried'] =true;
console.log(john);

// new Object syntx
var jane = new Object();
jane.firstName = 'Jane';
jane.lastName = 'Smith';
jane['birthYear'] = 1993;
console.log(jane);
 */

// function inside the object is known as methods. it can only be assed by the objects methods
// array is also an object because it have method to like push,pop and more......  it can only be accessed by array variable known as objects

var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    job: 'Desigener',
    isMarried: false,
    famiilyMembers: ['jane', 'Mark', 'Bob', 'Emily'],
    calcAge: function () {
        return 2021 - this.birthYear;
    }
};

console.log(john.calcAge());
john.age = john.calcAge();
console.log("Age of "+john.firstName+" is "+john.age);