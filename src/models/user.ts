import {Model,DataTypes} from 'sequelize';
import connection from '../config/sequelize';

interface UserAttributes{
  id?:number,
  name:string,
  email:string,
  profileImage:string,
  createdAt?:Date,
  updatedAt?:Date
}

class User extends Model<UserAttributes> implements UserAttributes{
  id!: number | undefined;
  name!: string;
  email!: string;
  profileImage!: string;
  createdAt!: Date | undefined;
  updatedAt1: Date | undefined;
}

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: {
      allowNull:false,
     type:DataTypes.STRING,
    },
    email:{
      allowNull:false,
      type:DataTypes.STRING
    },
    profileImage: {
      allowNull:true,
      type:DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize:connection,
    modelName: 'User',
  });

  export default User;