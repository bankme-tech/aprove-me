export class ArrayUtils {
  static orderDate = (
    dateA: string | Date,
    dateB: string | Date,
    by?: "ASC" | "DESC"
  ): number =>
    by === "DESC"
      ? new Date(dateA).getTime() - new Date(dateB).getTime()
      : new Date(dateB).getTime() - new Date(dateA).getTime();

  static orderNumber = (
    a: string | number,
    b: string | number,
    by?: "ASC" | "DESC"
  ): number => (by === "DESC" ? Number(b) - Number(a) : Number(a) - Number(b));

  static orderString = (a: any, b: any, by?: "ASC" | "DESC"): number =>
    by === "DESC"
      ? String(b).localeCompare(String(a))
      : String(a).localeCompare(String(b));

  static removeDuplicatedValuesWithKey = (data: any[], key: string): any[] =>
    data?.length === 0 ? [] : [...new Set(data?.map((obj) => obj?.[key]))];

  static removeDuplicatedValues = (data: any[]): any[] =>
    data?.length === 0 ? [] : [...new Set(data?.map((obj) => obj))];
}
