/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class Elements{

    constructor(name, buildYearly) {
        this.name = name;
        this.buildYearly = buildYearly;
    }
}

class Parks extends Elements{

    constructor(name, buildYearly,area,numTree) {
        super(name, buildYearly)
        this.area = area;
        this.numTree = numTree;
    }
    treeDensity() {
        const density = this.numTree / this.area;
        console.log(`${this.name}  has a tree density of ${density}  trees per square km.`);
    }
}

class Street extends Elements{

    // Default size is 3 means normal.
    constructor(name, buildYearly,length,size=3) {
        super(name, buildYearly)
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, "tiny");
        classification.set(2, "small");
        classification.set(3, "normal");
        classification.set(4, "big");
        classification.set(5, "huge");

        console.log(`${this.name} , build in ${this.buildYearly}, is a ${classification.get(this.size)} street. `);
    }

}

// Instance of Parks class
const allParks = [new Parks('Green Park', 1987, 0.2, 215),
new Parks('National Park', 1894, 2.9, 3541),
new Parks('Oak Park', 1953, 0.4, 949)];

// Instance of Streets class
const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
new Street('Evergreen Street', 2008, 2.7, 2),
new Street('4th Street', 2015, 0.8),
new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calcAvg(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    return [sum, sum / arr.length];
}

function parksReport(parkArr) {
    console.log('--------------------------------Parks Report--------------------------------');
    
    // Density
    parkArr.forEach(element => {
        element.treeDensity();
    });

    // average age 
    const age = parkArr.map(el => new Date().getFullYear() - el.buildYearly);
    const [totalAge, avgAge] = calcAvg(age);
    console.log(`Our ${parkArr.length} parks have an average of ${avgAge} years.`);

    // which park ave more than 1000 trees
    const i = parkArr.map(el => el.numTree).findIndex(el => el >= 1000);
    console.log(`${parkArr[i].name} has more than 1000 trees.`);
}

function streetsReport(streetArr) {
    console.log('--------------------------------Streets Report--------------------------------');
    
    
    //Total and average length of the town's streets
    const [totalLength, avgLength] = calcAvg(streetArr.map(el => el.length));
    console.log(`Our ${streetArr.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    
    // CLassify sizes
    streetArr.forEach(el => el.classifyStreet());
}

parksReport(allParks);
streetsReport(allStreets);

// reduce function reduce the array in the single value ,second parameter 0 intialize the prev variable with 0 that we start the sum from 0. Reduce is also an call back function that it return  something. it can also access prev element
// const sum = arr.reduce((prev, cur, index) => prev + cur, 0);