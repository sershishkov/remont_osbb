import { Schema, model } from 'mongoose';

import { I_ThirdPartyServiceGroup } from '../../interfaces/AccountingInterfaces';

const thirdPartyServiceGroup__Schema = new Schema<I_ThirdPartyServiceGroup>({
  thirdPartyServiceGroupName: {
    type: String,
    required: [true, 'Please add a thirdPartyServiceGroup name'],
    unique: true,
  },
});

export default model('thirdPartyServiceGroup', thirdPartyServiceGroup__Schema);
