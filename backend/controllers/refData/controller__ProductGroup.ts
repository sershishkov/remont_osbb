import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ProductGroup from '../../models/refData/Model__ProductGroup';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ProductGroup
//@route  POST /api/refdata/productgroup
//@access Private
export const add__ProductGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { productGroupName } = req.body;

    if (!productGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ProductGroup.findOne({
      productGroupName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('productGroupName already exists');
    }

    const new__ProductGroup = await Model__ProductGroup.create({
      productGroupName,
    });

    if (!new__ProductGroup) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ProductGroup,
      });
    }
  }
);

//@desc   Updste a __ProductGroup
//@route  PUT /api/refdata/productgroup/:id
//@access Private
export const update__ProductGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { productGroupName } = req.body;

    if (!productGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ProductGroup = {
      productGroupName,
    };

    const updated__ProductGroup = await Model__ProductGroup.findByIdAndUpdate(
      req.params.id,
      new__ProductGroup,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ProductGroup,
    });
  }
);

//@desc   Get All __ProductGroups
//@route  GET /api/refdata/productgroup
//@access Private
export const getAll__ProductGroups = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ProductGroup.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ productGroupName: myRegex }],
      };
    }

    const all__ProductGroups = await Model__ProductGroup.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        productGroupName: 1,
      });

    if (!all__ProductGroups) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ProductGroups,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ProductGroup
//@route  GET /api/refdata/productgroup/:id
//@access Private
export const getOne__ProductGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductGroup = await Model__ProductGroup.findById(req.params.id);

    if (!one__ProductGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ProductGroup,
    });
  }
);

//@desc   DELETE one __ProductGroup
//@route  DELETE /api/refdata/productgroup/:id
//@access Private
export const delete__ProductGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductGroup = await Model__ProductGroup.findByIdAndDelete(
      req.params.id
    );

    if (!one__ProductGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ProductGroup._id,
    });
  }
);
