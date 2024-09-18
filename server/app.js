const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const planRoutes = require('./routes/planRoutes');

const app = express();
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ravitejasalva:ravi198@cluster0.tyf4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// Routes
app.use('/api/plans', planRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
