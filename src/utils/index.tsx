import { Product } from "src/types/Product";

export const formatPrice = (amount: number) => (amount / 100).toFixed(2);

export const getSubscriptionPrice = (product: Product, isDiscounted: boolean): number => {
  const isTrial = !!product.trial_period;

  if (isTrial) {
    return (isDiscounted ? product.discounted_trial_price : product.full_trial_price) || 0;
  }
  
  return (isDiscounted ? product.discounted_price : product.full_price) || 0;
}

export const getFormattedSubscriptionPrice = (product: Product, isDiscounted: boolean) => {
  const price = getSubscriptionPrice(product, isDiscounted);

  return `${product.currency}${formatPrice(price)}`;
}

const getFormattedFullSubscriptionPrice = (product: Product) => {
  return `${product.currency}${formatPrice(product.full_price || 0)}`;
}

export const getSubscriptionPeriodText = (product: Product) => {
  const { regularity, trial_period } = product;

  const isTrial = !!trial_period;

  return isTrial
    ? `Then ${getFormattedFullSubscriptionPrice(product)} per ${regularity}`
    : `Per ${regularity}`;
}

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}