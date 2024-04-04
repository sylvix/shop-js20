import {Product} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { createProduct, fetchOneProduct, fetchProducts } from './productsThunks';

interface ProductsState {
  items: Product[];
  current: Product | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  current: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.fetchLoading = false;
      state.items = products;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.createLoading = false;
    });
    builder.addCase(fetchOneProduct.pending, (state) => {
      state.fetchOneLoading = true;
    }).addCase(fetchOneProduct.fulfilled, (state, {payload: product}) => {
      state.fetchOneLoading = false;
      state.current = product;
    }).addCase(fetchOneProduct.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;
export const selectProductCreating = (state: RootState) => state.products.createLoading;
export const selectOneProduct = (state: RootState) => state.products.current;
export const selectOneProductFetching = (state: RootState) => state.products.fetchOneLoading;