import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ProductType from '../../models/refData/Model__ProductType';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ProductType
//@route  POST /api/refdata/producttype
//@access Private
export const add__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const { productTypeName } = req.body;

    if (!productTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ProductType.findOne({
      productTypeName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('productTypeName already exists');
    }

    const new__ProductType = await Model__ProductType.create({
      productTypeName,
    });

    if (!new__ProductType) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ProductType,
      });
    }
  }
);

//@desc   Updste a __ProductType
//@route  PUT /api/refdata/producttype/:id
//@access Private
export const update__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const { productTypeName } = req.body;

    if (!productTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ProductType = {
      productTypeName,
    };

    const updated__ProductType = await Model__ProductType.findByIdAndUpdate(
      req.params.id,
      new__ProductType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ProductType,
    });
  }
);

//@desc   Get All __ProductTypes
//@route  GET /api/refdata/producttype
//@access Private
export const getAll__ProductTypes = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ProductType.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ productTypeName: myRegex }],
      };
    }

    const all__ProductTypes = await Model__ProductType.find(filterObject)
      .limit(pageSize)
      .skip(skip)
      .sort({
        productTypeName: 1,
      });

    if (!all__ProductTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ProductTypes,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ProductType
//@route  GET /api/refdata/producttype/:id
//@access Private
export const getOne__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductType = await Model__ProductType.findById(req.params.id);

    if (!one__ProductType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ProductType,
    });
  }
);

//@desc   DELETE one __ProductType
//@route  DELETE /api/refdata/producttype/:id
//@access Private
export const delete__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductType = await Model__ProductType.findByIdAndDelete(
      req.params.id
    );

    if (!one__ProductType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ProductType._id,
    });
  }
);
