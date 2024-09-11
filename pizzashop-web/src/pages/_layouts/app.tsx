import { Outlet, replace, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";

export function AppLayout() {
  const navigate = useNavigate();

  //listener que vai acompanhar todas requisições realizadas
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      //quando a requisição der algum erro vai lançar uma ação
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          // se o erro bater com esses criterior, a pessoa será redicionada para sign-in
          if (status === 401 && code === "UNAUTHORIZED") {
            navigate("/sign-in", { replace: true });
          } else {
            throw error;
          }
        }
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
