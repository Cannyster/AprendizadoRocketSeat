import styled from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; //se o tamanho da tabela for maior que o tamanho do container ela vai gerar uma barra de rolagem
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse; // pesquisar sobre isso
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-left: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-left: 1.5rem;
      }
    }
  }
`;

// Montando toda a estrutura para escolher as cores conforme o padrão ja mapeado
const STATUS_COLORS = {
  yellow: "yellow-500",
  red: "red-500",
  green: "green-500",
  // As const e pra dizer que esses textos vão ser estáticos, não valores variáveis
} as const;

interface StatusProps {
  statusColor: "yellow" | "red" | "green";
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  // Aqui o ::before insere a bolinha que tem a cor do status
  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;
