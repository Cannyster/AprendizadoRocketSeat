import { CyclesContext } from "../../contexts/CyclesContext";
import { HandPalm, Play } from "phosphor-react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import * as zod from "zod";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setActiveCycleIdAsNull,
    alterAmountSecondsPassed,
    CreateNewCycle,
    InterruptCurrentCycle,
  } = useContext(CyclesContext);

  //montagem do esquema de validação do zod e relativamente simples conforme abaixo
  //e bom criar um esquema para depois adiciona-lo a fonfiguraçã do zod (linhas 24/26)
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a Tarefa"),
    minutesAmount: zod
      .number()
      .min(1, "O ciclo precisa ser de no mínimo 05 minutos")
      .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
  });

  //o zod pode inferir qual o tipo e estrutura dos objetos apartir do schema
  // como typescript não entende bem variáveis javascript, e necessário usar o type of para o typescript reconhecer ela
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

  //função Register adiciona inputs ao formulario e HandleSubmit
  //a função reset indicada na desestruturação, ela volta o valor dos campos para o valor original definido em defaultValues
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    //Cadastrando os valores padrão dos inputs
    defaultValues: { task: "", minutesAmount: 0 },
  });

  //desestruturando as informações de newCycleForm, para extrair apenas alguma funções que preciso e
  //assim continuo tendo a variável newCycleForm conforme definida acima
  const { handleSubmit, watch, formState, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data);
    reset();
  }

  console.log(`O ciclo ativo atualmente e: ${activeCycleId}`);

  // formstate e um retorno do userform, e tem afunção erros que permite ver se houve algum erro com aquele formState
  // nesse caso vamos imprimir no console qual foi o erro que acabou ocorrendo.
  console.log(formState.errors);

  //variável criada para acompanhar o valor do input com o nome Task
  const task = watch("task");
  //variável criada para controle o disabled do botão
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider
          {
            ...newCycleForm /*{mais uma forma de passar atributos como propriedade para NewCycleForm}*/
          }
        >
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={InterruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}

//Task esta sendo acompanhada pela função watch, por isso ela pode se usada como validação para o botão - StartCountdownButton -
/* active cycle no countdown, esta recebendo informações de activecycle para que funcione corretamente, posteriormente ver mais sobre 
comunicação entre componentes linha 91*/
