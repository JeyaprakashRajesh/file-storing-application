// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 6000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/file-storage';

app.use(cors());
app.use(express.json());
app.use(fileUpload());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const fileSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
});

const File = mongoose.model('File', fileSchema);

app.post('/upload', (req, res) => {
  const file = req.files.file;
  const newFile = new File({
    name: file.name,
    data: file.data,
    contentType: file.mimetype,
  });

  newFile.save()
    .then(() => res.json({ message: 'File uploaded successfully!' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/files', async (req, res) => {
  const files = await File.find({});
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
