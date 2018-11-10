"use strict"

var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
};

var fn2 = () => new Promise(resolve => {
    console.log('fn2');
    throw new Error("Error in fn2");
    setTimeout(() => resolve(2), 1000);
});

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(3), 350)
});

// а эта более честная функция - решение ДЗ
function promiseReduce(asyncFunctions, reduce, initialValue) {
    if (asyncFunctions.length === 0) {
        return initialValue;
    }

    // Эта функция выполняет асинхронную функцию, после чего выполняет свёртку
    // и возвращает Promise с новым значением аккумулятора
    let invokeAsyncFunc = function (asyncFunction, reduce, accumulator) {
        return asyncFunction()
            .then(result => reduce(accumulator, result))
            .catch(error => {
                console.log(error);
                return accumulator;
            });
    }

    // Рекурсивная функция свёртки должна отработать примерно так (на примере 3-х функций):
    // return invokeAsyncFunc(asyncFunctions[0], reduce, accumulator)
    //     .then(accumulator => invokeAsyncFunc(asyncFunctions[1], reduce, accumulator))
    //     .then(accumulator => invokeAsyncFunc(asyncFunctions[2], reduce, accumulator));
    let recursiveConvolutionFunc = function (prevPromise, reduce, index) {
        let nextPromise = prevPromise
            .then(accumulator => invokeAsyncFunc(asyncFunctions[index], reduce, accumulator));
        if (index + 1 === asyncFunctions.length) {
            return nextPromise;
        }
        return recursiveConvolutionFunc(nextPromise, reduce, index + 1);
    }
    
    // запускаем вычисление
    return recursiveConvolutionFunc(Promise.resolve(initialValue), reduce, 0);
}

promiseReduce(
    [fn1, fn2, fn3],
    (accumulator, value) => {
        console.log('reduce');
        return accumulator + value;
    },
    0)
    .then(console.log);
