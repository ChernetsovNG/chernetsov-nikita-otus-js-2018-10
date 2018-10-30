"use strict";

function sum(value1) {
    let accumulator = 0;

    if (arguments.length === 0) {
        return accumulator;
    }

    accumulator = value1;

    let innerSum = function (value2) {
        if (arguments.length === 0) {
            return accumulator;
        }
        accumulator += value2;
        return innerSum;
    }

    return innerSum;
}

let a1 = sum();
console.log(a1);  // 0

let a2 = sum(1)();
console.log(a2);  // 1

let a3 = sum(1)(2)();
console.log(a3);  // 1 + 2 = 3

let a4 = sum(1)(2)(3)(4)(5)(6)();
console.log(a4);  // 1 + 2 + 3 + 4 + 5 + 6 = 21
