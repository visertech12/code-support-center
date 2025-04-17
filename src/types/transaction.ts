
export type TransactionType = 'deposit' | 'withdrawal' | 'referral' | 'bonus' | 'withdrawal_refund';

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: TransactionType;
  status: string;
  description?: string;
  reference_id?: string;
  created_at: string;
  updated_at: string;
}
