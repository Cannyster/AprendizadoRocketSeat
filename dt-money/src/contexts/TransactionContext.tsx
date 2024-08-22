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
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
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

  async function createTransaction(data: CreateTransactionInput) {
    //desestruturando para obter informaçõe existentes em data
    const { description, price, category, type } = data;

    //pegando as informações obtidas de data e jogando no metodo post para cria novos registros
    const response = await api.post("transactions", {
      //o id o json-server irá gerar automaticamente na sequencia
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    // incluindo a transação criada no estado de transações
    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
