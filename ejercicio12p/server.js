/* const parseArg = require('minimist');

const options = {
    alias:{
        m: 'modo',
        d: 'debug',
        p: 'port'
    },
    default:{
        modo: 'dev',
        debug: true,
        port: 8080
    }
}

const {modo, debug, port, _} = parseArg(process.argv.slice(2), options);

console.log({
    modo, 
    debug, 
    port,
    otros: _
});
 */

const numbers = []

const addNumber = (number) => {
    numbers.push(number)
}


addNumber(3)
addNumber(4)
addNumber(1)
addNumber(5)

console.log(numbers);

const avg = (arr) => {

    let suma = 0;

    for(let i = 0; i < arr.length; i++){

        suma = arr[i] + suma
    }

    return suma/arr.length
}
console.log(avg(numbers));



