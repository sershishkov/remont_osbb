import { Schema, model } from 'mongoose';

import { I_Worker } from '../../interfaces/AccountingInterfaces';

const worker__Schema = new Schema<I_Worker>({
  firstName: {
    type: String,
    required: [true, 'Please add a firstName'],
  },
  patronymic: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a firstName'],
  },
  workerProfessions: {
    type: [Schema.Types.ObjectId],
    ref: 'workerProfession',
    required: [true, 'Please add a workerProfessions id'],
  },

  passportSeries: {
    type: String,
  },
  passportNumber: {
    type: String,
  },
  representedBy: {
    type: String,
  },
  whenIssued: {
    type: Date,
  },
  inn: {
    type: String,
    match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр'],
  },
  birthDay: {
    type: Date,
  },
  telNumber: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email',
    ],
  },
});

export default model('worker', worker__Schema);
