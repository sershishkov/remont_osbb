import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ThirdPartyServiceGroup from '../../models/refData/Model__ThirdPartyServiceGroup';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __ThirdPartyServiceGroup
//@route  POST /api/refdata/thirdpartyservice-group
//@access Private
export const add__ThirdPartyServiceGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { thirdPartyServiceGroupName } = req.body;

    if (!thirdPartyServiceGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__ThirdPartyServiceGroup.findOne({
      thirdPartyServiceGroupName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('thirdPartyServiceGroupName already exists');
    }

    const new__ThirdPartyServiceGroup =
      await Model__ThirdPartyServiceGroup.create({
        thirdPartyServiceGroupName,
      });

    if (!new__ThirdPartyServiceGroup) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        message: 'Добавлено успешно',
        my_data: new__ThirdPartyServiceGroup,
      });
    }
  }
);

//@desc   Updste a __ThirdPartyServiceGroup
//@route  PUT /api/refdata/thirdpartyservice-group/:id
//@access Private
export const update__ThirdPartyServiceGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const { thirdPartyServiceGroupName } = req.body;

    if (!thirdPartyServiceGroupName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ThirdPartyServiceGroup = {
      thirdPartyServiceGroupName,
    };

    const updated__ThirdPartyServiceGroup =
      await Model__ThirdPartyServiceGroup.findByIdAndUpdate(
        req.params.id,
        new__ThirdPartyServiceGroup,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message: 'Изменено успешно',
      my_data: updated__ThirdPartyServiceGroup,
    });
  }
);

//@desc   Get All __ThirdPartyServiceGroups
//@route  GET /api/refdata/thirdpartyservice-group
//@access Private
export const getAll__ThirdPartyServiceGroups = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page ?? '0');
    const pageSize: number = parseInt(req.query.limit ?? '0');
    const skip = (page - 1) * pageSize;
    const total: number = await Model__ThirdPartyServiceGroup.countDocuments(
      {}
    );
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    let filterObject = {};

    if (req.query.filter) {
      const myRegex = { $regex: req.query.filter, $options: 'i' };

      filterObject = {
        $or: [{ thirdPartyServiceGroupName: myRegex }],
      };
    }

    const all__ThirdPartyServiceGroups =
      await Model__ThirdPartyServiceGroup.find(filterObject)
        .limit(pageSize)
        .skip(skip)
        .sort({
          thirdPartyServiceGroupName: 1,
        });

    if (!all__ThirdPartyServiceGroups) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      message: 'Список сформирован успешно',
      my_data: {
        items: all__ThirdPartyServiceGroups,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __ThirdPartyServiceGroup
//@route  GET /api/refdata/thirdpartyservice-group/:id
//@access Private
export const getOne__ThirdPartyServiceGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ThirdPartyServiceGroup =
      await Model__ThirdPartyServiceGroup.findById(req.params.id);

    if (!one__ThirdPartyServiceGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент найден успешно',
      my_data: one__ThirdPartyServiceGroup,
    });
  }
);

//@desc   DELETE one __ThirdPartyServiceGroup
//@route  DELETE /api/refdata/thirdpartyservice-group/:id
//@access Private
export const delete__ThirdPartyServiceGroup = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ThirdPartyServiceGroup =
      await Model__ThirdPartyServiceGroup.findByIdAndDelete(req.params.id);

    if (!one__ThirdPartyServiceGroup) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      message: 'Элемент удален успешно',
      my_data: one__ThirdPartyServiceGroup._id,
    });
  }
);
