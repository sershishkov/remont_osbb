import { Schema, model } from 'mongoose';

import { I_ProductGroup } from '../../interfaces/AccountingInterfaces';

const product_group__Schema = new Schema<I_ProductGroup>({
  productGroupName: {
    type: String,
    required: [true, 'Please add a product_group name'],
    unique: true,
  },
  //Трубы, канализация, сыпучие,металлопрокат,краска...
});

export default model('product_group', product_group__Schema);
