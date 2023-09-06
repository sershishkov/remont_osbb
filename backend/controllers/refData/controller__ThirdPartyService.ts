import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ThirdPartyService from '../../models/refData/Model__ThirdPartyService';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ThirdPartyService
//@route  POST /api/refdata/thirdpartyservices
//@access Private
export const add__ThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
    } = req.body;

    if (
      !thirdPartyServiceName ||
      !unit ||
      !thirdPartyServiceGroup ||
      !priceBuyRecommend
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ThirdPartyService.findOne({
      thirdPartyServiceName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('thirdPartyServiceName already exists');
    }

    const new__ThirdPartyService = await Model__ThirdPartyService.create({
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
    });

    if (!new__ThirdPartyService) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ThirdPartyService,
      });
    }
  }
);

//@desc   Updste a __ThirdPartyService
//@route  PUT /api/refdata/thirdpartyservices/:id
//@access Private
export const update__ThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ThirdPartyService = {
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend,
    };

    const updated__ThirdPartyService =
      await Model__ThirdPartyService.findByIdAndUpdate(
        req.params.id,
        new__ThirdPartyService,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ThirdPartyService,
    });
  }
);

//@desc   Get All __ThirdPartyServices
//@route  GET /api/refdata/thirdpartyservices
//@access Private
export const getAll__ThirdPartyServices = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ThirdPartyService.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ thirdPartyServiceName: myRegex }],
      };
    }

    const all__ThirdPartyServices = await Model__ThirdPartyService.find(
      filterObject
    )
      .limit(pageSize)
      .skip(skip)
      .sort({
        thirdPartyServiceName: 1,
      })
      .populate({ path: 'unit', select: 'unitName' })
      .populate({
        path: 'thirdPartyServiceGroup',
        select: 'thirdPartyServiceGroupName',
      });

    if (!all__ThirdPartyServices) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ThirdPartyServices,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ThirdPartyService
//@route  GET /api/refdata/thirdpartyservices/:id
//@access Private
export const getOne__ThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ThirdPartyService = await Model__ThirdPartyService.findById(
      req.params.id
    )
      .populate({ path: 'unit', select: 'unitName' })
      .populate({
        path: 'thirdPartyServiceGroup',
        select: 'thirdPartyServiceGroupName',
      });

    if (!one__ThirdPartyService) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ThirdPartyService,
    });
  }
);

//@desc   DELETE one __ThirdPartyService
//@route  DELETE /api/refdata/thirdpartyservices/:id
//@access Private
export const delete__ThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ThirdPartyService =
      await Model__ThirdPartyService.findByIdAndDelete(req.params.id);

    if (!one__ThirdPartyService) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ThirdPartyService._id,
    });
  }
);
