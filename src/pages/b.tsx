import React, { useEffect, useState, useMemo } from 'react';

import PricingLayout from "src/components/layout/Layout";
import ProductCard from "src/components/product/ProductCard";
import GradientButton from 'src/components/button/GradientButton';
import productsData from '../data/products.json';
import { Product } from 'src/types/Product';
import { Box } from '@mui/material';
import SubscriptionText from 'src/components/subscription/Subscription';
import breakpoints from 'src/styles/breakpoints';

const BUTTON_TEXT = "Get Started";

const products: Product[] = productsData as Product[];

const DISCOUNT_TIME_WINDOW = {
  minutes: 0,
  seconds: 0,
}

const STYLES = {
  container: {
    display: 'flex',
    justifyContent: 'center', 
    gap: '20px', 
    flexWrap: 'wrap',
    marginBottom: '42px',
    flexDirection: 'row',
    [breakpoints.mobile]: {
      flexDirection: 'column-reverse',
      width: '100%',
      maxWidth: '100%',
    }
  },
  subscriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    gap: '24px', 
  }
}


export default function PlanPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <PricingLayout>
      <Box sx={STYLES.container}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
            isSelected={selectedProduct === product.id}
            discountTime={null}
          />
        ))}
      </Box>
      <Box sx={STYLES.subscriptionContainer}>
        <GradientButton text={BUTTON_TEXT} />
        <SubscriptionText />
      </Box>
    </PricingLayout>
  );
}