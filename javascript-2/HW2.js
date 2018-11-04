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

// Функция, которая дожидается выполнения всех асинхронных функций, а затем выполняет свёртку
function promiseReduceSimple(asyncFunctions, reduce, initialValue) {
    return new Promise((resolve) => {
        let asyncFunctionsCount = asyncFunctions.length;
        let asyncFunctionsResults = new Array(asyncFunctionsCount);
        let asyncFunctionsDoneCount = 0;

        asyncFunctions.forEach((asyncFunction, index) => {
            asyncFunction().then(result => {
                asyncFunctionsResults[index] = result;
                asyncFunctionsDoneCount++;
                if (asyncFunctionsDoneCount === asyncFunctionsCount) {
                    // Все асинхронные функции отработали и вернули результат => выполняем свёртку
                    let accumulator = initialValue;
                    asyncFunctionsResults.forEach(result => {
                        accumulator = reduce(accumulator, result);
                    });
                    // возвращаем Promise с результатом свёртки
                    resolve(accumulator);
                }
            });
        });
    });
}

function promiseReduce1(asyncFunctions, reduce, initialValue) {
    // Эта функция выполняет асинхронную функцию, после чего выполняет свёртку
    // и возвращает новое значение аккумулятора
    let innerFunc = function (asyncFunction, reduce, accumulator) {
        return new Promise((resolve) => {
            asyncFunction()
                .then(result => reduce(accumulator, result))
                .then(accumulator => resolve(accumulator));
        });
    }

    let count = asyncFunctions.length;

    // Рекурсивная функция должна отработать примерно так
    // return innerFunc(asyncFunctions[0], reduce, accumulator)
    //     .then(accumulator => innerFunc(asyncFunctions[1], reduce, accumulator))
    //     .then(accumulator => innerFunc(asyncFunctions[2], reduce, accumulator));

    let recursiveFunc = function (prevPromise, reduce, accumulator, index) {
        let nextPromise;
        if (index === 0) {
            nextPromise = innerFunc(asyncFunctions[0], reduce, accumulator);
        } else {
            nextPromise = prevPromise
                .then(accumulator => innerFunc(asyncFunctions[index], reduce, accumulator));
        }
        if (index + 1 === count) {
            return nextPromise;
        }
        return recursiveFunc(nextPromise, reduce, accumulator, index + 1);
    }

    return recursiveFunc(null, reduce, initialValue, 0);
}

let reduce = (accumulator, value) => {
    console.log('reduce');
    return accumulator + value;
};

promiseReduce1([fn1, fn2, fn3], reduce, 0).then(console.log);
