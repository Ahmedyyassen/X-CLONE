import { connect } from "mongoose";
import { MONGO_URI } from "../constants/env.js";
const connectDB = async () => {
    try {
        const conncting = await connect(MONGO_URI);
        console.log(`Connect to DB successfully at ${conncting.connection.host} ✅`);
    }
    catch (error) {
        console.log(`There is an error during connect to DB `, error);
        process.exit(1);
    }
};
export default connectDB;
