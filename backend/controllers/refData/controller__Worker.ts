import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Worker from '../../models/refData/Model__Worker';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __Worker
//@route  POST /api/refdata/worker
//@access Private
export const add__Worker = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    patronymic,
    lastName,
    workerProfessions,
    passportSeries,
    passportNumber,
    representedBy,
    whenIssued,
    inn,
    birthDay,
    telNumber,
    email,
  } = req.body;

  if (!firstName || !lastName || !workerProfessions) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const new__Worker = await Model__Worker.create({
    firstName,
    patronymic,
    lastName,
    workerProfessions,
    passportSeries,
    passportNumber,
    representedBy,
    whenIssued,
    inn,
    birthDay,
    telNumber,
    email,
  });

  if (!new__Worker) {
    res.status(400);
    throw new Error('Invalid  data');
  } else {
    res.status(200).json({
      message: 'Добавлено успешно',
      my_data: new__Worker,
    });
  }
});

//@desc   Updste a __Worker
//@route  PUT /api/refdata/worker/:id
//@access Private
export const update__Worker = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      patronymic,
      lastName,
      workerProfessions,
      passportSeries,
      passportNumber,
      representedBy,
      whenIssued,
      inn,
      birthDay,
      telNumber,
      email,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add some fields');
    }

    const new__Worker = {
      firstName,
      patronymic,
      lastName,
      workerProfessions,
      passportSeries,
      passportNumber,
      representedBy,
      whenIssued,
      inn,
      birthDay,
      telNumber,
      email,
    };

    const updated__Worker = await Model__Worker.findByIdAndUpdate(
      req.params.id,
      new__Worker,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__Worker,
    });
  }
);

//@desc   Get All __Workers
//@route  GET /api/refdata/worker
//@access Private
export const getAll__Workers = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Worker.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ unitName: myRegex }],
      };
    }

    const all__Workers = await Model__Worker.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        lastName: 1,
      })
      // .populate({ path: 'workerProfessions', select: 'workerProfessionName' })
      .populate('workerProfessions');
    if (!all__Workers) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__Workers,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __Worker
//@route  GET /api/refdata/worker/:id
//@access Private
export const getOne__Worker = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Worker = await Model__Worker.findById(req.params.id)
      // .populate({ path: 'workerProfessions', select: 'workerProfessionName' })
      .populate('workerProfessions');

    if (!one__Worker) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__Worker,
    });
  }
);

//@desc   DELETE one __Worker
//@route  DELETE /api/refdata/worker/:id
//@access Private
export const delete__Worker = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Worker = await Model__Worker.findByIdAndDelete(req.params.id);

    if (!one__Worker) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__Worker._id,
    });
  }
);
