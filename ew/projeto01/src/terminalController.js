import Draftlog from "draftlog"
import chalk from "chalk"
import chalktable from 'chalk-table'
import readline from 'readline'
import Person from "./person.js"

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language) {
        Draftlog(console).addLineListener(process.stdin)

        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    closeTerminal() {
        this.terminal.close()
    }

    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalktable(this.getTableOptions(), data);

        this.print = console.draft(table)
        this.data = data
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalktable(this.getTableOptions(), this.data))
    }

    question(msg = '') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.magenta("vehicles") },
                { field: "KmTraveled", name: chalk.green("KmTraveled") },
                { field: "from", name: chalk.yellow("from") },
                { field: "to", name: chalk.blue("to") }
            ]
        }
    }
}