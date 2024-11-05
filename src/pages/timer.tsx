import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import PricingLayout from "src/components/layout/Layout";
import ProductCard from "src/components/product/ProductCard";
import GradientButton from 'src/components/button/GradientButton';
import productsData from 'src/data/products.json';
import type { Product } from 'src/types/Product';
import { DiscountTime, ScreenType } from 'src/types/common';
import useCountdown from 'src/hooks/useCountdown';
import SubscriptionText from 'src/components/subscription/Subscription';
import breakpoints from 'src/styles/breakpoints';
import useResponsive  from 'src/hooks/useResponsive';
import MobileTimer from 'src/components/timer/MobileTimer';


const BUTTON_TEXT = "Get Started";

const products: Product[] = productsData as Product[];

const DISCOUNT_TIME_WINDOW = {
  minutes: 20,
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

function getTimerEndTimestamp(): number | null {
  const endTimestamp = window.localStorage.getItem('timerEndTimestamp');

  return endTimestamp ? parseInt(endTimestamp) : null;
}

function setTimerEndTimestamp(timestamp: number): void {
  window.localStorage.setItem('timerEndTimestamp', timestamp.toString());
}

function convertMSToMinutesAndSeconds(milliseconds: number): DiscountTime {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    minutes,
    seconds
  };
}

export default function PlanPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isTimerFinished, setIsTimerFinished] = useState<boolean | null>(null);

  const screenType = useResponsive()
  const isMobile = screenType === ScreenType.Mobile;
  const isMobileTimerVisible = isMobile && !isTimerFinished;

  const { start, time } = useCountdown();

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    // Retriving timer end timestamp and current timestamp
    const endTimestamp = getTimerEndTimestamp();
    const currentTimestamp = Date.now();

    let timerTime = DISCOUNT_TIME_WINDOW

    if (endTimestamp) {
      // Calculating diff between timer end timestamp and current timestamp (milliseconds)
      const millisecondsLeft = endTimestamp - currentTimestamp

      if (millisecondsLeft > 0) {
        // In case there is time left -> start timer with time left
        timerTime = convertMSToMinutesAndSeconds(millisecondsLeft)
        setIsTimerFinished(false)
      } else {
        // Othervise do nothing, just set that timer is finished
        setIsTimerFinished(true)
      }
    } else {
      // Block to save end timer timestamp for future analisys
      const newEndTimestamp = currentTimestamp + DISCOUNT_TIME_WINDOW.minutes * 60 * 1000 + DISCOUNT_TIME_WINDOW.seconds * 1000;
      setTimerEndTimestamp(newEndTimestamp);
      setIsTimerFinished(false)
    }

    start(timerTime.minutes, timerTime.seconds);
  }, []);


  if (isTimerFinished === null) {
    console.warn('isTimerFinished is not initialized');
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
            onSelect={handleSelectProduct}
            isSelected={selectedProduct?.id === product.id}
            discountTime={isMobile ? null : time}
            isTimerFinished={isTimerFinished}
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