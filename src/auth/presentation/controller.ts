import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse } from '../../common/utils/response';
import { CustomError } from '../../common/utils/errors';
import { AuthService } from '../infrastructure/services/auth.service';
import { CreateUserDTO, LoginUserDTO } from '../domain/dtos';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  public RegisterUser(req: Request<object, object, CreateUserDTO>, res: Response) {
    const input = req.body;

    this.authService
      .Create(input)
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  public LoginUser(req: Request<object, object, LoginUserDTO>, res: Response) {
    const input = req.body;

    this.authService
      .Login(input)
      .then((data) => SuccessResponse(res, 201, data))
      .catch((error: Error | CustomError) => this.HandleError(error, res));
  }

  private HandleError(error: Error | CustomError, res: Response) {
    if (error instanceof CustomError) ErrorResponse(res, error.statusCode, error.message);

    console.log(`${error}`);
    return ErrorResponse(res, 500, { message: 'Internal server error' });
  }
}
