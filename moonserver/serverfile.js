const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/moondb")
    .then(() => console.log("Hurray - MongoDB connected"))
    .catch(err => console.error("Oops - MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    cgpa: Number,
    city: String,
    color:String
});

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    res.send('Backend is working!');
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/users/cse', async (req, res) => {
    try {
        const users = await User.find({ dept: "cse" });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/users/above15', async (req, res) => {
    try {
        const users = await User.find({ age: { $gt: 15 } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () =>
    console.log('🥳 Server running on http://localhost:5000')
);