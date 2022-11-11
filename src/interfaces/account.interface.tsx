export interface IAccount {
  id: string;
  name: string;
  type: string;
  currency: string;
  currentBalance: number;
  color: string;
  creditCardLimit?: number;
  cutOffDate?: number;
  paymentDate?: number;
}
