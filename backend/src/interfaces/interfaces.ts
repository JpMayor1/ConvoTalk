import { Request } from "express";
import User from "../models/user.model";

// Define a custom interface for the Request to include user
export interface CustomRequest extends Request {
  user?: typeof User.prototype; // Modify this type according to your user model
}
