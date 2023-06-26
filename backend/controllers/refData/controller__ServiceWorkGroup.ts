import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ServiceWorkGroup from '../../models/refData/Model__ServiceWorkGroup';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ServiceWorkGroup
//@route  POST /api/refdata/servicework-group
//@access Private
export const add__ServiceWorkGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceWorkGroupName } = req.body;

    if (!serviceWorkGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ServiceWorkGroup.findOne({
      serviceWorkGroupName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('serviceWorkGroupName already exists');
    }

    const new__ServiceWorkGroup = await Model__ServiceWorkGroup.create({
      serviceWorkGroupName,
    });

    if (!new__ServiceWorkGroup) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ServiceWorkGroup,
      });
    }
  }
);

//@desc   Updste a __ServiceWorkGroup
//@route  PUT /api/refdata/servicework-group/:id
//@access Private
export const update__ServiceWorkGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceWorkGroupName } = req.body;

    if (!serviceWorkGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ServiceWorkGroup = {
      serviceWorkGroupName,
    };

    const updated__ServiceWorkGroup =
      await Model__ServiceWorkGroup.findByIdAndUpdate(
        req.params.id,
        new__ServiceWorkGroup,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ServiceWorkGroup,
    });
  }
);

//@desc   Get All __ServiceWorkGroups
//@route  GET /api/refdata/servicework-group
//@access Private
export const getAll__ServiceWorkGroups = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ServiceWorkGroup.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ serviceWorkGroupName: myRegex }],
      };
    }

    const all__ServiceWorkGroups = await Model__ServiceWorkGroup.find(
      filterObject
    )
      .limit(pageSize)
      .skip(skip)
      .sort({
        serviceWorkGroupName: 1,
      });

    if (!all__ServiceWorkGroups) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ServiceWorkGroups,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ServiceWorkGroup
//@route  GET /api/refdata/servicework-group/:id
//@access Private
export const getOne__ServiceWorkGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ServiceWorkGroup = await Model__ServiceWorkGroup.findById(
      req.params.id
    );

    if (!one__ServiceWorkGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ServiceWorkGroup,
    });
  }
);

//@desc   DELETE one __ServiceWorkGroup
//@route  DELETE /api/refdata/servicework-group/:id
//@access Private
export const delete__ServiceWorkGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ServiceWorkGroup =
      await Model__ServiceWorkGroup.findByIdAndDelete(req.params.id);

    if (!one__ServiceWorkGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ServiceWorkGroup._id,
    });
  }
);
