import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, selectProductById } from '../Product/productSlice';
import '../style/ProductForm.css'; // Ensure this path matches the actual file location

const ProductUpdate = ({ match }) => {
  const dispatch = useDispatch();
  const productId = parseInt(match.params.id);
  const product = useSelector((state) => selectProductById(state, productId));
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target;
    const newMaterials = updatedProduct.materials.map((material, i) => {
      if (i === index) {
        return {
          ...material,
          [name]: value,
        };
      }
      return material;
    });
    const totalCost = newMaterials.reduce((total, material) => total + material.qty * material.price, 0);
    setUpdatedProduct({
      ...updatedProduct,
      materials: newMaterials,
      totalCost: totalCost,
      tax: totalCost * 0.1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(updatedProduct));
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label>Name:</label>
      <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange} required />
      <label>Category:</label>
      <input type="text" name="category" value={updatedProduct.category} onChange={handleInputChange} required />
      {updatedProduct.materials.map((material, index) => (
        <div key={index}>
          <label>Material Name:</label>
          <input type="text" name="name" value={material.name} onChange={(e) => handleMaterialChange(index, e)} required />
          <label>Quantity:</label>
          <input type="number" name="qty" value={material.qty} onChange={(e) => handleMaterialChange(index, e)} required />
          <label>Price:</label>
          <input type="number" name="price" value={material.price} onChange={(e) => handleMaterialChange(index, e)} required />
        </div>
      ))}
      <p>Total Cost: {updatedProduct.totalCost}</p>
      <p>Tax: {updatedProduct.tax}</p>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ProductUpdate;
