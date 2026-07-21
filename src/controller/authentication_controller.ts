import { Response, Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import GeneralError from "../helpers/general_error";
import UserService from "../service/user_service";
import IUserService from "../interfaces/user_service_interface";
import AuthenticationService from '../service/authentication_service';
import IAuthorizationService from "../interfaces/authorization_interface";
import { IUser } from "../interfaces/interfaces";
import { AuthenticatedRequest } from "../middleware/authorization";

class AuthenticationController {
  private userService: IUserService;
  private authService: IAuthorizationService

  constructor(userService?: IUserService, authService?: IAuthorizationService) {
    this.userService = userService || new UserService();
    this.authService = authService || new AuthenticationService();
  };
  
  /**
   * 
   * @param request Request
   * @param response Response
   * @returns Promise<Response<any, Record<string, any>>>
   */
  public login = async(request: Request, response: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { email, password } = request.body;
      const user: any = await this.userService.getUser(email, password);

      if (!user) {
        return response.json({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Incorrect Credentials',
          data: {}
        });
      }

      this.authService.createCookie(user, response);

      return response.json({
        status: StatusCodes.OK,
        message: 'User logged in successfully',
        data:user
      });
    } catch (error: any) {
      return response.json({
        status: StatusCodes.FORBIDDEN,
        message: error.message,
        data: {}
      });
    }
  }

  public logout = async(request: AuthenticatedRequest, response: Response) => {
    response.clearCookie('jwt');

    return response.status(200).json({ message: 'Logged out successfully' });
  }

  public verify: RequestHandler = async(request: Request, response: Response) => {
    const user = (request as AuthenticatedRequest).user
    
    response.json(user);
  }
}

export default AuthenticationController;
