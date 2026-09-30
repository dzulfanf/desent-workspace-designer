import { WorkspaceCurrency } from "@/types/workspace";

export type Currency = {
  code: WorkspaceCurrency;
  name: string;
  flag: string;
};

export const currencies: Currency[] = [
  {
    code: "IDR",
    name: "Indonesian Rupiah",
    flag: "id",
  },
  {
    code: "USD",
    name: "US Dollar",
    flag: "us",
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "eu",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    flag: "jp",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    flag: "cn",
  },
  {
    code: "THB",
    name: "Thai Baht",
    flag: "th",
  },
  {
    code: "VND",
    name: "Vietnamese Dong",
    flag: "vn",
  },
];