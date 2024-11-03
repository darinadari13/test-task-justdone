export enum ProductPeriod {
  Month = 'month',
  Year = 'year'
}

export type ProductCurrency = "$" | "€";

export interface Product {
  id: string;
  name: string;
  regularity: ProductPeriod;
  currency: ProductCurrency;
  trial_period?: number;
  full_trial_price?: number; 
  discounted_trial_price?: number;
  full_price?: number;
  discounted_price?: number;
  plan_ui_discount_text?: string; 
}