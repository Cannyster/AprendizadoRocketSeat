import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

export function NewCycleForm() {
  //o zod pode inferir qual o tipo e estrutura dos objetos apartir do schema
  // como typescript não entende bem variáveis javascript, e necessário usar o type of para o typescript reconhecer ela
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  // função Register adiciona inputs ao formulario e HandleSubmit
  // a função reset indicada na desestruturação, ela volta o valor dos campos para o valor original definido em defaultValues
  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      //Cadastrando os valores padrão dos inputs
      defaultValues: { task: "", minutesAmount: 0 },
    });

  //montagem do esquema de validação do zod e relativamente simples conforme abaixo
  //e bom criar um esquema para depois adiciona-lo a fonfiguraçã do zod (linhas 24/26)
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a Tarefa"),
    minutesAmount: zod
      .number()
      .min(1, "O ciclo precisa ser de no mínimo 05 minutos")
      .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
  });

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
