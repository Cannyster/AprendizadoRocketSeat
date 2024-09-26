import database from "../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import { save } from './repository.js'

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question('What?? ')
        if (answer === STOP_TERM) {
            terminalController.closeTerminal()
            console.log('Processo Finalizado !!!')
            return;
        }
        const person = Person.generateInstanceFromString(answer)
        console.log('person', person.formatted(DEFAULT_LANG))
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        return mainLoop()

    } catch (error) {
        console.error("Deu PT: ", error)
        return mainLoop()
    }
}

await mainLoop()

