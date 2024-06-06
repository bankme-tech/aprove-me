export type MethodEnumType = "POST" | "PUT" | "GET" | "DELETE";

const MethodValues: {
  [T in MethodEnumType]: string;
} = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE"
};

export class MethodEnum {
  static getValues(): string[] {
    return Object.values(MethodValues);
  }
}
