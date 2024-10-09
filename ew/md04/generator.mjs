function* generatorFunction1() {
    return 'Hello, Generator!'
}

const generator = generatorFunction1()

console.log(generator)
//console.log(generatorFunction())


console.log(generator.next())


console.log('---------------------------------------------------------------------------')
function* calculation(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield 'Hello'
    yield ' - '
    yield 'World'
    // sem o asterisco a função não será executada conforme exemplo abaixo:
    yield calculation(20, 10)
    yield* calculation(20, 10)
}

const generator2 = main()

console.log(generator2)
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())
console.log(generator2.next())


console.log('---------------------------------------------------------------------------')
// Create a generator function with multiple yields
function* generatorFunction2() {
    yield 'Neo'
    yield 'Morpheus'
    yield 'Trinity'

    return 'The Oracle'
}

function* generatorFunction3() {
    yield 'Diana'
    yield 'Jhon'
    yield 'Clark'

    return 'Bruce'
}

const generator3 = generatorFunction2()
const generator4 = generatorFunction3()

// console.log(generator3.next())
// console.log(generator3.next())
// console.log(generator3.next())
// console.log(generator3.next())

//outras formas de iterar sobre o generator

// Iterate over Generator object
for (const value of generator3) {
    console.log(value)
}

// Create an array from the values of a Generator object
const values = [...generator4]

console.log(values)