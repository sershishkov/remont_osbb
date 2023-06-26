import { Schema, model } from 'mongoose';

import { I_ServiceWorkGroup } from '../../interfaces/AccountingInterfaces';

const serviceWorkGroup__Schema = new Schema<I_ServiceWorkGroup>({
  serviceWorkGroupName: {
    type: String,
    required: [true, 'Please add a serviceWorkGroup name'],
    unique: true,
  },
});

export default model('serviceWorkGroup', serviceWorkGroup__Schema);
