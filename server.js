const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://ahmedsahil5498:${process.env.DB_PASSWORD}@cluster0.z9lqp.mongodb.net/project-1?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Define schema
const StringSchema = new mongoose.Schema({ value: String });
const StringModel = mongoose.model('String', StringSchema);

// Create a new random string
app.post('/create', async (req, res) => {
    const newString = new StringModel({ value: req.body.value });
    await newString.save();
    res.json({ message: 'String saved', data: newString });
});

// Fetch all stored strings
app.get('/display', async (req, res) => {
    const strings = await StringModel.find();
    res.json(strings);
});

// Delete a string by ID
app.delete('/delete/:id', async (req, res) => {
    await StringModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'String deleted' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
