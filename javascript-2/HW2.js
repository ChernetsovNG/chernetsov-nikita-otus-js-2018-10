"use strict"

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
};

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
});

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(3), 350)
});

function promiseReduce(asyncFunctions, reduce, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < asyncFunctions.length; i++) {
        let asyncFunction = asyncFunctions[i];
        asyncFunction().then(value => reduce(accumulator, value));
    }
    return Promise.resolve(accumulator);
}

promiseReduce([fn1, fn2, fn3], (accumulator, value) => accumulator + value, 0)
    .then(console.log);
