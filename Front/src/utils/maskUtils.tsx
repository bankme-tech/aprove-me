import { DateUtils } from "./dateUtils";

export class MaskUtils {
  static moneyMask = (value: number): string =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);

  static cpfMask = (cpf: string): string =>
    cpf
      .replace(/[^\d]/g, "")
      .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
      .substring(0, 14);

  static cnpjMask = (cnpj: string): string =>
    cnpj
      .replace(/[^\d]/g, "")
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
      .substring(0, 18);

  static cellphoneMask = (cellphone: string): string => {
    const cleanedPhoneNumber = cellphone.replace(/[^\d]/g, "");
    const matches = cellphone.match(/\d/g);
    const quantityOfDigits = matches ? matches.length : 0;

    if (
      quantityOfDigits === 13 &&
      (cleanedPhoneNumber.startsWith("55") ||
        cleanedPhoneNumber.startsWith("+55"))
    ) {
      return cleanedPhoneNumber
        .replace("+55", "")
        .replace("55", "")
        .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        .substring(0, 18);
    } else if (quantityOfDigits === 11 && cleanedPhoneNumber[2] === "9") {
      return cleanedPhoneNumber
        .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
        .substring(0, 18);
    } else if (quantityOfDigits === 12 && cleanedPhoneNumber.startsWith("+")) {
      return cleanedPhoneNumber.replace(/^(\+\d{1,})$/, "+$1").substring(0, 19);
    } else {
      return cleanedPhoneNumber;
    }
  };

  static onlyNumbersMask = (word: string): string => word.replace(/[^\d]/g, "");
}
