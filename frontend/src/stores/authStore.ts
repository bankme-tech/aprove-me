import { LoginTypes } from "@/pages/login/components/loginSchema";
import { router } from "@/routes";
import { AuthService } from "@/services/auth";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthStoreTypes {
  login: (loginData: LoginTypes) => Promise<void>;
  signup: (signupData: LoginTypes) => Promise<void>;
}

export const useAuthStore = create<AuthStoreTypes>()(() => ({
  login: async (loginData) => {
    const { accessToken } = await AuthService.login(loginData);

    if (!accessToken) {
      toast.error("login ou senha inválidos");
      return;
    }

    localStorage.setItem("@auth", accessToken);
  },

  signup: async (signupData) => {
    try {
      await AuthService.signup(signupData);
      router.navigate("/home");
    } catch (error) {
      toast.error("usuário já registrado");
      console.error(error);
    }
  },
}));
