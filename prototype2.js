function Person(name) {
    this.name = name
}


// forma de adicionar um método ao prototype, 
// também e possive adicionar propriedade assim
Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`)
}

let jhon = new Person('Jhon')

console.log(jhon.name)

// jhon agora pode acessar o método greet do prototype persons
jhon.greet()


console.log(Object.getPrototypeOf(Person))