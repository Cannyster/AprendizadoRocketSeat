import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  // usado para redicrecionamento de usuário atraves do clique de um submit algo do tipo
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestauranteFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  // função criada apenas para fazer o sistema aguardar 2 seungdo após executar o HandleSubmit
  //e mostrar os avisos toast de erro e sucesso
  async function handleSignUp(data: SignUpForm) {
    try {
      await registerRestauranteFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      });

      toast.success("Restaurante cadastrado com sucesso", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Erro ao cadastrar restaurante");
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex min-h-screen justify-center justify-items-center p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer Login </Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar Conta Grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas !
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do Estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")}></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register("phone")}></Input>
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar Cadastro
            </Button>

            <p>
              Ao continuar, você concorda com nossos <br />
              <a className="underline underline-offset-4" href="">
                termos de serviço{" "}
              </a>{" "}
              e{" "}
              <a className="underline underline-offset-4" href="">
                politicas de privacidade
              </a>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
