import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});