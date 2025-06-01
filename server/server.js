import express from 'express';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';

import userRoutes from "./routes/user.route.js";
import commentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post", postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

