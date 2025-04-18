
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
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
