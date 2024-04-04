import { Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ProductMutation } from '../../types';
import { createProduct } from './productsThunks';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (productMutation: ProductMutation) => {
    try {
      await dispatch(createProduct(productMutation)).unwrap();
      navigate('/');
    } catch {
      //
    }
  };

  return (
    <>
      <Typography variant="h4">New product</Typography>
      <ProductForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewProduct;
