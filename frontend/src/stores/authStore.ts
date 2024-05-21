import { LoginTypes } from "@/pages/login/components/loginSchema";
import { router } from "@/routes";
import { AuthService } from "@/services/auth";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthStoreTypes {
  userToken: string;
  login: (loginData: LoginTypes) => Promise<void>;
  signup: (signupData: LoginTypes) => Promise<void>;
  signout: () => void;
  checkUser: () => void;
}

interface AuthTokenTypes {
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
  },

  signup: async (signupData) => {
    try {
      await AuthService.signup(signupData);
      router.navigate("/");
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

    const now = new Date();
    const tokenTime = new Date(parsedToken.dateTime);

    const minutesNow = now.getMinutes();
    const minutesToken = tokenTime.getMinutes();

    const diffTime = minutesNow - minutesToken;

    if (diffTime !== 0) {
      localStorage.removeItem("@auth");
      toast.info("Seu login expirou, necessário realizá-lo novamente");
      return router.navigate("/");
    }

    set({ userToken: parsedToken.accessToken });
  },
}));
