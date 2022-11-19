export interface IAccountTransaction {
  id?: string;
  accountId: string;
  type: string;
  currency: string;
  amount: number;
  note: string;
}
