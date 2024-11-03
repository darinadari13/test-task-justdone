import React, { useEffect, useState } from 'react';

import PricingLayout from "src/components/layout/Layout";
import ProductCard from "src/components/product/ProductCard";
import productsData from '../data/products.json';
import { Product } from 'src/types/Product';
import useCountdown from 'src/hooks/useCountdown';
import { Box } from '@mui/material';

const products: Product[] = productsData as Product[];

const DISCOUNT_TIME_WINDOW = {
  minutes: 0,
  seconds: 2,
}

export default function PlanPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { start, time } = useCountdown(DISCOUNT_TIME_WINDOW.minutes, DISCOUNT_TIME_WINDOW.seconds);

  const isDiscounted = time.minutes || time.seconds;

  useEffect(() => {
    start()
  }, []);

  return (
    <PricingLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
            isSelected={selectedProduct === product.id}
            discountTime={time}
            isDiscounted={isDiscounted}
          />
        ))}
      </Box>
    </PricingLayout>
  );
}