import express from 'express';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});