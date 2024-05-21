import { api } from "@/lib/api";
import { FindAllPayables, FindAllResponse } from "@/types/payables";

export class payableService {
  static async getAll(findAllData: FindAllPayables): Promise<FindAllResponse> {
    try {
      const { data } = await api.get<FindAllResponse>(
        `/integrations/payable?skip=${findAllData.skip}&take=${findAllData.take}`,
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return { payables: [], totalPages: 0, totalPayables: 0 };
    }
  }
}
