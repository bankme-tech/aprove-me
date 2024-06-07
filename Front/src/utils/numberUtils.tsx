export class NumberUtils {
  static isMultiple = (value: number, divisor: number): boolean =>
    value % divisor === 0;

  static createArithmeticOrderedList = (quantityNumbers: number): number[] => {
    return Array.from({ length: quantityNumbers }, (_, index) => index + 1);
  };

  static formatMoney = (value: string): string => {
    const filteredValue = value?.replace(/[^0-9.]/g, "");
    const hasDecimalPoint = filteredValue.includes(".");
    if (hasDecimalPoint) {
      const [money, cents] = filteredValue.split(".");
      if (cents.length > 2) {
        return `${money}.${cents.slice(0, 2)}`;
      }
      return `${money}.${cents}`;
    } else {
      return filteredValue;
    }
  };
}
