import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__WorkerProfession from '../../models/refData/Model__WorkerProfession';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __WorkerProfession
//@route  POST /api/refdata/workerprofession
//@access Private
export const add__WorkerProfession = asyncHandler(
  async (req: Request, res: Response) => {
    const { workerProfessionName, description } = req.body;

    if (!workerProfessionName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__WorkerProfession.findOne({
      workerProfessionName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('workerProfessionName already exists');
    }

    const new__WorkerProfession = await Model__WorkerProfession.create({
      workerProfessionName,
      description,
    });

    if (!new__WorkerProfession) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__WorkerProfession,
      });
    }
  }
);

//@desc   Updste a __WorkerProfession
//@route  PUT /api/refdata/workerprofession/:id
//@access Private
export const update__WorkerProfession = asyncHandler(
  async (req: Request, res: Response) => {
    const { workerProfessionName, description } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__WorkerProfession = {
      workerProfessionName,
      description,
    };

    const updated__WorkerProfession =
      await Model__WorkerProfession.findByIdAndUpdate(
        req.params.id,
        new__WorkerProfession,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__WorkerProfession,
    });
  }
);

//@desc   Get All __WorkerProfessions
//@route  GET /api/refdata/workerprofession
//@access Private
export const getAll__WorkerProfessions = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__WorkerProfession.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ unitName: myRegex }],
      };
    }

    const all__WorkerProfessions = await Model__WorkerProfession.find(
      filterObject
    )
      .limit(pageSize)
      .skip(skip)
      .sort({
        workerProfessionName: 1,
      });

    if (!all__WorkerProfessions) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__WorkerProfessions,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __WorkerProfession
//@route  GET /api/refdata/workerprofession/:id
//@access Private
export const getOne__WorkerProfession = asyncHandler(
  async (req: Request, res: Response) => {
    const one__WorkerProfession = await Model__WorkerProfession.findById(
      req.params.id
    );

    if (!one__WorkerProfession) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__WorkerProfession,
    });
  }
);

//@desc   DELETE one __WorkerProfession
//@route  DELETE /api/refdata/workerprofession/:id
//@access Private
export const delete__WorkerProfession = asyncHandler(
  async (req: Request, res: Response) => {
    const one__WorkerProfession =
      await Model__WorkerProfession.findByIdAndDelete(req.params.id);

    if (!one__WorkerProfession) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__WorkerProfession._id,
    });
  }
);
