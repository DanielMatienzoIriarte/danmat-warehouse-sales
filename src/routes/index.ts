import express, { Request, Response } from "express";
import salesRouter from "./sales_routes";
import apiRouter from "./api";

const router = express.Router();

//Landpage
router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'success',
        content: 'Poin Of Sale',
    });
});

router.use('/sales', salesRouter)
router.use('/api', apiRouter)

export default router;
