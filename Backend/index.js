import cors from "cors";
import { configDotenv } from 'dotenv';
import express from 'express';
import connectDB from './middleware/db.js';

configDotenv();

const { PORT, FRONTEND_PORT, DEV_FRONTEND_PORT } = process.env;
const SERVER_PORT = PORT || 3000;
const app = express();

// Parser for Parsing JSON and Cookie
app.use(express.json());
app.use(
    cors({
        origin: [FRONTEND_PORT, DEV_FRONTEND_PORT],
        credentials: true,
    })
);

import errorMiddleware from "./middleware/errorMiddleware.js";
import appRoutes from './routes/application.js';

app.use("/", appRoutes);
// Error Middleware
app.use(errorMiddleware);


// Connect to MongoDB and start the server
connectDB()
    .then(() => app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`)))
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    });