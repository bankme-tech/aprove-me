const messages = {
  Unauthorized: "Seu login expirou, por favor faća login novamente",
  "assignor already exists": "Cedente já cadastrado",
  phone: "Número inválido",
  document: "Documento inválido",
};
export function AssignorMessagesError(message: keyof typeof messages) {
  return (
    messages[message] ??
    "Algo inesperado aconteceu, por favor tente novamente mais tarde"
  );
}
