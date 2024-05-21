import { api } from "@/lib/api";
import {
  FindAllPayables,
  FindAllResponse,
  Payable,
  PlayableTypes,
} from "@/types/payables";

export class payableService {
  static async create(createPayableData: PlayableTypes): Promise<Payable> {
    const { data } = await api.post<Payable>(
      "/integrations/payable",
      createPayableData,
    );

    return data;
  }

  static async getAll(findAllData: FindAllPayables): Promise<FindAllResponse> {
    try {
      const { data } = await api.get<FindAllResponse>(
        `/integrations/payable?skip=${findAllData.skip}&take=${findAllData.take}`,
      );

      return data;
    } catch (error) {
      console.error(error);
      return { payables: [], totalPages: 0, totalPayables: 0 };
    }
  }
}
