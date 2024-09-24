let animal = {
    eat: true,
    walk: true,
    run: true,
    attack: true
}

let rabbit = {
    jump: true
}

/*
Todo objeto em JavaScript tem uma propriedade interna chamada [[Prototype]], 
que pode ser usada para acessar as propriedades e métodos de outro objeto. 
Esse objeto ao qual o [[Prototype]] faz referência é conhecido como o prototype.
*/


// Define animal como prototype de rabbit
rabbit.__proto__ = animal

//console.log(rabbit.attack, rabbit.eat, rabbit.run, rabbit.walk) // true's (herdados de animal)
//console.log(rabbit.jump) // true (vem do próprio rabbit)
console.log('Usando: rabbit.__proto__')
console.log(rabbit)
console.log(rabbit.__proto__) // animal
console.log(animal.__proto__) // Object.prototype
console.log(Object.prototype.__proto__) // null (fim da cadeia)


console.log('\n-------------------------------------------------')
console.log('Usando: Object.getPrototypeOf()')
console.log(Object.getPrototypeOf(rabbit))
console.log(Object.getPrototypeOf(animal))


console.log('\n-------------------------------------------------')
console.log('Usando: Object.getOwnPropertyNames()')
console.log(Object.getOwnPropertyNames(rabbit))
console.log(Object.getOwnPropertyNames(animal))


console.log('\n-------------------------------------------------')
console.log('Usando: Object.getOwnPropertyDescriptors()')
console.log(Object.getOwnPropertyDescriptors(rabbit))
console.log(Object.getOwnPropertyDescriptors(animal))