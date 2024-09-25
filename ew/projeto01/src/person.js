export default class Person {
    constructor({ id, vehicles, KmTraveled, from, to }) {
        this.id = id
        this.vehicles = vehicles
        this.KmTraveled = KmTraveled
        this.from = from
        this.to = to
    }
    /*ntl é um objeto e API de internacionalização do JavaScript, que oferece serviços como: 
    Comparação de strings de acordo com a língua, Formatação de números, Formatação de data e hora. 
    */
    formatted(language) {
        //função para fazer o mapeamento de data em string para data como objeto date
        const mapDate = (date) => {
            const [year, month, day] = date.split('-').map(Number)

            //data no JS começam no zero!
            return new Date(year, (month - 1), day)
        }

        return {
            id: Number(this.id),
            vehicles: new Intl.ListFormat(language, {
                style: "long",
                type: "conjunction"
            }).format(this.vehicles),
            KmTraveled: new Intl.NumberFormat(language, {
                style: "unit",
                unit: "kilometer",
                unitDisplay: "short"
            }).format(this.KmTraveled),
            from: new Intl.DateTimeFormat(language, {
                month: "long",
                day: "2-digit",
                year: 'numeric'
            }).format(mapDate(this.from)),
            to: new Intl.DateTimeFormat(language, {
                month: "long",
                day: "2-digit",
                year: 'numeric'
            }).format(mapDate(this.to))
        }
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' '
        const [id, vehicles, KmTraveled, from, to] = text.split(EMPTY_SPACE)
        const person = new Person({
            id,
            KmTraveled,
            from,
            to,
            vehicles: vehicles.split(',')
        })
        return person
    }
}