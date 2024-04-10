import jwt from "jsonwebtoken"

export const generateUserToken = async (user: any) => {
    try {
      const token = jwt.sign({ userId: user.id }, `${process.env.JWT_SECRET}`, {
        expiresIn: "10d",
      });
      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };