
import { connect } from "mongoose";

export const connectionToMongo = async (
  mongoUri: string | undefined
): Promise<void> => {
  try {
    await connect(mongoUri ?? "");
    console.log("Connection Success!");
  } catch (error) {
    console.log("Connection Failed!");
  }
};