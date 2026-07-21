import { CookieOptions, Response } from "express";
import { IUser } from "../interfaces/interfaces";
import IJWTService from "../interfaces/jwt_service_interface";
import JWTService from "./jwt_service";
import IAuthenticationService from '../interfaces/authorization_interface';

const COOKIE_EXPIRATION_DAYS = 1;
const expirationDate = new Date(
    Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
);
const cookieOptions: CookieOptions = {
    expires: expirationDate,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    path: '/',
};

class AuthenticationService implements IAuthenticationService{
    private jwtService: IJWTService;

    constructor(jwtService?: JWTService) {
        this.jwtService = jwtService || new JWTService();
    };
    /**
     * @inheritdoc
     */
    public createCookie(user: IUser, response: Response): void {
        const token = this.jwtService.createToken(user);

        response.cookie('DANMAT-COKKIE', token, cookieOptions);
    }
}

export default AuthenticationService;
