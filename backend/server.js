import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ TEST ROUTE to check backend/frontend connection
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend is connected to frontend!' });
});

// ✅ Booking API – no duplicate bookings for same date+time
app.post('/api/bookings', async (req, res) => {
  try {
    console.log("📩 Received data:", req.body);

    const { name, phone, date, time } = req.body;

    if (!name || !phone || !date || !time) {
      console.log("❌ Missing input fields.");
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await Booking.findOne({ date, time });
    console.log("🔍 Existing booking:", existing);

    if (existing) {
      return res.status(409).json({ message: "❌ Slot already booked." });
    }

    const newBooking = new Booking({ name, phone, date, time });
    const result = await newBooking.save();

    console.log("✅ Booking saved:", result);
    res.status(201).json({ message: "✅ Booking confirmed!" });

  } catch (err) {
    console.error("❌ Error saving booking:", err.message);
    res.status(500).json({ error: err.message });  // 👈 show actual error in frontend
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
