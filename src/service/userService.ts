import User from "../models/user";

export const getAllUsers = async() =>{
try {
    const users = await User.findAll();
    return users;
} catch (error:any) {
    throw new Error(error.message)
}
}

