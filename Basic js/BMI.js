var marksMass = 70; // kg
var marksHeight = 1.69; // meters

var johnMass = 65;  
var johnHeight = 1.95;

var marksBMI = marksMass / (marksHeight * marksHeight);
var johnBMI = johnMass / (marksHeight * marksHeight);
marksBMI > johnBMI ?console.log("BMI of Mark\'s is higher and is :" + marksBMI):console.log("BMI of John\'s is higer and is :" + johnBMI)

// Another way
/**
 *  var checkHigher = marksBMI > johnBMI;
    console.log("BMI of Mark\'s :" + marksBMI);
    console.log("BMI of John\'s :"+johnBMI);
    console.log("Is Mark\'s BMI higher than John\'s ? "+checkHigher);
 */

 // using the objects and methods
var john = {
   firstName: 'John\'s',
   mass: 70,
   height: 1.69,
   calcBMI:function () {
      this.BMI = this.mass / (this.height * this.height);
      return this.BMI;
   }
};
var mark = {
   firstName: 'Mark\'s',
   mass: 65,
   height: 1.95,
   calcBMI:function () {
      this.BMI = this.mass / (this.height * this.height);
      return this.BMI;
   }
};

if (john.calcBMI() > mark.calcBMI()) {
   console.log(john.firstName+" has higher BMI of :" + john.BMI);
   
} else if (marks.calcBMI() > john.calcBMI()) {
   console.log(mark.firstName+" has higher BMI of:" + mark.BMI);
} else {
   console.log("BMI of Both John\'s and Mark\'s is same and is :" + john.BMI + ' ' + mark.BMI);
}
console.log(mark.BMI, john.BMI);