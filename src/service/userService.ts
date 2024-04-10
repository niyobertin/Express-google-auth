import User from "../models/user";
import { Profile } from "passport-google-oauth20";
import { UserAttributes } from "../models/user";

export const getAllUsers = async() =>{
try {
    const users = await User.findAll();
    return users;
} catch (error:any) {
    throw new Error(error.message)
}
}

export const getUserByPk = async (id: number) => {
  const user = await User.findByPk(id)
  return user
}

export const createOrUpdateUser = async (profile: Profile) => {
    const {  displayName, emails, photos } = profile;
    const userExist = await User.findOne({ where: { email: emails![0].value }});
    if(userExist){
      return userExist
    } else {
      const user = await User.create({
        name: displayName,
        email: emails![0].value,
        profileImage: photos![0].value,
      });
      return user
    }
  };

export const updateUser = async (userId: number, updatedUserInfo: Partial<UserAttributes>) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error("User not found");
    }
    await user.update(updatedUserInfo, { where: { id: userId }});
    return user;
};
  

