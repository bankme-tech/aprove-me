import { httpClient } from "../../httpClient";
import { AuthParams, AuthResponse } from "../interfaces";

export async function signin(params: AuthParams) {
  const { data } = await httpClient.post<AuthResponse>("/auth", params);

  return data;
}
