// src/components/product/ProductCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Badge } from '@mui/material';

import { Product } from 'src/types/Product';
import Timer from '../timer';


interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, isSelected }) => {
  const { id, name, price, regularity } = product;

  const formatPrice = (amount: number) => (amount / 100).toFixed(2);

  return (
    <Card
      onClick={() => onSelect(id)}
      variant="outlined"
      sx={{
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        borderRadius: '12px',
        cursor: 'pointer',
        width: 250,
      }}
    >

      <Timer timeRemaining="24:30" />

      <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
          ${formatPrice(price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Per {regularity}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
