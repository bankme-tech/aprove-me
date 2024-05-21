import { LoginTypes } from "@/pages/login/components/loginSchema";
import { AuthService } from "@/services/auth";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthStoreTypes {
  login: (loginData: LoginTypes) => Promise<void>;
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
}));
