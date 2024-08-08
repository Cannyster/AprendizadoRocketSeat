import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
  //Estado para atualizar o contador
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  // variáveis criadas para controlar o tempo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // Total de Segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // Segundos atuais
  const minutesAmount = Math.floor(currentSeconds / 60); // Minutos restantes
  const secondsAmount = currentSeconds % 60; // Segundos restantes

  // Para completar com  0 quando o número for de 9 abaixo, usa esa função padStart, ela analisa a string e adiciona um elemento caso tenha o tamanho menor que o definido no caso tem que ter ao menos 2 char na string, se não tiver ela completa com 0 no inicio, para segundos e minutos.
  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    // se interval fosse definido dentro do if, não haveria como o return reconhcer ele devido ao escopo da variável
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference > totalSeconds) {
          // se a diferença de segundo for maior que o tempo decorrido ele vai registrar finished date e zerar o ciclo ativo
          setCycles(
            Cycles.map((cycle) => {
              if (cycle.id === activeCylceId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          //clearInterval(interval);
          setActiveCylceId(null);
        } else {
          //caso contrario vai realizar a contagem de tempo normalmente
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCylceId]);

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
