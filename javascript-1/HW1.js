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
console.log(a1);

let a2 = sum(1)();
console.log(a2);

let a3 = sum(1)(2)();
console.log(a3);

let a4 = sum(1)(2)(3)(4)(5)(6)();
console.log(a4);
