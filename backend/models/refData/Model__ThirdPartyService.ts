import { Schema, model } from 'mongoose';

import { I_ThirdPartyService } from '../../interfaces/AccountingInterfaces';

const thirdPartyService__Schema = new Schema<I_ThirdPartyService>({
  thirdPartyServiceName: {
    type: String,
    required: [true, 'Please add a thirdPartyService name'],
    unique: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: 'unit',
    required: [true, 'Please add a unit id'],
  },
  thirdPartyServiceGroup: {
    type: [Schema.Types.ObjectId],
    ref: 'thirdPartyServiceGroup',
    required: [true, 'Please add a thirdPartyServiceGroup id'],
  },
  priceBuyRecommend: {
    type: Number,
    required: [true, 'Please add a service price'],
  },
});

export default model('thirdPartyService', thirdPartyService__Schema);
