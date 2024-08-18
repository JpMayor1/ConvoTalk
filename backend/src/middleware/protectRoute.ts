import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/interfaces";
import User from "../models/user.model";

const protectRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    // Type assertion: assume decoded has a userId property
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { userId: string };

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assign user to the request object
    req.user = user;

    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in protectRoute middleware:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(500).json({ error: "Internal Server Error " });
    }
  }
};

export default protectRoute;
