import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import GeneralError from "../helpers/general_error";
import config from "../config/config";
import { IUser, TokenPayload } from "../interfaces/interfaces";
import { AuthorizationRequest } from "../requests/authorization_request";

const jwtSecret = config.SECRET_KEY as Secret;

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export const authorization = (request: AuthorizationRequest, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        return next(new GeneralError(StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
    }

    const [, token] = authorization.split('');

    try {
        const decodedToken = jwt.verify(token, jwtSecret) as TokenPayload;
        request.user = {
            id: decodedToken.id,
            email: '',
            password: '',
            is_active: true
        };

        return next();
    } catch (error:any) {
        return next(new GeneralError(StatusCodes.UNAUTHORIZED, "Unouthorizaed Access"));
    }
};

export const authenticateUser: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.['DANMAT-COKKIE'];
  
  if (!token) {
    console.log("No cookie found!");
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as IUser;

    (req as any).user.id = decoded.id;

    next();
  } catch (err) {
    return res.status(400).json({ error: "Unauthorized: Invalid Token" });
  }
};
