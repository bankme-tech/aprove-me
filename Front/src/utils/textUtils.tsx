import { IError } from "interfaces/interfaces/Error/IError";
import { NotificationType } from "interfaces/interfaces/Global/NotificationType";
import { DateUtils } from "./dateUtils";

export class TextUtils {
  static formatDate = (date: string): string => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  static formatAllTypes = (data?: any): any => {
    const dateFormatRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const isoStringRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    const isDateGMT = data?.toString()?.includes("GMT");
    const isDateRegex = dateFormatRegex.test(data?.toString() ?? "");
    const isISOStringRegex = isoStringRegex.test(data?.toString() ?? "");
    const isBool =
      data?.toString()?.includes("true") || data?.toString()?.includes("false");

    if (isDateGMT) {
      return DateUtils.formatDate(data);
    } else if (isDateRegex) {
      const [, year, month, day] = dateFormatRegex.exec(data?.toString()) || [];
      return day && month && year ? `${day}/${month}/${year}` : "Data inválida";
    } else if (isISOStringRegex) {
      return data?.toString().split("T")[0].replaceAll("-", "/");
    } else if (isBool) {
      return data?.toString()?.includes("true") ? "Sim" : "Não";
    } else {
      return data;
    }
  };

  static splitQuerySearch = (querySearch: string): string[] =>
    querySearch.split(/[ -/:=|{}()@]/g);

  static generateRandomKey = (): string =>
    Math.random().toString(36).substring(7);

  static mergeRegex = (...regexes: RegExp[]): RegExp => {
    const mergedRegexSource = regexes
      .map((regex) => `(?:${regex.source})`)
      .join("|");
    return new RegExp(`^(?:${mergedRegexSource})`);
  };

  static transformEmptyStringInUndefined = (
    text: string
  ): undefined | string => {
    if (text) {
      const hasOnlyEmptySpaces = /^\s*$/.test(text);
      return hasOnlyEmptySpaces ? undefined : text;
    } else {
      return undefined;
    }
  };

  static getCustomError = (
    error: IError
  ): { message: string; type: NotificationType }[] | undefined => {
    const statusCode = error.response.data.statusCode;
    const message = error.response.data.message;

    const isCustomError = statusCode.toString().startsWith("4");

    if (isCustomError && statusCode === 412) {
      const messages = message as string[];
      return messages?.map((message) => ({ message, type: "warn" }));
    } else if (isCustomError) {
      return [{ message: message as string, type: "error" }];
    } else {
      return undefined;
    }
  };
}
