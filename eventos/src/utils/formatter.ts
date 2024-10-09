export const formatarData = new Intl.DateTimeFormat("pt-BR");

export const formatarHora = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit"
});

export const valueFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const validarHora = (value: string) => {
  const [hours, minutes] = value.split(":");
  const isValidHour = parseInt(hours) >= 0 && parseInt(hours) < 24;
  const isValidMinute = parseInt(minutes) >= 0 && parseInt(minutes) < 60;
  
  return isValidHour && isValidMinute || "Hora inválida!";
};

export function converterHora(horaString: string) {
  const [hora, minuto] = horaString.split(':').map(Number);
  const dataAtual = new Date(); 
  dataAtual.setHours(hora, minuto, 0, 0); 
  return dataAtual;
}

export function converterData(dataString: string){
  const[dia, mes, ano] = dataString.split('/');
  const dataInvertida = `${ano}-${mes}-${dia}`;
  return dataInvertida
}