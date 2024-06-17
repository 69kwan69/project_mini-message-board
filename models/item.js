import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    added: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', schema);

export default Item;
