import { Response } from "express";
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // use secure cookies in production
  });
};

export default generateTokenAndSetCookie;
