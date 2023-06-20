import { Schema, model } from 'mongoose';

import { I_Unit } from '../../interfaces/AccountingInterfaces';

const unit__Schema = new Schema<I_Unit>({
  unitName: {
    type: String,
    required: [true, 'Please add a unit name'],
    unique: true,
  },
});

export default model('unit', unit__Schema);
