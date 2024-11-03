import React, { useState } from 'react';


import PricingLayout from "src/components/layout/Layout";
import ProductCard from "src/components/product/ProductCard";
import { Product } from '../types/product';
import productsData from '../data/products.json';

const products: Product[] = productsData as Product[];

export default function PlanPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  return (
    <PricingLayout>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelectedProduct}
            isSelected={selectedProduct === product.id}
          />
        ))}
      </div>
    </PricingLayout>
  );
}