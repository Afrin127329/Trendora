import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
//@ts-ignore
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      // @ts-ignore
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user && user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middlelware",
    });
  }
};
