import React, { useEffect, useState, useMemo } from 'react';

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

//todo:
// 1.Add start timer time in ls 
// 2.Add pause timer time in ls

function getTimerEndTimestamp(): number | null {
  const endTimestamp = window.localStorage.getItem('timerEndTimestamp');

  return endTimestamp ? parseInt(endTimestamp) : null;
}

function setTimerEndTimestamp(timestamp: number): void {
  window.localStorage.setItem('timerEndTimestamp', timestamp.toString());
}

function checkIsTimerFinished(): boolean {
  const timerEndTimestamp = getTimerEndTimestamp();
  const currentTimestamp = Date.now();

  return Boolean(timerEndTimestamp && timerEndTimestamp < currentTimestamp);
}

export default function PlanPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isTimerFinished, setIsTimerFinished] = useState<boolean | null>(null);

  const { start, time } = useCountdown(DISCOUNT_TIME_WINDOW.minutes, DISCOUNT_TIME_WINDOW.seconds);

  useEffect(() => {
    const isTimerFinished = checkIsTimerFinished()

    setIsTimerFinished(isTimerFinished)

    if (!isTimerFinished) {
      start()

      const endTimestamp = Date.now() + DISCOUNT_TIME_WINDOW.minutes * 60 * 1000 + DISCOUNT_TIME_WINDOW.seconds * 1000
      setTimerEndTimestamp(endTimestamp)
    }
  }, []);

  if (isTimerFinished === null) {
    return null
  }

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
            isTimerFinished={isTimerFinished}
          />
        ))}
      </Box>
    </PricingLayout>
  );
}