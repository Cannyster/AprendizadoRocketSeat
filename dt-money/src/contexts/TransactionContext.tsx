import { createContext, ReactNode, useEffect, useState } from "react";
//Import necessário para resolver o erro que da no retorno do Provider
import React from "react";
import { api } from "../lib/axios";

interface transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<transaction[]>([]);

  // Async não pode ser feito dentro de useEffect, por isso foi necesário cria em uma função externa para funcionar
  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      // deixando tudo ordenado pelo createdAt com o mais novo por cima
      params: { _sort: "createdAt", _order: "desc", q: query },
    });
    setTransactions(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
