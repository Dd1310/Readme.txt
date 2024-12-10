import React from 'react';
import ProductUpdate from '../components/ProductUpdate';
import { useParams } from 'react-router-dom';

const UpdateProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Update Product</h1>
      <ProductUpdate productId={id} />
    </div>
  );
};

export default UpdateProductPage;
