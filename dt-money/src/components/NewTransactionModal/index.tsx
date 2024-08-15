import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import { CloseButton, Content, Overlay } from "./styles";
import { X } from "phosphor-react";

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.DialogTitle>Nova Transação</Dialog.DialogTitle>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="Text" placeholder="Descrição" required />
          <input type="Text" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
