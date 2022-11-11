export interface ICurrency {
  id: number;
  code: string;
  decimals?: number | null;
  name: string;
  flagUrl?: string;
}
