import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilters() {
  return (
    <form action="" className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="Id Do Pedido" className="h-8 w-auto" />
      <Input placeholder="Nome Do Cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos estados</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo </SelectItem>
          <SelectItem value="delivering">Em entrega </SelectItem>
          <SelectItem value="delivered">Entregue </SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="sm">
        <Search className="mr-2 h-4 w-4" />
        Filtrar Resultados
      </Button>

      <Button type="button" variant="outline" size="sm">
        <X className="mr-2 h-4 w-4" />
        Remover Filtros
      </Button>
    </form>
  );
}
