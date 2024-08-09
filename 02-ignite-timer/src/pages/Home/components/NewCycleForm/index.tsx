import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  // puxando a informação de activeCycle de dentro da Home, apartir do useContext
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em </label>
      <TaskInput
        id="task"
        list="task-suggestions"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        //forma de adicionar o register jutamente com o nome daquele campo
        //utilizar o Spread Operator aqui basicamente passa todos os metodos possiveis do register
        //como retornos propriedade acopladas ao input
        {...register("task")}
        // desativar os campos de input quando um ciclo estiver ativo
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 01"></option>
        <option value="Projeto 02"></option>
        <option value="Projeto 03"></option>
        <option value="Projeto 04"></option>
        <option value="Banana com Aveia"></option>
      </datalist>

      <label htmlFor=""> durante </label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5} // o número mostrado no input vai pular de 5 em 5.
        min={1} // valor mínimo aceito no input
        max={60} // valor máximo aceito no input
        // o register permite que se passe um objeto de configuração para o input definido
        //aqui no caso o valor retornado sera um number e não uma string como foi antes
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
