import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductMutation, UpdateProductArg } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const productsResponse = await axiosApi.get<Product[]>('/products');
    return productsResponse.data;
  }
);

export const fetchOneProduct = createAsyncThunk<Product, string>(
  'products/fetchOne',
  async (id) => {
    const productResponse = await axiosApi.get<Product>(`/products/${id}`);
    return productResponse.data;
  }
);

export const createProduct = createAsyncThunk<null, ProductMutation>(
  'products/create',
  async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach(key => {
      const value = productMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/products', formData);
  }
);

export const updateProduct = createAsyncThunk<void, UpdateProductArg>(
  'products/update',
  async ({productId, productMutation}) => {
    const formData = new FormData();
    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach(key => {
      const value = productMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.patch(`/products/${productId}`, formData);
  }
);
