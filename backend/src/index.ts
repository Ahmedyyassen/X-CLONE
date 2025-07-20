import express from "express";
import { clerkMiddleware } from "@clerk/express";
import http from "http";
import { NODE_ENV, PORT } from "./constants/env";
import connectDB from "./config/db";
import routes from "./routes";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { arcjetMiddleware } from "./middleware/arcject.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware)

app.get("/", (req,res)=> res.send("Hello from server"))
app.use("/api", routes())


app.use(errorHandler);

const server = http.createServer(app);

const startServer = async ()=> {
    try {
        await connectDB();
        if (NODE_ENV !== "production") {
            server.listen(PORT,()=>{
            console.log(`server is running in port ${PORT} at ${NODE_ENV} mode`);
        })
        }
    } catch (error) {
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
}
startServer();

// export for vercel
export default app;