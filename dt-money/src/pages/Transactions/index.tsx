import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { TransactionsContext } from "../../../contexts/TransactionContext";

interface transaction {
  id: number;
  description: String;
  type: "income" | "outcome";
  category: String;
  price: number;
  CreatedAt: String;
}

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.CreatedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
