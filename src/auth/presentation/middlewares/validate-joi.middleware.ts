import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ErrorResponse } from '../../../common/utils/response';

interface DTO {
  [key: string]: unknown;
}

function validateInputData<T extends DTO>(schema: Joi.ObjectSchema<T>) {
  return (req: Request<object, object, T>, res: Response, next: NextFunction) => {
    const inputData: T = req.body;

    const { error } = schema.validate(inputData, { abortEarly: false });

    if (error) {
      const errorMessages: string[] = error.details.map((detail) =>
        detail.message.replace(/["\\]/g, '')
      );
      return ErrorResponse(res, 400, errorMessages);
    }

    next();
  };
}

export { validateInputData };
