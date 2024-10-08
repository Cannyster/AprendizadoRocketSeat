import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
  // Puxando os dados da transactions será possivel calcular os valores torais, etc...
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // como esses valores são usados unicamente dentro do summary, convem manter os calculos exclusivamente aqui.
  // use memo adicionado para impedir o calculo de ser refeito, exceto quando algum valor de transactions for alterado
  // isto e indicado no array de dependências
  const summary = useMemo(
    () =>
      transactions.reduce(
        (acc, transactions) => {
          if (transactions.type === "income") {
            acc.income += transactions.price;
            acc.total += transactions.price;
          } else {
            acc.outcome += transactions.price;
            acc.total -= transactions.price;
          }

          return acc;
        },
        { income: 0, outcome: 0, total: 0 }
      ),
    [transactions]
  );

  return summary;
}
