import { Schema, model } from 'mongoose';

import { I_WorkerProfession } from '../../interfaces/AccountingInterfaces';

const workerProfession__Schema = new Schema<I_WorkerProfession>({
  workerProfessionName: {
    type: String,
    required: [true, 'Please add a workerProfession'],
    unique: true,
  },
  description: {
    type: String,
    default: 'Пока нет описания',
  },
});

export default model('workerProfession', workerProfession__Schema);
