// src/components/product/ProductCard.tsx
import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, Stack, Chip} from '@mui/material';

import { Product } from 'src/types/Product';
import { getFormattedSubscriptionPrice, getSubscriptionPeriodText } from 'src/utils';
import CheckedIcon from '../../assets/checked-icon.svg';
import UnCheckedIcon from '../../assets/unchecked-icon.svg';
import { DiscoundTime } from 'src/types/common';
import ProductCardTimer from './ProductCardTimer';



interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
  isSelected: boolean;
  discountTime?: DiscoundTime;
  isDiscounted: boolean;
}

const zeroWidthSpace = '\u200B'

const STYLES = {
  cardBaseStyles: {
    borderRadius: '16px',
    cursor: 'pointer',
    width: 363,
    borderWidth: '4px',
    overflow: 'visible',
    position: 'relative',
  },
  cardContentStyles: {
    padding: '16px', 
    textAlign: 'center' 
  },
  planName: {
    fontSize: "17px",
    fontWeight: "bold"
  },
  priceText: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "700",
    letterSpacing: "0.1px",
  },
  periodText: {
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
  },
  prevPriceText: {
    fontSize: "12px",
    lineHeight: "20px",
    letterSpacing: "0.1px",
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
  }
}
const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isSelected, isDiscounted, discountTime }) => {
  const { id, name, plan_ui_discount_text } = product;

  const cardStyles = useMemo(() => ({
    borderColor: isSelected ? 'var(--green-main-color)' : 'var(--border-default-color)',
    ...STYLES.cardBaseStyles
  }), [isSelected])

  const handleCardClick = () => {
    onSelect(id)
  }

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      sx={cardStyles}
    >
      {
        plan_ui_discount_text &&
          <Box sx={STYLES.absoluteChip}>
            <Chip label={plan_ui_discount_text} color="success" />
          </Box>
      }
      {
        discountTime &&
          <ProductCardTimer minutes={discountTime.minutes} seconds={discountTime.seconds} />
      }

      <CardContent sx={STYLES.cardContentStyles}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Box>
              {isSelected ? <CheckedIcon /> : <UnCheckedIcon />}
            </Box>
            <Typography variant="h6" component="div" sx={STYLES.planName}>
              {name}
            </Typography>
          </Stack>
          <Stack direction="column" alignItems="flex-end">
            <Typography variant="body2" color="text.secondary" sx={STYLES.prevPriceText}>
              <span className='strikethroughText'>
                {isDiscounted ? getFormattedSubscriptionPrice(product, false) : zeroWidthSpace}
              </span>
            </Typography>
            <Typography variant="h4" color="primary" sx={STYLES.priceText}>
              {getFormattedSubscriptionPrice(product, isDiscounted)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={STYLES.periodText}>
              {getSubscriptionPeriodText(product)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
