import { useState } from 'react';
import axios from 'axios';

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('submitting');
    try {
  await axios.post('http://localhost:5000/api/bookings', form);
  setStatus('success');
} catch (error) {
  console.error('Booking failed:', error);
  if (error.response && error.response.status === 409) {
    setStatus('duplicate');
  } else {
    setStatus('error');
  }
}

  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Book a Henna Slot</h2>

      {status === 'success' ? (
        <div className="text-green-600 font-bold">✅ Booking Confirmed! We’ll message you on WhatsApp soon.</div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
  <input
    name="name"
    placeholder="Your Name"
    value={form.name}
    onChange={handleChange}
    className="w-full p-2 border"
    required
  />
  <input
    name="phone"
    placeholder="Phone Number"
    value={form.phone}
    onChange={handleChange}
    className="w-full p-2 border"
    required
  />
  <input
    name="date"
    type="date"
    value={form.date}
    onChange={handleChange}
    className="w-full p-2 border"
    required
  />
  <input
    name="time"
    type="time"
    value={form.time}
    onChange={handleChange}
    className="w-full p-2 border"
    required
  />
  <button
    type="submit"
    className="bg-green-500 text-white px-4 py-2 rounded"
    disabled={status === 'submitting'}
  >
    {status === 'submitting' ? 'Booking...' : 'Book Now'}
  </button>

  {/* 🔻 Add this BELOW the button */}
  {status === 'duplicate' && (
    <p className="text-red-500 mt-2">❌ This slot is already booked. Please pick another time.</p>
  )}
  {status === 'error' && (
    <p className="text-red-500 mt-2">Something went wrong. Please try again.</p>
  )}
</form>

      )}
    </div>
  );
}
