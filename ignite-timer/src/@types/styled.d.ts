import "styled-components";
import { defaultTheme } from "../styles/themes/default";

//Guardando os valores de defaultTheme dentro dessa variável ThemeType,
// usando a função typeof do TypeScript
type ThemeType = typeof defaultTheme;

//com esse ajuste o tema padrão que criamos - defaultTheme - passara a ser
//reconhecido como ThemeType então as propriedade vão ser exibidas nos momento em que ele for ser utilizado
declare module "styled-components" {
  export interface defaultTheme extends ThemeType {}
}
