export interface IAccountTransaction {
  id?: string;
  accountId: string;
  type: string;
  currency: string;
  amount: number;
  note: string;
  currentBalance?: number;
}

export interface IAccountTransactionProcess {
  accountId: string;
  type?: string;
  destinationAccountId?: string;
  currency: string;
  amount: number | null;
  note: string;
}
