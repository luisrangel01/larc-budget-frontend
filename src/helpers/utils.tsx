import jwt_decode from "jwt-decode";

import { IAccountType } from "../interfaces/accountType.interface";
import { ICurrency } from "../interfaces/currency.interface";

export const getCurrency = (currencyId: string, currencies: ICurrency[]) => {
  return currencies.find((currency) => currency.code === currencyId);
};

export const getType = (typeId: string, types: IAccountType[]) => {
  return types.find((type) => type.id === typeId);
};

export const getAmount = (currency: string, amount: number) => {
  return Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const tokenIsExpired = () => {
  let isExpired = false;
  const token = localStorage.getItem("access_token");
  const decodedToken: any = jwt_decode(token || "");
  let dateNow = new Date();

  if (decodedToken.exp * 1000 < dateNow.getTime()) {
    isExpired = true;
  }

  return isExpired;
};
