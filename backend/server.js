import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './src/auth.routes.js';
import auth from './src/auth.middleware.js';

const app = express();

// Allow your React dev server (adjust origin if needed)
app.use(cors({ origin: true, credentials: false }));
app.use(express.json());

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((e) => {
    console.error('❌ MongoDB connection error:', e.message);
    process.exit(1);
  });

// Health
app.get('/health', (_, res) => res.json({ ok: true }));

// Auth API
app.use('/auth', authRoutes);

// Example protected endpoint (handy for debugging token)
app.get('/me', auth, (req, res) => {
  res.json({ id: req.user.sub, email: req.user.email });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
