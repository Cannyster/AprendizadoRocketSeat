const assert = require('assert')

function* calculation(arg1, arg2) {
    yield arg1 * arg2
}

function* main() {
    yield 'Hello'
    yield ' - '
    yield 'World'
    // sem o asterisco a função não será executada conforme exemplo abaixo:
    //yield calculation(20, 10)
    yield* calculation(20, 10)
}

const generator = main()

// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: ' - ', done: false })
assert.deepStrictEqual(generator.next(), { value: 'World', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

//Array.from retorna os valores da execução daquela funçãos
console.group('Array.from', Array.from(main()))

//Testando os valores do array
assert.deepStrictEqual(Array.from(main()), ['Hello', ' - ', 'World', 200])
////Testando os valores do main, usando rest spread
assert.deepStrictEqual([...main()], ['Hello', ' - ', 'World', 200])



