require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log(' MongoDB error:', err));


const Patient = mongoose.model('Patient', new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  departments: [String],
  amountPaid: Number,
  balance: Number,
  paymentDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
}));

const CollectionData = mongoose.model('CollectionData', new mongoose.Schema({
  department: String,
  date: { type: Date },
  amount: Number
}));

// Routes
app.get('/', (req, res) => res.send('Hospital API'));

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new patient
app.post('/api/patients', async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.get('/api/collection', async (req, res) => {
  try {
    const collectionData = await CollectionData.find(); 
    res.json(collectionData);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
