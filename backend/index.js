const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Test = require('./models/test');

const app = express();
const port = 3002; 

app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://admin:admin123@cluster0.ouichdj.mongodb.net/bot2do?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/getTests', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
