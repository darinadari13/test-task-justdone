import React, { useState } from 'react';

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <PricingLayout>
      <Box sx={STYLES.container}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleSelectProduct}
            isSelected={selectedProduct?.id === product.id}
            discountTime={null}
            isTimerFinished={true}
          />
        ))}
      </Box>
      <Box sx={STYLES.subscriptionContainer}>
        <GradientButton text={BUTTON_TEXT} product={selectedProduct}/>
        <SubscriptionText />
      </Box>
    </PricingLayout>
  );
}