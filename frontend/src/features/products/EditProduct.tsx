import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneProduct, selectOneProductFetching } from './productsSlice';
import { useCallback, useEffect } from 'react';
import { fetchOneProduct, updateProduct } from './productsThunks';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import { ProductMutation } from '../../types';

const EditProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isFetching = useAppSelector(selectOneProductFetching);

  const doFetchOne = useCallback(async () => {
    try {
      await dispatch(fetchOneProduct(id)).unwrap();
    } catch (e) {
      navigate('/404');
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

  const onFormSubmit = async (productMutation: ProductMutation) => {
    dispatch(updateProduct({
      productId: id,
      productMutation,
    }));
  };

  let form = <CircularProgress/>;

  if (!isFetching && product) {
    const mutation = {
      ...product,
      category: product.category._id,
      price: product.price.toString(),
      image: null,
    };

    form = <ProductForm isEdit onSubmit={onFormSubmit} initialProduct={mutation} existingImage={product.image} />;
  }

  return (
    <Grid container direction="column" gap={2}>
      <Typography variant="h4">Edit product</Typography>
      {form}
    </Grid>
  );
};

export default EditProduct;