export interface Product {
  id: string;
  name: string;
  regularity: "month" | "year";
  price: number; 
  currency: "USD";
  trial_period: number;
  trial_amount: number; 
}