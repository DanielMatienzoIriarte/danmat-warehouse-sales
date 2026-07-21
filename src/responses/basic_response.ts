import { IntegerType } from "typeorm";
import { Response } from "express";

export interface BasicResponse{
  status: IntegerType;
  message: string;
  data: any
}