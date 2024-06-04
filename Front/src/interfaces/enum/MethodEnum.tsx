export type MethodEnumType =
  | "POST"
  | "PUT"
  | "GET"
  | "DELETE"
  | "CRON"
  | "SUBSCRIBER"
  | "INTERNAL"
  | "PRODUCER"
  | "CONSUMER";

const MethodValues: {
  [T in MethodEnumType]: string;
} = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
  CRON: "CRON",
  SUBSCRIBER: "SUBSCRIBER",
  INTERNAL: "INTERNAL",
  PRODUCER: "PRODUCER",
  CONSUMER: "CONSUMER"
};

export class MethodEnum {
  static getValues(): string[] {
    return Object.values(MethodValues);
  }
}
