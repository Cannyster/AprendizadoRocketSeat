function tarefaPesada() {
    let i = 0;

    function processaParte() {
        for (let j = 0; j < 100; j++) {
            console.log(`Tarefa concluída Nº ${i}`);
            i++;
        }

        if (i < 100) {
            setTimeout(processaParte, 0); // Quebra a tarefa para não bloquear o event loop
        } else {
            console.log(`Tarefa totalmente concluída`);
        }
    }

    processaParte();
}

setTimeout(tarefaPesada, 0);

console.log('Outras operações continuam enquanto a tarefa é dividida...');
