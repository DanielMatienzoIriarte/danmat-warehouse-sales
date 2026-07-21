import Router from "express";
import AuthenticationController from "../controller/authentication_controller";
import { authenticateUser } from "../middleware/authorization";


const apiRouter = Router();

const authenticationController = new AuthenticationController();

apiRouter.get(
    '/me',
    authenticateUser,
    authenticationController.verify
);

export default apiRouter;
