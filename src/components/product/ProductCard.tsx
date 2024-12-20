import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip} from '@mui/material';

import ProductCardTimer from './ProductCardTimer';
import BestValueChip from './BestValueChip';
import breakpoints from 'src/styles/breakpoints';
import type { Product } from 'src/types/Product';
import type { DiscountTime } from 'src/types/common';
import { getFormattedSubscriptionPrice, getSubscriptionPeriodText } from 'src/utils';
import CheckedIcon from 'src/assets/checked-icon.svg';
import UnCheckedIcon from 'src/assets/unchecked-icon.svg';


interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected: boolean;
  discountTime: DiscountTime | null;
  isTimerFinished?: boolean;
}

const STYLES = {
  cardBaseStyles: {
    borderRadius: '16px',
    cursor: 'pointer',
    borderWidth: '4px',
    overflow: 'visible',
    position: 'relative',
    width: '363px',
    [breakpoints.mobile]: {
      width: '100%',
      maxWidth: '100%',
    }
  },
  cardContentStyles: {
    padding: '12px 16px', 
    textAlign: 'center',
    "&:last-child": {
      paddingBottom: '12px',
    }
  },
  planName: {
    fontSize: "17px",
    fontWeight: "bold",
    margin: '0 8px 0 12px',
  },
  priceText: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "700",
    letterSpacing: "0.1px",
    color: 'var(--blue-main-color)',
  },
  periodText: {
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
    color: 'var(--text-accent-color)',
  },
  absoluteChip: {
    position: 'absolute',
    top: 0,
    left: '40px',
    transform: 'translate(0, -50%)',
    zIndex: 1,
    '& .MuiChip-filled': {
      backgroundColor: 'var(--green-main-color)',
      height: '28px',
      padding: '4px 9px',
    },
    '& .MuiChip-label': {
      padding: 0,
      fontWeight: 600,
    },
  },
  timerWrapper: {
    height: '56px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    overflow: 'hidden'
  },
}

const ZERO_WIDTH_SPACE = '\u200B';
const SAVE_50_TITLE = 'Save 50%'

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isSelected, discountTime, isTimerFinished }) => {
  const {  name, plan_ui_discount_text, discounted_trial_price } = product;

  const cardStyles = useMemo(() => ({
    borderColor: isSelected ? 'var(--green-main-color)' : 'var(--border-default-color)',
    ...STYLES.cardBaseStyles
  }), [isSelected])

  const handleCardClick = () => {
    onSelect(product);
  }

  const isShowDiscountedTrialPrice = discounted_trial_price && isTimerFinished
  const isShowBestValueChip = plan_ui_discount_text === SAVE_50_TITLE

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      sx={cardStyles}
    >
      {
        plan_ui_discount_text && !isShowDiscountedTrialPrice && 
          <Box sx={STYLES.absoluteChip}>
            <Chip label={plan_ui_discount_text} color="success" />
          </Box>
      }
      {
        isShowBestValueChip && 
        <BestValueChip/>
      }
      {
        !isTimerFinished && discountTime &&
          <ProductCardTimer minutes={discountTime.minutes} seconds={discountTime.seconds} />
      }

      <CardContent sx={STYLES.cardContentStyles}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row"  alignItems="flex-start">
            <Box>
              {isSelected ? <CheckedIcon /> : <UnCheckedIcon />}
            </Box>
            <Typography sx={STYLES.planName}>
              {name}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="flex-end">
            <Typography sx={STYLES.periodText}>
              <span className='strikethroughText'>
                {!isShowDiscountedTrialPrice ? getFormattedSubscriptionPrice(product, false) : ZERO_WIDTH_SPACE}
              </span>
            </Typography>
            <Typography variant="h4" sx={STYLES.priceText}>
              {getFormattedSubscriptionPrice(product, true)}
            </Typography>
            <Typography sx={STYLES.periodText}>
              {getSubscriptionPeriodText(product)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
