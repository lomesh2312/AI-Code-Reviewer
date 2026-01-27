import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import reviewRoutes from './routes/review.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', reviewRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Database Connection
// Database Connection
// Mongoose handles connection buffering, so we can connect without waiting
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('MongoDB connection error:', error));
}

// Only listen if not running in Vercel (or similar serverless)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
