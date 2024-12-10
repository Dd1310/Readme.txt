import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('/path-to-your-products.json');
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',  // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    updateProduct: (state, action) => {
      const { id, name, category, description, price } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.category = category;
        existingProduct.description = description;
        existingProduct.price = price;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { updateProduct } = productSlice.actions;

export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);

export default productSlice.reducer;
