import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { CreateUser } from "../../types/user/createUser";
import { User } from "../../types/user/user";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddUser = async (
  newUser: CreateUser
): Promise<User | unknown> => {
  try {
    await connectDatabase();
    return await client.db(database).collection("Users").insertOne(newUser);
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
