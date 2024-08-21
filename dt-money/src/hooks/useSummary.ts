import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionContext";

export function useSummary() {
  // Puxando os dados da transactions será possivel calcular os valores torais, etc...
  const { transactions } = useContext(TransactionsContext);

  // como esses valores são usados unicamente dentro do summary, convem manter os calculos exclusivamente aqui.
  const summary = transactions.reduce(
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
  );

  return summary;
}
