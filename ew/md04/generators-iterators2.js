// ------ async iterator
const { readFile, stat, readdir } = require('fs/promises');

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('Hey Dude')
};

//console.log('Promisified: ', [...promisified()]);
//Promise.all([...promisified()]).then(results => console.log('Promisified: ', results))

// (async () => {
//     for await (const item of promisified()) {
//         console.log('for await: ', item.toString())
//     }
// })();



async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }

    const dir = await readdir(__dirname)
    yield { dir }
}

(async () => {
    for await (const item of systemInfo()) {
        console.log('systemInfo: ', item)
    }
})();