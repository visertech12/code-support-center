
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Transaction } from "@/types/transaction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPhone = (phone: string): boolean => {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(phone);
};

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8;
};

// Mock data for packages
export const mockPackages = [
  {
    id: '1',
    name: 'TSLA',
    description: 'Tesla Stock',
    price: 50,
    daily_profit_percentage: 10,
    duration_days: 15,
    total_return_percentage: 150,
    image_url: 'https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7f1bc64751707769627.png',
    status: 'active'
  },
  {
    id: '2',
    name: 'NVIDIA',
    description: 'NVIDIA Stock',
    price: 100,
    daily_profit_percentage: 10,
    duration_days: 15,
    total_return_percentage: 150,
    image_url: 'https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7f71caba51707769713.png',
    status: 'active'
  },
  {
    id: '3',
    name: 'META',
    description: 'Meta Stock',
    price: 200,
    daily_profit_percentage: 10,
    duration_days: 15,
    total_return_percentage: 150,
    image_url: 'https://mystock-admin.scriptbasket.com/assets/images/plan/65ca7fc9efb401707769801.png',
    status: 'active'
  },
  {
    id: '4',
    name: 'AMD',
    description: 'AMD Stock',
    price: 300,
    daily_profit_percentage: 10,
    duration_days: 15,
    total_return_percentage: 150,
    image_url: 'https://mystock-admin.scriptbasket.com/assets/images/plan/65ca80235fb711707769891.jpg',
    status: 'active'
  },
  {
    id: '5',
    name: 'AMZN',
    description: 'Amazon Stock',
    price: 400,
    daily_profit_percentage: 10,
    duration_days: 15,
    total_return_percentage: 150,
    image_url: 'https://mystock-admin.scriptbasket.com/assets/images/plan/65ca81545efd51707770196.jpg',
    status: 'active'
  }
];

// Mock data for user packages
export const mockUserPackages = [
  {
    id: '1',
    package: mockPackages[0],
    purchase_amount: 50,
    status: 'active',
    start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    end_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    package: mockPackages[2],
    purchase_amount: 200,
    status: 'active',
    start_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    end_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days from now
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock data for transactions - updated to match Transaction type
export const mockTransactions: Partial<Transaction>[] = [
  {
    id: '1',
    user_id: 'user1',
    type: 'deposit',
    amount: 500,
    status: 'completed',
    description: 'Deposit to account',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    user_id: 'user1',
    type: 'withdrawal',
    amount: 200,
    status: 'completed',
    description: 'Investment in META stock',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    user_id: 'user1',
    type: 'deposit',
    amount: 20,
    status: 'completed',
    description: 'Daily profit from META stock',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];
