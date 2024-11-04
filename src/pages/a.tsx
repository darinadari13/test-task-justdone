import React, { useEffect, useState, useMemo } from 'react';

import PricingLayout from "src/components/layout/Layout";
import ProductCard from "src/components/product/ProductCard";
import GradientButton from 'src/components/button/GradientButton';
import productsData from '../data/products.json';
import { Product } from 'src/types/Product';
import useCountdown from 'src/hooks/useCountdown';
import { Box } from '@mui/material';
import SubscriptionText from 'src/components/subscription/Subscription';
import breakpoints from 'src/styles/breakpoints';
import useResponsive, { ScreenType } from 'src/hooks/useResponsive';
import MobileTimer from 'src/components/timer/MobileTimer';

const BUTTON_TEXT = "Get Started";

const products: Product[] = productsData as Product[];

const DISCOUNT_TIME_WINDOW = {
  minutes: 0,
  seconds: 2,
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

  const screenType = useResponsive()
  const isMobile = screenType === ScreenType.Mobile;
  const isMobileTimerVisible = isMobile && !isTimerFinished;

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
      {isMobileTimerVisible && <MobileTimer minutes={time.minutes} seconds={time.seconds} />}
      <Box sx={STYLES.container}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
            isSelected={selectedProduct === product.id}
            discountTime={isMobile ? null : time}
            isTimerFinished={isTimerFinished}
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