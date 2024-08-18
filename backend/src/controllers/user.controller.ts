import { Response } from "express";
import { CustomRequest } from "../interfaces/interfaces";
import User from "../models/user.model";

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in getUsersForSidebar controller:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
