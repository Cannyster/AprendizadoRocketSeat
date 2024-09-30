import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function greeting(name) {
    console.log(`Thank you for your valuable feedback: ${name}`);
}

function processUserInput(callback) {
    rl.question("Por favor insira seu nome.", (name) => {
        callback(name);
        rl.close();
    });

}

//Aqui greeting e uma função callback executada dentro da função processUserInnput
processUserInput(greeting);










