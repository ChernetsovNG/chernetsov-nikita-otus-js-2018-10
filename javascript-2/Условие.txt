promiseReduce - работа с асинхронными функциями

Написать функцию "promiseReduce", которая получает на вход: 
- массив асинхронных функций "asyncFunctions", возвращающих Promise, 
- reduce-функцию и 
- стартовое значение initialValue.

promiseReduce поочередно вызывает переданные асинхронные функции
и выполняет reduce-функцию сразу при получении результата до вызова следующей асинхронной функции.

reduce должна отрабатывать аналогично [Array.prototype.reduce] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), то есть запоминать результат предыдущей итерации.

Пример:

var fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
	console.log('fn2')
	setTimeout(() => resolve(2), 1000)
})

function promiseReduce(asyncFunctions, reduce, initialValue) { 
	/* 
	* Сюда нужно дописать работающий код
	*/
}

promiseReduce(
	[fn1, fn2],                 // массив асинхронных функций 
	function (memo, value) {    // reduce-функция
		console.log('reduce')
		return memo * value
	}, 
	1                           // начальное значение
)
.then(console.log) 

Вывод в консоль:

fn1
reduce
fn2
reduce
2
