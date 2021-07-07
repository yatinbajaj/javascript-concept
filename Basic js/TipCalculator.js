// var bills = [124, 48, 268];
// var tips = [];
// var finalBills = [];

// for (var i = 0; i < bills.length; i++){
//     var tip=calculateTip(bills[i]);
//     tips.push(tip);
//     finalBills.push(tip+bills[i]);
// }
// console.log(tips);
// console.log(finalBills);

// function calculateTip(bill) {
//     var percentage;
//     if (bill < 50) {
//         percentage = .2;
//     } else if (bill >= 50 && bill < 200) {
//         percentage = .15;
//     } else {
//         percentage = .1;
//     }

//     return percentage * bill;
// }

var johns = {
    familyName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    tips: [],
    finalBill: [],
    calcTip: function () {
        for (var i = 0; i < this.bills.length; i++){
            var percentage;
            if (this.bills[i] < 50) {
                percentage = .2;
            } else if (this.bills[i] >= 50 && this.bills[i] < 200) {
                percentage=.15;
            } else {
                percentage = .1;
            }
            var tip = percentage * this.bills[i];
            this.tips.push(tip);
            this.finalBill.push(tip + this.bills[i]);
        }
    }
}

var marks = {
    familyName: 'Marks Miller',
    bills: [77, 375, 110, 45],
    tips: [],
    finalBill: [],
    calcTip: function () {
        for (var i = 0; i < this.bills.length; i++){
            var percentage;
            if (this.bills[i] < 100) {
                percentage = .2;
            } else if (this.bills[i] >= 100 && this.bills[i] < 300) {
                percentage=.1;
            } else {
                percentage = .25;
            }
            var tip = percentage * this.bills[i];
            this.tips.push(tip);
            this.finalBill.push(tip + this.bills[i]);
        }
    }
}

function calcAverage(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++){
        sum = sum + arr[i];
    }
    var average = sum / arr.length;
    return average;
}

// Do the Calculation
johns.calcTip();
marks.calcTip();

johns.average = calcAverage(johns.tips);
marks.average = calcAverage(marks.tips);
console.log(johns, marks);

if (johns.average > marks.average) {
    console.log(johns.familyName + '\'s family pays higher tipswith an average of $' + johns.average);
} else if (johns.average < marks.average) {
    console.log(marks.familyName + '\'s family pays higher tipswith an average of $' + marks.average);   
}