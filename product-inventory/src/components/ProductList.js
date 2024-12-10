import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Product/productSlice';
import '../style/ProductForm.css'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  let content;

  if (productStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (productStatus === 'succeeded') {
    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td><Link to={`/update/${product.id}`}>{product.name}</Link></td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (productStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {content}
    </div>
  );
};

export default ProductList;
