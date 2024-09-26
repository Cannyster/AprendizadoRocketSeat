import mocha from "mocha"
import chai, { expect } from "chai"
import Person from "../src/person.js"

// desestruturando o que vamos usar do mocha
const { describe, it } = mocha


describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Carro 20000 2020-01-01 2020-02-01'
        )

        const expected = {
            from: '2020-01-01',
            to: '2020-02-01',
            vehicles: ['Bike', 'Carro'],
            KmTraveled: "20000",
            id: '1'
        }
        console.log(person)
        expect(person).to.be.deep.equal(expected)
    })

    it('shoul format values', () => {
        const person = new Person({
            from: '2020-01-01',
            to: '2020-02-01',
            vehicles: ['Bike', 'Carro'],
            KmTraveled: "20000",
            id: '1'
        })

        const result = person.formatted("pt-BR")

        console.log('result', result)

        const expected = {
            id: 1,
            vehicles: 'Bike e Carro',
            KmTraveled: '20.000 km',
            from: '01 de janeiro de 2020',
            to: '01 de fevereiro de 2020'
        }

        expect(result).to.be.deep.equal(expected)
    })

})