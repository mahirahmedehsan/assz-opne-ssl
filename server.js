const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const repairServiceRoutes = require('./routes/repairServices');
const repairBookingRoutes = require('./routes/repairBookings');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contact');
const heroSlideRoutes = require('./routes/heroSlides');
const contactInfoRoutes = require('./routes/contactInfo');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(s => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many auth attempts, please try again later.' },
});
app.use('/api/auth/', authLimiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/repair-services', repairServiceRoutes);
app.use('/api/repair-bookings', repairBookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/hero-slides', heroSlideRoutes);
app.use('/api/contact-info', contactInfoRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

const PORT = process.env.PORT || 5000;

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch {
    return res.status(503).json({ error: 'Database not available' });
  }
  app(req, res);
};

if (require.main === module) {
  const start = async () => {
    try {
      await connectDB();
      const Product = require('./models/Product');
      Product.syncIndexes().catch(err => console.error('Index sync failed:', err.message));
    } catch (e) {
      console.warn('Server starting without DB:', e.message);
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };
  start();
}
