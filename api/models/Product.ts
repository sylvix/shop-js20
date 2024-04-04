import { Schema, model, Types } from 'mongoose';
import Category from './Category';

const ProductSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const category = await Category.findById(value);
          return Boolean(category);
        },
        message: 'Category does not exist!',
      },
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    image: String,
  },
  { timestamps: true },
);

const Product = model('Product', ProductSchema);

export default Product;
