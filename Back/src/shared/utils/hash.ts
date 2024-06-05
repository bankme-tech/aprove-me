import * as bcrypt from "bcrypt";

export class HashUtils {
    public static hash = async (value: string): Promise<string> => await bcrypt.hash(value, 10);

    public static compare = async (value: string, comparedValue: string): Promise<boolean> =>
        await bcrypt.compare(value, comparedValue);
}
