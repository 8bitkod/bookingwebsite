import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
