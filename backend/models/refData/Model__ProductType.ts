import { Schema, model } from 'mongoose';

import { I_ProductType } from '../../interfaces/AccountingInterfaces';

const product_type__Schema = new Schema<I_ProductType>({
  productTypeName: {
    type: String,
    required: [true, 'Please add a product_type name'],
    unique: true,
  },
  //стройматериалы,инвентарь,инструмент, оборудование
});

export default model('product_type', product_type__Schema);
