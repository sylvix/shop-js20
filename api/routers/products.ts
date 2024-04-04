import { Router } from 'express';
import mongoose, { Types } from 'mongoose';
import { ProductMutation } from '../types';
import { imagesUpload } from '../multer';
import Product from '../models/Product';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const productsRouter = Router();

productsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Product.find().populate(
      'category',
      'title description',
    );

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const product = await Product.findById(_id).populate('category');

    if (!product) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

productsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const productData: ProductMutation = {
        category: req.body.category,
        title: req.body.title,
        price: parseFloat(req.body.price),
        description: req.body.description,
        image: req.file ? req.file.filename : null,
      };

      const product = new Product(productData);
      await product.save();

      res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

productsRouter.patch(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      let image: string | undefined | null = undefined;

      if (req.body.image === 'delete') {
        image = null;
      } else if (req.file) {
        image = req.file.filename;
      }

      const result = await Product.updateOne(
        { _id: req.params.id },
        {
          $set: {
            category: req.body.category,
            title: req.body.title,
            price: parseFloat(req.body.price),
            description: req.body.description,
            image,
          },
        },
      );

      if (result.matchedCount === 0) {
        return res.status(404).send({ message: 'Not found!' });
      }

      return res.send({ message: 'ok' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

export default productsRouter;
