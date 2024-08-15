import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <header>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt=""></img>

          <Dialog.Root>
            <Dialog.DialogTrigger asChild>
              <NewTransactionButton>Nova Transação</NewTransactionButton>
            </Dialog.DialogTrigger>

            <Dialog.Portal>
              <Dialog.Overlay />

              <Dialog.DialogContent>
                <Dialog.DialogTitle>Nova Transaçõa</Dialog.DialogTitle>
                <Dialog.DialogClose />
              </Dialog.DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        </HeaderContent>
      </HeaderContainer>
    </header>
  );
}
// Portal - ajuda a colocar o conteúdo fora de todas as estruturas em que ele esta, como se fosse um elemento externo ao local de origem
