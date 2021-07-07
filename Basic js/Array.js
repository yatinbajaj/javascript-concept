// Initialize an array
var names = ['John', 'Mike', 'Jane'];
var years = new Array(1990, 1996, 2000);
console.log(names);
console.log(years[1]);

// Mutate an array
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names);

//Different data types
var john = ['John', 'Smith', 1990, 'desigener', false]

john.push('blue');
john.unshift('Mr.');
console.log(john);

john.pop();
john.shift();
console.log(john);

console.log(john.indexOf('desigener'));

var isDesigener = john.indexOf('desigener') === -1 ? 'John is not desigener' : 'John is desigener';
console.log(isDesigener);