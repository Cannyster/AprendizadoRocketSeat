import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    alterAmountSecondsPassed,
  } = useContext(CyclesContext);

  console.log("Countdown Renderizado");

  // variáveis criadas para controlar o tempo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Total de Segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Segundos atuais
  const minutesAmount = Math.floor(currentSeconds / 60); // Minutos restantes
  const secondsAmount = currentSeconds % 60; // Segundos restantes

  // Para completar com  0 quando o número for de 9 abaixo, usa esa função padStart, ela analisa a string e adiciona um elemento caso tenha o tamanho menor que o definido no caso tem que ter ao menos 2 char na string, se não tiver ela completa com 0 no inicio, para segundos e minutos.
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  // aqui para calcular o tempo passado vamos comparar a diferença entre a data inicial gravada em na interface cycle e a
  // data atual usando -differenceInSeconds- do pacote -date-fns- e uma forma mais precisa de contar o tempo decorrido.
  // isso atualizando a cada 1000 milissegundo (1 segundo).
  useEffect(() => {
    // se interval fosse definido dentro do if, não haveria como o return reconhcer ele devido ao escopo da variável
    let interval: number;

    if (activeCycle) {
      /* A função setInterval em JavaScript é usada para executar uma função ou código repetidamente em intervalos de tempo especificados, medidos em milissegundos. A função ou código continuará sendo executado até que o clearInterval seja chamado para parar a execução.*/
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          //se a diferença de segundo for maior que o tempo decorrido ele vai registrar finished date e zerar o ciclo ativo
          markCurrentCycleAsFinished();
          alterAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          //caso contrario vai realizar a contagem de tempo normalmente
          alterAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    alterAmountSecondsPassed,
  ]);

  // ira mudar o titulo da aba apenas quando houver algum ciclo ativo
  useEffect(() => {
    if (activeCycle) {
      document.title = `Timer ${minutes}:${seconds}`;
    } else {
      document.title = `Ignite Timer`;
    }
  }, [seconds, minutes, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
