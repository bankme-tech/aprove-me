export type assignorBodyDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
};

export type assignorResponseDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
};

export type assignorListResponseDto = assignorResponseDto[];
export type assignorUniqueResponseType = {
  id: string | null;
  field: string | null;
};
