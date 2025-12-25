import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

// ============================================================
// THE CRITICAL FIX: CORS CONFIGURATION
// This tells the backend: "Only accept requests from these websites"
// ============================================================
app.use(cors({
    origin: [
        "http://localhost:5173",                 // Your Local Computer (Vite)
        "https://property-delta-five.vercel.app" // Your NEW Frontend on Vercel
    ],
    credentials: true // Required for cookies/tokens to work
}))

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute)
app.use("/api/residency", residencyRoute)