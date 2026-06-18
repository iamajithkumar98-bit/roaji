import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "ROAJI Backend API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});
