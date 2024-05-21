import { api } from "@/lib/api";
import { router } from "@/routes";
import { AuthService } from "@/services/auth";
import { LoginTypes } from "@/types/login";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthStoreTypes {
  userToken: string;
  login: (loginData: LoginTypes) => Promise<void>;
  signup: (signupData: LoginTypes) => Promise<void>;
  signout: () => void;
  checkUser: () => void;
}

export interface AuthTokenTypes {
  accessToken: string;
  dateTime: Date;
}

export const useAuthStore = create<AuthStoreTypes>()((set) => ({
  userToken: "",
  login: async (loginData) => {
    const { accessToken } = await AuthService.login(loginData);

    if (!accessToken) {
      toast.error("login ou senha inválidos");
      return;
    }

    const authToken = {
      accessToken,
      dateTime: new Date(),
    } satisfies AuthTokenTypes;

    set({ userToken: accessToken });
    localStorage.setItem("@auth", JSON.stringify(authToken));
    router.navigate("/payables");
    api.defaults.headers.authorization = `Bearer ${accessToken}`;
  },

  signup: async (signupData) => {
    try {
      await AuthService.signup(signupData);
      router.navigate("/");
      toast.success("Cadastrado com sucesso! Agora necessário fazer o login.");
    } catch (error) {
      toast.error("usuário já registrado");
      console.error(error);
    }
  },

  signout: () => {
    set({ userToken: "" });
    localStorage.removeItem("@auth");
  },

  checkUser: () => {
    const token = localStorage.getItem("@auth");

    if (!token) {
      router.navigate("/");
      return;
    }

    const parsedToken: AuthTokenTypes = JSON.parse(token);

    // const minutesToken = new Date().getMinutes();
    // const minutesNow = new Date(parsedToken.dateTime).getMinutes();
    //
    // const diffTime = minutesNow - minutesToken;
    //
    // if (diffTime !== 0) {
    //   localStorage.removeItem("@auth");
    //   toast.info("Seu login expirou, necessário realizá-lo novamente");
    //   return router.navigate("/");
    // }

    set({ userToken: parsedToken.accessToken });
    api.defaults.headers.authorization = `Bearer ${parsedToken.accessToken}`;
  },
}));
