// //exemplo 1
// setTimeout(() => {
//     console.log('Executando a função assíncrona');
// }, 0);
// console.log('Função síncrona');


//exemplo 2 - ilustra como as microtarefas têm prioridade sobre as tarefas normais.
setTimeout(() => console.log('Task: Timeout'), 0);
Promise.resolve().then(() => console.log('Microtask: Promise'));
console.log('Síncrono');