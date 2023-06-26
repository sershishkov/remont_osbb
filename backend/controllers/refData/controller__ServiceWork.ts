import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ServiceWork from '../../models/refData/Model__ServiceWork';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ServiceWork
//@route  POST /api/refdata/serviceworks
//@access Private
export const add__ServiceWork = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      serviceWorkName,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    } = req.body;

    if (
      !serviceWorkName ||
      !unit ||
      !serviceWorkGroup ||
      !priceWorkerRecommend
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ServiceWork.findOne({
      serviceWorkName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('serviceWorkName already exists');
    }

    const new__ServiceWork = await Model__ServiceWork.create({
      serviceWorkName,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    });

    if (!new__ServiceWork) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ServiceWork,
      });
    }
  }
);

//@desc   Updste a __ServiceWork
//@route  PUT /api/refdata/serviceworks/:id
//@access Private
export const update__ServiceWork = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      serviceWorkName,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ServiceWork = {
      serviceWorkName,
      unit,
      serviceWorkGroup,
      priceWorkerRecommend,
      priceClientRecommend,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
    };

    const updated__ServiceWork = await Model__ServiceWork.findByIdAndUpdate(
      req.params.id,
      new__ServiceWork,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ServiceWork,
    });
  }
);

//@desc   Get All __ServiceWorks
//@route  GET /api/refdata/serviceworks
//@access Private
export const getAll__ServiceWorks = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ServiceWork.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ serviceWorkName: myRegex }],
      };
    }

    const all__ServiceWorks = await Model__ServiceWork.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        serviceWorkName: 1,
      })
      .populate({ path: 'unit', select: 'unitName' })
      .populate({ path: 'serviceWorkGroup', select: 'serviceWorkGroupName' })
      .populate({ path: 'products', select: 'productName' })
      .populate({ path: 'inventars', select: 'productName' })
      .populate({ path: 'tools', select: 'productName' })
      .populate({ path: 'equipment', select: 'productName' })
      .populate({ path: 'workerProtection', select: 'productName' });

    if (!all__ServiceWorks) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ServiceWorks,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ServiceWork
//@route  GET /api/refdata/serviceworks/:id
//@access Private
export const getOne__ServiceWork = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ServiceWork = await Model__ServiceWork.findById(req.params.id)
      .populate({ path: 'unit', select: 'unitName' })
      .populate({ path: 'serviceWorkGroup', select: 'serviceWorkGroupName' })
      .populate({ path: 'products', select: 'productName' })
      .populate({ path: 'inventars', select: 'productName' })
      .populate({ path: 'tools', select: 'productName' })
      .populate({ path: 'equipment', select: 'productName' })
      .populate({ path: 'workerProtection', select: 'productName' });

    if (!one__ServiceWork) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ServiceWork,
    });
  }
);

//@desc   DELETE one __ServiceWork
//@route  DELETE /api/refdata/serviceworks/:id
//@access Private
export const delete__ServiceWork = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ServiceWork = await Model__ServiceWork.findByIdAndDelete(
      req.params.id
    );

    if (!one__ServiceWork) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ServiceWork._id,
    });
  }
);
