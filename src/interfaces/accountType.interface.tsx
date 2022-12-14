export interface IAccountType {
  id: string;
  name: string;
  order?: number;
  icon?: string;
  validateAmountAvailableTransfer: boolean;
  validateAmountAvailableDebit: boolean;
}
