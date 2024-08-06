import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  // extendendo, essas interfaces carregam todos os atributos possiveis para cada elemento aqui no caso: o que ja existe por padrão no elemento Img.
  hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  // ao utilizar o spread operador ...props ele já deixa todas as demais propriedades disponíveis para serem utilizadas.
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      {...props}
      //retornando uma imagem com todas as propriedades disponiveis, mais a propriedade persanilizada hasBorder.
    />
  );
}
