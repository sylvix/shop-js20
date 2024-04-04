import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  title: string;
  price: number;
  id: string;
  image: string | null;
  category: string;
}

const ProductItem: React.FC<Props> = ({title, price, id, image, category}) => {
  const user = useAppSelector(selectUser);
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <strong>{price} KGS</strong>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton component={Link} to={'/products/' + id}>
                <ArrowForwardIcon/>
              </IconButton>
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <Button component={Link} to={`/products/${id}/edit`}>Edit</Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;